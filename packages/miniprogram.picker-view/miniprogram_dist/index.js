/**
 * @doraemon-ui/miniprogram.picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 18:58:32.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { props } from './props';
import { getIndexFromValue, getLabelFromIndex, getRealCol, getRealValue } from './utils';
const { classNames, styleToCssString } = Doraemon.util;
const getStyles = (value) => {
    return Array.isArray(value) ? value.map((n) => styleToCssString(n)) : styleToCssString(value);
};
let PickerView = class PickerView extends Doraemon {
    prefixCls;
    defaultValue;
    value;
    controlled;
    itemHeight;
    itemStyle;
    indicatorStyle;
    indicatorClass;
    maskStyle;
    maskClass;
    labelAlign;
    loading;
    options;
    defaultFieldNames;
    inputValue = '';
    selectedIndex = 0;
    selectedValue = '';
    cols = [];
    extIndicatorStyle = '';
    extItemStyle = '';
    extMaskStyle = '';
    contentStyle = '';
    itemCount = 7;
    styles = {};
    get classes() {
        const { prefixCls, labelAlign } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--${labelAlign}`]: !!labelAlign,
            }),
            mask: `${prefixCls}__mask`,
            indicator: `${prefixCls}__indicator`,
            content: `${prefixCls}__content`,
            item: `${prefixCls}__item`,
            image: `${prefixCls}__image`,
        };
    }
    get optionsView() { return this.cols; }
    onItemHeightChange(v) {
        this.updatedStyles(v);
    }
    onItemStyleChange(v) {
        this.extItemStyle = getStyles(v);
    }
    onIndicatorStyleChange(v) {
        this.extIndicatorStyle = getStyles(v);
    }
    onMaskStyleChange(v) {
        this.extMaskStyle = getStyles(v);
    }
    onValueOptionsChange() {
        const names = this.getFieldNamesSafe();
        this.cols = this.normalizeCols(getRealCol(this.options || [], names), names);
        if (this.controlled)
            this.setValue(this.value);
    }
    getFieldNamesSafe() {
        return {
            label: this.defaultFieldNames?.label || 'label',
            value: this.defaultFieldNames?.value || 'value',
            disabled: this.defaultFieldNames?.disabled || 'disabled',
        };
    }
    normalizeCols(cols, names) {
        return cols.map((option) => ({
            ...option,
            label: option[names.label],
            value: option[names.value],
            disabled: !!option[names.disabled],
            labelImage: option.labelImage,
        }));
    }
    updatedStyles(itemHeight) {
        let num = this.itemCount;
        if (num % 2 === 0)
            num--;
        num = (num - 1) / 2;
        this.styles = {
            wrap: `height: ${itemHeight * this.itemCount}px;`,
            item: `line-height: ${itemHeight}px; height: ${itemHeight}px;`,
            image: `width: ${itemHeight * .6}px; height: ${itemHeight * .6}px;`,
            content: `padding: ${itemHeight * num}px 0;`,
            indicator: `top: ${itemHeight * num}px; height: ${itemHeight}px;`,
            mask: `background-size: 100% ${itemHeight * num}px;`,
        };
    }
    updated(inputValue) {
        this.inputValue = inputValue;
        const values = this.getValue(inputValue);
        this.selectedIndex = values.selectedIndex;
        this.selectedValue = values.selectedValue;
    }
    setValue(value) {
        this.updated(this.getValue(value).value || '');
    }
    getValue(value = this.inputValue) {
        const names = { label: 'label', value: 'value', disabled: 'disabled' };
        const inputValue = getRealValue(value, this.cols, names) || '';
        const selectedIndex = getIndexFromValue(value, this.cols, names);
        const displayValue = getLabelFromIndex(selectedIndex, this.cols, names.label);
        return {
            value: inputValue,
            displayValue,
            selectedIndex,
            selectedValue: inputValue,
            cols: this.cols,
        };
    }
    getIndexedStyle(style, index) {
        return Array.isArray(style) ? (style[index] || '') : (style || '');
    }
    fireValueChange(value) {
        if (!this.controlled)
            this.updated(value);
        this.$emit('valueChange', this.getValue(value));
    }
    onItemClick(e) {
        const { disabled, value } = e.currentTarget.dataset;
        if (!disabled)
            this.fireValueChange(value);
    }
    onTouchStart() { this.$emit('beforeChange', this.getValue()); }
    onTouchMove() { }
    onTouchEnd() { }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.updatedStyles(this.itemHeight);
        const names = this.getFieldNamesSafe();
        this.cols = this.normalizeCols(getRealCol(this.options || [], names), names);
        this.onItemStyleChange(this.itemStyle);
        this.onIndicatorStyleChange(this.indicatorStyle);
        this.onMaskStyleChange(this.maskStyle);
        this.setValue(inputValue);
    }
};
__decorate([
    Prop({ type: String, default: '' })
], PickerView.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: String, default: '' })
], PickerView.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], PickerView.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Number, default: 34 })
], PickerView.prototype, "itemHeight", void 0);
__decorate([
    Prop({ type: null, default: '' })
], PickerView.prototype, "itemStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], PickerView.prototype, "indicatorStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], PickerView.prototype, "indicatorClass", void 0);
__decorate([
    Prop({ type: null, default: '' })
], PickerView.prototype, "maskStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], PickerView.prototype, "maskClass", void 0);
__decorate([
    Prop({ type: String, default: 'center' })
], PickerView.prototype, "labelAlign", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], PickerView.prototype, "loading", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], PickerView.prototype, "options", void 0);
__decorate([
    Prop({ type: Object, default: { label: 'label', value: 'value', disabled: 'disabled' } })
], PickerView.prototype, "defaultFieldNames", void 0);
__decorate([
    Watch('itemHeight')
], PickerView.prototype, "onItemHeightChange", null);
__decorate([
    Watch('itemStyle')
], PickerView.prototype, "onItemStyleChange", null);
__decorate([
    Watch('indicatorStyle')
], PickerView.prototype, "onIndicatorStyleChange", null);
__decorate([
    Watch('maskStyle')
], PickerView.prototype, "onMaskStyleChange", null);
__decorate([
    Watch('value'),
    Watch('options')
], PickerView.prototype, "onValueOptionsChange", null);
PickerView = __decorate([
    Component({ props })
], PickerView);
export default defineComponentHOC()(PickerView);
