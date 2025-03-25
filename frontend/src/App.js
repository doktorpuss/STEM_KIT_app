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

// Định nghĩa màu sắc cho các khối
Blockly.HSV_SATURATION = 0.45;
Blockly.HSV_VALUE = 0.65;

const INITIAL_TOOLBOX_JSON = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category",
      "name": "Logic",
      "categorystyle": "logic_category",
      "contents": [
        { "kind": "block", "type": "controls_if" },
        { "kind": "block", "type": "logic_compare" },
        { "kind": "block", "type": "logic_operation" },
        { "kind": "block", "type": "logic_negate" }
      ]
    },
    {
      "kind": "category",
      "name": "Loops",
      "categorystyle": "loop_category",
      "contents": [
        { "kind": "block", "type": "controls_repeat_ext" },
        { "kind": "block", "type": "controls_whileUntil" },
        { "kind": "block", "type": "controls_for" }
      ]
    },
    {
      "kind": "category",
      "name": "Math",
      "categorystyle": "math_category",
      "contents": [
        { "kind": "block", "type": "math_number" },
        { "kind": "block", "type": "math_arithmetic" },
        { "kind": "block", "type": "math_single" }
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
        { "kind": "block", "type": "time_time" }
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
      "name": "Functions",
      "categorystyle": "procedure_category",
      "custom": "PROCEDURE"
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
    'logic_category': { 'colour': '210' },
    'loop_category': { 'colour': '120' },
    'math_category': { 'colour': '230' },
    'text_category': { 'colour': '160' },
    'list_category': { 'colour': '260' },
    'time_category': { 'colour': '290' },
    'variable_category': { 'colour': '330' },
    'procedure_category': { 'colour': '290' }
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
      
      await fetch('http://localhost:5000/run', {
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
    } finally {
      setIsRunning(false);
    }
  };

  const handleSaveBlocks = async () => {
    try {
      const workspace = Blockly.getMainWorkspace();
      const xml = Blockly.Xml.workspaceToDom(workspace);
      const xmlText = Blockly.Xml.domToPrettyText(xml);
      
      const response = await fetch('http://localhost:5000/save_blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blocks: xmlText
        }),
      });

      if (response.ok) {
        const result = await response.text();
        console.log(result);
        alert('Blocks saved successfully!');
      } else {
        console.error('Error saving blocks');
        alert('Error saving blocks. Please try again.');
      }
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
          
          alert('Blocks loaded successfully!');
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
              media: '/lib/blockly/media/'
            }}
          />
        </div>
        <div className="right-panel">
          <div className="code-container">
            <div className="code-header">
              <h2>Generated Python Code</h2>
              <button 
                onClick={handleRunCode} 
                disabled={isRunning}
                className="run-button"
              >
                {isRunning ? 'Running...' : 'Run in Terminal'}
              </button>
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