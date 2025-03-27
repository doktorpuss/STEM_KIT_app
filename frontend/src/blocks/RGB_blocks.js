import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['RGB_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Start RGB LED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Start RGB LED");
  }
};

Blockly.Blocks['RGB_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop RGB LED");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Stop RGB LED");
  }
};

Blockly.Blocks['RGB_color'] = {
  init: function() {
    this.appendValueInput('RED')
        .setCheck('Number')
        .appendField("Set RGB Color (R");
    this.appendValueInput('GREEN')
        .setCheck('Number')
        .appendField("G");
    this.appendValueInput('BLUE')
        .setCheck('Number')
        .appendField("B");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Set RGB color (0-255 for each component)");
  }
};

pythonGenerator.forBlock['RGB_start'] = function(block) {

  // Add import RGB to definitions
  pythonGenerator.definitions_['import_RGB'] = 'import RGB';
  return `RGB.start()\n`;
};

pythonGenerator.forBlock['RGB_stop'] = function(block) {
  // Add import RGB to definitions
  pythonGenerator.definitions_['import_RGB'] = 'import RGB';
  return `RGB.stop()\n`;
};

pythonGenerator.forBlock['RGB_color'] = function(block) {
  // Add import RGB to definitions
  pythonGenerator.definitions_['import_RGB'] = 'import RGB';
  var red = pythonGenerator.valueToCode(block, 'RED', pythonGenerator.ORDER_ATOMIC) || '0';
  var green = pythonGenerator.valueToCode(block, 'GREEN', pythonGenerator.ORDER_ATOMIC) || '0';
  var blue = pythonGenerator.valueToCode(block, 'BLUE', pythonGenerator.ORDER_ATOMIC) || '0';
  return `RGB.color(${red}, ${green}, ${blue})\n`;
}; 