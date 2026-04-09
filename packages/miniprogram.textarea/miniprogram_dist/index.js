/**
 * @doraemon-ui/miniprogram.textarea.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-06, 00:12:41.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { useRect } from '@doraemon-ui/miniprogram.shared';
import { nativeTextareaProps } from './props';
const { classNames, styleToCssString } = Doraemon.util;
let Textarea = class Textarea extends Doraemon {
    prefixCls;
    label;
    extra;
    defaultValue;
    value;
    controlled;
    disabled;
    readOnly;
    rows;
    hasCount;
    clear;
    error;
    placeholderStyle;
    inputValue = '';
    inputFocus = false;
    inputRows = 1;
    inputHeight = '';
    internalPlaceholderStyle = '';
    timeout = null;
    get classes() {
        const p = this.prefixCls;
        return {
            wrap: classNames(p, {
                [`${p}--focus`]: this.inputFocus,
                [`${p}--disabled`]: this.disabled,
                [`${p}--readonly`]: this.readOnly,
                [`${p}--error`]: this.error,
                [`${p}--has-count`]: this.hasCount,
            }),
            label: `${p}__label`,
            control: `${p}__control`,
            item: `${p}__item`,
            clear: `${p}__clear`,
            error: `${p}__error`,
            extra: `${p}__extra`,
            count: `${p}__count`,
            current: `${p}__current`,
            keyboardAccessory: `${p}__keyboard-accessory`,
        };
    }
    onValueChange(v) {
        if (this.controlled)
            this.updated(v);
    }
    onRowsChange(v) {
        void this.updateHeight(v);
    }
    onPlaceholderStyleChange(v) {
        this.setInternalPlaceholderStyle(v);
    }
    setInternalPlaceholderStyle(placeholderStyle) {
        const s = styleToCssString(placeholderStyle);
        if (this.internalPlaceholderStyle !== s)
            this.internalPlaceholderStyle = s;
    }
    async updateHeight(val = this.rows) {
        const rows = Math.max(1, parseInt(String(val), 10) || 1);
        if (this.inputRows !== rows) {
            const rect = await useRect(`.${this.prefixCls}__item`, this._renderProxy);
            if (rect) {
                const lineHeight = this.inputRows > 1 ? (rect.height / this.inputRows) : rect.height;
                this.inputRows = rows;
                this.inputHeight = lineHeight * rows;
            }
        }
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue)
            this.inputValue = inputValue;
    }
    onChange(e) {
        const { value } = e.detail;
        if (!this.controlled)
            this.updated(value);
        this.$emit('change', e.detail);
    }
    onFocus(e) {
        this.clearTimer();
        this.inputFocus = true;
        this.$emit('focus', e.detail);
    }
    onBlur(e) {
        this.setTimer();
        this.$emit('blur', e.detail);
    }
    onConfirm(e) {
        this.$emit('confirm', e.detail);
    }
    onKeyboardHeightChange(e) {
        this.$emit('keyboardheightchange', e.detail);
    }
    onClear() {
        const params = { value: '' };
        if (!this.controlled)
            this.updated(params.value);
        this.$emit('change', params);
        this.$emit('clear', params);
    }
    onError() {
        this.$emit('error', { value: this.inputValue });
    }
    onLineChange(e) {
        this.$emit('linechange', e.detail);
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
        this.setInternalPlaceholderStyle(this.placeholderStyle);
        void this.updateHeight(this.rows);
    }
};
__decorate([
    Prop({ type: String, default: '' })
], Textarea.prototype, "label", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Textarea.prototype, "extra", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Textarea.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Textarea.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "readOnly", void 0);
__decorate([
    Prop({ type: Number, default: 1 })
], Textarea.prototype, "rows", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "hasCount", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "clear", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Textarea.prototype, "error", void 0);
__decorate([
    Prop({ type: null, default: '' })
], Textarea.prototype, "placeholderStyle", void 0);
__decorate([
    Watch('value')
], Textarea.prototype, "onValueChange", null);
__decorate([
    Watch('rows')
], Textarea.prototype, "onRowsChange", null);
__decorate([
    Watch('placeholderStyle')
], Textarea.prototype, "onPlaceholderStyleChange", null);
Textarea = __decorate([
    Component({
        props: {
            ...nativeTextareaProps,
            prefixCls: { type: String, default: 'dora-textarea' },
        },
    })
], Textarea);
export default defineComponentHOC()(Textarea);
