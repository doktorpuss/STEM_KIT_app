import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Add import BUZZER to definitions
pythonGenerator.definitions_['import_BUZZER'] = 'import BUZZER';

Blockly.Blocks['BUZZER_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn On Buzzer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Turn on buzzer");
  }
};

Blockly.Blocks['BUZZER_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn Off Buzzer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Turn off buzzer");
  }
};

pythonGenerator.forBlock['BUZZER_on'] = function(block) {
  return `BUZZER.on()\n`;
};

pythonGenerator.forBlock['BUZZER_off'] = function(block) {
  return `BUZZER.off()\n`;
}; 
