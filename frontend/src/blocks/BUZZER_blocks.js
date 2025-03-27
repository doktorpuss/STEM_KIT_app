import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';


Blockly.Blocks['BUZZER'] = {
  init: function() {
    const input = this.appendDummyInput();
    input.appendField(new Blockly.FieldDropdown([
      ['Buzzer On', 'on'],
      ['Buzzer Off', 'off']
    ]), 'BUZZER_STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Control buzzer");
  }
};

pythonGenerator.forBlock['BUZZER'] = function(block) {  
  // Add import BUZZER to definitions
  pythonGenerator.definitions_['import_BUZZER'] = 'import BUZZER';
  const state = block.getFieldValue('BUZZER_STATE');
  if (state === 'on') {
    return `BUZZER.on()\n`;
  } else if (state === 'off') {
    return `BUZZER.off()\n`;
  }
};
