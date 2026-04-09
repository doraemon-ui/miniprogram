/**
 * @doraemon-ui/miniprogram.checkbox.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 19:38:28.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Watch, Event, } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
import { checkboxGroupProps } from './props';
function normalizeOptions(options, values) {
    const checkedValues = Array.isArray(values) ? values : [];
    return (options || []).map((option, index) => {
        if (typeof option === 'string') {
            return {
                index,
                title: option,
                __comp_unique_key: option,
                value: option,
                __checked: checkedValues.includes(option),
            };
        }
        const title = option.title != null ? option.title : '';
        const value = option.value != null ? option.value : '';
        return {
            ...option,
            index,
            __comp_unique_key: option.value !== undefined ? option.value : index,
            title,
            value,
            __checked: checkedValues.includes(value),
        };
    });
}
function getCheckedValues(newVal, oldVal = []) {
    const checkedValues = Array.isArray(oldVal) ? [...oldVal] : [];
    return checkedValues.indexOf(newVal) !== -1 ? checkedValues.filter((n) => n !== newVal) : [...checkedValues, newVal];
}
let CheckboxGroupClass = class CheckboxGroupClass extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    prefixCls;
    /**
     * `dora-list` 组件的类名前缀
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    cellGroupPrefixCls;
    /**
     * 当前选中的值（受控）
     *
     * @type {string[]}
     * @memberof CheckboxGroup
     */
    value;
    /**
     * 表单字段名
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    name;
    /**
     * 标题
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    title;
    /**
     * 描述
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    label;
    /**
     * 选项列表（支持 slot 或 options 传入）
     *
     * @type {CheckboxGroupOption[]}
     * @memberof CheckboxGroup
     */
    options;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    disabled;
    /**
     * 是否只读
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    readOnly;
    /**
     * list 组件的模式
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    mode;
    /**
     * 自定义 body 样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof CheckboxGroup
     */
    bodyStyle;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    hasLine;
    /**
     * 是否使用 `dora-list` 组件包裹
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    withListComponent;
    /**
     * 图标位置
     *
     * @type {CheckboxIconPosition}
     * @memberof CheckboxGroup
     */
    iconPosition;
    /**
     * 图标大小
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    iconSize;
    /**
     * 选中图标
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    iconOn;
    /**
     * 未选中图标
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    iconOff;
    hasFieldDecorator = false;
    inputValue = [];
    keys = [];
    showOptions = [];
    onValueChange(newVal) {
        if (this.hasFieldDecorator)
            return;
        this.updated(newVal);
        this.showOptions = normalizeOptions(this.options, newVal);
        this.changeValue({ value: newVal });
    }
    onOptionsChange() {
        this.showOptions = normalizeOptions(this.options, this.inputValue);
        this.changeValue();
    }
    onContextChange() {
        this.changeValue();
    }
    onChildrenChanged() {
        this.changeValue();
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue) {
            this.inputValue = inputValue;
        }
    }
    changeValue(props = {}) {
        const { disabled, readOnly, hasLine, withListComponent, iconPosition, iconSize, iconOn, iconOff, prefixCls } = this;
        const value = props.value != null ? props.value : this.inputValue;
        const showOptions = this.showOptions;
        const setChildrenValues = (children) => {
            const keys = [];
            if (children && children.length > 0) {
                const lastIndex = children.length - 1;
                children.forEach((child, index) => {
                    const active = Array.isArray(value) && value.includes(child.value);
                    const isLast = index === lastIndex;
                    child.changeValue(active, index, isLast, {
                        disabled,
                        readOnly,
                        hasLine,
                        hasFieldDecorator: !!this.hasFieldDecorator,
                        withListComponent,
                        iconPosition,
                        iconSize,
                        iconOn,
                        iconOff,
                    });
                    keys.push(child.$data);
                });
            }
            this.keys = keys;
        };
        Doraemon.nextTick(() => {
            const proxy = this._renderProxy;
            const selectedNodes = (typeof proxy.selectAllComponents === 'function'
                ? proxy.selectAllComponents(showOptions.length > 0 ? `.${prefixCls}__checkbox` : 'dora-checkbox')
                : []);
            const relationNodes = this.$children;
            const rawNodes = (selectedNodes && selectedNodes.length > 0 ? selectedNodes : relationNodes) || [];
            const children = rawNodes
                .map((node) => node.$component
                ? node.$component
                : node)
                .filter((node) => {
                const child = node;
                return typeof child.changeValue === 'function';
            });
            setChildrenValues(children);
        });
    }
    onChange(item) {
        const checkedValues = getCheckedValues(item.value, this.inputValue);
        this.$emit('change', {
            ...this.getValue(checkedValues),
            ...item,
            name: this.name,
        });
    }
    onCheckboxChange(e) {
        // Set real index
        const { index } = e.currentTarget.dataset;
        this.onChange({
            ...e.detail,
            index,
        });
    }
    getValue(value = this.inputValue, cols = this.keys) {
        const values = Array.isArray(value) ? value : [];
        const checkedValues = values.reduce((acc, val) => [...acc, ...cols.filter((option) => option.value === val)], []);
        const displayValue = checkedValues.map((option) => option.title) || [];
        const allValues = cols.map((option) => option.value);
        const selectedIndex = values.map((n) => allValues.indexOf(n));
        return {
            value: values,
            displayValue,
            selectedIndex,
            selectedValue: values,
            cols,
        };
    }
    getBoundingClientRect() {
        return useRect(`.${this.prefixCls}`, this._renderProxy);
    }
    mounted() {
        this.updated(this.value);
        this.showOptions = normalizeOptions(this.options, this.value);
        this.changeValue();
    }
};
__decorate([
    Watch('value')
], CheckboxGroupClass.prototype, "onValueChange", null);
__decorate([
    Watch('options')
], CheckboxGroupClass.prototype, "onOptionsChange", null);
__decorate([
    Watch('disabled'),
    Watch('readOnly'),
    Watch('hasLine'),
    Watch('withListComponent'),
    Watch('iconPosition'),
    Watch('iconSize'),
    Watch('iconOn'),
    Watch('iconOff'),
    Watch('prefixCls')
], CheckboxGroupClass.prototype, "onContextChange", null);
__decorate([
    Event()
], CheckboxGroupClass.prototype, "onCheckboxChange", null);
CheckboxGroupClass = __decorate([
    Component({
        components: {
            Checkbox: () => ({
                module: './index',
                type: 'descendant',
                observer: 'onChildrenChanged',
            }),
        },
        props: checkboxGroupProps,
        expose: ['getValue', 'getBoundingClientRect', 'changeValue', 'onChange'],
    })
], CheckboxGroupClass);
export const CheckboxGroup = defineComponentHOC({ behaviors: ['wx://form-field'] })(CheckboxGroupClass);
export default CheckboxGroup;
