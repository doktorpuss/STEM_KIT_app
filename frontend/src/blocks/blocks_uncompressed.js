// This file contains uncompressed and well-organized block definitions
// It's a more readable version of blocks_compressed.js

import Blockly from 'blockly/core';

// ===== Variables Dynamic Blocks =====
Blockly.Blocks['variables_get_dynamic'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.extensions = ['contextMenu_variableDynamicSetterGetter'];
  }
};

Blockly.Blocks['variables_set_dynamic'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(null)
        .appendField(Blockly.Msg.VARIABLES_SET);
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.extensions = ['contextMenu_variableDynamicSetterGetter'];
  }
};

// ===== Variables Blocks =====
Blockly.Blocks['variables_get'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
    this.setOutput(true, null);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.VARIABLES_GET_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.VARIABLES_GET_HELPURL);
    this.extensions = ['contextMenu_variableSetterGetter'];
  }
};

Blockly.Blocks['variables_set'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(null)
        .appendField(Blockly.Msg.VARIABLES_SET);
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.VARIABLES_SET_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.VARIABLES_SET_HELPURL);
    this.extensions = ['contextMenu_variableSetterGetter'];
  }
};

// ===== Text Blocks =====
Blockly.Blocks['text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(""), "TEXT");
    this.setOutput(true, "String");
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.extensions = ['text_quotes', 'parent_tooltip_when_inline'];
  }
};

Blockly.Blocks['text_multiline'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldMultilineText(""), "TEXT");
    this.setOutput(true, "String");
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_TEXT_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_TEXT_HELPURL);
    this.extensions = ['parent_tooltip_when_inline'];
  }
};

Blockly.Blocks['text_join'] = {
  init: function() {
    this.setOutput(true, "String");
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_JOIN_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_JOIN_HELPURL);
    this.mutator = 'text_join_mutator';
  }
};

Blockly.Blocks['text_create_join_container'] = {
  init: function() {
    this.appendDummyInput();
    this.appendStatementInput('STACK');
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['text_create_join_item'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_CREATE_JOIN_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Blocks['text_append'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_APPEND_TITLE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable(
            Blockly.Msg.TEXT_APPEND_VARIABLE), "VAR");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_APPEND_TOOLTIP);
    this.extensions = ['text_append_tooltip'];
  }
};

Blockly.Blocks['text_length'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(['String', 'Array'])
        .appendField(Blockly.Msg.TEXT_LENGTH_TITLE);
    this.setOutput(true, 'Number');
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_LENGTH_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_LENGTH_HELPURL);
  }
};

Blockly.Blocks['text_isEmpty'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck(['String', 'Array'])
        .appendField(Blockly.Msg.TEXT_ISEMPTY_TITLE);
    this.setOutput(true, 'Boolean');
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_ISEMPTY_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_ISEMPTY_HELPURL);
  }
};

Blockly.Blocks['text_indexOf'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_INDEXOF_TITLE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.TEXT_INDEXOF_OPERATOR_FIRST, 'FIRST'],
          [Blockly.Msg.TEXT_INDEXOF_OPERATOR_LAST, 'LAST']
        ]), 'END');
    this.appendValueInput('FIND')
        .setCheck('String');
    this.setOutput(true, 'Number');
    this.setInputsInline(true);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_INDEXOF_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_INDEXOF_HELPURL);
    this.extensions = ['text_indexOf_tooltip'];
  }
};

