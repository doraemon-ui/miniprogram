/**
 * @doraemon-ui/miniprogram.divider.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-26, 06:35:06.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Divider = class Divider extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Divider
     */
    prefixCls;
    position;
    dashed;
    text;
    showText;
    direction;
    get classes() {
        const { prefixCls, dashed, showText, position, direction } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--dashed`]: dashed,
            [`${prefixCls}--text`]: showText,
            [`${prefixCls}--text-${position}`]: showText && position,
            [`${prefixCls}--${direction}`]: direction,
        });
        const text = `${prefixCls}__text`;
        return {
            wrap,
            text,
        };
    }
};
__decorate([
    Prop({
        type: String,
        default: 'center',
    })
], Divider.prototype, "position", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Divider.prototype, "dashed", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Divider.prototype, "text", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Divider.prototype, "showText", void 0);
__decorate([
    Prop({
        type: String,
        default: 'horizontal',
    })
], Divider.prototype, "direction", void 0);
Divider = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-divider',
            },
            position: {
                type: String,
                default: 'center',
            },
            dashed: {
                type: Boolean,
                default: false,
            },
            text: {
                type: String,
                default: '',
            },
            showText: {
                type: Boolean,
                default: true,
            },
            direction: {
                type: String,
                default: 'horizontal',
            },
        },
    })
], Divider);
export default defineComponentHOC()(Divider);
