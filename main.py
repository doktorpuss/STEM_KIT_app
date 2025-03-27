import sys
import os
import threading
import io
import contextlib
import traceback
from PyQt6.QtWidgets import QApplication, QMainWindow, QFileDialog
from PyQt6.QtWebEngineWidgets import QWebEngineView
from PyQt6.QtCore import QUrl, pyqtSlot, QObject, pyqtSignal
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
import subprocess
from datetime import datetime
import queue
import time
import json

# Flask app for serving the React frontend
app = Flask(__name__, static_folder='frontend/build')
CORS(app)

# Queue to store output messages
output_queue = queue.Queue()

class FileDialogHandler(QObject):
    save_requested = pyqtSignal(str)
    save_completed = pyqtSignal(dict)
    
    def __init__(self):
        super().__init__()
        self.save_requested.connect(self.handle_save)
    
    @pyqtSlot(str)
    def handle_save(self, content):
        try:
            file_path, _ = QFileDialog.getSaveFileName(
                None,
                "Save Blocks",
                "",
                "XML Files (*.xml)"
            )
            
            if file_path:
                # Ensure file has .xml extension
                if not file_path.endswith('.xml'):
                    file_path += '.xml'
                    
                # Create directory if it doesn't exist
                directory = os.path.dirname(file_path)
                if directory:
                    os.makedirs(directory, exist_ok=True)
                    
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                self.save_completed.emit({
                    'success': True,
                    'path': file_path,
                    'error': None
                })
            else:
                self.save_completed.emit({
                    'success': False,
                    'path': None,
                    'error': 'Save cancelled'
                })
        except Exception as e:
            self.save_completed.emit({
                'success': False,
                'path': None,
                'error': str(e)
            })

# Global variables
file_dialog_handler = None
save_event = threading.Event()
save_result = None

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

def run_python_code(code):
    if sys.platform == 'win32':
        temp_file = "temp_code.py"
    elif sys.platform == 'linux':
        temp_file = "temp_code.py"
    try:
        # Write the code to a fixed temp file
        with open(temp_file, 'w') as f:
            f.write(code)
        
        # Open a new terminal window and run the code
        if sys.platform == 'win32':
            process = subprocess.Popen(['start', 'cmd', '/k', f'python {temp_file} && del {temp_file}'], shell=True)
        else:
            subprocess.Popen(['lxterminal', '-e', f'bash -c "python3 {temp_file}; rm {temp_file}; exec bash"'])

        
        return "", ""
            
    except Exception as e:
        if os.path.exists(temp_file):
            os.remove(temp_file)
        return "", str(e)

@app.route('/run', methods=['POST'])
def run_code():
    data = request.get_json()
    code = data.get('code', '')
    
    # Start a new thread to run the code
    def run_code_thread():
        stdout, stderr = run_python_code(code)
        if stderr:
            print(f"Error: {stderr}")
    
    thread = threading.Thread(target=run_code_thread)
    thread.start()
    
    # Return immediately with a success message
    return jsonify({
        'status': 'success',
        'message': 'Code execution started'
    })

@app.route('/get_output', methods=['GET'])
def get_output():
    outputs = []
    while not output_queue.empty():
        outputs.append(output_queue.get())
    return jsonify({'outputs': outputs})

@app.route('/save_blocks', methods=['POST'])
def save_blocks():
    try:
        data = request.json
        blocks = data.get('blocks')
        
        if not blocks:
            return 'Missing blocks data', 400
            
        # Use the global file dialog handler
        global file_dialog_handler, save_event, save_result
        if not file_dialog_handler:
            return 'File dialog handler not initialized', 500
            
        # Reset event and emit save request
        save_event.clear()
        file_dialog_handler.save_requested.emit(blocks)
        
        # Wait for save operation to complete
        save_event.wait(timeout=30)  # 30 seconds timeout
        
        if not save_result:
            return 'Save operation timed out', 500
            
        if save_result['success']:
            return f'Blocks saved successfully to: {save_result["path"]}'
        else:
            return f'Error saving blocks: {save_result["error"]}', 500
            
    except Exception as e:
        print(f"Error saving blocks: {str(e)}")
        return f'Error saving blocks: {str(e)}', 500

class BlocklyIDE(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Python Blockly IDE")
        # self.setGeometry(100, 100, 1400, 800)
        
        # Create web view
        self.web_view = QWebEngineView()
        self.setCentralWidget(self.web_view)
        
        # Load React app
        self.web_view.setUrl(QUrl("http://localhost:5000"))
        
        # Initialize file dialog handler
        global file_dialog_handler, save_event
        file_dialog_handler = FileDialogHandler()
        save_event = threading.Event()
        
        # Connect save completed signal
        file_dialog_handler.save_completed.connect(self.handle_save_completed)
        
        # Set window to fullscreen
        # self.showFullScreen()
        self.showMaximized()
    
    @pyqtSlot(dict)
    def handle_save_completed(self, result):
        global save_result, save_event
        save_result = result
        save_event.set()

def run_flask():
    app.run(port=5000)

if __name__ == '__main__':
    # Start Flask server in a separate thread
    flask_thread = threading.Thread(target=run_flask, daemon=True)
    flask_thread.start()
    
    # Start PyQt application
    qt_app = QApplication(sys.argv)
    window = BlocklyIDE()
    window.show()
    sys.exit(qt_app.exec()) 