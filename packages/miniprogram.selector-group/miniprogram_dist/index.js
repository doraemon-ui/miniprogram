/**
 * @doraemon-ui/miniprogram.selector-group.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 16:16:35.
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
let SelectorGroup = class SelectorGroup extends Doraemon {
    prefixCls;
    theme;
    shape;
    columns;
    gap;
    options;
    defaultValue;
    value;
    controlled;
    multiple;
    showCheckMark;
    defaultFieldNames;
    extStyle = '';
    inputValue = [];
    get classes() {
        const { prefixCls, theme, shape } = this;
        const finalShape = ['rounded', 'rectangular'].includes(shape) ? shape : '';
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${theme}`]: !!theme,
        });
        return {
            wrap,
            grid: `${prefixCls}__grid`,
            gridItem: classNames(`${prefixCls}__grid-item`, {
                [`${prefixCls}__grid-item--${finalShape}`]: !!finalShape,
            }),
            desc: `${prefixCls}__desc`,
            checkMark: `${prefixCls}__check-mark`,
            checkMarkIcon: `${prefixCls}__check-mark-icon`,
            selectable: `${prefixCls}__selectable`,
        };
    }
    get fieldNames() {
        return {
            label: this.defaultFieldNames?.label || 'label',
            value: this.defaultFieldNames?.value || 'value',
            disabled: this.defaultFieldNames?.disabled || 'disabled',
        };
    }
    get optionsView() {
        const { label, value, disabled } = this.fieldNames;
        return (this.options || []).map((item) => {
            if (typeof item === 'string') {
                return { label: item, value: item, disabled: false, desc: '', checked: this.inputValue.includes(item) };
            }
            const v = String(item[value] ?? item[label] ?? '');
            const l = String(item[label] ?? v);
            return {
                label: l,
                value: v,
                disabled: !!item[disabled],
                desc: String(item.desc ?? ''),
                checked: this.inputValue.includes(v),
            };
        });
    }
    onValueChange(v) {
        if (this.controlled)
            this.updated(v || []);
    }
    onStyleDepsChange() {
        this.updateStyle(this.columns, this.gap);
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue)
            this.inputValue = inputValue;
    }
    updateStyle(columns, gap) {
        this.extStyle = `--selector-group-columns:${columns};--selector-group-column-gap:${gap * 2}rpx;`;
    }
    getValue(value = this.inputValue) {
        const cols = this.optionsView;
        const checkedValues = value.reduce((acc, val) => {
            return [...acc, ...cols.filter((option) => option.value === val).map((option) => ({ label: option.label, value: option.value }))];
        }, []);
        const displayValue = checkedValues.map((option) => option.label);
        const allValues = cols.map((option) => option.value);
        const selectedIndex = value.map((n) => allValues.indexOf(n));
        return {
            value,
            displayValue,
            selectedIndex,
            selectedValue: value,
            cols,
        };
    }
    onCheckboxChange(e) {
        const { value, checked } = e.detail;
        const checkedValues = this.multiple
            ? (this.inputValue.includes(value)
                ? this.inputValue.filter((n) => n !== value)
                : [...this.inputValue, value])
            : (checked ? [value] : []);
        if (!this.controlled)
            this.updated(checkedValues);
        this.$emit('change', this.getValue(checkedValues));
    }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.updated(inputValue || []);
        this.updateStyle(this.columns, this.gap);
    }
};
__decorate([
    Prop({ type: String, default: 'balanced' })
], SelectorGroup.prototype, "theme", void 0);
__decorate([
    Prop({ type: String, default: 'default' })
], SelectorGroup.prototype, "shape", void 0);
__decorate([
    Prop({ type: Number, default: 3 })
], SelectorGroup.prototype, "columns", void 0);
__decorate([
    Prop({ type: Number, default: 8 })
], SelectorGroup.prototype, "gap", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], SelectorGroup.prototype, "options", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], SelectorGroup.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: Array, default: [] })
], SelectorGroup.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SelectorGroup.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SelectorGroup.prototype, "multiple", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], SelectorGroup.prototype, "showCheckMark", void 0);
__decorate([
    Prop({ type: Object, default: { label: 'label', value: 'value', disabled: 'disabled' } })
], SelectorGroup.prototype, "defaultFieldNames", void 0);
__decorate([
    Watch('value')
], SelectorGroup.prototype, "onValueChange", null);
__decorate([
    Watch('columns'),
    Watch('gap')
], SelectorGroup.prototype, "onStyleDepsChange", null);
SelectorGroup = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-selector-group',
            },
        },
    })
], SelectorGroup);
export default defineComponentHOC()(SelectorGroup);
