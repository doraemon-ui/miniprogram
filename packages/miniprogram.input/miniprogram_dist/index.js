/**
 * @doraemon-ui/miniprogram.input.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-27, 01:20:06.
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
const bound = (value, min, max) => {
    let n = value;
    if (typeof min === 'number')
        n = Math.max(n, min);
    if (typeof max === 'number')
        n = Math.min(n, max);
    return n;
};
let Input = class Input extends Doraemon {
    prefixCls;
    type;
    password;
    placeholder;
    placeholderStyle;
    placeholderClass;
    maxlength;
    cursorSpacing;
    focus;
    confirmType;
    alwaysEmbed;
    confirmHold;
    cursor;
    selectionStart;
    selectionEnd;
    adjustPosition;
    holdKeyboard;
    safePasswordCertPath;
    safePasswordLength;
    safePasswordTimeStamp;
    safePasswordNonce;
    safePasswordSalt;
    safePasswordCustomHash;
    label;
    extra;
    defaultValue;
    value;
    controlled;
    disabled;
    readOnly;
    clear;
    error;
    labelWrap;
    requiredMark;
    onlyShowClearWhenFocus;
    min;
    max;
    visibilityToggle;
    inputValue = '';
    inputFocus = false;
    shouldShowClear = false;
    internalPlaceholderStyle = '';
    internalVisible = false;
    timeout = null;
    get classes() {
        const { prefixCls, disabled, readOnly, inputFocus, error, labelWrap, requiredMark, internalVisible } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--focus`]: inputFocus,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--readonly`]: readOnly,
                [`${prefixCls}--error`]: error,
            }),
            label: classNames(`${prefixCls}__label`, {
                [`${prefixCls}__label--wrap`]: labelWrap,
                [`${prefixCls}__label--required`]: requiredMark,
            }),
            control: `${prefixCls}__control`,
            item: `${prefixCls}__item`,
            clear: `${prefixCls}__clear`,
            eye: classNames(`${prefixCls}__eye`, {
                [`${prefixCls}__eye--invisible`]: !internalVisible,
            }),
            error: `${prefixCls}__error`,
            extra: `${prefixCls}__extra`,
            keyboardAccessory: `${prefixCls}__keyboardAccessory`,
        };
    }
    onValueChange(newVal) {
        if (this.controlled) {
            this.updated(newVal);
        }
    }
    onPlaceholderStyleChange(val) {
        this.setInternalPlaceholderStyle(val);
    }
    onClearPropsChange() {
        this.setClear();
    }
    onInternalVisibleChange() {
        if (this.disabled)
            return;
        this.internalVisible = !this.internalVisible;
    }
    setInternalPlaceholderStyle(placeholderStyle) {
        const style = typeof placeholderStyle === 'string' ? placeholderStyle : styleToCssString(placeholderStyle || {});
        if (this.internalPlaceholderStyle !== style) {
            this.internalPlaceholderStyle = style;
        }
    }
    setClear() {
        const shouldShowClear = !!this.clear && !!this.inputValue && !this.disabled && !this.readOnly && (this.onlyShowClearWhenFocus ? this.inputFocus : true);
        if (this.shouldShowClear !== shouldShowClear) {
            this.shouldShowClear = shouldShowClear;
        }
    }
    checkValue() {
        const value = this.inputValue;
        let nextValue = value;
        if (this.type === 'number' || this.type === 'digit') {
            if (nextValue !== '') {
                const n = Number.parseFloat(nextValue);
                if (!Number.isNaN(n)) {
                    nextValue = bound(n, this.min ?? undefined, this.max ?? undefined).toString();
                }
            }
        }
        if (nextValue !== value) {
            if (!this.controlled) {
                this.updated(nextValue);
            }
            this.$emit('change', { value: nextValue });
        }
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue) {
            this.inputValue = inputValue;
        }
    }
    onChange(e) {
        const value = e.detail.value;
        if (!this.controlled) {
            this.updated(value);
        }
        this.$emit('change', e.detail);
    }
    onFocus(e) {
        this.clearTimer();
        this.inputFocus = true;
        this.$emit('focus', e.detail);
    }
    onBlur(e) {
        this.setTimer();
        this.checkValue();
        this.$emit('blur', e.detail);
    }
    onConfirm(e) {
        this.$emit('confirm', e.detail);
    }
    onKeyboardHeightChange(e) {
        this.$emit('keyboardheightchange', e.detail);
    }
    onNicknameReview(e) {
        this.$emit('nicknamereview', e.detail);
    }
    onClear() {
        const params = { value: '' };
        if (!this.controlled) {
            this.updated(params.value);
        }
        this.$emit('change', params);
        this.$emit('clear', params);
    }
    onError() {
        this.$emit('error', { value: this.inputValue });
    }
    setTimer() {
        this.clearTimer();
        this.timeout = setTimeout(() => {
            this.inputFocus = false;
        }, 200);
    }
    clearTimer() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.updated(inputValue);
        this.setClear();
        this.setInternalPlaceholderStyle(this.placeholderStyle);
    }
};
__decorate([
    Prop({ type: String, default: 'text' })
], Input.prototype, "type", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "password", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Input.prototype, "placeholder", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Input.prototype, "placeholderStyle", void 0);
__decorate([
    Prop({ type: String, default: 'input-placeholder' })
], Input.prototype, "placeholderClass", void 0);
__decorate([
    Prop({ type: Number, default: 140 })
], Input.prototype, "maxlength", void 0);
__decorate([
    Prop({ type: Number, default: 11 })
], Input.prototype, "cursorSpacing", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "focus", void 0);
__decorate([
    Prop({ type: String, default: 'done' })
], Input.prototype, "confirmType", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "alwaysEmbed", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "confirmHold", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], Input.prototype, "cursor", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], Input.prototype, "selectionStart", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], Input.prototype, "selectionEnd", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Input.prototype, "adjustPosition", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "holdKeyboard", void 0);
__decorate([
    Prop({ type: String, default: null })
], Input.prototype, "safePasswordCertPath", void 0);
__decorate([
    Prop({ type: Number, default: null })
], Input.prototype, "safePasswordLength", void 0);
__decorate([
    Prop({ type: Number, default: null })
], Input.prototype, "safePasswordTimeStamp", void 0);
__decorate([
    Prop({ type: String, default: null })
], Input.prototype, "safePasswordNonce", void 0);
__decorate([
    Prop({ type: String, default: null })
], Input.prototype, "safePasswordSalt", void 0);
__decorate([
    Prop({ type: String, default: null })
], Input.prototype, "safePasswordCustomHash", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Input.prototype, "label", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Input.prototype, "extra", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Input.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Input.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "readOnly", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "clear", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "error", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "labelWrap", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "requiredMark", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Input.prototype, "onlyShowClearWhenFocus", void 0);
__decorate([
    Prop({ type: Number, default: null })
], Input.prototype, "min", void 0);
__decorate([
    Prop({ type: Number, default: null })
], Input.prototype, "max", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Input.prototype, "visibilityToggle", void 0);
__decorate([
    Watch('value')
], Input.prototype, "onValueChange", null);
__decorate([
    Watch('placeholderStyle')
], Input.prototype, "onPlaceholderStyleChange", null);
__decorate([
    Watch('clear'),
    Watch('disabled'),
    Watch('readOnly'),
    Watch('inputValue'),
    Watch('inputFocus'),
    Watch('onlyShowClearWhenFocus')
], Input.prototype, "onClearPropsChange", null);
Input = __decorate([
    Component({
        props: {
            prefixCls: { type: String, default: 'dora-input' },
            type: { type: String, default: 'text' },
            password: { type: Boolean, default: false },
            placeholder: { type: String, default: '' },
            placeholderStyle: { type: null, default: '' },
            placeholderClass: { type: String, default: 'input-placeholder' },
            maxlength: { type: Number, default: 140 },
            cursorSpacing: { type: Number, default: 11 },
            focus: { type: Boolean, default: false },
            confirmType: { type: String, default: 'done' },
            alwaysEmbed: { type: Boolean, default: false },
            confirmHold: { type: Boolean, default: false },
            cursor: { type: Number, default: -1 },
            selectionStart: { type: Number, default: -1 },
            selectionEnd: { type: Number, default: -1 },
            adjustPosition: { type: Boolean, default: true },
            holdKeyboard: { type: Boolean, default: false },
            safePasswordCertPath: { type: String, default: null },
            safePasswordLength: { type: Number, default: null },
            safePasswordTimeStamp: { type: Number, default: null },
            safePasswordNonce: { type: String, default: null },
            safePasswordSalt: { type: String, default: null },
            safePasswordCustomHash: { type: String, default: null },
            label: { type: String, default: '' },
            extra: { type: String, default: '' },
            defaultValue: { type: String, default: '' },
            value: { type: String, default: '' },
            controlled: { type: Boolean, default: false },
            disabled: { type: Boolean, default: false },
            readOnly: { type: Boolean, default: false },
            clear: { type: Boolean, default: false },
            error: { type: Boolean, default: false },
            labelWrap: { type: Boolean, default: false },
            requiredMark: { type: Boolean, default: false },
            onlyShowClearWhenFocus: { type: Boolean, default: true },
            min: { type: Number, default: null },
            max: { type: Number, default: null },
            visibilityToggle: { type: Boolean, default: false },
        },
    })
], Input);
export default defineComponentHOC()(Input);
