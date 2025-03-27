import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Add import BUTTON to definitions
pythonGenerator.definitions_['import_BUTTON'] = 'import BUTTON';

Blockly.Blocks['BUTTON_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read Button")
        .appendField(new Blockly.FieldDropdown([
          ["Button 1", "1"],
          ["Button 2", "2"],
          ["Button 3", "3"],
          ["Button 4", "4"]
        ]), "BUTTON");
    this.setOutput(true, "Boolean");
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Read button state (0 or 1)");
  }
};

pythonGenerator.forBlock['BUTTON_read'] = function(block) {
  var button = block.getFieldValue('BUTTON');
  return [`BUTTON.read_button(${button})`, pythonGenerator.ORDER_FUNCTION_CALL];
}; 