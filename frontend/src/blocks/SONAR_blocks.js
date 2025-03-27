import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';


Blockly.Blocks['SONAR_distance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read Sonar Distance");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg['MATH_HUE']);
    this.setTooltip("Read distance from sonar sensor (in cm)");
  }
};

pythonGenerator.forBlock['SONAR_distance'] = function(block) {
  // Add import SONAR to definitions
  pythonGenerator.definitions_['import_SONAR'] = 'import SONAR';
  return [`SONAR.distance()`, pythonGenerator.ORDER_FUNCTION_CALL];
}; 