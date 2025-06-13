import React, { useState, useEffect } from 'react';
import { BlocklyWorkspace } from 'react-blockly';
import * as Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';
import './App.css';
import './blocks/time_blocks';
import './blocks/custom_math';
import './blocks/LED_blocks';
import './blocks/ADC_blocks';
import './blocks/LCD_blocks';
import './blocks/SEG7_blocks';
import './blocks/RGB_blocks';
import './blocks/FAN_blocks';
import './blocks/SERVO_blocks';
import './blocks/BUZZER_blocks';
import './blocks/BUTTON_blocks';
import './blocks/SONAR_blocks';
import './blocks/DHT_blocks';
import './blocks/KEYPAD_blocks';
import './blocks/SWITCH_blocks';
import './blocks/opencv_blocks';
import './blocks/class_blocks';
import './blocks/arrays_blocks';
import './blocks/numpy_blocks';
import './blocks/Camera_blocks';
import './blocks/custom_while';
import './blocks/program_structure_blocks';
// Định nghĩa màu sắc cho các khối
Blockly.utils.colour.setHsvSaturation(0.45);
Blockly.utils.colour.setHsvValue(0.65);

const INITIAL_TOOLBOX_JSON = {
  "kind": "categoryToolbox",
  "contents": [ 
    {
      "kind": "category",
      "name": "Program Structure",
      "categorystyle": "program_structure_category",
      "contents": [
        { "kind": "block", "type": "program_try_except" }
      ]
    },
    {
      "kind": "category",
      "name": "Variables",
      "categorystyle": "variable_category",
      "custom": "VARIABLE"
    },
    {
      "kind": "category",
      "name": "Math",
      "categorystyle": "math_category",
      "contents": [
        { "kind": "block", "type": "math_number" },
        { "kind": "block", "type": "math_arithmetic" },
        { "kind": "block", "type": "math_single" },
        { "kind": "block", "type": "math_number_property" },
        { "kind": "block", "type": "math_constant" },
        { "kind": "block", "type": "math_round" },
        { "kind": "block", "type": "math_modulo" },
        { "kind": "block", "type": "convert_int" },
        { "kind": "block", "type": "convert_float" }
      ]
    }, 
    {
      "kind": "category",
      "name": "Logic",
      "categorystyle": "logic_category",
      "contents": [
        { "kind": "block", "type": "controls_if" },
        { "kind": "block", "type": "logic_compare" },
        { "kind": "block", "type": "logic_operation" },
        { "kind": "block", "type": "logic_negate" },
        { "kind": "block", "type": "logic_boolean" },
        { "kind": "block", "type": "logic_null" }
      ]
    },
    {
      "kind": "category",
      "name": "Text",
      "categorystyle": "text_category",
      "contents": [
        { "kind": "block", "type": "text" },
        { "kind": "block", "type": "text_print" },
        { "kind": "block", "type": "text_join" }
      ]
    },
    {
      "kind": "category",
      "name": "Loops",
      "categorystyle": "loop_category",
      "contents": [
        { "kind": "block", "type": "controls_repeat_ext" },
        { "kind": "block", "type": "custom_while" },
        { "kind": "block", "type": "controls_for" },
        { "kind": "block", "type": "controls_forEach" },
        { "kind": "block", "type": "loop_break" }
      ]
    },
    {
      "kind": "category", 
      "name": "Functions",
      "categorystyle": "procedure_category",
      "custom": "PROCEDURE",
      "contents": [
        { "kind": "block", "type": "controls_call" },
        { "kind": "block", "type": "controls_custom_function" },
        { "kind": "block", "type": "controls_function_declaration" }        
      ]
    },
    {
      "kind": "category",
      "name": "Arrays",
      "categorystyle": "array_category",
      "contents": [
        { "kind": "block", "type": "array" },
        { "kind": "block", "type": "get_value_by_index" },
        { "kind": "block", "type": "set_value_by_index" },
        { "kind": "block", "type": "get_length" },
        { "kind": "block", "type": "array_append" },
        { "kind": "block", "type": "array_insert" }
      ]
    },
    {
      "kind": "category",
      "name": "Class",
      "categorystyle": "class_category",
      "contents": [
        { "kind": "block", "type": "class_create" },
        { "kind": "block", "type": "class_instance" },
        { "kind": "block", "type": "class_get" },
        { "kind": "block", "type": "class_set" }
      ]
    },
    {
      "kind": "category",
      "name": "Lists",
      "categorystyle": "list_category",
      "contents": [
        { "kind": "block", "type": "lists_create_empty" },
        { "kind": "block", "type": "lists_create_with" },
        { "kind": "block", "type": "lists_repeat" },
        { "kind": "block", "type": "lists_length" },
        { "kind": "block", "type": "lists_getIndex" },
        { "kind": "block", "type": "lists_setIndex" }
      ]
    },
    {
      "kind": "category",
      "name": "Time",
      "categorystyle": "time_category",
      "contents": [
        { "kind": "block", "type": "time_sleep" },
        { "kind": "block", "type": "time_time" },
        { "kind": "block", "type": "time_perf_counter" },
        { "kind": "block", "type": "time_process_time" }
      ]
    },
    {
      "kind": "category",
      "name": "Light & Display",
      "categorystyle": "LEDs_category",
      "contents": [
        { "kind": "block", "type": "LEDs_clear" },
        { "kind": "block", "type": "LEDs_update_by_number" },

        { "kind": "block", "type": "SEG7_ss" },
        { "kind": "block", "type": "SEG7_clear" },
        { "kind": "block", "type": "SEG7_update" },
        { "kind": "block", "type": "SEG7_dot" },

        { "kind": "block", "type": "RGB_start" },
        { "kind": "block", "type": "RGB_stop" },
        { "kind": "block", "type": "RGB_color" },

        { "kind": "block", "type": "LCD_begin" },
        { "kind": "block", "type": "LCD_backlight" },
        { "kind": "block", "type": "LCD_print" },
        { "kind": "block", "type": "LCD_setCursor" },
        { "kind": "block", "type": "LCD_clear" }
      ]
    },
    {
      "kind": "category",
      "name": "Actuators",
      "categorystyle": "actuator_category",
      "contents": [
        { "kind": "block", "type": "FAN" },
        { "kind": "block", "type": "BUZZER" },
        { "kind": "block", "type": "SERVO" },
        { "kind": "block", "type": "SERVO_angle" }
      ]
    },
    {
      "kind": "category",
      "name": "Sensors",
      "categorystyle": "sensor_category",
      "contents": [
        { "kind": "block", "type": "SONAR_distance" },
        { "kind": "block", "type": "Smoke_read" },
        { "kind": "block", "type": "DHT_temperature" },
        { "kind": "block", "type": "DHT_humidity" }
      ]
    },
    {
      "kind": "category",
      "name": "Active input",
      "categorystyle": "active_input_category",
      "contents": [
        { "kind": "block", "type": "BUTTON_read" },
        { "kind": "block", "type": "SWITCH_read" },
        { "kind": "block", "type": "Potentiometer_read" },
        { "kind": "block", "type": "KEYPAD_start" },
        { "kind": "block", "type": "KEYPAD_stop" },
        { "kind": "block", "type": "KEYPAD_available" },
        { "kind": "block", "type": "KEYPAD_read" }
      ]
    },
    {
      "kind": "category",
      "name": "OpenCV",
      "categorystyle": "opencv_category",
      "contents": [
        { "kind": "block", "type": "opencv_imshow" },
        { "kind": "block", "type": "opencv_imread" },
        { "kind": "block", "type": "opencv_imwrite" },
        { "kind": "block", "type": "opencv_rotate" },
        { "kind": "block", "type": "opencv_flip" },
        // { "kind": "block", "type": "opencv_getRotationMatrix2D" },
        // { "kind": "block", "type": "opencv_warpAffine" },
        { "kind": "block", "type": "opencv_waitKey" },
        { "kind": "block", "type": "opencv_destroyAllWindows" }
      ]
    },
    {
      "kind": "category",
      "name": "Numpy",
      "categorystyle": "numpy_category",
      "contents": [
        { "kind": "block", "type": "numpy_array" },
        { "kind": "block", "type": "numpy_linspace" },
        { "kind": "block", "type": "numpy_arange" },
        { "kind": "block", "type": "numpy_eye" },
        { "kind": "block", "type": "numpy_zeros" },
        { "kind": "block", "type": "numpy_ones" },
        { "kind": "block", "type": "numpy_exp" }
      ]
    },
    {
      "kind": "category",
      "name": "Camera",
      "categorystyle": "camera_category",
      "contents": [
        { "kind": "block", "type": "camera_start" },
        { "kind": "block", "type": "camera_stop" },
        { "kind": "block", "type": "camera_capture" }
      ]
    }
  ]
};

