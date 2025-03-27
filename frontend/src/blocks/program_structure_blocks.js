import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Define the container block for the mutator
Blockly.Blocks['exception_container'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Exceptions');
    this.appendStatementInput('STACK');
    this.setColour("#c70303");
    this.contextMenu = false;
    this.setTooltip('Add, remove, or reorder exceptions');
  }
};

// Define the individual exception item block for the mutator
Blockly.Blocks['exception_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('except')
        .appendField(new Blockly.FieldDropdown([
          ['Exception', 'Exception'],
          ['KeyboardInterrupt', 'KeyboardInterrupt'],
          ['OverflowError', 'OverflowError'],
          ['ZeroDivisionError', 'ZeroDivisionError'],
          ['ValueError', 'ValueError'],
          ['TypeError', 'TypeError'],
          ['IndexError', 'IndexError'],
          ['KeyError', 'KeyError'],
          ['NameError', 'NameError'],
          ['FileNotFoundError', 'FileNotFoundError'],
          ['IOError', 'IOError'],
          ['ImportError', 'ImportError'],
          ['MemoryError', 'MemoryError'],
          ['RecursionError', 'RecursionError'],
          ['ReferenceError', 'ReferenceError'],
          ['StopIteration', 'StopIteration'],
        ]), 'EXCEPTION_TYPE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour("#c70303");
    this.contextMenu = false;
    this.setTooltip('An exception handler');
  }
};

// Define the try-except block
Blockly.Blocks['program_try_except'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Program Structure');
    this.appendStatementInput('TRY')
        .setCheck(null)
        .appendField('try');
    this.appendStatementInput('FINALLY')
        .setCheck(null)
        .appendField('finally');
    this.setColour("#c70303");
    this.setTooltip('Main program structure with try-except-finally');
    this.setDeletable(true);
    this.setMovable(true);
    
    // Initialize with one exception
    this.exceptCount_ = 1;
    this.updateShape_();

    // Set up the mutator
    this.setMutator(new Blockly.icons.MutatorIcon(['exception_item'], this));
  },

  saveExtraState: function() {
    return {
      'exceptCount': this.exceptCount_
    };
  },

  loadExtraState: function(state) {
    this.exceptCount_ = state['exceptCount'];
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('exception_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    
    for (let i = 0; i < this.exceptCount_; i++) {
      const itemBlock = workspace.newBlock('exception_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    const connections = [];
    const types = [];
    
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      types.push(itemBlock.getFieldValue('EXCEPTION_TYPE'));
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    
    this.exceptCount_ = connections.length;
    this.updateShape_();
    
    // Reconnect blocks and restore types
    for (let i = 0; i < this.exceptCount_; i++) {
      if (connections[i]) {
        this.getInput('EXCEPT' + i).connection.connect(connections[i]);
      }
      if (types[i]) {
        this.setFieldValue(types[i], 'EXCEPTION_TYPE' + i);
      }
    }
  },

  saveConnections: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    let i = 0;
    while (itemBlock) {
      const input = this.getInput('EXCEPT' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
      i++;
    }
  },

  updateShape_: function() {
    // Find the FINALLY input
    const finallyInput = this.getInput('FINALLY');

    // Remove any existing EXCEPT inputs
    for (let i = 0; i < this.exceptCount_; i++) {
      if (this.getInput('EXCEPT' + i)) {
        this.removeInput('EXCEPT' + i);
      }
    }

    // Add new EXCEPT inputs before FINALLY
    for (let i = 0; i < this.exceptCount_; i++) {
      this.appendStatementInput('EXCEPT' + i)
        .setCheck(null)
        .appendField('except')
        .appendField(new Blockly.FieldDropdown([
          ['Exception', 'Exception'],
          ['KeyboardInterrupt', 'KeyboardInterrupt'],
          ['OverflowError', 'OverflowError'],
          ['ZeroDivisionError', 'ZeroDivisionError'],
          ['ValueError', 'ValueError'],
          ['TypeError', 'TypeError'],
          ['IndexError', 'IndexError'],
          ['KeyError', 'KeyError'],
          ['NameError', 'NameError'],
          ['FileNotFoundError', 'FileNotFoundError'],
          ['IOError', 'IOError'],
          ['ImportError', 'ImportError'],
          ['MemoryError', 'MemoryError'],
          ['RecursionError', 'RecursionError'],
          ['ReferenceError', 'ReferenceError'],
          ['StopIteration', 'StopIteration'],
        ]), 'EXCEPTION_TYPE' + i);
      
      if (finallyInput) {
        this.moveInputBefore('EXCEPT' + i, 'FINALLY');
      }
    }
  }
};

// Update the generator registration to use pythonGenerator
pythonGenerator.forBlock['program_try_except'] = function(block) {
  const tryCode = pythonGenerator.statementToCode(block, 'TRY') || '    pass\n';
  let exceptCode = '';
  
  // Generate code for each except block
  for (let i = 0; i < block.exceptCount_; i++) {
    const type = block.getFieldValue('EXCEPTION_TYPE' + i);
    const code = pythonGenerator.statementToCode(block, 'EXCEPT' + i) || '    pass\n';
    exceptCode += `except ${type}:\n${code}`;
  }
  
  const finallyCode = pythonGenerator.statementToCode(block, 'FINALLY') || '    pass\n';
  
  let code = 'try:\n' + tryCode;
  if (exceptCode) {
    code += exceptCode;
  }
  if (finallyCode.trim()) {
    code += 'finally:\n' + finallyCode;
  }
  
  return code;
};