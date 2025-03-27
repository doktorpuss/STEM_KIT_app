import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';


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
  // Add import DHT to definitions
  pythonGenerator.definitions_['import_DHT'] = 'import DHT';
  return [`DHT.temperature()`, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['DHT_humidity'] = function(block) {
  // Add import DHT to definitions
  pythonGenerator.definitions_['import_DHT'] = 'import DHT';
  return [`DHT.humidity()`, pythonGenerator.ORDER_FUNCTION_CALL];
}; 