Blockly.Blocks['SERVO_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Start Servo");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Start servo motor");
  }
};

Blockly.Blocks['SERVO_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop Servo");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Stop servo motor");
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

pythonGenerator.forBlock['SERVO_start'] = function(block) {
  return `SERVO.start()\n`;
};

pythonGenerator.forBlock['SERVO_stop'] = function(block) {
  return `SERVO.stop()\n`;
};

pythonGenerator.forBlock['SERVO_angle'] = function(block) {
  var angle = pythonGenerator.valueToCode(block, 'ANGLE', pythonGenerator.ORDER_ATOMIC) || '0';
  return `SERVO.angle(${angle})\n`;
}; 