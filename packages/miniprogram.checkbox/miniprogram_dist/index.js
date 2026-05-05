/**
 * @doraemon-ui/miniprogram.checkbox.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-05, 20:21:13.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Event, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getDefaultContext } from '@doraemon-ui/miniprogram.shared';
import { checkboxGroupProps } from './props.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const defaultContext = {
    ...getDefaultContext(checkboxGroupProps, [
        'disabled',
        'readOnly',
        'hasLine',
        // only context
        'hasFieldDecorator',
        'withListComponent',
        'iconPosition',
        'iconSize',
        'iconOn',
        'iconOff'
    ]),
    withListComponent: false
};
let Checkbox = class Checkbox extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        const cell = classNames(prefixCls);
        const extra = `${prefixCls}__extra`;
        const iconPosition = `${prefixCls}__icon-position`;
        const iconSelectable = `${prefixCls}__icon-selectable`;
        const selectable = `${prefixCls}__selectable`;
        const selectableH = `${prefixCls}__selectable-horizontal`;
        return {
            cell,
            extra,
            iconPosition,
            iconSelectable,
            selectable,
            selectableH
        };
    }
    onCheckedChange(newVal) {
        this.inputChecked = newVal;
    }
    checkboxChange(e) {
        const { disabled, readOnly, context } = this;
        const { checked } = e.currentTarget;
        if (disabled || context.disabled || readOnly || context.readOnly) return;
        this.onChange(checked);
    }
    changeValue(inputChecked = false, index = 0, isLast = false, context = defaultContext) {
        this.inputChecked = inputChecked;
        this.index = index;
        this.isLast = isLast;
        this.context = context;
    }
    onChange(inputChecked) {
        const { value, index } = this;
        const item = {
            checked: inputChecked,
            value,
            index
        };
        const parent = this.$parent;
        if (parent && typeof parent.onChange === 'function') {
            parent.onChange(item);
        } else {
            this.$emit('change', item);
        }
    }
    setChecked(inputChecked) {
        if (this.inputChecked !== inputChecked) {
            this.inputChecked = inputChecked;
        }
        this.onChange(inputChecked);
    }
    check() {
        this.setChecked(true);
    }
    uncheck() {
        this.setChecked(false);
    }
    toggle() {
        this.setChecked(!this.inputChecked);
    }
    mounted() {
        this.inputChecked = this.checked;
    }
    constructor(...args){
        super(...args);
        this.inputChecked = false;
        this.index = 0;
        this.isLast = false;
        this.context = defaultContext;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-list-item'
    })
], Checkbox.prototype, "cellPrefixCls", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-selectable'
    })
], Checkbox.prototype, "selectablePrefixCls", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Checkbox.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Checkbox.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Checkbox.prototype, "extra", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Checkbox.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Checkbox.prototype, "checked", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Checkbox.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Checkbox.prototype, "readOnly", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'balanced'
    })
], Checkbox.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], Checkbox.prototype, "wrapStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Checkbox.prototype, "hasLine", void 0);
_ts_decorate([
    Watch('checked')
], Checkbox.prototype, "onCheckedChange", null);
_ts_decorate([
    Event()
], Checkbox.prototype, "checkboxChange", null);
Checkbox = _ts_decorate([
    Component({
        components: {
            CheckboxGroup: ()=>({
                    module: './group',
                    type: 'ancestor'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-checkbox'
            },
            cellPrefixCls: {
                type: String,
                default: 'dora-list-item'
            },
            selectablePrefixCls: {
                type: String,
                default: 'dora-selectable'
            },
            title: {
                type: String,
                default: ''
            },
            label: {
                type: String,
                default: ''
            },
            extra: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            },
            checked: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            readOnly: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: 'balanced'
            },
            wrapStyle: {
                type: null,
                default: ''
            },
            hasLine: {
                type: Boolean,
                default: true
            }
        },
        expose: [
            'value',
            'check',
            'uncheck',
            'toggle',
            'setChecked',
            'changeValue'
        ]
    })
], Checkbox);
var index = defineComponentHOC()(Checkbox);

export { Checkbox, index as default };
