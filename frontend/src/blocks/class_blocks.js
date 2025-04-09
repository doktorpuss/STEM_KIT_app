import Blockly from 'blockly/core';
import 'blockly/blocks';
import { pythonGenerator } from 'blockly/python';

// Mutator cho struct
Blockly.Blocks['struct_mutator'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Fields');
    this.appendStatementInput('FIELDS')
        .setCheck('Field');
    this.setColour(230);
    this.setTooltip('Add or remove fields');
  }
};

// Field block
Blockly.Blocks['field_block'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('field')
        .appendField(new Blockly.FieldTextInput('name'), 'FIELD_NAME')
        .appendField(':')
        .appendField(new Blockly.FieldDropdown([
          ['int', 'int'],
          ['float', 'float'],
          ['str', 'str'],
          ['bool', 'bool'],
          ['list', 'list'],
          ['dict', 'dict']
        ]), 'FIELD_TYPE')
        .appendField('=')
        .appendField(new Blockly.FieldTextInput(''), 'DEFAULT_VALUE');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setColour(230);
    this.setTooltip('Define a field');
  }
};

// Struct block
Blockly.Blocks['struct_definition'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('struct')
        .appendField(new Blockly.FieldTextInput('MyStruct'), 'STRUCT_NAME');
    this.appendDummyInput()
        .appendField('fields:');
    this.appendStatementInput('FIELDS')
        .setCheck('Field');
    this.setColour(230);
    this.setTooltip('Define a struct');
    this.setMutator(new Blockly.Mutator(['field_block']));
  },
  mutationToDom: function() {
    if (!this.fields_) {
      return null;
    }
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('fields', JSON.stringify(this.fields_));
    return container;
  },
  domToMutation: function(xmlElement) {
    const fields = xmlElement.getAttribute('fields');
    if (fields) {
      this.fields_ = JSON.parse(fields);
    } else {
      this.fields_ = [];
    }
    this.updateShape_();
  },
  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('struct_mutator');
    containerBlock.initSvg();
    const connection = containerBlock.nextConnection;
    for (let i = 0; i < this.fields_.length; i++) {
      const fieldBlock = workspace.newBlock('field_block');
      fieldBlock.initSvg();
      connection.connect(fieldBlock.previousConnection);
      connection = fieldBlock.nextConnection;
      fieldBlock.setFieldValue(this.fields_[i].name, 'FIELD_NAME');
      fieldBlock.setFieldValue(this.fields_[i].type, 'FIELD_TYPE');
      fieldBlock.setFieldValue(this.fields_[i].default, 'DEFAULT_VALUE');
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    let fieldBlock = containerBlock.nextConnection.targetBlock();
    this.fields_ = [];
    while (fieldBlock) {
      this.fields_.push({
        name: fieldBlock.getFieldValue('FIELD_NAME'),
        type: fieldBlock.getFieldValue('FIELD_TYPE'),
        default: fieldBlock.getFieldValue('DEFAULT_VALUE')
      });
      fieldBlock = fieldBlock.nextConnection && fieldBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
  },
  updateShape_: function() {
    // Xóa tất cả các input hiện tại trừ input đầu tiên
    if (this.getInput('FIELDS')) {
      this.removeInput('FIELDS');
    }
    
    // Thêm lại các field với cài đặt đã lưu
    if (this.fields_ && this.fields_.length > 0) {
      this.appendStatementInput('FIELDS')
          .setCheck('Field');
    }
  }
};

// Python generator cho struct
pythonGenerator.forBlock['struct_definition'] = function(block) {
  const structName = block.getFieldValue('STRUCT_NAME');
  const fields = block.fields_ || [];
  
  let code = `class ${structName}:\n`;
  code += '    def __init__(self';
  
  // Thêm các tham số cho constructor
  for (const field of fields) {
    code += `, ${field.name}=${field.default || 'None'}`;
  }
  
  code += '):\n';
  
  // Gán giá trị cho các field
  for (const field of fields) {
    code += `        self.${field.name} = ${field.name}\n`;
  }
  
  return code;
};

// Python generator cho field block
pythonGenerator.forBlock['field_block'] = function(block) {
  return '';
};

// Container cho class fields
Blockly.Blocks['struct_container'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('Class Fields');
    this.appendStatementInput('STACK');
    this.setColour(160);
    this.contextMenu = false;
    this.setTooltip('Add, remove, or reorder class fields');
  }
};

