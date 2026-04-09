/**
 * @doraemon-ui/miniprogram.input-number.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-27, 01:41:52.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import NP from './utils';
const { classNames } = Doraemon.util;
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
const toNumberWhenUserInput = (num) => {
    if (/\.\d*0$/.test(num) || num.length > 16)
        return num;
    if (Number.isNaN(Number(num)))
        return num;
    return Number(num);
};
const getValidValue = (value, min, max) => {
    let val = Number.parseFloat(String(value));
    if (Number.isNaN(val))
        return value;
    if (val < min)
        val = min;
    if (val > max)
        val = max;
    return val;
};
let InputNumber = class InputNumber extends Doraemon {
    prefixCls;
    shape;
    min;
    max;
    step;
    defaultValue;
    value;
    disabled;
    readOnly;
    longpress;
    color;
    controlled;
    digits;
    inputValue = 0;
    disabledMin = false;
    disabledMax = false;
    timeout = null;
    inputTime = null;
    get classes() {
        const { prefixCls, shape, color, disabled, readOnly, disabledMin, disabledMax } = this;
        return {
            wrap: classNames(prefixCls, {
                [`${prefixCls}--${shape}`]: shape,
            }),
            sub: classNames(`${prefixCls}__selector`, {
                [`${prefixCls}__selector--sub`]: true,
                [`${prefixCls}__selector--${color}`]: true,
                [`${prefixCls}__selector--disabled`]: disabled || readOnly || disabledMin,
            }),
            add: classNames(`${prefixCls}__selector`, {
                [`${prefixCls}__selector--add`]: true,
                [`${prefixCls}__selector--${color}`]: true,
                [`${prefixCls}__selector--disabled`]: disabled || readOnly || disabledMax,
            }),
            icon: `${prefixCls}__icon`,
            control: `${prefixCls}__control`,
            input: classNames(`${prefixCls}__input`, {
                [`${prefixCls}__input--disabled`]: disabled,
                [`${prefixCls}__input--readonly`]: readOnly,
            }),
        };
    }
    onValueChange(newVal) {
        if (this.controlled) {
            this.setValue(newVal, false);
        }
    }
    onRangeChange() {
        const numeric = Number(this.inputValue);
        this.disabledMin = !Number.isNaN(numeric) && numeric <= this.min;
        this.disabledMax = !Number.isNaN(numeric) && numeric >= this.max;
    }
    updated(inputValue) {
        if (this.inputValue !== inputValue) {
            this.inputValue = inputValue;
        }
    }
    setValue(value, runCallbacks = true) {
        const valid = getValidValue(value, this.min, this.max);
        let inputValue = typeof valid === 'number' ? NP.strip(valid) : valid;
        if (typeof inputValue === 'number' && this.digits !== -1) {
            inputValue = NP.round(inputValue, this.digits);
        }
        this.updated(inputValue);
        if (runCallbacks) {
            this.$emit('change', { value: inputValue });
        }
    }
    calculation(type, isLoop) {
        if (this.disabled || this.readOnly)
            return;
        const current = Number(this.inputValue);
        const value = Number.isNaN(current) ? 0 : current;
        if (type === 'add') {
            if (this.disabledMax)
                return;
            this.setValue(NP.plus(value, this.step));
        }
        if (type === 'sub') {
            if (this.disabledMin)
                return;
            this.setValue(NP.minus(value, this.step));
        }
        if (this.longpress && isLoop) {
            this.timeout = setTimeout(() => this.calculation(type, isLoop), 100);
        }
    }
    onInput(e) {
        this.clearInputTimer();
        this.inputTime = setTimeout(() => {
            const value = toNumberWhenUserInput(e.detail.value);
            this.setValue(value);
        }, 300);
    }
    onFocus(e) {
        this.$emit('focus', e.detail);
    }
    onBlur(e) {
        this.inputValue = this.inputValue;
        this.$emit('blur', e.detail);
    }
    onLongpress(e) {
        const type = (e.currentTarget?.dataset?.type || 'add');
        if (this.longpress)
            this.calculation(type, true);
    }
    onTap(e) {
        const type = (e.currentTarget?.dataset?.type || 'add');
        if (!this.longpress || (this.longpress && !this.timeout)) {
            this.calculation(type, false);
        }
    }
    onTouchEnd() {
        this.clearTimer();
    }
    onTouchCancel() {
        this.clearTimer();
    }
    clearTimer() {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }
    clearInputTimer() {
        if (this.inputTime) {
            clearTimeout(this.inputTime);
            this.inputTime = null;
        }
    }
    mounted() {
        const inputValue = this.controlled ? this.value : this.defaultValue;
        this.setValue(inputValue, false);
    }
    destroyed() {
        this.clearTimer();
        this.clearInputTimer();
    }
};
__decorate([
    Prop({ type: String, default: 'square' })
], InputNumber.prototype, "shape", void 0);
__decorate([
    Prop({ type: Number, default: -MAX_SAFE_INTEGER })
], InputNumber.prototype, "min", void 0);
__decorate([
    Prop({ type: Number, default: MAX_SAFE_INTEGER })
], InputNumber.prototype, "max", void 0);
__decorate([
    Prop({ type: Number, default: 1 })
], InputNumber.prototype, "step", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], InputNumber.prototype, "defaultValue", void 0);
__decorate([
    Prop({ type: Number, default: 0 })
], InputNumber.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], InputNumber.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], InputNumber.prototype, "readOnly", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], InputNumber.prototype, "longpress", void 0);
__decorate([
    Prop({ type: String, default: 'balanced' })
], InputNumber.prototype, "color", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], InputNumber.prototype, "controlled", void 0);
__decorate([
    Prop({ type: Number, default: -1 })
], InputNumber.prototype, "digits", void 0);
__decorate([
    Watch('value')
], InputNumber.prototype, "onValueChange", null);
__decorate([
    Watch('inputValue'),
    Watch('min'),
    Watch('max')
], InputNumber.prototype, "onRangeChange", null);
InputNumber = __decorate([
    Component({
        props: {
            prefixCls: { type: String, default: 'dora-input-number' },
            shape: { type: String, default: 'square' },
            min: { type: Number, default: -MAX_SAFE_INTEGER },
            max: { type: Number, default: MAX_SAFE_INTEGER },
            step: { type: Number, default: 1 },
            defaultValue: { type: Number, default: 0 },
            value: { type: Number, default: 0 },
            disabled: { type: Boolean, default: true },
            readOnly: { type: Boolean, default: false },
            longpress: { type: Boolean, default: false },
            color: { type: String, default: 'balanced' },
            controlled: { type: Boolean, default: false },
            digits: { type: Number, default: -1 },
        },
    })
], InputNumber);
export default defineComponentHOC({
    externalClasses: ['dora-sub-class', 'dora-control-class', 'dora-input-class', 'dora-add-class'],
})(InputNumber);
