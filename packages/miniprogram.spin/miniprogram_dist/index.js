/**
 * @doraemon-ui/miniprogram.spin.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-05, 18:01:59.
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
    default: 'default',
};
const isPresetColor = (color) => {
    if (!color)
        return 'default';
    return presetColors[color] ? presetColors[color] : color;
};
let Spin = class Spin extends Doraemon {
    prefixCls;
    classNames;
    tip;
    size;
    spinning;
    nested;
    spinColor;
    spinVisible = true;
    dotStyle = '';
    tipStyle = '';
    get classes() {
        const { prefixCls, size, nested, tip } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${size}`]: !!size,
            [`${prefixCls}--nested`]: nested,
            [`${prefixCls}--show-text`]: !!tip,
        });
        return {
            wrap,
            anim: !nested ? `${prefixCls}__spinning` : `${prefixCls}__spinning--nested`,
            dots: `${prefixCls}__dots`,
            dot: `${prefixCls}__dot`,
            tip: `${prefixCls}__tip`,
            container: classNames(`${prefixCls}__container`, {
                [`${prefixCls}__container--blur`]: this.spinVisible,
            }),
        };
    }
    onSpinningChange(v) {
        if (this.nested)
            this.spinVisible = v;
    }
    setStyles(spinColor) {
        const inputColor = isPresetColor(spinColor);
        this.dotStyle = inputColor !== 'default' ? styleToCssString({ backgroundColor: inputColor }) : '';
        this.tipStyle = inputColor !== 'default' ? styleToCssString({ color: inputColor }) : '';
    }
    mounted() {
        this.setStyles(this.spinColor);
        this.onSpinningChange(this.spinning);
    }
};
__decorate([
    Prop({ type: null, default: 'dora-animate--fadeIn' })
], Spin.prototype, "classNames", void 0);
__decorate([
    Prop({ type: String, default: '' })
], Spin.prototype, "tip", void 0);
__decorate([
    Prop({ type: String, default: 'default' })
], Spin.prototype, "size", void 0);
__decorate([
    Prop({ type: Boolean, default: true })
], Spin.prototype, "spinning", void 0);
__decorate([
    Prop({ type: Boolean, default: false })
], Spin.prototype, "nested", void 0);
__decorate([
    Prop({ type: String, default: 'default' })
], Spin.prototype, "spinColor", void 0);
__decorate([
    Watch('spinning')
], Spin.prototype, "onSpinningChange", null);
__decorate([
    Watch('spinColor')
], Spin.prototype, "setStyles", null);
Spin = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-spin',
            },
        },
    })
], Spin);
export default defineComponentHOC()(Spin);
