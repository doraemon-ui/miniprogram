/**
 * @doraemon-ui/miniprogram.checkbox.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:10.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Watch, Component, defineComponentHOC, Doraemon } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
import { checkboxGroupProps } from './props.js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function normalizeOptions(options, values) {
    const checkedValues = Array.isArray(values) ? values : [];
    return (options || []).map((option, index)=>{
        if (typeof option === 'string') {
            return {
                index,
                title: option,
                __comp_unique_key: option,
                value: option,
                __checked: checkedValues.includes(option)
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
            __checked: checkedValues.includes(value)
        };
    });
}
function getCheckedValues(newVal, oldVal = []) {
    const checkedValues = Array.isArray(oldVal) ? [
        ...oldVal
    ] : [];
    return checkedValues.indexOf(newVal) !== -1 ? checkedValues.filter((n)=>n !== newVal) : [
        ...checkedValues,
        newVal
    ];
}
let CheckboxGroup = class CheckboxGroup extends Doraemon {
    onValueChange(newVal) {
        if (this.hasFieldDecorator) return;
        this.updated(newVal);
        this.showOptions = normalizeOptions(this.options, newVal);
        this.changeValue({
            value: newVal
        });
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
        const setChildrenValues = (children)=>{
            const keys = [];
            if (children && children.length > 0) {
                const lastIndex = children.length - 1;
                children.forEach((child, index)=>{
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
                        iconOff
                    });
                    keys.push(child.$data);
                });
            }
            this.keys = keys;
        };
        Doraemon.nextTick(()=>{
            const proxy = this._renderProxy;
            const selectedNodes = typeof proxy.selectAllComponents === 'function' ? proxy.selectAllComponents(showOptions.length > 0 ? `.${prefixCls}__checkbox` : 'dora-checkbox') : [];
            const relationNodes = this.$children;
            const rawNodes = (selectedNodes && selectedNodes.length > 0 ? selectedNodes : relationNodes) || [];
            const children = rawNodes.map((node)=>node.$component ? node.$component : node).filter((node)=>{
                const child = node;
                return typeof child.changeValue === 'function' && typeof child.value === 'string' && typeof child.title === 'string';
            });
            setChildrenValues(children);
        });
    }
    onChange(item) {
        const checkedValues = getCheckedValues(item.value, this.inputValue);
        this.$emit('change', {
            ...this.getValue(checkedValues),
            ...item,
            name: this.name
        });
    }
    onCheckboxChange(e) {
        // Set real index
        const { index } = e.currentTarget.dataset;
        this.onChange({
            ...e.detail,
            index
        });
    }
    getValue(value = this.inputValue, cols = this.keys) {
        const values = Array.isArray(value) ? value : [];
        const checkedValues = values.reduce((acc, val)=>[
                ...acc,
                ...cols.filter((option)=>option.value === val)
            ], []);
        const displayValue = checkedValues.map((option)=>option.title) || [];
        const allValues = cols.map((option)=>option.value);
        const selectedIndex = values.map((n)=>allValues.indexOf(n));
        return {
            value: values,
            displayValue,
            selectedIndex,
            selectedValue: values,
            cols
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
    constructor(...args){
        super(...args);
        this.hasFieldDecorator = false;
        this.inputValue = [];
        this.keys = [];
        this.showOptions = [];
    }
};
_ts_decorate([
    Watch('value')
], CheckboxGroup.prototype, "onValueChange", null);
_ts_decorate([
    Watch('options')
], CheckboxGroup.prototype, "onOptionsChange", null);
_ts_decorate([
    Watch('disabled'),
    Watch('readOnly'),
    Watch('hasLine'),
    Watch('withListComponent'),
    Watch('iconPosition'),
    Watch('iconSize'),
    Watch('iconOn'),
    Watch('iconOff'),
    Watch('prefixCls')
], CheckboxGroup.prototype, "onContextChange", null);
CheckboxGroup = _ts_decorate([
    Component({
        components: {
            Checkbox: ()=>({
                    module: './index',
                    type: 'descendant',
                    observer: 'onChildrenChanged'
                })
        },
        props: checkboxGroupProps,
        expose: [
            'getValue',
            'getBoundingClientRect',
            'changeValue',
            'onChange'
        ]
    })
], CheckboxGroup);
var group = defineComponentHOC({
    behaviors: [
        'wx://form-field'
    ]
})(CheckboxGroup);

export { CheckboxGroup, group as default };
