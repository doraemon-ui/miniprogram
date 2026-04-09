/**
 * @doraemon-ui/miniprogram.picker.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 21:51:53.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Picker = class Picker extends Doraemon {
    prefixCls;
    multiPickerPrefixCls;
    pickerPrefixCls;
    toolbar;
    defaultVisible;
    visible;
    controlled;
    disabled;
    cascade;
    cols;
    value;
    options;
    loading;
    itemHeight;
    itemStyle;
    indicatorStyle;
    indicatorClass;
    maskStyle;
    maskClass;
    labelAlign;
    defaultFieldNames;
    popupVisible = false;
    inputValue = [];
    mountedFlag = false;
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p),
            toolbar: `${p}__toolbar`,
            inner: `${p}__inner`,
            cancel: `${p}__cancel`,
            confirm: `${p}__confirm`,
            hover: `${p}__hover`,
            disabled: `${p}__disabled`,
            title: `${p}__title`,
        };
    }
    onVisiblePropChange(v) {
        if (!this.mountedFlag)
            return;
        if (this.controlled)
            this.setVisibleState(v);
    }
    onValuePropChange(v) {
        if (!this.mountedFlag)
            return;
        this.updated(v, true);
    }
    setVisibleState(popupVisible) {
        if (this.popupVisible !== popupVisible)
            this.popupVisible = popupVisible;
    }
    fireVisibleChange(popupVisible) {
        if (this.popupVisible !== popupVisible) {
            if (!this.controlled)
                this.setVisibleState(popupVisible);
            this.$emit('visibleChange', { visible: popupVisible });
        }
    }
    open() {
        this.fireVisibleChange(true);
    }
    close(callback) {
        if (typeof callback === 'function')
            callback(this.formatPickerValue(this.getPickerValue(this.inputValue)));
        this.fireVisibleChange(false);
    }
    onShow() {
        this.updated(this.value || [], true);
    }
    onClosed() {
        this.inputValue = [...(this.value || [])];
    }
    onConfirm() {
        this.close((values) => {
            this.$emit('change', values);
            this.$emit('confirm', values);
        });
    }
    onCancel() {
        this.close((values) => this.$emit('cancel', values));
    }
    onValueChange(e) {
        if (!this.mountedFlag)
            return;
        this.updated(e.detail.value || [], true);
        this.$emit('valueChange', this.formatPickerValue(e.detail));
    }
    getPickerValue(value = this.inputValue) {
        const id = this.cascade ? '#dora-picker-cascader' : '#dora-picker-multi';
        const picker = this._renderProxy?.selectComponent?.(id);
        if (picker?.getValue) {
            return picker.getValue(value);
        }
        return {
            value,
            displayValue: value,
            selectedIndex: [],
            selectedValue: value,
            cols: [],
        };
    }
    formatPickerValue(values) {
        const displayValue = Array.isArray(values.displayValue) ? values.displayValue : [];
        return {
            ...values,
            label: displayValue.join(','),
        };
    }
    onTriggerClick() {
        if (this.disabled)
            return;
        this.fireVisibleChange(!this.popupVisible);
    }
    noop() { }
    updated(inputValue = [], force = false) {
        if (force || this.inputValue.join('|') !== inputValue.join('|')) {
            this.inputValue = [...inputValue];
        }
    }
    mounted() {
        this.mountedFlag = true;
        this.setVisibleState(this.controlled ? this.visible : this.defaultVisible);
        this.updated(this.value || [], true);
    }
    detached() {
        this.mountedFlag = false;
    }
};
__decorate([
    Prop({ type: String, default: 'dora-picker' })
], Picker.prototype, "multiPickerPrefixCls", void 0);
__decorate([
    Prop({ type: String, default: 'dora-picker-view' })
], Picker.prototype, "pickerPrefixCls", void 0);
__decorate([
    Prop({ type: Object, default: { title: '请选择', cancelText: '取消', confirmText: '确定' } })
], Picker.prototype, "toolbar", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Picker.prototype, "defaultVisible", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Picker.prototype, "visible", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Picker.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Picker.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Picker.prototype, "cascade", void 0);
__decorate([
    Prop({ type: Number, default: 3 })
], Picker.prototype, "cols", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], Picker.prototype, "value", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], Picker.prototype, "options", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Picker.prototype, "loading", void 0);
__decorate([
    Prop({ type: Number, default: 34 })
], Picker.prototype, "itemHeight", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Picker.prototype, "itemStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Picker.prototype, "indicatorStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Picker.prototype, "indicatorClass", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Picker.prototype, "maskStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Picker.prototype, "maskClass", void 0);
__decorate([
    Prop({ type: String, default: 'center' })
], Picker.prototype, "labelAlign", void 0);
__decorate([
    Prop({ type: Object, default: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' } })
], Picker.prototype, "defaultFieldNames", void 0);
__decorate([
    Watch('visible')
], Picker.prototype, "onVisiblePropChange", null);
__decorate([
    Watch('value')
], Picker.prototype, "onValuePropChange", null);
Picker = __decorate([
    Component({
        expose: ['open', 'close'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-popup-picker',
            },
        },
    })
], Picker);
export default defineComponentHOC()(Picker);
