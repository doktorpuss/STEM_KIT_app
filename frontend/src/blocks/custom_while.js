import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['custom_while'] = {
  init: function() {
    this.appendValueInput('CONDITION')
        .setCheck('Boolean')
        .appendField('while');
    this.appendStatementInput('DO')
        .appendField('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('While a condition is true, do some statements');
  }
};

pythonGenerator.forBlock['custom_while'] = function(block) {
  var condition = pythonGenerator.valueToCode(block, 'CONDITION',
      pythonGenerator.ORDER_NONE) || 'True';
  var branch = pythonGenerator.statementToCode(block, 'DO') || 
      pythonGenerator.PASS;
  return 'while ' + condition + ':\n' + branch;
}; 

Blockly.Blocks['loop_break'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('break loop');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('Break out of the current loop');
  }
};

pythonGenerator.forBlock['loop_break'] = function(block) {
  return 'break\n';
}
