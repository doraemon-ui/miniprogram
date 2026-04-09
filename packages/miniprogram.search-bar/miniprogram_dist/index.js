/**
 * @doraemon-ui/miniprogram.search-bar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 15:05:42.
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
let SearchBar = class SearchBar extends Doraemon {
    prefixCls;
    defaultValue;
    value;
    placeholder;
    placeholderStyle;
    placeholderClass;
    disabled;
    maxlength;
    cursorSpacing;
    focus;
    confirmType;
    confirmHold;
    cursor;
    selectionStart;
    selectionEnd;
    adjustPosition;
    clear;
    cancelText;
    showCancel;
    controlled;
    onlyShowClearWhenFocus;
    inputValue = '';
    inputFocus = false;
    shouldShowClear = false;
    extStyle = '';
    get classes() {
        const { prefixCls, disabled, inputFocus } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--focus`]: inputFocus,
            [`${prefixCls}--disabled`]: disabled,
        });
        return {
            wrap,
            form: `${prefixCls}__form`,
            box: `${prefixCls}__box`,
            search: `${prefixCls}__search`,
            control: `${prefixCls}__control`,
            input: `${prefixCls}__input`,
            clear: `${prefixCls}__clear`,
            label: `${prefixCls}__label`,
            icon: `${prefixCls}__icon`,
            text: `${prefixCls}__text`,
            cancel: `${prefixCls}__cancel`,
        };
    }
    onValueChange(v) {
        if (this.controlled)
            this.updated(v);
    }
    onPlaceholderStyleChange(v) {
        this.extStyle = styleToCssString(v || '');
    }
    onFocusPropChange(v) {
        this.inputFocus = !!v;
    }
    onClearDepsChange() {
        this.setClear();
    }
    onDisabledChange() {
        this.setClear();
    }
    onInputValueChange() {
        this.setClear();
    }
    onInputFocusChange() {
        this.setClear();
    }
    onOnlyShowClearWhenFocusChange() {
        this.setClear();
    }
    setClear() {
        const shouldShowClear = (() => {
            if (!this.clear || !this.inputValue || this.disabled)
                return false;
            if (this.onlyShowClearWhenFocus)
                return this.inputFocus;
            return true;
        })();
        if (this.shouldShowClear !== shouldShowClear) {
            this.shouldShowClear = shouldShowClear;
        }
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue)
            this.inputValue = inputValue;
    }
    onChange(e) {
        if (!this.controlled)
            this.updated(e.detail.value);
        if (!this.inputFocus)
            this.inputFocus = true;
        this.$emit('change', e.detail);
    }
    onFocus(e) {
        this.inputFocus = true;
        this.$emit('focus', e.detail);
    }
    onBlur(e) {
        this.inputFocus = false;
        this.$emit('blur', e.detail);
    }
    onConfirm(e) {
        this.$emit('confirm', e.detail);
    }
    onClear() {
        const inputValue = this.controlled ? this.inputValue : '';
        this.inputValue = inputValue;
        this.inputFocus = true;
        this.$emit('clear', { value: '' });
    }
    onCancel() {
        this.$emit('cancel', { value: this.inputValue });
    }
    onClick() {
        if (this.disabled)
            return;
        this.inputFocus = true;
    }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.updated(inputValue);
        this.setClear();
        this.onPlaceholderStyleChange(this.placeholderStyle);
        this.onFocusPropChange(this.focus);
    }
};
__decorate([
    Prop({ type: String, default: '' })
], SearchBar.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: String, default: '' })
], SearchBar.prototype, "value", void 0);
__decorate([
    Prop({ type: String, default: '搜索' })
], SearchBar.prototype, "placeholder", void 0);
__decorate([
    Prop({ type: null, default: '' })
], SearchBar.prototype, "placeholderStyle", void 0);
__decorate([
    Prop({ type: String, default: 'input-placeholder' })
], SearchBar.prototype, "placeholderClass", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SearchBar.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Number, default: 140 })
], SearchBar.prototype, "maxlength", void 0);
__decorate([
    Prop({ type: Number, default: 11 })
], SearchBar.prototype, "cursorSpacing", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SearchBar.prototype, "focus", void 0);
__decorate([
    Prop({ type: String, default: 'search' })
], SearchBar.prototype, "confirmType", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SearchBar.prototype, "confirmHold", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], SearchBar.prototype, "cursor", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], SearchBar.prototype, "selectionStart", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], SearchBar.prototype, "selectionEnd", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], SearchBar.prototype, "adjustPosition", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SearchBar.prototype, "clear", void 0);
__decorate([
    Prop({ type: String, default: '取消' })
], SearchBar.prototype, "cancelText", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SearchBar.prototype, "showCancel", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], SearchBar.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], SearchBar.prototype, "onlyShowClearWhenFocus", void 0);
__decorate([
    Watch('value')
], SearchBar.prototype, "onValueChange", null);
__decorate([
    Watch('placeholderStyle')
], SearchBar.prototype, "onPlaceholderStyleChange", null);
__decorate([
    Watch('focus')
], SearchBar.prototype, "onFocusPropChange", null);
__decorate([
    Watch('clear')
], SearchBar.prototype, "onClearDepsChange", null);
__decorate([
    Watch('disabled')
], SearchBar.prototype, "onDisabledChange", null);
__decorate([
    Watch('inputValue')
], SearchBar.prototype, "onInputValueChange", null);
__decorate([
    Watch('inputFocus')
], SearchBar.prototype, "onInputFocusChange", null);
__decorate([
    Watch('onlyShowClearWhenFocus')
], SearchBar.prototype, "onOnlyShowClearWhenFocusChange", null);
SearchBar = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-search-bar',
            },
        },
    })
], SearchBar);
export default defineComponentHOC()(SearchBar);
