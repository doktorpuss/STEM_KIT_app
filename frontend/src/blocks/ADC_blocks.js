import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Define time blocks
const Potentiometer_blocks = {
  'Potentiometer_read': {
    init: function() {
      const input = this.appendDummyInput();
      input.appendField('Read Potentiometer');
      input.appendField(new Blockly.FieldDropdown([
        ['1', '0'],
        ['2', '1'],
        ['3', '2'],
      ]), 'Pot_ID')
      this.setOutput(true, 'Number');
      this.setColour(230);
      this.setTooltip('Read potentiometer value');
    }
  }
};

// Register blocks
Object.keys(Potentiometer_blocks).forEach(blockType => {
  Blockly.Blocks[blockType] = Potentiometer_blocks[blockType];
});

// Register Python generators
pythonGenerator.forBlock['Potentiometer_read'] = function(block) {
  // Add import ADC to definitions
  pythonGenerator.definitions_['import_ADC'] = 'import ADC';
  
  const Pot_ID = block.getFieldValue('Pot_ID') || '0';
  return [`ADC.read(${Pot_ID})`, pythonGenerator.ORDER_FUNCTION_CALL];
};