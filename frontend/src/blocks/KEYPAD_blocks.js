import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';


Blockly.Blocks['KEYPAD_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Start Keypad");
    this.appendValueInput('END_CHAR')
        .setCheck('String')
        .appendField("End Character (optional)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Start keypad reading");
  }
};

Blockly.Blocks['KEYPAD_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop Keypad");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Stop keypad reading");
  }
};

Blockly.Blocks['KEYPAD_available'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Keypad Data Available");
    this.setOutput(true, "Boolean");
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Check if keypad data is available");
  }
};

Blockly.Blocks['KEYPAD_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read Keypad Data");
    this.setOutput(true, "String");
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Read data from keypad buffer");
  }
};

pythonGenerator.forBlock['KEYPAD_start'] = function(block) {
  // Add import KEYPAD to definitions
  pythonGenerator.definitions_['import_KEYPAD'] = 'import KEYPAD';
  var end_char = pythonGenerator.valueToCode(block, 'END_CHAR', pythonGenerator.ORDER_ATOMIC) || "''";
  return `KEYPAD.start(${end_char})\n`;
};

pythonGenerator.forBlock['KEYPAD_stop'] = function(block) {
  // Add import KEYPAD to definitions
  pythonGenerator.definitions_['import_KEYPAD'] = 'import KEYPAD';
  return `KEYPAD.stop()\n`;
};

pythonGenerator.forBlock['KEYPAD_available'] = function(block) {
  // Add import KEYPAD to definitions
  pythonGenerator.definitions_['import_KEYPAD'] = 'import KEYPAD';
  return [`KEYPAD.available()`, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['KEYPAD_read'] = function(block) {
  // Add import KEYPAD to definitions
  pythonGenerator.definitions_['import_KEYPAD'] = 'import KEYPAD';
  return [`KEYPAD.readBuffer()`, pythonGenerator.ORDER_FUNCTION_CALL];
}; 