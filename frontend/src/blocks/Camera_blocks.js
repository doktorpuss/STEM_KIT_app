import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['camera_start'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('start camera')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('Start the camera');
    }
};

pythonGenerator.forBlock['camera_start'] = function(block) {
    pythonGenerator.definitions_['picamera2'] = 'from picamera2 import Picamera2';
    return 'picam2 = Picamera2()\npicam2.configure(picam2.create_preview_configuration())\npicam2.start()\n';
}

Blockly.Blocks['camera_stop'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('stop camera')
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(230);
        this.setTooltip('Stop the camera');
    }
};

pythonGenerator.forBlock['camera_stop'] = function(block) {
    pythonGenerator.definitions_['picamera2'] = 'from picamera2 import Picamera2';
    return 'picam2.stop()\n';
}

Blockly.Blocks['camera_capture'] = {
    init: function() {
        this.appendDummyInput()
            .appendField('capture image from camera')
        this.setOutput(true, null);
        this.setColour(230);
        this.setTooltip('Capture an image from the camera');
    }
};

pythonGenerator.forBlock['camera_capture'] = function(block) {
    pythonGenerator.definitions_['picamera2'] = 'from picamera2 import Picamera2';
    return ['picam2.capture_array()', pythonGenerator.ORDER_FUNCTION_CALL];
}