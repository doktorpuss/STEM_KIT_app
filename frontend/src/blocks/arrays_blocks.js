import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

const arrayMutator = {
  mutationToDom: function() {
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  domToMutation: function(xmlElement) {
    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_();
  },

  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('arrays_create_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('arrays_create_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var connections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    for (var i = 0; i < this.itemCount_; i++) {
      if (connections[i]) {
        this.getInput('ADD' + i).connection.connect(connections[i]);
      }
    }
  },

  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + i);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['arrays_create'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(160);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, 'Array');
    this.setTooltip('Create an array with any number of items');
  },

  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField('create empty array');
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('ADD' + i)) {
        this.appendValueInput('ADD' + i)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(i === 0 ? 'create array with' : 'and');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('ADD' + i)) {
      this.removeInput('ADD' + i);
      i++;
    }
  }
};

Object.assign(Blockly.Blocks['arrays_create'], arrayMutator);

Blockly.Blocks['arrays_create_container'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('array');
    this.appendStatementInput('STACK');
    this.setTooltip('Add, remove, or reorder sections to reconfigure this array block');
    this.contextMenu = false;
  }
};

Blockly.Blocks['arrays_create_item'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('item');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add an item to the array');
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['arrays_create'] = function(block) {
  var elements = [];
  for (var i = 0; i < block.itemCount_; i++) {
    var element = pythonGenerator.valueToCode(block, 'ADD' + i,
        pythonGenerator.ORDER_NONE) || 'None';
    elements.push(element);
  }
  var code = '[' + elements.join(', ') + ']';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['arrays_get'] = {
  init: function() {
    this.appendValueInput('ARRAY')
        .setCheck(null)
        .appendField('get element at index');
    this.appendValueInput('INDEX')
        .setCheck('Number');
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('Get an element from the array at the specified index');
  }
};

pythonGenerator.forBlock['arrays_get'] = function(block) {
  const array = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_MEMBER) || '[]';
  const index = pythonGenerator.valueToCode(block, 'INDEX', pythonGenerator.ORDER_ATOMIC) || '0';
  return [`${array}[${index}]`, pythonGenerator.ORDER_MEMBER];
};

Blockly.Blocks['arrays_set'] = {
  init: function() {
    this.appendValueInput('ARRAY')
        .setCheck(null)
        .appendField('set element at index');
    this.appendValueInput('INDEX')
        .setCheck('Number');
    this.appendValueInput('VALUE')
        .setCheck(null)
        .appendField('to');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Set an element in the array at the specified index');
  }
};

pythonGenerator.forBlock['arrays_set'] = function(block) {
  const array = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_MEMBER) || '[]';
  const index = pythonGenerator.valueToCode(block, 'INDEX', pythonGenerator.ORDER_ATOMIC) || '0';
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || 'None';
  return `${array}[${index}] = ${value}\n`;
};

Blockly.Blocks['arrays_length'] = {
  init: function() {
    this.appendValueInput('ARRAY')
        .setCheck(null)
        .appendField('length of');
    this.setOutput(true, 'Number');
    this.setColour(160);
    this.setTooltip('Get the length of the array');
  }
};

pythonGenerator.forBlock['arrays_length'] = function(block) {
  const array = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_MEMBER) || '[]';
  return [`len(${array})`, pythonGenerator.ORDER_FUNCTION_CALL];
}; 