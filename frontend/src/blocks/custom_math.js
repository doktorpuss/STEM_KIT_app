import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['convert_int'] = {
  init: function() {
      this.appendValueInput('VALUE')
          .appendField('convert');
      this.appendDummyInput()
          .appendField('to integer');
      this.setOutput(true, 'Number');
      this.setPreviousStatement(false, null);
      this.setNextStatement(false, null);
      this.setColour(230);
      this.setTooltip('Pause execution for specified number of seconds');
    }
};

pythonGenerator ['convert_int'] = function(block) {
  var value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  return [`int(${value})`, pythonGenerator.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['convert_float'] = {
  init: function() {
      this.appendValueInput('VALUE')
          .appendField('convert');
      this.appendDummyInput()
          .appendField('to float');
      this.setOutput(true, 'Number');
      this.setPreviousStatement(false, null);
      this.setNextStatement(false, null);
      this.setColour(230);
      this.setTooltip('Pause execution for specified number of seconds');
    }
};

pythonGenerator ['convert_float'] = function(block) {
  var value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  return [`float(${value})`, pythonGenerator.ORDER_FUNCTION_CALL];
};