import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['array'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("1, 2, 3"), "VALUES")
        .appendField("]");
    this.setOutput(true, "Array");
    this.setColour(230);
    this.setTooltip("Enter values separated by commas to create an array.");
  }
};

pythonGenerator.forBlock['array'] = function(block) {
  const values = block.getFieldValue('VALUES').split(',').map(v => v.trim());
  return [`[${values.join(', ')}]`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['get_value_by_index'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR")
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("0"), "INDEX")
        .appendField("]");
    this.setOutput(true, "Number");
    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip("Get a value from an array by index.");
  }
};

pythonGenerator.forBlock['get_value_by_index'] = function(block) {
  const arrayName = pythonGenerator.getVariableName(block.getFieldValue("VAR"));
  const index = block.getFieldValue("INDEX");
  return [`${arrayName}[${index}]`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['set_value_by_index'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("set")
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR")
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("0"), "INDEX")
        .appendField("] =");
    this.appendValueInput("VALUE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set a value in an array by index.");
  }
};

pythonGenerator.forBlock['set_value_by_index'] = function(block) {
  const arrayName = pythonGenerator.getVariableName(block.getFieldValue("VAR"));
  const index = block.getFieldValue("INDEX");
  const value = pythonGenerator.valueToCode(block, "VALUE", pythonGenerator.ORDER_ATOMIC) || "0";
  return `${arrayName}[${index}] = ${value}\n`;
};

Blockly.Blocks['get_length'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("length of")
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
    this.setOutput(true, "Number");
    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip("Get the length of an array."); 
  }
};

pythonGenerator.forBlock['get_length'] = function(block) {
  const arrayName = pythonGenerator.getVariableName(block.getFieldValue("VAR"));
  return [`len(${arrayName})`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['array_append'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("append to")
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
    this.appendValueInput("VALUE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Append a value to an array.");
  }
};

pythonGenerator.forBlock['array_append'] = function(block) {
  const arrayName = pythonGenerator.getVariableName(block.getFieldValue("VAR"));
  const value = pythonGenerator.valueToCode(block, "VALUE", pythonGenerator.ORDER_ATOMIC) || "0";
  return `${arrayName}.append(${value})\n`;
};

Blockly.Blocks['array_insert'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("insert into")
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR")
        .appendField("at index");
    this.appendValueInput("INDEX")
        .setCheck("Number");
    this.appendValueInput("VALUE")
        .appendField("value")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);  
    this.setColour(230);
    this.setTooltip("Insert a value at a specific index in an array.");
  }
};

pythonGenerator.forBlock['array_insert'] = function(block) {
  const arrayName = pythonGenerator.getVariableName(block.getFieldValue("VAR"));
  const index = pythonGenerator.valueToCode(block, 'INDEX', pythonGenerator.ORDER_ATOMIC) || '0';
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  return `${arrayName}.insert(${index}, ${value})\n`;
};