// Định nghĩa theme cho Blockly
const blocklyTheme = Blockly.Theme.defineTheme('custom', {
  'base': Blockly.Themes.Classic,
  'componentStyles': {
    'workspaceBackgroundColour': '#ffffff',
    'toolboxBackgroundColour': '#f0f0f0',
    'toolboxForegroundColour': '#333',
    'flyoutBackgroundColour': '#eee',
    'flyoutForegroundColour': '#444',
    'scrollbarColour': '#ccc',
    'insertionMarkerColour': '#fff',
    'insertionMarkerOpacity': 0.3,
    'scrollbarOpacity': 0.4,
    'cursorColour': '#d0d0d0'
  },
  'categoryStyles': {
    'program_structure_category': { 'colour': "#c70303" },
    'variable_category': { 'colour': '20' },
    'math_category': { 'colour': '40' },
    'logic_category': { 'colour': '60' },
    'text_category': { 'colour': '80' },
    'loop_category': { 'colour': '100' },
    'procedure_category': { 'colour': '120' },
    'list_category': { 'colour': '140' },
    'time_category': { 'colour': '160' },
    'LEDs_category': { 'colour': '180' },
    'actuator_category': { 'colour': '200' },
    'sensor_category': { 'colour': '220' },
    'active_input_category': { 'colour': '240' },
    'array_category': { 'colour': '260' },
    'opencv_category': { 'colour': '280' },
    'class_category': { 'colour': '300' },
    'numpy_category': { 'colour': '320' },
    'camera_category': { 'colour': '340' }
  }
});

