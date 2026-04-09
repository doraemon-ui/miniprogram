/**
 * @doraemon-ui/miniprogram.date-picker.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 22:15:13.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { formatDate } from './utils';
const { classNames } = Doraemon.util;
const modeRecord = {
    datetime: 'yyyy-MM-dd hh:mm',
    date: 'yyyy-MM-dd',
    year: 'yyyy',
    month: 'yyyy-MM',
    time: 'hh:mm',
};
const isTillNow = (value) => value && (value.tillNow || value[0] === 'TILL_NOW');
let DatePicker = class DatePicker extends Doraemon {
    prefixCls;
    multiPickerPrefixCls;
    pickerPrefixCls;
    toolbar;
    defaultVisible;
    visible;
    controlled;
    disabled;
    value;
    itemHeight;
    itemStyle;
    indicatorStyle;
    indicatorClass;
    maskStyle;
    maskClass;
    labelAlign;
    mode;
    minuteStep;
    use12Hours;
    minDate;
    maxDate;
    minHour;
    maxHour;
    minMinute;
    maxMinute;
    lang;
    tillNow;
    popupVisible = false;
    inputValue = null;
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
    setVisibleState(v) {
        if (this.popupVisible !== v)
            this.popupVisible = v;
    }
    fireVisibleChange(v) {
        if (this.popupVisible !== v) {
            if (!this.controlled)
                this.setVisibleState(v);
            this.$emit('visibleChange', { visible: v });
        }
    }
    open() { this.fireVisibleChange(true); }
    close(callback) {
        if (typeof callback === 'function')
            callback(this.formatPickerValue(this.getPickerValue(this.inputValue)));
        this.fireVisibleChange(false);
    }
    onShow() { this.updated(this.value, true); }
    onClosed() { this.inputValue = this.value; }
    onConfirm() {
        this.close((values) => {
            this.$emit('change', values);
            this.$emit('confirm', values);
        });
    }
    onCancel() { this.close((values) => this.$emit('cancel', values)); }
    onValueChange(e) {
        if (!this.mountedFlag)
            return;
        this.updated(e.detail.value, true);
        this.$emit('valueChange', this.formatPickerValue(e.detail));
    }
    getPickerValue(value = this.inputValue) {
        const picker = this._renderProxy?.selectComponent?.('#dora-picker');
        if (picker?.getValue)
            return picker.getValue(value);
        return {
            value,
            displayValue: [],
            selectedIndex: [],
            selectedValue: value,
            cols: [],
            date: Date.now(),
            tillNow: false,
        };
    }
    formatPickerValue(values) {
        if (isTillNow(values.value)) {
            return { ...values, label: values.displayValue?.[0] || '' };
        }
        const modeFmt = modeRecord[this.mode] || modeRecord.datetime;
        return { ...values, label: formatDate(values.date || Date.now(), modeFmt) };
    }
    onTriggerClick() {
        if (this.disabled)
            return;
        this.fireVisibleChange(!this.popupVisible);
    }
    noop() { }
    updated(v, force = false) {
        if (force || this.inputValue !== v)
            this.inputValue = v;
    }
    mounted() {
        this.mountedFlag = true;
        this.setVisibleState(this.controlled ? this.visible : this.defaultVisible);
        this.updated(this.value, true);
    }
    detached() {
        this.mountedFlag = false;
    }
};
__decorate([
    Prop({ type: String, default: 'dora-picker' })
], DatePicker.prototype, "multiPickerPrefixCls", void 0);
__decorate([
    Prop({ type: String, default: 'dora-picker-view' })
], DatePicker.prototype, "pickerPrefixCls", void 0);
__decorate([
    Prop({ type: Object, default: { title: '请选择', cancelText: '取消', confirmText: '确定' } })
], DatePicker.prototype, "toolbar", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePicker.prototype, "defaultVisible", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePicker.prototype, "visible", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePicker.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePicker.prototype, "disabled", void 0);
__decorate([
    Prop({ type: null, default: null })
], DatePicker.prototype, "value", void 0);
__decorate([
    Prop({ type: Number, default: 34 })
], DatePicker.prototype, "itemHeight", void 0);
__decorate([
    Prop({ type: null, default: '' })
], DatePicker.prototype, "itemStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], DatePicker.prototype, "indicatorStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], DatePicker.prototype, "indicatorClass", void 0);
__decorate([
    Prop({ type: null, default: '' })
], DatePicker.prototype, "maskStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], DatePicker.prototype, "maskClass", void 0);
__decorate([
    Prop({ type: String, default: 'center' })
], DatePicker.prototype, "labelAlign", void 0);
__decorate([
    Prop({ type: String, default: 'datetime' })
], DatePicker.prototype, "mode", void 0);
__decorate([
    Prop({ type: Number, default: 1 })
], DatePicker.prototype, "minuteStep", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePicker.prototype, "use12Hours", void 0);
__decorate([
    Prop({ type: null, default: null })
], DatePicker.prototype, "minDate", void 0);
__decorate([
    Prop({ type: null, default: null })
], DatePicker.prototype, "maxDate", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], DatePicker.prototype, "minHour", void 0);
__decorate([
    Prop({ type: Number, default: 23 })
], DatePicker.prototype, "maxHour", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], DatePicker.prototype, "minMinute", void 0);
__decorate([
    Prop({ type: Number, default: 59 })
], DatePicker.prototype, "maxMinute", void 0);
__decorate([
    Prop({ type: String, default: 'zh_CN' })
], DatePicker.prototype, "lang", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], DatePicker.prototype, "tillNow", void 0);
__decorate([
    Watch('visible')
], DatePicker.prototype, "onVisiblePropChange", null);
__decorate([
    Watch('value')
], DatePicker.prototype, "onValuePropChange", null);
DatePicker = __decorate([
    Component({
        expose: ['open', 'close'],
        props: {
            prefixCls: {
                type: String,
                default: 'dora-date-picker',
            },
        },
    })
], DatePicker);
export default defineComponentHOC()(DatePicker);
