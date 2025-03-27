import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['FAN'] = {
  init: function() {
    const input = this.appendDummyInput();
    input.appendField(new Blockly.FieldDropdown([
      ['Fan On', 'on'],
      ['Fan Off', 'off']
    ]), 'FAN_STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Control fan");
  }
};

pythonGenerator.forBlock['FAN'] = function(block) {
  // Add import FAN to definitions
  pythonGenerator.definitions_['import_FAN'] = 'import FAN';
  const state = block.getFieldValue('FAN_STATE');
  if (state === 'on') {
    return `FAN.on()\n`;
  } else if (state === 'off') {
    return `FAN.off()\n`;
  }
};

