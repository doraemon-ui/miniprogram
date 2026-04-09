/**
 * @doraemon-ui/miniprogram.switch.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 23:05:41.
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
const presetColors = {
    light: '#ddd',
    stable: '#b2b2b2',
    positive: '#387ef5',
    calm: '#11c1f3',
    balanced: '#33cd5f',
    energized: '#ffc900',
    assertive: '#ef473a',
    royal: '#886aea',
    dark: '#444',
};
const isPresetColor = (color) => (presetColors[color] ? presetColors[color] : color);
let Switch = class Switch extends Doraemon {
    prefixCls;
    value;
    disabled;
    loading;
    color;
    checkedText;
    uncheckedText;
    inputStyle = '';
    inputChecked = false;
    get classes() {
        const { prefixCls, inputChecked, disabled, loading, color } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${color}`]: !!color,
            [`${prefixCls}--checked`]: inputChecked,
            [`${prefixCls}--disabled`]: disabled || loading,
        });
        const input = classNames(`${prefixCls}__input`, {
            [`${prefixCls}__input--checked`]: inputChecked,
            [`${prefixCls}__input--disabled`]: disabled || loading,
        });
        return {
            wrap,
            input,
            text: `${prefixCls}__text`,
            spin: `${prefixCls}__spin`,
        };
    }
    updated(inputChecked) {
        if (this.inputChecked !== inputChecked)
            this.inputChecked = inputChecked;
    }
    onValueChange(v) {
        this.updated(v);
    }
    onColorChange(c) {
        const newColor = isPresetColor(c);
        this.inputStyle = `border-color:${newColor};background-color:${newColor};`;
    }
    onTap(_e) {
        if (this.disabled || this.loading)
            return;
        this.$emit('change', { value: !this.inputChecked });
    }
    mounted() {
        this.updated(this.value);
        this.onColorChange(this.color);
    }
};
__decorate([
    Prop({ type: Boolean, default: false })
], Switch.prototype, "value", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Switch.prototype, "disabled", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Switch.prototype, "loading", void 0);
__decorate([
    Prop({ type: String, default: 'balanced' })
], Switch.prototype, "color", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Switch.prototype, "checkedText", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Switch.prototype, "uncheckedText", void 0);
__decorate([
    Watch('value')
], Switch.prototype, "onValueChange", null);
__decorate([
    Watch('color')
], Switch.prototype, "onColorChange", null);
Switch = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-switch',
            },
        },
    })
], Switch);
export default defineComponentHOC()(Switch);
