Blockly.Blocks['SEG7_start'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Start 7-Segment Display");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Start 7-segment display multiplexing");
  }
};

Blockly.Blocks['SEG7_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stop 7-Segment Display");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Stop 7-segment display multiplexing");
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
    this.appendValueInput('VALUE')
        .setCheck('Number')
        .appendField("Update 7-Segment Display (Value");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["Digit 1", "1"],
          ["Digit 2", "2"],
          ["Digit 3", "3"],
          ["Digit 4", "4"]
        ]), "LED")
        .appendField("Digit)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Update digit value (0-9)");
  }
};

Blockly.Blocks['SEG7_dot'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set 7-Segment Display Dot")
        .appendField(new Blockly.FieldDropdown([
          ["Digit 1", "1"],
          ["Digit 2", "2"],
          ["Digit 3", "3"],
          ["Digit 4", "4"]
        ]), "LED")
        .appendField(new Blockly.FieldDropdown([
          ["ON", "1"],
          ["OFF", "0"]
        ]), "MODE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Set decimal point state");
  }
};

pythonGenerator.forBlock['SEG7_start'] = function(block) {
  return `SEG7.start()\n`;
};

pythonGenerator.forBlock['SEG7_stop'] = function(block) {
  return `SEG7.stop()\n`;
};

pythonGenerator.forBlock['SEG7_clear'] = function(block) {
  return `SEG7.clear()\n`;
};

pythonGenerator.forBlock['SEG7_update'] = function(block) {
  var value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_ATOMIC) || '0';
  var led = block.getFieldValue('LED');
  return `SEG7.update(${value}, ${led})\n`;
};

pythonGenerator.forBlock['SEG7_dot'] = function(block) {
  var led = block.getFieldValue('LED');
  var mode = block.getFieldValue('MODE');
  return `SEG7.dot_update(${led}, ${mode})\n`;
}; 