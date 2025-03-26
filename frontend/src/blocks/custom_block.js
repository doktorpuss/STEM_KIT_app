import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Define time blocks
const customBlocks = {
  'cuss1': {
    init: function() {
      this.appendValueInput('SECONDS')
          .setCheck('Number')
          .appendField('sleep for')
          .appendField('seconds');
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
      this.setTooltip('Pause execution for specified number of seconds');
    }
  },
  'cuss2': {
    init: function() {
      this.appendDummyInput()
          .appendField('current time');
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('Get current time in seconds since epoch');
    }
  }
};

// Register blocks
Object.keys(customBlocks).forEach(blockType => {
  Blockly.Blocks[blockType] = customBlocks[blockType];
});

// Register Python generators
pythonGenerator['cuss1'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_custom'] = 'import custom';
  
  const seconds = pythonGenerator.valueToCode(block, 'SECONDS', pythonGenerator.ORDER_ATOMIC) || '0';
  return `cuss1(${seconds})\n`;
};

pythonGenerator['cuss2'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_custom'] = 'import custom';
  
  return ['cuss2()', pythonGenerator.ORDER_FUNCTION_CALL];
}; 