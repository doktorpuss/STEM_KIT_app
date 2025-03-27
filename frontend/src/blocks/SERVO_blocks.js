import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';


Blockly.Blocks['SERVO'] = {
  init: function() {
    const input = this.appendDummyInput();
    input.appendField(new Blockly.FieldDropdown([
      ['Servo Start', 'start'],
      ['Servo Stop', 'stop']
    ]), 'SERVO_STATE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Control servo motor");
  }
};


Blockly.Blocks['SERVO_angle'] = {
  init: function() {
    this.appendValueInput('ANGLE')
        .setCheck('Number')
        .appendField("Set Servo Angle");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Set servo angle (0-180 degrees)");
  }
};

pythonGenerator.forBlock['SERVO'] = function(block) {
  // Add import SERVO to definitions
  pythonGenerator.definitions_['import_SERVO'] = 'import SERVO';
  const state = block.getFieldValue('SERVO_STATE');
  if (state === 'start') {
    return `SERVO.start()\n`;
  } else if (state === 'stop') {
    return `SERVO.stop()\n`;
  }
};



pythonGenerator.forBlock['SERVO_angle'] = function(block) {
  // Add import SERVO to definitions
  pythonGenerator.definitions_['import_SERVO'] = 'import SERVO';
  var angle = pythonGenerator.valueToCode(block, 'ANGLE', pythonGenerator.ORDER_ATOMIC) || '0';
  return `SERVO.angle(${angle})\n`;
}; 