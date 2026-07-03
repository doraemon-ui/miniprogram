/**
 * @doraemon-ui/miniprogram.form.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:47:02.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

const fieldProps = {
    prefixCls: {
        type: String,
        default: 'dora-field'
    },
    initialValue: {
        type: null,
        default: null
    },
    valuePropName: {
        type: String,
        default: 'inputValue'
    },
    trigger: {
        type: String,
        default: 'onChange'
    },
    validate: {
        type: Array,
        default: []
    },
    validateTrigger: {
        type: [
            String,
            Array
        ],
        default: 'onChange'
    },
    preserve: {
        type: Boolean,
        default: false
    },
    rules: {
        type: Array,
        default: []
    },
    validateFirst: {
        type: Boolean,
        default: false
    },
    hidden: {
        type: Boolean,
        default: false
    },
    childElementPosition: {
        type: String,
        default: 'none'
    },
    cellPrefixCls: {
        type: String,
        default: 'dora-list-item'
    },
    label: {
        type: String,
        default: ''
    },
    labelWrap: {
        type: Boolean,
        default: false
    },
    extra: {
        type: String,
        default: ''
    },
    isLink: {
        type: Boolean,
        default: false
    },
    align: {
        type: String,
        default: 'flex-start'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readOnly: {
        type: Boolean,
        default: false
    },
    validateStatus: {
        type: null,
        default: null
    },
    required: {
        type: null,
        default: null
    },
    help: {
        type: null,
        default: null
    },
    hasFeedback: {
        type: Boolean,
        default: true
    }
};
const formProps = {
    prefixCls: {
        type: String,
        default: 'dora-form'
    },
    cellGroupPrefixCls: {
        type: String,
        default: 'dora-list'
    },
    title: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    mode: {
        type: String,
        default: 'default'
    },
    bodyStyle: {
        type: [
            String,
            Object
        ],
        default: ''
    },
    layout: {
        type: String,
        default: 'none'
    },
    validateMessages: {
        type: null,
        default: null
    },
    requiredMarkStyle: {
        type: String,
        default: 'asterisk'
    },
    asteriskText: {
        type: String,
        default: '*'
    },
    requiredText: {
        type: String,
        default: '必填'
    },
    optionalText: {
        type: String,
        default: '选填'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readOnly: {
        type: Boolean,
        default: false
    }
};

export { fieldProps, formProps };
