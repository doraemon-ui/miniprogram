/**
 * @doraemon-ui/miniprogram.input.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-06-27, 16:55:25.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.41.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
const bound = (value, min, max)=>{
    let n = value;
    if (typeof min === 'number') n = Math.max(n, min);
    if (typeof max === 'number') n = Math.min(n, max);
    return n;
};
let Input = class Input extends Doraemon {
    get classes() {
        const { prefixCls, disabled, readOnly, inputFocus, error, labelWrap, requiredMark, internalVisible } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--focus`]: inputFocus,
                [`${prefixCls}--disabled`]: disabled,
                [`${prefixCls}--readonly`]: readOnly,
                [`${prefixCls}--error`]: error
            }),
            label: classNames(`${prefixCls}__label`, {
                [`${prefixCls}__label--wrap`]: labelWrap,
                [`${prefixCls}__label--required`]: requiredMark
            }),
            control: `${prefixCls}__control`,
            item: `${prefixCls}__item`,
            clear: `${prefixCls}__clear`,
            eye: classNames(`${prefixCls}__eye`, {
                [`${prefixCls}__eye--invisible`]: !internalVisible
            }),
            error: `${prefixCls}__error`,
            extra: `${prefixCls}__extra`,
            keyboardAccessory: `${prefixCls}__keyboardAccessory`
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
        if (this.disabled) return;
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
            this.$emit('change', {
                value: nextValue
            });
        }
    }
    updated(inputValue) {
        if (this.hasFieldDecorator) return;
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
        const params = {
            value: ''
        };
        if (!this.controlled) {
            this.updated(params.value);
        }
        this.$emit('change', params);
        this.$emit('clear', params);
    }
    onError() {
        this.$emit('error', {
            value: this.inputValue
        });
    }
    setTimer() {
        this.clearTimer();
        this._timeout = setTimeout(()=>{
            this.inputFocus = false;
        }, 200);
    }
    clearTimer() {
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.updated(inputValue);
        this.setClear();
        this.setInternalPlaceholderStyle(this.placeholderStyle);
    }
    constructor(...args){
        super(...args);
        this.inputValue = '';
        this.inputFocus = false;
        this.shouldShowClear = false;
        this.internalPlaceholderStyle = '';
        this.internalVisible = false;
        this.hasFieldDecorator = false;
        this._timeout = null;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'text'
    })
], Input.prototype, "type", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "password", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Input.prototype, "placeholder", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: null
    })
], Input.prototype, "placeholderStyle", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'input-placeholder'
    })
], Input.prototype, "placeholderClass", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 140
    })
], Input.prototype, "maxlength", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 11
    })
], Input.prototype, "cursorSpacing", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "focus", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'done'
    })
], Input.prototype, "confirmType", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "alwaysEmbed", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "confirmHold", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: -1
    })
], Input.prototype, "cursor", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: -1
    })
], Input.prototype, "selectionStart", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: -1
    })
], Input.prototype, "selectionEnd", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Input.prototype, "adjustPosition", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "holdKeyboard", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: null
    })
], Input.prototype, "safePasswordCertPath", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Input.prototype, "safePasswordLength", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Input.prototype, "safePasswordTimeStamp", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: null
    })
], Input.prototype, "safePasswordNonce", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: null
    })
], Input.prototype, "safePasswordSalt", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: null
    })
], Input.prototype, "safePasswordCustomHash", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Input.prototype, "label", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Input.prototype, "extra", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Input.prototype, "defaultValue", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Input.prototype, "value", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "controlled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "disabled", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "readOnly", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "clear", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "error", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "labelWrap", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "requiredMark", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Input.prototype, "onlyShowClearWhenFocus", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Input.prototype, "min", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Input.prototype, "max", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Input.prototype, "visibilityToggle", void 0);
_ts_decorate([
    Watch('value')
], Input.prototype, "onValueChange", null);
_ts_decorate([
    Watch('placeholderStyle')
], Input.prototype, "onPlaceholderStyleChange", null);
_ts_decorate([
    Watch('clear'),
    Watch('disabled'),
    Watch('readOnly'),
    Watch('inputValue'),
    Watch('inputFocus'),
    Watch('onlyShowClearWhenFocus')
], Input.prototype, "onClearPropsChange", null);
Input = _ts_decorate([
    Component({
        components: {
            Field: ()=>({
                    module: '../miniprogram.form/field',
                    type: 'ancestor'
                })
        },
        props: {
            prefixCls: {
                type: String,
                default: 'dora-input'
            }
        }
    })
], Input);
var index = defineComponentHOC()(Input);

export { Input, index as default };
