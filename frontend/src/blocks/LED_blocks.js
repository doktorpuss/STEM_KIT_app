import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Define LED blocks
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
  'LEDs_update_by_number': {
    init: function() {
      this.appendValueInput('LED_NUMBER')
          .setCheck('Number')
          .appendField('LED');
      this.appendValueInput('state')
          .setCheck('Boolean')
          .appendField('state');
      this.setInputsInline(true);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Update LED state by number');
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

// Register Python generators using the new forBlock API
pythonGenerator.forBlock['LEDs_update'] = function(block) {
  // Add import LEDs to definitions
  pythonGenerator.definitions_['import_LEDs'] = 'import LEDs';
  
  const led_id = block.getFieldValue('LED_ID');
  const state = block.getFieldValue('state');
  return `LEDs.update(${led_id},${state})\n`;
};

pythonGenerator.forBlock['LEDs_update_by_number'] = function(block) {
  // Add import LEDs to definitions
  pythonGenerator.definitions_['import_LEDs'] = 'import LEDs';
  
  const led_number = pythonGenerator.valueToCode(block, 'LED_NUMBER', pythonGenerator.ORDER_ATOMIC) || '0';
  const state = pythonGenerator.valueToCode(block, 'state', pythonGenerator.ORDER_ATOMIC) || 'False';
  return `LEDs.update(${led_number},${state})\n`;
};

pythonGenerator.forBlock['LEDs_clear'] = function(block) {
  // Add import LEDs to definitions
  pythonGenerator.definitions_['import_LEDs'] = 'import LEDs';
  
  return `LEDs.clear()\n`;
}; 