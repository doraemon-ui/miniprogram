/**
 * @doraemon-ui/miniprogram.filterbar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 19:45:47.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.65.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
function clone(obj) {
    if (obj == null) return obj;
    return JSON.parse(JSON.stringify(obj));
}
function isContain(source, value) {
    return Array.isArray(source) ? source.includes(value) : source === value;
}
function getValue(children = [], single = false) {
    const allValues = children.filter((item)=>item.checked).map((item)=>item.value);
    return single ? allValues[0] || '' : allValues;
}
function getGroupOptions(children = []) {
    return children.map((item)=>({
            title: item.label,
            value: `${item.value}`,
            color: 'assertive'
        }));
}
function getSortValue(sort) {
    return typeof sort === 'number' && [
        1,
        -1
    ].includes(sort) ? sort : 1;
}
function getValues(options = []) {
    return options.reduce((acc, option)=>{
        switch(option.type){
            case 'radio':
                acc.push(getValue(option.children, true));
                break;
            case 'checkbox':
                acc.push(getValue(option.children, false));
                break;
            case 'text':
                acc.push(option.checked ? option.value || '' : '');
                break;
            case 'sort':
                acc.push(option.checked ? getSortValue(option.sort) : '');
                break;
            case 'filter':
                acc.push(getValues(option.children));
                break;
            default:
                acc.push('');
                break;
        }
        return acc;
    }, []);
}
function getFilterChildSelected(option, value) {
    if (option.type === 'radio' || option.type === 'checkbox') {
        return option.children.filter((item)=>isContain(value, item.value)).map((item)=>item.label).join(',');
    }
    return '';
}
function getDisplayValue(option, value) {
    switch(option.type){
        case 'radio':
        case 'checkbox':
            {
                const labels = option.children.filter((item)=>isContain(value, item.value)).map((item)=>item.label).join(',');
                return labels || option.label;
            }
        case 'filter':
            return option.children.map((child, index)=>getFilterChildSelected(child, Array.isArray(value) ? value[index] : undefined));
        default:
            return option.label;
    }
}
function getDifference(data = [], values = []) {
    return data.filter((item)=>values.includes(item));
}
function hasCheckedValue(value) {
    if (Array.isArray(value)) {
        return value.some((item)=>hasCheckedValue(item));
    }
    return value !== '' && value !== undefined && value !== null;
}
function applyValuesToOptions(options, values) {
    return options.map((option, index)=>{
        const value = values[index];
        switch(option.type){
            case 'radio':
                {
                    const children = option.children.map((child)=>({
                            ...child,
                            checked: value === child.value
                        }));
                    return {
                        ...option,
                        checked: value !== '',
                        visible: false,
                        children
                    };
                }
            case 'checkbox':
                {
                    const checkedValues = Array.isArray(value) ? value : [];
                    const children = option.children.map((child)=>({
                            ...child,
                            checked: checkedValues.includes(child.value)
                        }));
                    return {
                        ...option,
                        checked: checkedValues.length > 0,
                        visible: false,
                        children
                    };
                }
            case 'filter':
                {
                    const childValues = Array.isArray(value) ? value : [];
                    const children = option.children.map((child, childIndex)=>{
                        const nextValue = childValues[childIndex];
                        if (child.type === 'radio') {
                            const nextChildren = child.children.map((item)=>({
                                    ...item,
                                    checked: nextValue === item.value
                                }));
                            return {
                                ...child,
                                children: nextChildren
                            };
                        }
                        const nextChildren = child.children.map((item)=>({
                                ...item,
                                checked: Array.isArray(nextValue) ? nextValue.includes(item.value) : false
                            }));
                        return {
                            ...child,
                            children: nextChildren
                        };
                    });
                    return {
                        ...option,
                        checked: hasCheckedValue(value),
                        visible: false,
                        children
                    };
                }
            default:
                return option;
        }
    });
}
function clearOptionSelection(option) {
    switch(option.type){
        case 'radio':
        case 'checkbox':
            return {
                ...option,
                checked: false,
                visible: false,
                children: option.children.map((child)=>({
                        ...child,
                        checked: false
                    }))
            };
        case 'filter':
            return {
                ...option,
                checked: false,
                visible: false,
                children: option.children.map((child)=>({
                        ...child,
                        children: child.children.map((item)=>({
                                ...item,
                                checked: false
                            }))
                    }))
            };
        case 'sort':
            return {
                ...option,
                checked: false,
                sort: undefined
            };
        default:
            return {
                ...option,
                checked: false,
                visible: false
            };
    }
}
function getItemClass(prefixCls, option) {
    return classNames(`${prefixCls}__item`, {
        [`${prefixCls}__item--has-icon`]: option.type !== 'text',
        [`${prefixCls}__item--checked`]: !!option.checked,
        [`${prefixCls}__item--visible`]: !!option.visible
    });
}
function getIconClass(prefixCls, option) {
    const iconClasses = [
        `${prefixCls}__icon`
    ];
    if (option.type !== 'text') {
        iconClasses.push(`${prefixCls}__icon--${option.type}`);
    }
    if (option.type === 'sort') {
        if (option.sort === 1) {
            iconClasses.push(`${prefixCls}__icon--sort-asc`);
        } else if (option.sort === -1) {
            iconClasses.push(`${prefixCls}__icon--sort-desc`);
        }
    }
    return classNames(iconClasses);
}
function buildFilterChildren(children, value) {
    const childValues = Array.isArray(value) ? value : [];
    return children.map((child, childIndex)=>{
        const currentValue = childValues[childIndex];
        return {
            ...child,
            selected: getFilterChildSelected(child, currentValue),
            children: child.children.map((item)=>({
                    ...item,
                    checked: isContain(currentValue, item.value)
                }))
        };
    });
}
function buildRenderOptions(prefixCls, options, values) {
    return options.map((option, index)=>{
        const currentValue = values[index];
        return {
            ...option,
            displayLabel: getDisplayValue(option, currentValue),
            itemClass: getItemClass(prefixCls, option),
            iconClass: getIconClass(prefixCls, option),
            groupOptions: option.type === 'radio' || option.type === 'checkbox' ? getGroupOptions(option.children) : undefined,
            children: option.type === 'filter' ? buildFilterChildren(option.children, currentValue) : 'children' in option ? option.children.map((child)=>({
                    ...child,
                    checked: isContain(currentValue, child.value)
                })) : undefined
        };
    });
}
function getDisplayItems(options, values) {
    return options.map((option, index)=>{
        if (option.type === 'radio' || option.type === 'checkbox') {
            return {
                ...option,
                selected: getDisplayValue(option, values[index])
            };
        }
        if (option.type === 'filter') {
            return {
                ...option,
                children: option.children.map((child, childIndex)=>({
                        ...child,
                        selected: getFilterChildSelected(child, Array.isArray(values[index]) ? values[index][childIndex] : undefined)
                    }))
            };
        }
        return {
            ...option
        };
    });
}
let Filterbar = class Filterbar extends Doraemon {
    get classes() {
        const prefixCls = this.prefixCls;
        return {
            wrap: classNames(prefixCls),
            bd: `${prefixCls}__bd`,
            text: `${prefixCls}__text`,
            pop: `${prefixCls}__pop`,
            select: `${prefixCls}__select`,
            scrollView: `${prefixCls}__scroll-view`,
            panel: `${prefixCls}__panel`,
            panelHd: `${prefixCls}__panel-hd`,
            panelTitle: `${prefixCls}__panel-title`,
            panelSelected: `${prefixCls}__panel-selected`,
            panelBd: `${prefixCls}__panel-bd`,
            groups: `${prefixCls}__groups`,
            group: `${prefixCls}__group`,
            radio: `${prefixCls}__radio`,
            check: `${prefixCls}__check`,
            btn: `${prefixCls}__btn`,
            btnChecked: `${prefixCls}__btn--checked`,
            btns: `${prefixCls}__btns`,
            btnDanger: `${prefixCls}__btn--danger`
        };
    }
    onItemsChange(newVal) {
        this.syncItems(newVal);
    }
    syncItems(items = []) {
        const options = clone(items) || [];
        this.options = options;
        this.values = getValues(options);
        this.activeIndex = -1;
        this.backdropVisible = false;
        this.refreshShowOptions();
    }
    refreshShowOptions() {
        this.showOptions = buildRenderOptions(this.prefixCls, this.options, this.values);
    }
    updatedValues(values, callback) {
        this.values = values;
        this.refreshShowOptions();
        if (typeof callback === 'function') callback();
    }
    onBackdropClick() {
        if (this.activeIndex !== -1) {
            this.onSelectClose(this.activeIndex);
        }
    }
    onClose(e) {
        this.onSelectClose(e.currentTarget.dataset.index);
    }
    onSelectClose(index, callback) {
        this.options = this.options.map((option, optionIndex)=>({
                ...option,
                visible: optionIndex === index ? false : !!option.visible
            }));
        this.values = getValues(this.options);
        this.activeIndex = -1;
        this.backdropVisible = false;
        this.refreshShowOptions();
        if (typeof callback === 'function') callback();
    }
    onSelectReset(e) {
        const { index } = e.currentTarget.dataset;
        const values = [
            ...this.values
        ];
        values[index] = [];
        this.updatedValues(values);
    }
    onSelectConfirm(e) {
        const { index } = e.currentTarget.dataset;
        this.options = applyValuesToOptions(this.options, this.values);
        this.onSelectClose(index, ()=>this.onChange());
    }
    onPopupSelectChange(e) {
        const values = [
            ...this.values
        ];
        const { value } = e.detail;
        const { index, parentIndex } = e.currentTarget.dataset;
        const parentValues = Array.isArray(values[parentIndex]) ? [
            ...values[parentIndex]
        ] : [];
        parentValues[index] = value;
        values[parentIndex] = parentValues;
        this.updatedValues(values);
    }
    onSelectChange(e) {
        const values = [
            ...this.values
        ];
        const value = e.detail.selectedValue ?? e.detail.value ?? '';
        const { index, type } = e.currentTarget.dataset;
        values[index] = value;
        this.updatedValues(values);
        if (type === 'radio') {
            this.options = applyValuesToOptions(this.options, values);
            this.onSelectClose(index, ()=>this.onChange());
        }
    }
    onClick(e) {
        const { index } = e.currentTarget.dataset;
        const options = this.options;
        if (!options[index].visible) {
            this.values = getValues(options);
        }
        this.onOpenSelect(index);
    }
    onOpenSelect(index) {
        const current = this.options[index];
        const options = this.options.map((option, optionIndex)=>{
            let nextChecked = optionIndex === index ? !option.checked : false;
            if (option.checked) {
                const has = getDifference(option.groups || [], current.groups || []);
                nextChecked = has.length > 0;
                if (option.type === 'text' && optionIndex === index) {
                    nextChecked = false;
                }
                if (optionIndex !== index && has.length === 0) {
                    return clearOptionSelection({
                        ...option,
                        checked: nextChecked
                    });
                }
            }
            switch(option.type){
                case 'radio':
                case 'checkbox':
                case 'filter':
                    return {
                        ...option,
                        checked: nextChecked,
                        visible: optionIndex === index ? !option.visible : false
                    };
                case 'sort':
                    return {
                        ...option,
                        checked: nextChecked,
                        sort: optionIndex === index ? typeof option.sort === 'number' ? option.sort * -1 : 1 : option.sort
                    };
                default:
                    return {
                        ...option,
                        checked: nextChecked,
                        visible: false
                    };
            }
        });
        this.options = options;
        this.activeIndex = options[index].visible ? index : -1;
        this.backdropVisible = !!options[index].visible && options[index].type === 'filter';
        this.refreshShowOptions();
        if (current.type !== 'radio' && current.type !== 'checkbox' && current.type !== 'filter') {
            this.onChange();
        }
    }
    onChange() {
        const checkedValues = getValues(this.options);
        const items = getDisplayItems(this.options, checkedValues);
        this.values = checkedValues;
        this.refreshShowOptions();
        this.$emit('change', {
            checkedItems: items.filter((item)=>item.checked),
            items,
            checkedValues
        });
    }
    onScroll(e) {
        this.$emit('scroll', e.detail);
    }
    onOpen(e) {
        this.$emit('open', e.detail);
    }
    onClosed(e) {
        this.$emit('close', e.detail);
    }
    noop() {
    /**
     * Ignore
     */ }
    mounted() {
        this.syncItems(this.items);
    }
    constructor(...args){
        super(...args);
        this.options = [];
        this.values = [];
        this.showOptions = [];
        this.activeIndex = -1;
        this.backdropVisible = false;
    }
};
_ts_decorate([
    Prop({
        type: Array,
        default: ()=>[]
    })
], Filterbar.prototype, "items", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '重置'
    })
], Filterbar.prototype, "cancelText", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: '确定'
    })
], Filterbar.prototype, "confirmText", void 0);
_ts_decorate([
    Watch('items')
], Filterbar.prototype, "onItemsChange", null);
Filterbar = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-filterbar'
            }
        }
    })
], Filterbar);
var index = defineComponentHOC()(Filterbar);

export { Filterbar, index as default };
