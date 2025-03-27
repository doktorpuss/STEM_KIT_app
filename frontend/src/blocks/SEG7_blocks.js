import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['SEG7_ss'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('7 Segment Display')
    const input = this.appendDummyInput()
    input.appendField(new Blockly.FieldDropdown([
      ['START','START'],
      ['STOP','STOP']
    ]),'STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Start/Stop 7-segment display");
  }
};

Blockly.Blocks['SEG7_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Clear 7-Segment Display");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Clear all segments");
  }
};

Blockly.Blocks['SEG7_update'] = {
  init: function() {
    this.appendValueInput('LED')
        .setCheck('Number')
        .appendField("Digit");
    this.appendValueInput('LED')
        .setCheck('Number')
        .appendField("play number");
    this.appendDummyInput()
        .appendField(")");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Play number (0-9) on digit (1-4)");
  }
};

Blockly.Blocks['SEG7_dot'] = {
  init: function() {
    this.appendValueInput('LED')
        .setCheck('Number')
        .appendField("Dot on digit")
    this.appendValueInput('MODE')
        .setCheck('Number')
        .appendField("state:");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Set dot state");
  }
};

pythonGenerator.forBlock['SEG7_ss'] = function(block) {
  // Add import SEG7 to definitions
  pythonGenerator.definitions_['import_SEG7'] = 'import SEG7';

  var value = block.getFieldValue('STATE');
  if (value === 'START') {
    return `SEG7.start()\n`;
  } else if (value === 'STOP') {
    return `SEG7.stop()\n`;
  }
};



pythonGenerator.forBlock['SEG7_clear'] = function(block) {
  // Add import SEG7 to definitions
  pythonGenerator.definitions_['import_SEG7'] = 'import SEG7';
  return `SEG7.clear()\n`;
};

pythonGenerator.forBlock['SEG7_update'] = function(block) {
  // Add import SEG7 to definitions
  pythonGenerator.definitions_['import_SEG7'] = 'import SEG7';
  var value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  var led = block.getFieldValue('LED');
  return `SEG7.update(${value}, ${led})\n`;
};

pythonGenerator.forBlock['SEG7_dot'] = function(block) {
  // Add import SEG7 to definitions
  pythonGenerator.definitions_['import_SEG7'] = 'import SEG7';
  var led = block.getFieldValue('LED');
  var mode = block.getFieldValue('MODE');
  return `SEG7.dot_update(${led}, ${mode})\n`;
}; 