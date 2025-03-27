import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Define time blocks
const timeBlocks = {
  'time_sleep': {
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
  'time_time': {
    init: function() {
      this.appendDummyInput()
          .appendField('current time');
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('Get current time in seconds since epoch');
    }
  },
  'time_perf_counter': {
    init: function() {
      this.appendDummyInput()
          .appendField('performance counter');
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('high-resolution performance counter');
    }
  },
  'time_process_time': {
    init: function() {
      this.appendDummyInput()
          .appendField('process time');
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('process time');
    }
  }
};

// Register blocks
Object.keys(timeBlocks).forEach(blockType => {
  Blockly.Blocks[blockType] = timeBlocks[blockType];
});

// Register Python generators
pythonGenerator['time_sleep'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_time'] = 'import time';
  
  const seconds = pythonGenerator.valueToCode(block, 'SECONDS', pythonGenerator.ORDER_ATOMIC) || '0';
  return `time.sleep(${seconds})\n`;
};

pythonGenerator['time_time'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_time'] = 'import time';
  
  return ['time.time()', pythonGenerator.ORDER_FUNCTION_CALL];
}; 

pythonGenerator['time_perf_counter'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_time'] = 'import time';
  
  return ['time.perf_counter()', pythonGenerator.ORDER_FUNCTION_CALL];
}; 

pythonGenerator['time_process_time'] = function(block) {
  // Add import time to definitions
  pythonGenerator.definitions_['import_time'] = 'import time';
  
  return ['time.process_time()', pythonGenerator.ORDER_FUNCTION_CALL];
};