function App() {
  const [pythonCode, setPythonCode] = useState('');
  const [blocklyWorkspace, setBlocklyWorkspace] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (blocklyWorkspace) {
      const updateCode = () => {
        try {
          const code = pythonGenerator.workspaceToCode(blocklyWorkspace);
          setPythonCode(code);
        } catch (error) {
          console.error('Error generating code:', error);
        }
      };

      blocklyWorkspace.addChangeListener(updateCode);
      return () => {
        blocklyWorkspace.removeChangeListener(updateCode);
      };
    }
  }, [blocklyWorkspace]);

  const handleWorkspaceChange = (workspace) => {
    setBlocklyWorkspace(workspace);
    try {
      // Get imports and code
      const code = pythonGenerator.workspaceToCode(workspace);
      const imports = Object.values(pythonGenerator.definitions_).join('\n');
      
      // Combine imports and code
      const fullCode = imports ? imports + '\n\n' + code : code;
      
      setPythonCode(fullCode);
    } catch (error) {
      console.error('Error converting blocks to code:', error);
    }
  };

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      
      await fetch('/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: pythonCode
        }),
      });
      
    } catch (error) {
      console.error('Error running code:', error);
    } 
  };

  const handleStopCode = async () => {
    try {
      setIsRunning(false); // Cập nhật trước để UI phản hồi nhanh

      await fetch('/stop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // alert('Code execution stopped.');
    } catch (error) {
      console.error('Error stopping code:', error);
      alert('Failed to stop code execution.');
    }
  };

  // Lưu toàn bộ workspace ra file XML trên máy khách
  const handleSaveBlocks = () => {
    try {
      const workspace = Blockly.getMainWorkspace();
      const xml     = Blockly.Xml.workspaceToDom(workspace);
      
      //Thêm dòng comment an toàn vào đầu file
      const xmlText = '<!-- Blockly generated XML file. Safe for download. -->\n' + Blockly.Xml.domToPrettyText(xml);

      

      // Tạo Blob và link “tạm” để trigger download
      const blob = new Blob([xmlText], { type: 'text/xml' });
      const url  = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href        = url;
      
      a.download    = `STEM_KIT_program.xml`;

      document.body.appendChild(a);
      a.click();           // Bắt đầu tải
      a.remove();          // Dọn dẹp
      URL.revokeObjectURL(url);

      // alert('Blocks saved to file successfully!');
    } catch (error) {
      console.error('Error saving blocks:', error);
      alert('Error saving blocks. Please try again.');
    }
  };

  const handleLoadBlocks = (event) => {
    const file = event.target.files[0];
    if (file && blocklyWorkspace) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const xmlText = e.target.result;
          const xml = Blockly.utils.xml.textToDom(xmlText);
          // Clear the workspace before loading new blocks
          blocklyWorkspace.clear();
          Blockly.Xml.domToWorkspace(xml, blocklyWorkspace);
          
          // Reset file input so the same file can be loaded again
          event.target.value = '';
          
          // alert('Blocks loaded successfully!');
        } catch (error) {
          console.error('Error loading blocks:', error);
          alert('Error loading blocks. Please try again.');
        }
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected or workspace not initialized');
    }
  };

  return (
    <div className="app-container">
      <div className="toolbar">
        <button className="toolbar-button" onClick={handleSaveBlocks}>Save Blocks</button>
        <input
          type="file"
          accept=".xml"
          onChange={handleLoadBlocks}
          style={{ display: 'none' }}
          id="load-blocks"
        />
        <label htmlFor="load-blocks" className="toolbar-button">
          Load Blocks
        </label>
      </div>
      <div className="main-content">
        <div className="blockly-container">
          <BlocklyWorkspace
            toolboxConfiguration={INITIAL_TOOLBOX_JSON}
            initialXml='<xml xmlns="https://developers.google.com/blockly/xml"></xml>'
            className="blockly-editor"
            onWorkspaceChange={handleWorkspaceChange}
            workspaceConfiguration={{
              grid: {
                spacing: 20,
                length: 3,
                colour: '#ccc',
                snap: true,
              },
              zoom: {
                controls: true,
                wheel: true,
                startScale: 1.0,
                maxScale: 2,
                minScale: 0.4,
                scaleSpeed: 1.1
              },
              trashcan: true,
              renderer: 'geras',
              move: {
                drag: true,
                wheel: true
              },
              theme: blocklyTheme,
              media: '/lib/blockly/media/',
              toolbox: {
                scrollbars: true,
                position: 'start',
                style: {
                  width: '200px'
                }
              }
            }}
          />
        </div>
        <div className="right-panel">
          <div className="code-container">
            <div className="code-header">
              <h2>Generated Python Code</h2>
                {isRunning ? (
                  <button
                    onClick={handleStopCode}
                    className="stop-button"
                  >
                    Stop
                  </button>
                ) : (
                  <button
                    onClick={handleRunCode}
                    className="run-button"
                  >
                    Run in Terminal
                  </button>
                )}
            </div>
            <Editor
              value={pythonCode || '# Generated Python code will appear here'}
              onValueChange={() => {}}
              highlight={code => highlight(code, languages.python)}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: '#f8f8f8',
                height: '100%',
                minHeight: '200px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
