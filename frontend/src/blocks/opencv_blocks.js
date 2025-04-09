import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['opencv_imshow'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('show image')
        .appendField(new Blockly.FieldVariable('image'), 'IMAGE');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Show an image');
  }
};

pythonGenerator.forBlock['opencv_imshow'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  const image = pythonGenerator.getVariableName(block.getFieldValue('IMAGE'));
  return `cv2.imshow('Image', ${image})\n`;
};

Blockly.Blocks['opencv_imread'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('read image from file')
        .appendField(new Blockly.FieldTextInput('image.jpg'), 'IMAGE');
    this.setOutput(true, null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
    this.setTooltip('Read an image');
  }
};

pythonGenerator.forBlock['opencv_imread'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  const image = block.getFieldValue('IMAGE');
  return [`cv2.imread('${image}')`, pythonGenerator.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['opencv_imwrite'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('save image')
        .appendField(new Blockly.FieldVariable('image'), 'IMAGE')
        .appendField('as file')
        .appendField(new Blockly.FieldTextInput('image.jpg'), 'FILENAME');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Save an image');
  }
};

pythonGenerator.forBlock['opencv_imwrite'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  const image = pythonGenerator.getVariableName(block.getFieldValue('IMAGE'));
  const filename = block.getFieldValue('FILENAME');
  return `cv2.imwrite('${filename}', ${image})\n`;
};

Blockly.Blocks['opencv_rotate'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('rotate image')
        .appendField(new Blockly.FieldVariable('image'), 'IMAGE')
        .appendField('by')
        .appendField(new Blockly.FieldDropdown([
          ['90°', 'cv2.ROTATE_90_CLOCKWISE'],
          ['180°', 'cv2.ROTATE_180'],
          ['270°', 'cv2.ROTATE_90_COUNTERCLOCKWISE']
        ]), 'ANGLE');
    this.setOutput(true, null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
    this.setTooltip('Rotate an image');
  }
};

pythonGenerator.forBlock['opencv_rotate'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  const image = pythonGenerator.getVariableName(block.getFieldValue('IMAGE'));
  const angle = block.getFieldValue('ANGLE');
  return [`cv2.rotate(${image}, ${angle})`, pythonGenerator.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['opencv_flip'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('flip image')
        .appendField(new Blockly.FieldVariable('image'), 'IMAGE')
        .appendField('horizontally')
        .appendField(new Blockly.FieldDropdown([
          ['Horizontally', '0'],
          ['Vertically', '1']
        ]), 'DIRECTION');
    this.setOutput(true, null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
    this.setTooltip('Flip an image');
  }
};

pythonGenerator.forBlock['opencv_flip'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  const image = pythonGenerator.getVariableName(block.getFieldValue('IMAGE'));
  const direction = block.getFieldValue('DIRECTION');
  return [`cv2.flip(${image}, ${direction})`, pythonGenerator.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['opencv_getRotationMatrix2D'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('get rotation matrix')
        .appendField('for rotation')
        .appendField(new Blockly.FieldTextInput('90'), 'ANGLE')
        .appendField('and center at x:')
        .appendField(new Blockly.FieldTextInput('0'), 'X')
        .appendField('y:')
        .appendField(new Blockly.FieldTextInput('0'), 'Y');
    this.setOutput(true, null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
    this.setTooltip('Get a rotation matrix');
  }
};

pythonGenerator.forBlock['opencv_getRotationMatrix2D'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  const angle = block.getFieldValue('ANGLE');
  const x = block.getFieldValue('X');
  const y = block.getFieldValue('Y');
  return [`cv2.getRotationMatrix2D((${x}, ${y}), ${angle}, 1 )`, pythonGenerator.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['opencv_waitKey'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('wait for')
        .appendField(new Blockly.FieldTextInput('1'), 'DELAY')
        .appendField('milliseconds')
        .appendField('or key press')
    this.setOutput(true, null);
    this.setPreviousStatement(false, null);
    this.setNextStatement(false, null);
    this.setColour(230);
    this.setTooltip('Wait for a key press or a delay by miliseconds');
  }
};

pythonGenerator.forBlock['opencv_waitKey'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  const delay = block.getFieldValue('DELAY');
  return [`cv2.waitKey(${delay}) != -1`, pythonGenerator.ORDER_FUNCTION_CALL];
};

Blockly.Blocks['opencv_destroyAllWindows'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('destroy all windows')
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('Destroy all windows');
  }
};

pythonGenerator.forBlock['opencv_destroyAllWindows'] = function(block) {
  pythonGenerator.definitions_['cv2'] = 'import cv2';
  return `cv2.destroyAllWindows()\n`;
}



