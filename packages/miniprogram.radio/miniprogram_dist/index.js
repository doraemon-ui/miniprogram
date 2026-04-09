/**
 * @doraemon-ui/miniprogram.radio.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 01:40:21.
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
const defaultContext = {
    disabled: false,
    readOnly: false,
    hasLine: true,
    hasFieldDecorator: false,
    withListComponent: false,
    iconPosition: 'right',
    iconSize: '',
    iconOn: '',
    iconOff: '',
};
let Radio = class Radio extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Radio
     */
    prefixCls;
    /**
     * `dora-list-item` 组件的类名前缀
     *
     * @type {string}
     * @memberof Radio
     */
    cellPrefixCls;
    /**
     * `dora-selectable` 组件的类名前缀
     *
     * @type {string}
     * @memberof Radio
     */
    selectablePrefixCls;
    /**
     * 缩略图
     *
     * @type {string}
     * @memberof Radio
     */
    thumb;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Radio
     */
    title;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Radio
     */
    label;
    /**
     * 值
     *
     * @type {string}
     * @memberof Radio
     */
    value;
    /**
     * 是否选中（受控）
     *
     * @type {boolean}
     * @memberof Radio
     */
    checked;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Radio
     */
    disabled;
    /**
     * 是否只读
     *
     * @type {boolean}
     * @memberof Radio
     */
    readOnly;
    /**
     * 选中颜色，支持预设色值或自定义色值
     *
     * @type {string}
     * @memberof Radio
     */
    color;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof Radio
     */
    wrapStyle;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     * @memberof Radio
     */
    hasLine;
    inputChecked = false;
    index = 0;
    isLast = false;
    context = defaultContext;
    get classes() {
        const { prefixCls } = this;
        const cell = classNames(prefixCls);
        const thumb = `${prefixCls}__thumb`;
        const iconPosition = `${prefixCls}__icon-position`;
        const iconSelectable = `${prefixCls}__icon-selectable`;
        const selectable = `${prefixCls}__selectable`;
        const selectableH = `${prefixCls}__selectable-horizontal`;
        return {
            cell,
            thumb,
            iconPosition,
            iconSelectable,
            selectable,
            selectableH,
        };
    }
    onCheckedChange(newVal) {
        this.inputChecked = newVal;
    }
    radioChange(e) {
        const { disabled, readOnly, context } = this;
        const { checked } = e.detail;
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
], Radio.prototype, "cellPrefixCls", void 0);
__decorate([
    Prop({ type: String, default: 'dora-selectable' })
], Radio.prototype, "selectablePrefixCls", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Radio.prototype, "thumb", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Radio.prototype, "title", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Radio.prototype, "label", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Radio.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Radio.prototype, "checked", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Radio.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Radio.prototype, "readOnly", void 0);
__decorate([
    Prop({ type: String, default: 'balanced' })
], Radio.prototype, "color", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Radio.prototype, "wrapStyle", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Radio.prototype, "hasLine", void 0);
__decorate([
    Watch('checked')
], Radio.prototype, "onCheckedChange", null);
Radio = __decorate([
    Component({
        components: {
            RadioGroup: () => ({
                module: './group',
                type: 'ancestor',
            }),
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-radio',
            },
            cellPrefixCls: {
                type: String,
                default: 'dora-list-item',
            },
            selectablePrefixCls: {
                type: String,
                default: 'dora-selectable',
            },
            thumb: {
                type: String,
                default: '',
            },
            title: {
                type: String,
                default: '',
            },
            label: {
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
        expose: ['check', 'uncheck', 'toggle', 'setChecked', 'changeValue', 'value', 'title'],
    })
], Radio);
export default defineComponentHOC()(Radio);
