/**
 * @doraemon-ui/miniprogram.popup-select.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:40:08.
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
const notFoundContent = {
    icon: '',
    title: '',
    text: '暂无数据'
};
const getNotFoundContent = (newVal)=>{
    if (newVal !== null && typeof newVal === 'object') {
        return Object.assign({}, notFoundContent, newVal);
    } else if (typeof newVal === 'string') {
        return Object.assign({}, notFoundContent, {
            text: newVal
        });
    } else if (newVal === null || newVal === false) {
        return null;
    }
    return notFoundContent;
};
const flattenOptions = (options)=>{
    const list = [];
    options.forEach((item)=>{
        if (typeof item === 'string') {
            list.push({
                title: item,
                value: item
            });
            return;
        }
        const title = String(item.title ?? item.label ?? item.value ?? '');
        const value = String(item.value ?? item.key ?? title);
        if (Array.isArray(item.options)) {
            list.push({
                title,
                value,
                isGroup: true
            });
            item.options.forEach((child)=>{
                if (typeof child === 'string') {
                    list.push({
                        title: child,
                        value: child,
                        isGroupOption: true
                    });
                } else {
                    list.push({
                        title: String(child.title ?? child.label ?? child.value ?? ''),
                        value: String(child.value ?? child.key ?? child.title ?? ''),
                        disabled: !!child.disabled,
                        isGroupOption: true
                    });
                }
            });
            return;
        }
        list.push({
            title,
            value,
            disabled: !!item.disabled
        });
    });
    return list;
};
let PopupSelect = class PopupSelect extends Doraemon {
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p),
            toolbar: `${p}__toolbar`,
            inner: `${p}__toolbar-inner`,
            cancel: `${p}__cancel`,
            title: `${p}__title`,
            confirm: `${p}__confirm`,
            hover: `${p}__hover`,
            list: `${p}__list`,
            option: `${p}__option`,
            optionDisabled: `${p}__option--disabled`,
            optionSelected: `${p}__option--selected`,
            group: `${p}__group`,
            prompt: `${p}__prompt`
        };
    }
    onOptionsChange(options) {
        this.mergedOptions = flattenOptions(options || []);
    }
    onNotFoundContentChange(v) {
        this.mergedNotFoundContent = getNotFoundContent(v);
    }
    onVisibleChange(v) {
        if (this.controlled) this.updated(v);
    }
    updated(v) {
        if (this.popupVisible !== v) this.popupVisible = v;
    }
    open() {
        if (!this.controlled) this.updated(true);
        this.$emit('change', {
            visible: true
        });
    }
    close() {
        if (!this.controlled) this.updated(false);
        this.$emit('change', {
            visible: false
        });
    }
    onTrigger() {
        this.open();
    }
    onShow() {
        this.inputValue = this.value;
    }
    onClosed() {
        this.$emit('closed');
    }
    onCancel() {
        this.close();
        this.$emit('cancel');
    }
    formatPickerValue(value) {
        const values = Array.isArray(value) ? value : [
            value
        ];
        const selectedOptions = this.mergedOptions.filter((o)=>values.includes(o.value));
        return {
            value,
            options: selectedOptions
        };
    }
    onConfirm() {
        this.$emit('valueChange', this.formatPickerValue(this.inputValue));
        this.$emit('confirm', this.formatPickerValue(this.inputValue));
        this.close();
    }
    noop() {}
    onOptionTap(e) {
        const { value } = e.currentTarget.dataset;
        const option = this.mergedOptions.find((n)=>n.value === value);
        if (!option || option.disabled || option.isGroup) return;
        if (this.multiple) {
            const set = new Set(Array.isArray(this.inputValue) ? this.inputValue : []);
            if (set.has(value)) {
                set.delete(value);
            } else if (this.max <= 0 || set.size < this.max) {
                set.add(value);
            }
            this.inputValue = Array.from(set);
        } else {
            this.inputValue = value;
        }
    }
    isSelected(v) {
        return this.multiple ? Array.isArray(this.inputValue) && this.inputValue.includes(v) : this.inputValue === v;
    }
    mounted() {
        this.onOptionsChange(this.options);
        this.onNotFoundContentChange(this.notFoundContent);
        this.updated(this.controlled ? this.visible : this.defaultVisible);
    }
    constructor(...args){
        super(...args);
        this.mergedOptions = [];
        this.mergedNotFoundContent = {
            ...notFoundContent
        };
        this.inputValue = '';
        this.popupVisible = false;
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn'
    })
], PopupSelect.prototype, "classNames", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], PopupSelect.prototype, "virtualized", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: {
            ...notFoundContent
        }
    })
], PopupSelect.prototype, "notFoundContent", void 0);
_ts_decorate([
    Prop({
        type: [
            String,
            Array
        ],
        default: ''
    })
], PopupSelect.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], PopupSelect.prototype, "options", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], PopupSelect.prototype, "iconPosition", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], PopupSelect.prototype, "multiple", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: -1
    })
], PopupSelect.prototype, "max", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: {
            title: '请选择',
            cancelText: '取消',
            confirmText: '确定'
        }
    })
], PopupSelect.prototype, "toolbar", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], PopupSelect.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], PopupSelect.prototype, "defaultVisible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], PopupSelect.prototype, "controlled", void 0);
_ts_decorate([
    Watch('options')
], PopupSelect.prototype, "onOptionsChange", null);
_ts_decorate([
    Watch('notFoundContent')
], PopupSelect.prototype, "onNotFoundContentChange", null);
_ts_decorate([
    Watch('visible')
], PopupSelect.prototype, "onVisibleChange", null);
PopupSelect = _ts_decorate([
    Component({
        expose: [
            'open',
            'close'
        ],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-popup-select'
            }
        }
    })
], PopupSelect);
var index = defineComponentHOC()(PopupSelect);

export { PopupSelect, index as default };
