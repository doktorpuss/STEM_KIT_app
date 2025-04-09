import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

Blockly.Blocks['numpy_array'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Array with elements:[")
            .appendField(new Blockly.FieldTextInput("[1,2,3],[4,5,6]"), "VALUES")
            .appendField("]")
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("make a numpy array with the given elements");
    }
}

pythonGenerator.forBlock['numpy_array'] = function(block) {
    pythonGenerator.definitions_['import numpy as np'] = 'import numpy as np';
    const values = block.getFieldValue('VALUES');
    const code = [`np.array([${values}])`, pythonGenerator.ORDER_FUNCTION_CALL];
    return code;
}

Blockly.Blocks['numpy_linspace'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("make an array start from ")
            .appendField(new Blockly.FieldTextInput('0'), "START")
            .appendField("to ")
            .appendField(new Blockly.FieldTextInput('1'), "END")
            .appendField("with ")
            .appendField(new Blockly.FieldTextInput('10'), "NUM_POINTS")
            .appendField("elements")
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("make a numpy array with the given range");
    }
}

pythonGenerator.forBlock['numpy_linspace'] = function(block) {
    pythonGenerator.definitions_['import numpy as np'] = 'import numpy as np';
    const start = block.getFieldValue('START');
    const end = block.getFieldValue('END');
    const num_points = block.getFieldValue('NUM_POINTS');
    const code = [`np.linspace(${start}, ${end}, ${num_points})`, pythonGenerator.ORDER_FUNCTION_CALL];
    return code;
}

Blockly.Blocks['numpy_arange'] ={
    init: function() {
        this.appendDummyInput()
            .appendField("make an array from ")
            .appendField(new Blockly.FieldTextInput("0"), "START")
            .appendField("to ")
            .appendField(new Blockly.FieldTextInput("10"), "END")
            .appendField("with step:")
            .appendField(new Blockly.FieldTextInput("1"), "STEP")
            .appendField("elements")
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("make a numpy array with the given range");
    }
}

pythonGenerator.forBlock['numpy_arange'] = function(block) {
    pythonGenerator.definitions_['import numpy as np'] = 'import numpy as np';
    const start = block.getFieldValue('START');
    const end = block.getFieldValue('END');
    const step = block.getFieldValue('STEP');
    const code = [`np.arange(${start}, ${end}, ${step})`, pythonGenerator.ORDER_FUNCTION_CALL];
    return code;
}

Blockly.Blocks['numpy_eye'] = {
    init: function() {
        this.appendValueInput("RANK")
            .appendField("make an identity square matrix rank: ")
            .setCheck("Number");
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("make an identity matrix with the given size");
    }
}

pythonGenerator.forBlock['numpy_eye'] = function(block) {
    pythonGenerator.definitions_['import numpy as np'] = 'import numpy as np';
    const rank = block.getFieldValue('RANK');
    const code = [`np.eye(${rank})`, pythonGenerator.ORDER_FUNCTION_CALL];
    return code;
}
Blockly.Blocks['numpy_zeros'] = {
    init: function() {
        this.appendValueInput("ROWS")
            .appendField("make an zero matrix with ")
            .setCheck("Number");
        this.appendValueInput("COLUMNS")
            .appendField("rows and")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("columns")
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("make an zero matrix with the given size");
    }
}

pythonGenerator.forBlock['numpy_zeros'] = function(block) {
    pythonGenerator.definitions_['import numpy as np'] = 'import numpy as np';
    const rows = block.getFieldValue('ROWS');
    const columns = block.getFieldValue('COLUMNS');
    const code = [`np.zeros(${rows}, ${columns})`, pythonGenerator.ORDER_FUNCTION_CALL];
    return code;
}

Blockly.Blocks['numpy_ones'] = {
    init: function() {
        this.appendValueInput("ROWS")
            .appendField("make an one matrix with ")
            .setCheck("Number");
        this.appendValueInput("COLUMNS")
            .appendField("rows and")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField("columns")
        this.setOutput(true, "Array");
        this.setColour(230);
        this.setTooltip("make an one matrix with the given size");
    }
}

pythonGenerator.forBlock['numpy_ones'] = function(block) {
    pythonGenerator.definitions_['import numpy as np'] = 'import numpy as np';
    const rows = block.getFieldValue('ROWS');
    const columns = block.getFieldValue('COLUMNS');
    const code = [`np.ones(${rows}, ${columns})`, pythonGenerator.ORDER_FUNCTION_CALL];
    return code;
}

Blockly.Blocks['numpy_math_functions1'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['abs', 'abs'], 
                ['sqrt', 'sqrt'],
                ['exp', 'exp'],
                ['log10', 'log10'],
                ['log', 'log'],
                ['log2', 'log2'],
                ['sign', 'sign'],
                ['round', 'round'],
                ['ceil', 'ceil'],
                ['floor', 'floor']]),"FUNCTION")
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("return the result of the given function");
    }
}

Blockly.Blocks['numpy_math_functions2'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([
                ['sin', 'sin'], 
                ['cos', 'cos'], 
                ['tan', 'tan'],
                ['arcsin', 'arcsin'],
                ['arccos', 'arccos'],
                ['arctan', 'arctan'],
                ['sinh', 'sinh'],
                ['cosh', 'cosh'],
                ['tanh', 'tanh'],
                ['degrees', 'degrees'],
                ['radians', 'radians']]), "FUNCTION")
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("return the result of the given function");
    }
}

Blockly.Blocks['numpy_exp'] = {
    init: function() {
        this.appendValueInput("X")
            .appendField("exp(")
            .setCheck("Number");
        this.appendDummyInput()
            .appendField(")")
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("return the exponential of x");
    }
}

pythonGenerator.forBlock['numpy_exp'] = function(block) {
    pythonGenerator.definitions_['import numpy as np'] = 'import numpy as np';
    const x = pythonGenerator.valueToCode(block, 'X', pythonGenerator.ORDER_FUNCTION_CALL);
    const code = [`np.exp(${x})`, pythonGenerator.ORDER_FUNCTION_CALL];
    return code;
}