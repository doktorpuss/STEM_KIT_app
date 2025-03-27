import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

const dictionaryMutator = {
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
    var containerBlock = workspace.newBlock('dictionaries_create_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('dictionaries_create_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var connections = [];
    var keyConnections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      keyConnections.push(itemBlock.keyConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    for (var i = 0; i < this.itemCount_; i++) {
      if (keyConnections[i]) {
        this.getInput('KEY' + i).connection.connect(keyConnections[i]);
      }
      if (connections[i]) {
        this.getInput('VALUE' + i).connection.connect(connections[i]);
      }
    }
  },

  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var keyInput = this.getInput('KEY' + i);
      var valueInput = this.getInput('VALUE' + i);
      itemBlock.keyConnection_ = keyInput && keyInput.connection.targetConnection;
      itemBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['dictionaries_create'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(160);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, 'Dictionary');
    this.setTooltip('Create a dictionary with any number of key-value pairs');
  },

  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField('create empty dictionary');
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('KEY' + i)) {
        this.appendValueInput('KEY' + i)
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(i === 0 ? 'create dictionary with key' : 'and key');
        this.appendValueInput('VALUE' + i)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('value');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('KEY' + i)) {
      this.removeInput('KEY' + i);
      this.removeInput('VALUE' + i);
      i++;
    }
  }
};

Object.assign(Blockly.Blocks['dictionaries_create'], dictionaryMutator);

Blockly.Blocks['dictionaries_create_container'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('dictionary');
    this.appendStatementInput('STACK');
    this.setTooltip('Add, remove, or reorder sections to reconfigure this dictionary block');
    this.contextMenu = false;
  }
};

Blockly.Blocks['dictionaries_create_item'] = {
  init: function() {
    this.setColour(160);
    this.appendDummyInput()
        .appendField('item');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add a key-value pair to the dictionary');
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['dictionaries_create'] = function(block) {
  var elements = [];
  for (var i = 0; i < block.itemCount_; i++) {
    var key = pythonGenerator.valueToCode(block, 'KEY' + i,
        pythonGenerator.ORDER_NONE) || '""';
    var value = pythonGenerator.valueToCode(block, 'VALUE' + i,
        pythonGenerator.ORDER_NONE) || 'None';
    elements.push(key + ': ' + value);
  }
  var code = '{' + elements.join(', ') + '}';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['dictionaries_get'] = {
  init: function() {
    this.appendValueInput('DICT')
        .setCheck(null)
        .appendField('get value for key');
    this.appendValueInput('KEY')
        .setCheck('String');
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('Get a value from the dictionary using the specified key');
  }
};

pythonGenerator.forBlock['dictionaries_get'] = function(block) {
  const dict = pythonGenerator.valueToCode(block, 'DICT', pythonGenerator.ORDER_MEMBER) || '{}';
  const key = pythonGenerator.valueToCode(block, 'KEY', pythonGenerator.ORDER_ATOMIC) || '""';
  return [`${dict}[${key}]`, pythonGenerator.ORDER_MEMBER];
};

Blockly.Blocks['dictionaries_set'] = {
  init: function() {
    this.appendValueInput('DICT')
        .setCheck(null)
        .appendField('set value for key');
    this.appendValueInput('KEY')
        .setCheck('String');
    this.appendValueInput('VALUE')
        .setCheck(null)
        .appendField('to');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Set a value in the dictionary for the specified key');
  }
};

pythonGenerator.forBlock['dictionaries_set'] = function(block) {
  const dict = pythonGenerator.valueToCode(block, 'DICT', pythonGenerator.ORDER_MEMBER) || '{}';
  const key = pythonGenerator.valueToCode(block, 'KEY', pythonGenerator.ORDER_ATOMIC) || '""';
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || 'None';
  return `${dict}[${key}] = ${value}\n`;
};

Blockly.Extensions.registerMutator('dictionaries_create_mutator',
  {
    saveExtraState: function() {
      return { 'itemCount': this.itemCount_ };
    },

    loadExtraState: function(state) {
      this.itemCount_ = state['itemCount'];
      this.updateShape_();
    }
  },
  undefined,
  ['dictionaries_create_item']
);

Blockly.Extensions.apply('dictionaries_create_mutator', Blockly.Blocks['dictionaries_create']); 