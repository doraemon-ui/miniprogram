/**
 * @doraemon-ui/miniprogram.checkbox.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 19:38:28.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
export const checkboxGroupProps = {
    prefixCls: {
        type: String,
        default: 'dora-checkbox-group',
    },
    cellGroupPrefixCls: {
        type: String,
        default: 'dora-list',
    },
    value: {
        type: Array,
        default: () => [],
    },
    name: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        default: '',
    },
    label: {
        type: String,
        default: '',
    },
    options: {
        type: Array,
        default: () => [],
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    readOnly: {
        type: Boolean,
        default: false,
    },
    mode: {
        type: String,
        default: 'default',
    },
    bodyStyle: {
        type: null,
        default: '',
    },
    hasLine: {
        type: Boolean,
        default: true,
    },
    withListComponent: {
        type: Boolean,
        default: true,
    },
    iconPosition: {
        type: String,
        default: 'left',
    },
    iconSize: {
        type: String,
        default: '',
    },
    iconOn: {
        type: String,
        default: '',
    },
    iconOff: {
        type: String,
        default: '',
    },
};
