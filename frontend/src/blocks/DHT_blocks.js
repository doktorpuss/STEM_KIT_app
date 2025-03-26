Blockly.Blocks['DHT_temperature'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read Temperature");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg['MATH_HUE']);
    this.setTooltip("Read temperature from DHT sensor");
  }
};

Blockly.Blocks['DHT_humidity'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Read Humidity");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Msg['MATH_HUE']);
    this.setTooltip("Read humidity from DHT sensor");
  }
};

pythonGenerator.forBlock['DHT_temperature'] = function(block) {
  return [`DHT.temperature()`, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['DHT_humidity'] = function(block) {
  return [`DHT.humidity()`, pythonGenerator.ORDER_FUNCTION_CALL];
}; 