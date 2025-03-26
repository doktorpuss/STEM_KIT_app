# Python Blockly IDE with React

A desktop application that allows you to create Python programs using a visual block-based programming interface, built with React, Blockly, and PyQt6.

## Features

- Modern React-based interface
- Drag and drop programming blocks
- Real-time Python code generation
- Monaco Editor (VS Code-like) for code display
- Split-screen layout with Blockly and code view
- Automatic module imports based on used blocks
- Save and load block configurations

## Prerequisites

- Python 3.8 or higher
- Node.js 14 or higher
- npm or yarn

## Installation Instructions

### Windows 10

1. Install Python:
   - Download Python 3.8 or higher from [python.org](https://www.python.org/downloads/)
   - During installation, check "Add Python to PATH"
   - Verify installation: `python --version`

2. Install Node.js:
   - Download Node.js from [nodejs.org](https://nodejs.org/)
   - Choose LTS version
   - Verify installation: `node --version` and `npm --version`

3. Install Python dependencies:
```bash
pip install flask flask-cors PyQt6
```

4. Clone or download the source code:
```bash
git clone <repository_url>
cd pi_app
```

5. Install React dependencies:
```bash
cd frontend
npm install
```

6. Build the React application:
```bash
npm run build
```

7. Run the application:
```bash
cd ..
python main.py
```

### Raspberry Pi

1. Update system:
```bash
sudo apt update
sudo apt upgrade
```

2. Install Python and pip:
```bash
sudo apt install python3 python3-pip
```

3. Install Node.js:
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs
```

4. Install Python dependencies:
```bash
pip3 install flask flask-cors
sudo apt install python3-pyqt6 python3-pyqt6.qtwebengine

```

5. Clone or download the source code:
```bash
git clone <repository_url>
cd pi_app
```

6. Install React dependencies:
```bash
cd frontend
npm install
```

7. Build the React application:
```bash
npm run build
```

8. Run the application:
```bash
cd ..
python3 main.py
```

### Ubuntu

1. Update system:
```bash
sudo apt update
sudo apt upgrade
```

2. Install Python and pip:
```bash
sudo apt install python3 python3-pip
```

3. Install Node.js:
```bash
# Add NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs
```

4. Install Python dependencies:
```bash
python -m venv STEM_app
source STEM_app/bin/activate
pip3 install flask flask-cors PyQt6
```

5. Clone or download the source code:
```bash
git clone <repository_url>
cd pi_app
```

6. Install React dependencies:
```bash
cd frontend
npm install
```

7. Build the React application:
```bash
npm run build
```

8. Run the application:
```bash
cd ..
python3 main.py
```

## Project Structure

After installation, your project structure should look like this:
```
pi_app/
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   └── build/
├── main.py
└── requirements.txt
```

## Troubleshooting

1. Permission Issues:
   - Windows: Run Command Prompt as Administrator
   - Linux/Raspberry Pi: Add `sudo` before commands requiring root privileges

2. Port Issues:
   - Ensure port 5000 is not in use by another application
   - You can modify the port in `main.py` if needed

3. Library Issues:
   - Check library versions in `requirements.txt`
   - Reinstall libraries if necessary

4. Node.js Issues:
   - Make sure you're using Node.js version 14 or higher
   - Try clearing npm cache: `npm cache clean --force`

## Development

For development, you can run the React development server:
```bash
cd frontend
npm start
```

This will enable hot reloading for React code changes.

## Note

- Make sure you have an active internet connection when running the application
- The application requires Python 3.8 or higher for proper functionality
- Some features may require additional system permissions

## Usage

1. Create your program by dragging blocks from the toolbox on the left
2. Use the toolbar buttons to:
   - Run: Execute the current block program
   - Save: Save your block configuration to an XML file
   - Load: Load a previously saved block configuration

## Available Block Categories

- Logic: If statements, comparisons, and logical operations
- Loops: For loops, while loops, and repeat blocks
- Math: Numbers and arithmetic operations
- Text: String operations and text output
- Lists: List creation and manipulation
- Variables: Create and use variables
- Functions: Define and call functions

## Development

For development, you can run the React development server:
```bash
cd frontend
npm start
```

This will allow you to make changes to the React code with hot reloading.

## Note

Make sure you have an active internet connection when running the application, as it needs to load the Blockly library from CDN. 