// Field item cho class
Blockly.Blocks['struct_field_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('field')
        .appendField(new Blockly.FieldTextInput('name'), 'FIELD_NAME')
        .appendField(':')
        .appendField(new Blockly.FieldDropdown([
          ['int', 'int'],
          ['float', 'float'],
          ['str', 'str'],
          ['bool', 'bool'],
          ['list', 'list'],
          ['dict', 'dict']
        ]), 'FIELD_TYPE')
        .appendField('=')
        .appendField(new Blockly.FieldTextInput(''), 'DEFAULT_VALUE');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(160);
    this.contextMenu = false;
  }
};

// Block tạo class
Blockly.Blocks['struct_create'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('class')
        .appendField(new Blockly.FieldTextInput('MyClass'), 'CLASS_NAME');

    // Tạo container cho fields
    this.appendDummyInput()
        .appendField('fields')
        .setAlign(Blockly.ALIGN_LEFT);

    // Khởi tạo với một field
    this.fieldCount_ = 1;
    this.fields_ = [{name: 'field0', type: 'int', default: ''}];
    this.updateShape_();

    this.setColour(160);
    this.setTooltip('Create a new class definition');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);

    // Set up mutator
    this.setMutator(new Blockly.icons.MutatorIcon(['struct_field_item'], this));
  },

  saveExtraState: function() {
    // Lưu trạng thái hiện tại của block
    const state = {
      'fieldCount': this.fieldCount_,
      'fields': []
    };

    // Lưu giá trị từ các field trong block chính
    for (let i = 0; i < this.fieldCount_; i++) {
      const nameField = this.getField('FIELD_NAME' + i);
      const typeField = this.getField('FIELD_TYPE' + i);
      const defaultField = this.getField('DEFAULT_VALUE' + i);
      
      if (nameField && typeField) {
        state.fields.push({
          name: nameField.getValue(),
          type: typeField.getValue(),
          default: defaultField ? defaultField.getValue() : ''
        });
      }
    }
    
    return state;
  },

  loadExtraState: function(state) {
    this.fieldCount_ = state['fieldCount'] || 1;
    this.fields_ = state['fields'] || [{name: 'field0', type: 'int', default: ''}];
    this.updateShape_();
  },

  decompose: function(workspace) {
    const containerBlock = workspace.newBlock('struct_container');
    containerBlock.initSvg();
    let connection = containerBlock.getInput('STACK').connection;
    
    // Sử dụng giá trị từ block chính để tạo mutator
    for (let i = 0; i < this.fieldCount_; i++) {
      const nameField = this.getField('FIELD_NAME' + i);
      const typeField = this.getField('FIELD_TYPE' + i);
      const defaultField = this.getField('DEFAULT_VALUE' + i);
      
      if (nameField && typeField) {
        const fieldBlock = workspace.newBlock('struct_field_item');
        fieldBlock.initSvg();
        
        fieldBlock.setFieldValue(nameField.getValue(), 'FIELD_NAME');
        fieldBlock.setFieldValue(typeField.getValue(), 'FIELD_TYPE');
        if (defaultField) {
          fieldBlock.setFieldValue(defaultField.getValue(), 'DEFAULT_VALUE');
        }
        
        connection.connect(fieldBlock.previousConnection);
        connection = fieldBlock.nextConnection;
      }
    }
    
    return containerBlock;
  },

  compose: function(containerBlock) {
    let itemBlock = containerBlock.getInputTargetBlock('STACK');
    const fields = [];
    let count = 0;
    
    // Lấy giá trị từ mutator để cập nhật block chính
    while (itemBlock && !itemBlock.isInsertionMarker()) {
      fields.push({
        name: itemBlock.getFieldValue('FIELD_NAME'),
        type: itemBlock.getFieldValue('FIELD_TYPE'),
        default: itemBlock.getFieldValue('DEFAULT_VALUE')
      });
      count++;
      itemBlock = itemBlock.nextConnection && itemBlock.nextConnection.targetBlock();
    }
    
    this.fieldCount_ = count;
    this.fields_ = fields;
    this.updateShape_();
  },

  updateShape_: function() {
    // Xóa tất cả field inputs hiện tại ngoại trừ input đầu tiên chứa tên class
    for (let i = 0; i < this.fieldCount_ + 1; i++) {
      const input = this.getInput('FIELD' + i);
      if (input) {
        this.removeInput('FIELD' + i);
      }
    }

    // Thêm các field mới với giá trị từ fields_ array
    for (let i = 0; i < this.fieldCount_; i++) {
      const field = this.fields_[i];
      if (!field) continue;

      const input = this.appendDummyInput('FIELD' + i)
          .appendField('    field')
          .appendField(new Blockly.FieldTextInput(field.name), 'FIELD_NAME' + i)
          .appendField(':')
          .appendField(new Blockly.FieldDropdown([
            ['int', 'int'],
            ['float', 'float'],
            ['str', 'str'],
            ['bool', 'bool'],
            ['list', 'list'],
            ['dict', 'dict']
          ]), 'FIELD_TYPE' + i)
          .appendField('=')
          .appendField(new Blockly.FieldTextInput(field.default || ''), 'DEFAULT_VALUE' + i)
          .setAlign(Blockly.ALIGN_LEFT);

      // Đặt giá trị type từ fields_ array
      const typeField = this.getField('FIELD_TYPE' + i);
      if (typeField && field.type) {
        typeField.setValue(field.type);
      }
    }
  }
};