Blockly.Blocks['text_charAt'] = {
  init: function() {
    this.appendValueInput('VALUE')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_CHARAT_TITLE);
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          [Blockly.Msg.TEXT_CHARAT_FROM_START, 'FROM_START'],
          [Blockly.Msg.TEXT_CHARAT_FROM_END, 'FROM_END'],
          [Blockly.Msg.TEXT_CHARAT_FIRST, 'FIRST'],
          [Blockly.Msg.TEXT_CHARAT_LAST, 'LAST'],
          [Blockly.Msg.TEXT_CHARAT_RANDOM, 'RANDOM']
        ]), 'WHERE');
    this.setOutput(true, 'String');
    this.setInputsInline(true);
    this.setColour(160);
    this.setTooltip(Blockly.Msg.TEXT_CHARAT_TOOLTIP);
    this.setHelpUrl(Blockly.Msg.TEXT_CHARAT_HELPURL);
    this.mutator = 'text_charAt_mutator';
  }
};

// ===== Text Get Substring Block =====
Blockly.Blocks['text_getSubstring'] = {
  init: function() {
    this.WHERE_OPTIONS_1 = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_START, 'FROM_START'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FROM_END, 'FROM_END'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_START_FIRST, 'FIRST']
    ];
    this.WHERE_OPTIONS_2 = [
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_START, 'FROM_START'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_FROM_END, 'FROM_END'],
      [Blockly.Msg.TEXT_GET_SUBSTRING_END_LAST, 'LAST']
    ];
    this.setHelpUrl(Blockly.Msg.TEXT_GET_SUBSTRING_HELPURL);
    this.setColour(160);
    this.appendValueInput('STRING')
        .setCheck('String')
        .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_INPUT_IN_TEXT);
    this.appendDummyInput('AT1');
    this.appendDummyInput('AT2');
    if (Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    this.setInputsInline(true);
    this.setOutput(true, 'String');
    this.updateAt_(1, true);
    this.updateAt_(2, true);
    this.setTooltip(Blockly.Msg.TEXT_GET_SUBSTRING_TOOLTIP);
  },

  mutationToDom: function() {
    const container = Blockly.utils.xml.createElement('mutation');
    const at1 = this.getInput('AT1') instanceof Blockly.ValueInput;
    const at2 = this.getInput('AT2') instanceof Blockly.ValueInput;
    container.setAttribute('at1', at1);
    container.setAttribute('at2', at2);
    return container;
  },

  domToMutation: function(xmlElement) {
    const at1 = xmlElement.getAttribute('at1') === 'true';
    const at2 = xmlElement.getAttribute('at2') === 'true';
    this.updateAt_(1, at1);
    this.updateAt_(2, at2);
  },

  updateAt_: function(n, isValue) {
    this.removeInput('AT' + n);
    this.removeInput('ORDINAL' + n, true);
    if (isValue) {
      this.appendValueInput('AT' + n)
          .setCheck('Number');
      if (Blockly.Msg.ORDINAL_NUMBER_SUFFIX) {
        this.appendDummyInput('ORDINAL' + n)
            .appendField(Blockly.Msg.ORDINAL_NUMBER_SUFFIX);
      }
    } else {
      this.appendDummyInput('AT' + n);
    }
    if (n === 2 && Blockly.Msg.TEXT_GET_SUBSTRING_TAIL) {
      this.removeInput('TAIL', true);
      this.appendDummyInput('TAIL')
          .appendField(Blockly.Msg.TEXT_GET_SUBSTRING_TAIL);
    }
    const whereOptions = Blockly.fromJson({
      type: 'field_dropdown',
      options: this['WHERE_OPTIONS_' + n]
    });
    whereOptions.setValidator((value) => {
      const isFromStart = value === 'FROM_START' || value === 'FROM_END';
      if (isFromStart !== isValue) {
        const sourceBlock = this.getSourceBlock();
        sourceBlock.updateAt_(n, isFromStart);
        sourceBlock.setFieldValue(value, 'WHERE' + n);
        return null;
      }
    });
    this.getInput('AT' + n).appendField(whereOptions, 'WHERE' + n);
    if (n === 1) {
      this.moveInputBefore('AT1', 'AT2');
      if (this.getInput('ORDINAL1')) {
        this.moveInputBefore('ORDINAL1', 'AT2');
      }
    }
  }
}; 