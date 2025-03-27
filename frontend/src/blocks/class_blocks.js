import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

const classMutator = {
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
    var containerBlock = workspace.newBlock('class_create_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.itemCount_; i++) {
      var itemBlock = workspace.newBlock('class_create_method');
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
        this.getInput('CODE' + i).connection.connect(connections[i]);
      }
    }
  },

  saveConnections: function(containerBlock) {
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (itemBlock) {
      var nameInput = this.getInput('NAME' + i);
      var codeInput = this.getInput('CODE' + i);
      itemBlock.nameConnection_ = nameInput && nameInput.connection.targetConnection;
      itemBlock.valueConnection_ = codeInput && codeInput.connection.targetConnection;
      i++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Blocks['class_create'] = {
  init: function() {
    this.setHelpUrl('');
    this.setColour(360);
    this.itemCount_ = 3;
    this.appendValueInput('CLASS_NAME')
        .setCheck('String')
        .appendField('create class named');
    this.setMutator(new Blockly.Mutator(['class_create_method']));
    this.updateShape_();
    this.setOutput(true, 'Class');
    this.setTooltip('Create a class with any number of methods');
  },

  updateShape_: function() {
    if (this.itemCount_ && this.getInput('EMPTY')) {
      this.removeInput('EMPTY');
    } else if (!this.itemCount_ && !this.getInput('EMPTY')) {
      this.appendDummyInput('EMPTY')
          .appendField('create empty class');
    }

    // Add new inputs.
    for (var i = 0; i < this.itemCount_; i++) {
      if (!this.getInput('NAME' + i)) {
        this.appendValueInput('NAME' + i)
            .setCheck('String')
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField(i === 0 ? 'with method' : 'and method');
        this.appendStatementInput('CODE' + i)
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField('do');
      }
    }
    // Remove deleted inputs.
    while (this.getInput('NAME' + i)) {
      this.removeInput('NAME' + i);
      this.removeInput('CODE' + i);
      i++;
    }
  }
};

Object.assign(Blockly.Blocks['class_create'], classMutator);

Blockly.Blocks['class_create_container'] = {
  init: function() {
    this.setColour(360);
    this.appendDummyInput()
        .appendField('class');
    this.appendStatementInput('STACK');
    this.setTooltip('Add, remove, or reorder methods to reconfigure this class');
    this.contextMenu = false;
  }
};

Blockly.Blocks['class_create_method'] = {
  init: function() {
    this.setColour(360);
    this.appendDummyInput()
        .appendField('method');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add a method to the class');
    this.contextMenu = false;
  }
};

pythonGenerator.forBlock['class_create'] = function(block) {
  var className = pythonGenerator.valueToCode(block, 'CLASS_NAME',
      pythonGenerator.ORDER_NONE) || 'MyClass';
  var methods = [];
  for (var i = 0; i < block.itemCount_; i++) {
    var methodName = pythonGenerator.valueToCode(block, 'NAME' + i,
        pythonGenerator.ORDER_NONE) || '"method' + i + '"';
    var methodCode = pythonGenerator.statementToCode(block, 'CODE' + i) || 
        pythonGenerator.PASS;
    methods.push('def ' + methodName + '(self):\n' + methodCode);
  }
  var code = 'class ' + className + ':\n' + methods.join('\n');
  return [code, pythonGenerator.ORDER_NONE];
};

Blockly.Blocks['class_get'] = {
  init: function() {
    this.appendValueInput('INSTANCE')
        .setCheck(null)
        .appendField('get attribute');
    this.appendValueInput('ATTRIBUTE')
        .setCheck('String')
        .appendField('from instance');
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('Get an attribute value from a class instance');
  }
};

pythonGenerator.forBlock['class_get'] = function(block) {
  const instance = pythonGenerator.valueToCode(block, 'INSTANCE', pythonGenerator.ORDER_MEMBER) || 'instance';
  const attribute = pythonGenerator.valueToCode(block, 'ATTRIBUTE', pythonGenerator.ORDER_ATOMIC) || "'attribute'";
  return [`${instance}.${attribute}`, pythonGenerator.ORDER_MEMBER];
};

Blockly.Blocks['class_set'] = {
  init: function() {
    this.appendValueInput('INSTANCE')
        .setCheck(null)
        .appendField('set attribute');
    this.appendValueInput('ATTRIBUTE')
        .setCheck('String')
        .appendField('in instance');
    this.appendValueInput('VALUE')
        .setCheck(null)
        .appendField('to');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Set an attribute value in a class instance');
  }
};

pythonGenerator.forBlock['class_set'] = function(block) {
  const instance = pythonGenerator.valueToCode(block, 'INSTANCE', pythonGenerator.ORDER_MEMBER) || 'instance';
  const attribute = pythonGenerator.valueToCode(block, 'ATTRIBUTE', pythonGenerator.ORDER_ATOMIC) || "'attribute'";
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || 'None';
  return `${instance}.${attribute} = ${value}\n`;
}; 