// Generator cho struct_field_item
pythonGenerator.forBlock['struct_field_item'] = function(block) {
  const name = block.getFieldValue('FIELD_NAME');
  const type = block.getFieldValue('FIELD_TYPE');
  const defaultValue = block.getFieldValue('DEFAULT_VALUE');
  return defaultValue ? `    ${name}: ${type} = ${defaultValue}\n` : `    ${name}: ${type}\n`;
};

// Generator cho struct
pythonGenerator.forBlock['struct_create'] = function(block) {
  const className = block.getFieldValue('CLASS_NAME');
  let code = `class ${className}:\n`;
  
  // Generate code for each field
  for (let i = 0; i < block.fieldCount_; i++) {
    const name = block.getFieldValue('FIELD_NAME' + i);
    const type = block.getFieldValue('FIELD_TYPE' + i);
    const defaultValue = block.getFieldValue('DEFAULT_VALUE' + i);
    code += defaultValue ? `    ${name}: ${type} = ${defaultValue}\n` : `    ${name}: ${type}\n`;
  }
  
  return code;
};

// Block tạo instance của class
Blockly.Blocks['class_instance'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('create instance')
        .appendField(new Blockly.FieldVariable('obj'), 'VAR')
        .appendField('of class')
        .appendField(new Blockly.FieldTextInput('MyClass'), 'CLASS_NAME');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Create a new instance of a class');
  }
};

pythonGenerator.forBlock['class_instance'] = function(block) {
  const varName = pythonGenerator.getVariableName(block.getFieldValue("VAR"));
  const className = block.getFieldValue('CLASS_NAME');
  return `${varName} = ${className}()\n`;
};

// Block để lấy giá trị field từ struct
Blockly.Blocks['struct_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('get')
        .appendField(new Blockly.FieldVariable('obj'), 'VAR')
        .appendField('field')
        .appendField(new Blockly.FieldTextInput('name'), 'FIELD_NAME');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip('Get a field value from a class instance');
  }
};

pythonGenerator.forBlock['struct_get'] = function(block) {
  const variable = block.getFieldValue('VAR');
  const fieldName = block.getFieldValue('FIELD_NAME');
  return [`${variable}.${fieldName}`, pythonGenerator.ORDER_MEMBER];
};

// Block để set giá trị field cho struct
Blockly.Blocks['struct_set'] = {
  init: function() {
    this.appendDummyInput()
        .appendField('set')
        .appendField(new Blockly.FieldVariable('obj'), 'VAR')
        .appendField('field')
        .appendField(new Blockly.FieldTextInput('name'), 'FIELD_NAME');
    this.appendValueInput('VALUE')
        .setCheck(null)
        .appendField('to');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('Set a field value in a class instance');
  }
};

pythonGenerator.forBlock['struct_set'] = function(block) {
  const variable = block.getFieldValue('VAR');
  const fieldName = block.getFieldValue('FIELD_NAME');
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE) || 'None';
  return `${variable}.${fieldName} = ${value}\n`;
};


