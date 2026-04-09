/**
 * @doraemon-ui/miniprogram.cascader-picker-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 20:50:21.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { getIndexesFromValues, getLabelsFromIndexes, getRealValues } from './utils';
function arrayTreeFilter(data, filterFn, childrenKeyName) {
    let children = data || [];
    const result = [];
    let level = 0;
    do {
        const found = children.filter((item) => filterFn(item, level))[0];
        if (!found)
            break;
        result.push(found);
        const nextChildren = found[childrenKeyName];
        children = Array.isArray(nextChildren) ? nextChildren : [];
        level += 1;
    } while (children.length > 0);
    return result;
}
let CascaderPickerView = class CascaderPickerView extends Doraemon {
    prefixCls;
    pickerPrefixCls;
    value;
    cols;
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
    inputValue = [];
    showOptions = [];
    pickerFieldNamesData = {
        label: 'label',
        value: 'value',
        disabled: 'disabled',
    };
    getFieldNamesSafe() {
        return {
            label: this.defaultFieldNames?.label || 'label',
            value: this.defaultFieldNames?.value || 'value',
            disabled: this.defaultFieldNames?.disabled || 'disabled',
            children: this.defaultFieldNames?.children || 'children',
        };
    }
    onInputValueChange(newVal) {
        const names = this.getFieldNamesSafe();
        const showOptions = this.getShowOptions(newVal).map((option) => option.map((v) => {
            const out = {
                [names.value]: v[names.value],
                [names.label]: v[names.label],
            };
            if (v[names.disabled] !== undefined)
                out[names.disabled] = !!v[names.disabled];
            if (v.labelImage !== undefined)
                out.labelImage = v.labelImage;
            return out;
        }));
        this.showOptions = showOptions;
    }
    onValueOptionsColsChange() {
        this.setValue(this.value, this.options, this.cols);
    }
    onFieldNamesChange() {
        const names = this.getFieldNamesSafe();
        this.pickerFieldNamesData = { label: names.label, value: names.value, disabled: names.disabled };
        this.setValue(this.value, this.options, this.cols);
    }
    updated(inputValue, force = false) {
        if (force || this.inputValue.join('|') !== inputValue.join('|'))
            this.inputValue = [...inputValue];
    }
    setValue(value, options, cols) {
        this.updated(this.getRealValue(options, value, cols), true);
    }
    onValueChange(e) {
        const { value, index } = e.detail;
        const newValue = this.getNextValue(value, index);
        const inputValue = this.getRealValue(this.options, newValue);
        const values = this.getValue(inputValue);
        this.updated(inputValue, true);
        this.$emit('valueChange', { ...values, index });
    }
    getValue(value = this.inputValue) {
        const names = this.getFieldNamesSafe();
        const cols = this.showOptions;
        const inputValue = getRealValues(Array.isArray(value) ? value : [], cols, names);
        const selectedValue = [...inputValue];
        const selectedIndex = getIndexesFromValues(inputValue, cols, names);
        const displayValue = getLabelsFromIndexes(selectedIndex, cols, names.label);
        return { value: inputValue, displayValue, selectedIndex, selectedValue, cols };
    }
    getNextValue(activeValue, index) {
        const names = this.getFieldNamesSafe();
        const children = arrayTreeFilter(this.options, (option, level) => level <= index && option[names.value] === activeValue[level], names.children);
        let data = children[index];
        let i = index + 1;
        while (i < this.cols) {
            const next = data?.[names.children];
            if (Array.isArray(next) && next.length) {
                data = next[0];
                activeValue[i] = String(data[names.value] ?? '');
            }
            i++;
        }
        activeValue.length = i;
        return activeValue;
    }
    getRealValue(options, activeValue, cols = this.cols) {
        const names = this.getFieldNamesSafe();
        if (!activeValue || !activeValue.length || activeValue.indexOf(undefined) > -1 || activeValue.length !== cols) {
            const newValue = [];
            let data = [...options];
            let i = 0;
            while (i < cols) {
                if (data && data.length) {
                    const firstValue = String(data[0][names.value] ?? '');
                    newValue[i] = activeValue?.[i] || firstValue;
                    let idx = data.map((v) => String(v[names.value] ?? '')).indexOf(newValue[i]);
                    if (idx === -1) {
                        idx = 0;
                        newValue[i] = firstValue;
                    }
                    const next = data[idx][names.children];
                    data = Array.isArray(next) ? next : [];
                }
                i++;
            }
            return newValue;
        }
        return activeValue;
    }
    getActiveOptions(activeValue) {
        const names = this.getFieldNamesSafe();
        return arrayTreeFilter(this.options, (option, level) => String(option[names.value] ?? '') === activeValue[level], names.children);
    }
    getShowOptions(activeValue) {
        const names = this.getFieldNamesSafe();
        const result = this.getActiveOptions(activeValue)
            .map((activeOption) => activeOption[names.children])
            .filter((activeOption) => Array.isArray(activeOption));
        return [this.options, ...result].filter((_, i) => i < this.cols);
    }
    mounted() {
        this.onFieldNamesChange();
        this.setValue(this.value, this.options, this.cols);
    }
};
__decorate([
    Prop({ type: String, default: 'dora-picker-view' })
], CascaderPickerView.prototype, "pickerPrefixCls", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], CascaderPickerView.prototype, "value", void 0);
__decorate([
    Prop({ type: Number, default: 3 })
], CascaderPickerView.prototype, "cols", void 0);
__decorate([
    Prop({ type: Number, default: 34 })
], CascaderPickerView.prototype, "itemHeight", void 0);
__decorate([
    Prop({ type: null, default: '' })
], CascaderPickerView.prototype, "itemStyle", void 0);
__decorate([
    Prop({ type: null, default: '' })
], CascaderPickerView.prototype, "indicatorStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], CascaderPickerView.prototype, "indicatorClass", void 0);
__decorate([
    Prop({ type: null, default: '' })
], CascaderPickerView.prototype, "maskStyle", void 0);
__decorate([
    Prop({ type: String, default: '' })
], CascaderPickerView.prototype, "maskClass", void 0);
__decorate([
    Prop({ type: String, default: 'center' })
], CascaderPickerView.prototype, "labelAlign", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], CascaderPickerView.prototype, "loading", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], CascaderPickerView.prototype, "options", void 0);
__decorate([
    Prop({ type: Object, default: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' } })
], CascaderPickerView.prototype, "defaultFieldNames", void 0);
__decorate([
    Watch('inputValue')
], CascaderPickerView.prototype, "onInputValueChange", null);
__decorate([
    Watch('value'),
    Watch('options'),
    Watch('cols')
], CascaderPickerView.prototype, "onValueOptionsColsChange", null);
__decorate([
    Watch('defaultFieldNames')
], CascaderPickerView.prototype, "onFieldNamesChange", null);
CascaderPickerView = __decorate([
    Component({
        props: {
            prefixCls: { type: String, default: 'dora-picker' },
        },
    })
], CascaderPickerView);
export default defineComponentHOC()(CascaderPickerView);
