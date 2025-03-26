import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Define time blocks
const LEDs_blocks = {
  'LEDs_update': {
    init: function() {
      const input = this.appendDummyInput();
      input.appendField(new Blockly.FieldDropdown([
        ['LED 1', '0'],
        ['LED 2', '1'],
        ['LED 3', '2'],
        ['LED 4', '3'],
        ['LED 5', '4'],
        ['LED 6', '5'],
        ['LED 7', '6'],
        ['LED 8', '7']
      ]), 'LED_ID');
      input.appendField('state');
      input.appendField(new Blockly.FieldDropdown([
        ['ON', 'True'],
        ['OFF', 'False']
      ]), 'state');
      
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Update LED state');
    }
  },
  'LEDs_clear': {
    init: function() {
      this.appendDummyInput()
          .appendField('clear all LEDs');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Clear all LEDs');
    }
  }
};

// Register blocks
Object.keys(LEDs_blocks).forEach(blockType => {
  Blockly.Blocks[blockType] = LEDs_blocks[blockType];
});

// Register Python generators
pythonGenerator['LEDs_update'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_LEDs'] = 'import LEDs';
  
  const led_id = block.getFieldValue('LED_ID');
  const state = block.getFieldValue('state');
  return `LEDs.update(${led_id},${state})\n`;
};

pythonGenerator['LEDs_clear'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_LEDs'] = 'import LEDs';
  
  return `LEDs.clear()\n`;
}; 