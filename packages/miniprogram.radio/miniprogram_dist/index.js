/**
 * @doraemon-ui/miniprogram.radio.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:21.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
const defaultContext = {
    disabled: false,
    readOnly: false,
    hasLine: true,
    hasFieldDecorator: false,
    withListComponent: false,
    iconPosition: 'right',
    iconSize: '',
    iconOn: '',
    iconOff: ''
};
let Radio = class Radio extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        const cell = classNames(prefixCls);
        const thumb = `${prefixCls}__thumb`;
        const iconPosition = `${prefixCls}__icon-position`;
        const iconSelectable = `${prefixCls}__icon-selectable`;
        const selectable = `${prefixCls}__selectable`;
        const selectableH = `${prefixCls}__selectable-horizontal`;
        return {
            cell,
            thumb,
            iconPosition,
            iconSelectable,
            selectable,
            selectableH
        };
    }
    onCheckedChange(newVal) {
        this.inputChecked = newVal;
    }
    radioChange(e) {
        const { disabled, readOnly, context } = this;
        const { checked } = e.detail;
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
            if (this._renderProxy) {
                this._renderProxy.triggerEvent('change', item, {
                    bubbles: true,
                    composed: true
                });
            }
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
], Radio.prototype, "cellPrefixCls", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-selectable'
    })
], Radio.prototype, "selectablePrefixCls", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Radio.prototype, "thumb", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Radio.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Radio.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Radio.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Radio.prototype, "checked", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Radio.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Radio.prototype, "readOnly", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'balanced'
    })
], Radio.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], Radio.prototype, "wrapStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Radio.prototype, "hasLine", void 0);
_ts_decorate([
    Watch('checked')
], Radio.prototype, "onCheckedChange", null);
Radio = _ts_decorate([
    Component({
        components: {
            RadioGroup: ()=>({
                    module: './group',
                    type: 'ancestor'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-radio'
            },
            cellPrefixCls: {
                type: String,
                default: 'dora-list-item'
            },
            selectablePrefixCls: {
                type: String,
                default: 'dora-selectable'
            },
            thumb: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            label: {
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
            'check',
            'uncheck',
            'toggle',
            'setChecked',
            'changeValue',
            'value',
            'title'
        ]
    })
], Radio);
var index = defineComponentHOC()(Radio);

export { Radio, index as default };
