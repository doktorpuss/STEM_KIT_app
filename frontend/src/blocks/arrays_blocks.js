import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['array'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("1, 2, 3"), "VALUES") // Nhập từ bàn phím
        .appendField("]");
    this.setOutput(true, "Array");
    this.setColour(230); // Màu tím
    this.setTooltip("Enter values separated by commas to create an array.");
  }
};
// Python Generator
pythonGenerator.forBlock['array'] = function(block) {
  const values = block.getFieldValue('VALUES').split(',').map(v => v.trim()); // Tách từng phần tử
  return [`[${values.join(', ')}]`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['get_value_by_index'] = {
  init: function() {
    this.appendValueInput("ARRAY")
        .setCheck("Array");
    this.appendDummyInput()
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("0"), "INDEX");
    this.appendDummyInput()
        .appendField("]");
    this.setOutput(true, "Number");
    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip("Get a value from an array by index.");
  }
};

pythonGenerator.forBlock['get_value_by_index'] = function(block) {
  const arrayName = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_ATOMIC) || 'a';
  const index = block.getFieldValue('INDEX');
  return [`${arrayName}[${index}]`, pythonGenerator.ORDER_ATOMIC];
};

Blockly.Blocks['set_value_by_index'] = {
  init: function() {
    this.appendValueInput("ARRAY")
        .appendField("set")
        .setCheck("Array");
    this.appendDummyInput()
        .appendField("[")
        .appendField(new Blockly.FieldTextInput("0"), "INDEX");
    this.appendDummyInput()
        .appendField("]=");
    this.appendValueInput("VALUE")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Set a value in an array by index.");
  }
};

pythonGenerator.forBlock['set_value_by_index'] = function(block) {
  const arrayName = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_ATOMIC) || 'arr'; 
  const index = block.getFieldValue('INDEX');
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  return `${arrayName}[${index}] = ${value}\n`;
};

Blockly.Blocks['get_length'] = {
  init: function() {
    this.appendValueInput("ARRAY")
        .appendField("length of")
        .setCheck("Array");
    this.setOutput(true, "Number");
    this.setInputsInline(true);
    this.setColour(230);
    this.setTooltip("Get the length of an array."); 
  }
};

pythonGenerator.forBlock['get_length'] = function(block) {
  const arrayName = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_ATOMIC) || 'arr';
  return [`len(${arrayName})`, pythonGenerator.ORDER_ATOMIC];
};  

Blockly.Blocks['array_append'] = {
  init: function() {
    this.appendValueInput("ARRAY")
        .appendField("append")
        .setCheck("Array"); 
    this.appendValueInput("VALUE")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip("Append a value to an array.");
  }
};

pythonGenerator.forBlock['array_append'] = function(block) {
  const arrayName = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_ATOMIC) || 'arr';
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  return `${arrayName}.append(${value})\n`;
};

Blockly.Blocks['array_insert'] = {
  init: function() {
    this.appendValueInput("ARRAY")
        .appendField("insert")
        .setCheck("Array");
    this.appendValueInput("INDEX")
        .setCheck("Number");
    this.appendValueInput("VALUE")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);  
    this.setColour(230);
    this.setTooltip("Insert a value at a specific index in an array.");
  }
};

pythonGenerator.forBlock['array_insert'] = function(block) {
  const arrayName = pythonGenerator.valueToCode(block, 'ARRAY', pythonGenerator.ORDER_ATOMIC) || 'arr';
  const index = pythonGenerator.valueToCode(block, 'INDEX', pythonGenerator.ORDER_ATOMIC) || '0';
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  return `${arrayName}.insert(${index}, ${value})\n`;
};

