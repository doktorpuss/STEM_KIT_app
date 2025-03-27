import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Add import FAN to definitions
pythonGenerator.definitions_['import_FAN'] = 'import FAN';

Blockly.Blocks['FAN_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn On Fan");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Turn on fan");
  }
};

Blockly.Blocks['FAN_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn Off Fan");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Turn off fan");
  }
};

pythonGenerator.forBlock['FAN_on'] = function(block) {
  return `FAN.on()\n`;
};

pythonGenerator.forBlock['FAN_off'] = function(block) {
  return `FAN.off()\n`;
}; 