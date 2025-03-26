Blockly.Blocks['LCD_begin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Initialize LCD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Initialize LCD display");
  }
};

Blockly.Blocks['LCD_clear'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Clear LCD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Clear LCD display");
  }
};

Blockly.Blocks['LCD_backlight'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Set LCD Backlight")
        .appendField(new Blockly.FieldDropdown([
          ["ON", "1"],
          ["OFF", "0"]
        ]), "STATE");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Turn LCD backlight on/off");
  }
};

Blockly.Blocks['LCD_setCursor'] = {
  init: function() {
    this.appendValueInput('COL')
        .setCheck('Number')
        .appendField("Set LCD Cursor (Column");
    this.appendValueInput('ROW')
        .setCheck('Number')
        .appendField("Row)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Set LCD cursor position (column: 0-15, row: 0-1)");
  }
};

Blockly.Blocks['LCD_print'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField("Print on LCD");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.Msg['LOGIC_HUE']);
    this.setTooltip("Print text on LCD");
  }
};

pythonGenerator.forBlock['LCD_begin'] = function(block) {
  return `LCD.begin()\n`;
};

pythonGenerator.forBlock['LCD_clear'] = function(block) {
  return `LCD.clear()\n`;
};

pythonGenerator.forBlock['LCD_backlight'] = function(block) {
  var state = block.getFieldValue('STATE');
  return state === "1" ? `LCD.backlight()\n` : `LCD.noBacklight()\n`;
};

pythonGenerator.forBlock['LCD_setCursor'] = function(block) {
  var col = pythonGenerator.valueToCode(block, 'COL', pythonGenerator.ORDER_ATOMIC) || '0';
  var row = pythonGenerator.valueToCode(block, 'ROW', pythonGenerator.ORDER_ATOMIC) || '0';
  return `LCD.setCursor(${col}, ${row})\n`;
};

pythonGenerator.forBlock['LCD_print'] = function(block) {
  var text = pythonGenerator.valueToCode(block, 'TEXT', pythonGenerator.ORDER_ATOMIC) || "''";
  return `LCD.print(${text})\n`;
}; 