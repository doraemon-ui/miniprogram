/**
 * @doraemon-ui/miniprogram.multi-picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:39:45.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Prop, Watch, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';
import { getRealCols, getRealValues, getIndexesFromValues, getLabelsFromIndexes } from './utils.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let MultiPickerView = class MultiPickerView extends Doraemon {
    getFieldNamesSafe() {
        return {
            label: this.defaultFieldNames?.label || 'label',
            value: this.defaultFieldNames?.value || 'value',
            disabled: this.defaultFieldNames?.disabled || 'disabled'
        };
    }
    onValueOptionsChange() {
        const names = this.getFieldNamesSafe();
        this.cols = getRealCols(this.options, names);
        this.setValue(this.value, true);
    }
    updated(inputValue, isForce = false) {
        if (this.inputValue !== inputValue || isForce) {
            this.inputValue = [
                ...inputValue
            ];
        }
    }
    setValue(value, isForce = false) {
        const { value: inputValue } = this.getValue(value);
        this.updated(inputValue, isForce);
    }
    getValue(value = this.inputValue, cols = this.cols) {
        const names = this.getFieldNamesSafe();
        const inputValue = getRealValues(Array.isArray(value) ? value : [], cols, names);
        const selectedValue = [
            ...inputValue
        ];
        const selectedIndex = getIndexesFromValues(inputValue, cols, names);
        const displayValue = getLabelsFromIndexes(selectedIndex, cols, names.label);
        return {
            value: inputValue,
            displayValue,
            selectedIndex,
            selectedValue,
            cols
        };
    }
    onChange(index, value, method) {
        const inputValue = [
            ...this.inputValue
        ];
        inputValue[index] = value;
        if (!this.controlled) this.updated(inputValue);
        this.$emit(method, {
            ...this.getValue(inputValue),
            index
        });
    }
    onBeforeChange(e) {
        this.onChange(e.currentTarget.dataset.index, e.detail.value, 'beforeChange');
    }
    onValueChange(e) {
        this.onChange(e.currentTarget.dataset.index, e.detail.value, 'valueChange');
    }
    onScrollChange(e) {
        this.onChange(e.currentTarget.dataset.index, e.detail.value, 'scrollChange');
    }
    mounted() {
        this.onValueOptionsChange();
    }
    constructor(...args){
        super(...args);
        this.inputValue = [];
        this.cols = [];
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-picker-view'
    })
], MultiPickerView.prototype, "pickerPrefixCls", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], MultiPickerView.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], MultiPickerView.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 34
    })
], MultiPickerView.prototype, "itemHeight", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], MultiPickerView.prototype, "itemStyle", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], MultiPickerView.prototype, "indicatorStyle", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], MultiPickerView.prototype, "indicatorClass", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: ''
    })
], MultiPickerView.prototype, "maskStyle", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], MultiPickerView.prototype, "maskClass", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'center'
    })
], MultiPickerView.prototype, "labelAlign", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], MultiPickerView.prototype, "loading", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], MultiPickerView.prototype, "options", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: {
            label: 'label',
            value: 'value',
            disabled: 'disabled'
        }
    })
], MultiPickerView.prototype, "defaultFieldNames", void 0);
_ts_decorate([
    Watch('value'),
    Watch('options')
], MultiPickerView.prototype, "onValueOptionsChange", null);
MultiPickerView = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-picker'
            }
        }
    })
], MultiPickerView);
var index = defineComponentHOC()(MultiPickerView);

export { MultiPickerView, index as default };
