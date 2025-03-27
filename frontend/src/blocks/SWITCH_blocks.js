import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Add import SWITCH to definitions
pythonGenerator.definitions_['import_SWITCH'] = 'import SWITCH';

Blockly.Blocks['SWITCH_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read Switch")
        .appendField(new Blockly.FieldDropdown([
          ["Switch 1", "1"],
          ["Switch 2", "2"]
        ]), "SWITCH");
    this.setOutput(true, "Boolean");
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Read switch state (0 or 1)");
  }
};

pythonGenerator.forBlock['SWITCH_read'] = function(block) {
  var switch_num = block.getFieldValue('SWITCH');
  return [`SWITCH.read_switch(${switch_num})`, pythonGenerator.ORDER_FUNCTION_CALL];
}; 