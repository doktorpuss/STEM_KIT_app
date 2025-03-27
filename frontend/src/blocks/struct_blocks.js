import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

const structMutator = {
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
    var containerBlock = workspace.newBlock('struct_create_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('struct_create_field');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },

  compose: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var connections = [];
    var nameConnections = [];
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      connections.push(itemBlock.valueConnection_);
      nameConnections.push(itemBlock.nameConnection_);
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    this.itemCount_ = connections.length;
    this.updateShape_();
    for (var i = 0; i < this.itemCount_; i++) {
      if (nameConnections[i]) {
        this.getInput('NAME' + i).connection.connect(nameConnections[i]);
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
      var nameInput = this.getInput('NAME' + i);
      var valueInput = this.getInput('VALUE' + i);
      itemBlock.nameConnection_ = nameInput && nameInput.connection.targetConnection;
      itemBlock.valueConnection_ = valueInput && valueInput.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['struct_create'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(330);
    this.itemCount_ = 3;
    this.updateShape_();
    this.setOutput(true, 'Struct');
    this.setTooltip('Create a struct with any number of fields');
  },

  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField('create empty struct');
    }
    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('NAME' + i)) {
        this.appendValueInput('NAME' + i)
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(i === 0 ? 'create struct with field' : 'and field');
        this.appendValueInput('VALUE' + i)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('=');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('NAME' + i)) {
      this.removeInput('NAME' + i);
      this.removeInput('VALUE' + i);
      i++;
    }
  }
};

Object.assign(Blockly.Blocks['struct_create'], structMutator);

Blockly.Blocks['struct_create_container'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField('struct');
    this.appendStatementInput('STACK');
    this.setTooltip('Add, remove, or reorder fields to reconfigure this struct');
    this.contextMenu = false;
  }
};

Blockly.Blocks['struct_create_field'] = {
  init: function() {
    this.setColour(330);
    this.appendDummyInput()
        .appendField('field');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add a field to the struct');
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['struct_create'] = function(block) {
  var fields = [];
  for (var i = 0; i < block.itemCount_; i++) {
    var name = pythonGenerator.valueToCode(block, 'NAME' + i,
        pythonGenerator.ORDER_NONE) || '"field' + i + '"';
    var value = pythonGenerator.valueToCode(block, 'VALUE' + i,
        pythonGenerator.ORDER_NONE) || 'None';
    fields.push(name + ': ' + value);
  }
  var code = 'type("Struct", (), {' + fields.join(', ') + '})()';
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['struct_get'] = {
  init: function() {
    this.appendValueInput('STRUCT')
        .setCheck(null)
        .appendField('get field');
    this.appendValueInput('FIELD')
        .setCheck('String')
        .appendField('from struct');
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('Get a field value from a struct');
  }
};

pythonGenerator.forBlock['struct_get'] = function(block) {
  const struct = pythonGenerator.valueToCode(block, 'STRUCT', pythonGenerator.ORDER_MEMBER) || 'struct';
  const field = pythonGenerator.valueToCode(block, 'FIELD', pythonGenerator.ORDER_ATOMIC) || "'field'";
  return [`${struct}.${field}`, pythonGenerator.ORDER_MEMBER];
};

Blockly.Blocks['struct_set'] = {
  init: function() {
    this.appendValueInput('STRUCT')
        .setCheck(null)
        .appendField('set field');
    this.appendValueInput('FIELD')
        .setCheck('String')
        .appendField('in struct');
    this.appendValueInput('VALUE')
        .setCheck(null)
        .appendField('to');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Set a field value in a struct');
  }
};

pythonGenerator.forBlock['struct_set'] = function(block) {
  const struct = pythonGenerator.valueToCode(block, 'STRUCT', pythonGenerator.ORDER_MEMBER) || 'struct';
  const field = pythonGenerator.valueToCode(block, 'FIELD', pythonGenerator.ORDER_ATOMIC) || "'field'";
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || 'None';
  return `${struct}.${field} = ${value}\n`;
}; 