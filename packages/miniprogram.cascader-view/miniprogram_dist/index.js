/**
 * @doraemon-ui/miniprogram.cascader-view.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 02:09:44.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames, styleToCssString } = Doraemon.util;
const DORA_CASCADER_VIEW = 'dora-cascader-view';
export function getDefaultFieldNames() {
    return {
        label: 'label',
        value: 'value',
        children: 'children',
        disabled: 'disabled',
    };
}
export function setFieldNames(fieldNames = {}) {
    return {
        ...getDefaultFieldNames(),
        ...fieldNames,
    };
}
function arrayTreeFilter(data, filterFn, options) {
    const childrenKeyName = options?.childrenKeyName || 'children';
    let children = data || [];
    const result = [];
    let level = 0;
    do {
        const foundItem = children.filter((item) => filterFn(item, level))[0];
        if (!foundItem)
            break;
        result.push(foundItem);
        const nextChildren = foundItem[childrenKeyName];
        children = Array.isArray(nextChildren) ? nextChildren : [];
        level += 1;
    } while (children.length > 0);
    return result;
}
function getOptionString(option, key) {
    const v = option[key];
    return v != null ? String(v) : '';
}
function getOptionChildren(option, key) {
    const v = option[key];
    return Array.isArray(v) ? v : null;
}
function normalizeOptionList(options, valueKey) {
    return (options || []).map((option, index) => {
        const v = option[valueKey];
        const __comp_unique_key = typeof v === 'string' || typeof v === 'number' ? v : index;
        return {
            ...option,
            __comp_unique_key,
        };
    });
}
let CascaderView = class CascaderView extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof CascaderView
     */
    prefixCls;
    /**
     * 默认值（非受控）
     *
     * @type {string[]}
     * @memberof CascaderView
     */
    defaultValue;
    /**
     * 当前值（受控）
     *
     * @type {string[]}
     * @memberof CascaderView
     */
    value;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof CascaderView
     */
    controlled;
    /**
     * 级联选项
     *
     * @type {CascaderOption[]}
     * @memberof CascaderView
     */
    options;
    /**
     * 是否占满宽度（双列布局变为单列）
     *
     * @type {boolean}
     * @memberof CascaderView
     */
    full;
    /**
     * 占位文案
     *
     * @type {string}
     * @memberof CascaderView
     */
    placeholder;
    /**
     * 自定义高度
     *
     * @type {(string | number)}
     * @memberof CascaderView
     */
    height;
    /**
     * 是否跳过动画
     *
     * @type {boolean}
     * @memberof CascaderView
     */
    skipAnimation;
    /**
     * 自定义字段名映射
     *
     * @type {Partial<CascaderFieldNames>}
     * @memberof CascaderView
     */
    defaultFieldNames;
    useFieldNames = false;
    fieldNames = getDefaultFieldNames();
    activeOptions = [];
    activeIndex = 0;
    bodyStyle = '';
    activeValue = [];
    showOptions = [];
    scrollViewStyle = '';
    get classes() {
        const { prefixCls, full } = this;
        const wrap = classNames(prefixCls);
        const hd = `${prefixCls}__hd`;
        const bd = `${prefixCls}__bd`;
        const innerScroll = classNames(`${prefixCls}__inner-scroll`, {
            [`${prefixCls}__inner-scroll--full`]: full,
        });
        const scrollView = `${prefixCls}__scroll-view`;
        const ft = `${prefixCls}__ft`;
        return {
            wrap,
            hd,
            bd,
            innerScroll,
            scrollView,
            ft,
        };
    }
    getFieldNames() {
        return this.useFieldNames ? this.fieldNames : setFieldNames(this.defaultFieldNames);
    }
    getFieldName(name) {
        return this.getFieldNames()[name];
    }
    onValueChange(newVal) {
        if (this.controlled) {
            this.activeValue = newVal;
            this.getCurrentOptions(newVal);
        }
    }
    onOptionsChange() {
        this.getCurrentOptions(this.activeValue);
    }
    onHeightChange(newVal) {
        this.updateStyle(newVal);
    }
    onDefaultFieldNamesChange(newVal) {
        this.useFieldNames = true;
        this.fieldNames = setFieldNames(newVal);
        this.getCurrentOptions(this.activeValue);
    }
    getActiveOptions(activeValue) {
        const { options } = this;
        const valueKey = this.getFieldName('value');
        const childrenKeyName = this.getFieldName('children');
        return arrayTreeFilter(options, (option, level) => getOptionString(option, valueKey) === activeValue[level], {
            childrenKeyName,
        });
    }
    getShowOptions(activeValue) {
        const { options } = this;
        const valueKey = this.getFieldName('value');
        const childrenKey = this.getFieldName('children');
        const childrenOptions = this.getActiveOptions(activeValue)
            .map((activeOption) => getOptionChildren(activeOption, childrenKey))
            .filter((n) => Array.isArray(n) && n.length > 0);
        return [normalizeOptionList(options, valueKey), ...childrenOptions.map((list) => normalizeOptionList(list, valueKey))];
    }
    getMenus(activeValue = [], hasChildren) {
        const { placeholder } = this;
        const activeOptions = this.getActiveOptions(activeValue);
        if (hasChildren) {
            const valueKey = this.getFieldName('value');
            const labelKey = this.getFieldName('label');
            const placeholderOption = {
                [valueKey]: DORA_CASCADER_VIEW,
                [labelKey]: placeholder,
            };
            activeOptions.push(placeholderOption);
        }
        return activeOptions;
    }
    getNextActiveValue(value, optionIndex) {
        let { activeValue } = this;
        activeValue = activeValue.slice(0, optionIndex + 1);
        activeValue[optionIndex] = value;
        return activeValue;
    }
    updated(currentOptions, optionIndex, condition, callback) {
        const valueKey = this.getFieldName('value');
        const childrenKey = this.getFieldName('children');
        const children = getOptionChildren(currentOptions, childrenKey);
        const hasChildren = !!children && children.length > 0;
        const activeValue = this.getNextActiveValue(getOptionString(currentOptions, valueKey), optionIndex);
        const showOptions = this.getShowOptions(activeValue);
        const activeOptions = this.getMenus(activeValue, hasChildren);
        const activeIndex = activeOptions.length - 1;
        const props = {
            activeValue,
            activeOptions,
            activeIndex,
            showOptions,
        };
        const shouldUpdateTransform = hasChildren || activeValue.length === showOptions.length;
        if (shouldUpdateTransform) {
            const transformIndex = hasChildren ? optionIndex : Math.max(0, optionIndex - 1);
            props.bodyStyle = this.getTransform(transformIndex + 1);
            props.showOptions = showOptions;
        }
        if (condition) {
            this.setCascaderView(props);
        }
        if (typeof callback === 'function') {
            callback.call(this, currentOptions, activeValue);
        }
    }
    /**
     * 更新级联数据
     *
     * @param {string[]} activeValue 当前选中值
     * @memberof CascaderView
     */
    getCurrentOptions(activeValue = this.activeValue) {
        const optionIndex = Math.max(0, activeValue.length - 1);
        const activeOptions = this.getActiveOptions(activeValue);
        const currentOptions = activeOptions[optionIndex];
        if (currentOptions) {
            this.updated(currentOptions, optionIndex, true);
        }
        else {
            const valueKey = this.getFieldName('value');
            const labelKey = this.getFieldName('label');
            activeOptions.push({
                [valueKey]: DORA_CASCADER_VIEW,
                [labelKey]: this.placeholder,
            });
            const showOptions = this.getShowOptions(activeValue);
            const activeIndex = activeOptions.length - 1;
            this.setCascaderView({
                showOptions,
                activeOptions,
                activeIndex,
                bodyStyle: '',
            });
        }
    }
    setCascaderView(props) {
        const prevIndex = this.activeIndex;
        if (props.activeOptions) {
            this.activeOptions = props.activeOptions;
        }
        if (props.activeValue) {
            this.activeValue = props.activeValue;
        }
        if (props.showOptions) {
            this.showOptions = props.showOptions;
        }
        if (props.bodyStyle !== undefined) {
            this.bodyStyle = props.bodyStyle;
        }
        if (props.activeIndex !== undefined) {
            this.activeIndex = props.activeIndex;
            if (prevIndex !== props.activeIndex) {
                this.$emit('tabsChange', { index: props.activeIndex });
            }
        }
    }
    getTransform(index, animating = !this.skipAnimation) {
        const pt = this.full ? 2 : 1;
        const i = this.full ? index : index - 1;
        return styleToCssString({
            transition: animating ? 'transform .3s' : 'none',
            transform: `translate(${-50 * pt * Math.max(0, i)}%)`,
        });
    }
    /**
     * 点击菜单时的回调函数
     */
    onTabsChange(e) {
        const activeIndex = parseInt(e.detail.key, 10);
        const bodyStyle = this.getTransform(activeIndex);
        if (this.bodyStyle !== bodyStyle || this.activeIndex !== activeIndex) {
            this.bodyStyle = bodyStyle;
            this.activeIndex = activeIndex;
            this.$emit('tabsChange', { index: activeIndex });
        }
    }
    /**
     * 点击选项时的回调函数
     */
    onItemSelect(e) {
        const dataset = e.currentTarget.dataset;
        const optionIndex = typeof dataset.optionIndex === 'number' ? dataset.optionIndex : parseInt(String(dataset.optionIndex), 10);
        const { index } = e.detail;
        const { showOptions } = this;
        const item = showOptions[optionIndex]?.[index];
        if (!item)
            return;
        this.updated(item, optionIndex, !this.controlled, this.onChange);
    }
    /**
     * 选择完成时的回调函数
     */
    onChange(currentOptions = {}, activeValue = []) {
        const childrenKeyName = this.getFieldName('children');
        const values = this.getValue(activeValue);
        const hasChildren = !!getOptionChildren(currentOptions, childrenKeyName);
        if (currentOptions && currentOptions.isLeaf === false && !hasChildren) {
            this.$emit('change', { ...values });
            this.$emit('load', { value: values.value, options: values.options });
            return;
        }
        this.$emit('change', { ...values });
    }
    getValue(activeValue = this.activeValue) {
        const optionIndex = Math.max(0, activeValue.length - 1);
        const activeOptions = this.getActiveOptions(activeValue);
        const currentOptions = activeOptions[optionIndex];
        const valueKey = this.getFieldName('value');
        const childrenKeyName = this.getFieldName('children');
        const children = currentOptions ? getOptionChildren(currentOptions, childrenKeyName) : null;
        const hasChildren = !!children && children.length > 0;
        const options = activeOptions.filter((n) => getOptionString(n, valueKey) !== DORA_CASCADER_VIEW);
        const value = options.map((n) => getOptionString(n, valueKey));
        if (currentOptions && currentOptions.isLeaf === false && !children) {
            return {
                value,
                options,
                done: false,
            };
        }
        return {
            value,
            options,
            done: !hasChildren,
        };
    }
    updateStyle(height) {
        const scrollViewStyle = styleToCssString({
            height,
            minHeight: height,
        });
        if (this.scrollViewStyle !== scrollViewStyle) {
            this.scrollViewStyle = scrollViewStyle;
        }
    }
    mounted() {
        this.useFieldNames = true;
        this.fieldNames = setFieldNames(this.defaultFieldNames);
        const activeValue = this.controlled ? this.value : this.defaultValue;
        this.activeValue = activeValue;
        this.getCurrentOptions(activeValue);
        this.updateStyle(this.height);
    }
};
__decorate([
    Prop({ type: Array, default: () => [] })
], CascaderView.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: Array, default: () => [] })
], CascaderView.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], CascaderView.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Array, default: () => [] })
], CascaderView.prototype, "options", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], CascaderView.prototype, "full", void 0);
__decorate([
    Prop({ type: String, default: '请选择' })
], CascaderView.prototype, "placeholder", void 0);
__decorate([
    Prop({ type: null, default: 'auto' })
], CascaderView.prototype, "height", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], CascaderView.prototype, "skipAnimation", void 0);
__decorate([
    Prop({ type: Object, default: () => getDefaultFieldNames() })
], CascaderView.prototype, "defaultFieldNames", void 0);
__decorate([
    Watch('value')
], CascaderView.prototype, "onValueChange", null);
__decorate([
    Watch('options')
], CascaderView.prototype, "onOptionsChange", null);
__decorate([
    Watch('height')
], CascaderView.prototype, "onHeightChange", null);
__decorate([
    Watch('defaultFieldNames')
], CascaderView.prototype, "onDefaultFieldNamesChange", null);
CascaderView = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-cascader-view',
            },
            defaultValue: {
                type: Array,
                default: () => [],
            },
            value: {
                type: Array,
                default: () => [],
            },
            controlled: {
                type: Boolean,
                default: false,
            },
            options: {
                type: Array,
                default: () => [],
            },
            full: {
                type: Boolean,
                default: false,
            },
            placeholder: {
                type: String,
                default: '请选择',
            },
            height: {
                type: null,
                default: 'auto',
            },
            skipAnimation: {
                type: Boolean,
                default: false,
            },
            defaultFieldNames: {
                type: Object,
                default: () => getDefaultFieldNames(),
            },
        },
        expose: ['getValue', 'getCurrentOptions'],
    })
], CascaderView);
export default defineComponentHOC({ externalClasses: ['dora-scroll-view-class'] })(CascaderView);
