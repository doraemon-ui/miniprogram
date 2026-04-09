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
import { defineComponentHOC, Doraemon, Component, Prop, Watch, Event } from '@doraemon-ui/miniprogram.core-js';
import { getDefaultContext } from '@doraemon-ui/miniprogram.shared';
import { checkboxGroupProps } from './props';
const { classNames } = Doraemon.util;
const defaultContext = {
    ...getDefaultContext(checkboxGroupProps, [
        'disabled',
        'readOnly',
        'hasLine',
        // only context
        'hasFieldDecorator',
        'withListComponent',
        'iconPosition',
        'iconSize',
        'iconOn',
        'iconOff',
    ]),
    withListComponent: false,
};
let CheckboxClass = class CheckboxClass extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Checkbox
     */
    prefixCls;
    /**
     * `dora-list-item` 组件的类名前缀
     *
     * @type {string}
     * @memberof Checkbox
     */
    cellPrefixCls;
    /**
     * `dora-selectable` 组件的类名前缀
     *
     * @type {string}
     * @memberof Checkbox
     */
    selectablePrefixCls;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Checkbox
     */
    title;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Checkbox
     */
    label;
    /**
     * 额外信息（仅在 `withListComponent` 且 `iconPosition='left'` 时展示）
     *
     * @type {string}
     * @memberof Checkbox
     */
    extra;
    /**
     * 值
     *
     * @type {string}
     * @memberof Checkbox
     */
    value;
    /**
     * 是否选中（受控）
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    checked;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    disabled;
    /**
     * 是否只读
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    readOnly;
    /**
     * 选中颜色，支持预设色值或自定义色值
     *
     * @type {string}
     * @memberof Checkbox
     */
    color;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof Checkbox
     */
    wrapStyle;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    hasLine;
    inputChecked = false;
    index = 0;
    isLast = false;
    context = defaultContext;
    get classes() {
        const { prefixCls } = this;
        const cell = classNames(prefixCls);
        const extra = `${prefixCls}__extra`;
        const iconPosition = `${prefixCls}__icon-position`;
        const iconSelectable = `${prefixCls}__icon-selectable`;
        const selectable = `${prefixCls}__selectable`;
        const selectableH = `${prefixCls}__selectable-horizontal`;
        return {
            cell,
            extra,
            iconPosition,
            iconSelectable,
            selectable,
            selectableH,
        };
    }
    onCheckedChange(newVal) {
        this.inputChecked = newVal;
    }
    checkboxChange(e) {
        const { disabled, readOnly, context } = this;
        const { checked } = e.currentTarget;
        if (disabled || context.disabled || readOnly || context.readOnly)
            return;
        this.onChange(checked);
    }
    changeValue(inputChecked = false, index = 0, isLast = false, context = defaultContext) {
        this.inputChecked = inputChecked;
        this.index = index;
        this.isLast = isLast;
        this.context = context;
    }
    onChange(inputChecked) {
        const { value, index } = this;
        const item = {
            checked: inputChecked,
            value,
            index,
        };
        const parent = this.$parent;
        if (parent && typeof parent.onChange === 'function') {
            parent.onChange(item);
        }
        else {
            this.$emit('change', item);
        }
    }
    setChecked(inputChecked) {
        if (this.inputChecked !== inputChecked) {
            this.inputChecked = inputChecked;
        }
        this.onChange(inputChecked);
    }
    check() {
        this.setChecked(true);
    }
    uncheck() {
        this.setChecked(false);
    }
    toggle() {
        this.setChecked(!this.inputChecked);
    }
    mounted() {
        this.inputChecked = this.checked;
    }
};
__decorate([
    Prop({ type: String, default: 'dora-list-item' })
], CheckboxClass.prototype, "cellPrefixCls", void 0);
__decorate([
    Prop({ type: String, default: 'dora-selectable' })
], CheckboxClass.prototype, "selectablePrefixCls", void 0);
__decorate([
    Prop({ type: String, default: '' })
], CheckboxClass.prototype, "title", void 0);
__decorate([
    Prop({ type: String, default: '' })
], CheckboxClass.prototype, "label", void 0);
__decorate([
    Prop({ type: String, default: '' })
], CheckboxClass.prototype, "extra", void 0);
__decorate([
    Prop({ type: String, default: '' })
], CheckboxClass.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], CheckboxClass.prototype, "checked", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], CheckboxClass.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], CheckboxClass.prototype, "readOnly", void 0);
__decorate([
    Prop({ type: String, default: 'balanced' })
], CheckboxClass.prototype, "color", void 0);
__decorate([
    Prop({ type: null, default: '' })
], CheckboxClass.prototype, "wrapStyle", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], CheckboxClass.prototype, "hasLine", void 0);
__decorate([
    Watch('checked')
], CheckboxClass.prototype, "onCheckedChange", null);
__decorate([
    Event()
], CheckboxClass.prototype, "checkboxChange", null);
CheckboxClass = __decorate([
    Component({
        components: {
            CheckboxGroup: () => ({
                module: './group',
                type: 'ancestor',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-checkbox',
            },
            cellPrefixCls: {
                type: String,
                default: 'dora-list-item',
            },
            selectablePrefixCls: {
                type: String,
                default: 'dora-selectable',
            },
            title: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: '',
            },
            extra: {
                type: String,
                default: '',
            },
            value: {
                type: String,
                default: '',
            },
            checked: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            readOnly: {
                type: Boolean,
                default: false,
            },
            color: {
                type: String,
                default: 'balanced',
            },
            wrapStyle: {
                type: null,
                default: '',
            },
            hasLine: {
                type: Boolean,
                default: true,
            },
        },
        expose: ['check', 'uncheck', 'toggle', 'setChecked', 'changeValue'],
    })
], CheckboxClass);
export const Checkbox = defineComponentHOC()(CheckboxClass);
export default Checkbox;
