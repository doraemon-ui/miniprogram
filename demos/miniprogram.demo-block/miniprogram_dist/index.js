/**
 * @doraemon-ui/miniprogram.demo-block.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-31, 01:22:32.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames, styleToCssString } = Doraemon.util;
let DemoBlock = class DemoBlock extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof DemoBlock
     */
    prefixCls;
    title;
    bordered;
    padding;
    background;
    direction;
    align;
    get classes() {
        const { prefixCls, bordered } = this;
        const wrap = prefixCls;
        const hd = `${prefixCls}__hd`;
        const bd = classNames(`${prefixCls}__bd`, {
            [`${prefixCls}__bd--bordered`]: bordered,
        });
        return {
            wrap,
            hd,
            bd,
        };
    }
    get bodyStyle() {
        const { padding, background, direction, align } = this;
        const bodyStyle = {};
        if (padding) {
            bodyStyle.padding = padding;
        }
        if (background) {
            bodyStyle.background = background;
        }
        if (direction) {
            bodyStyle.flexDirection = direction;
        }
        if (align) {
            bodyStyle.alignItems = align;
        }
        return styleToCssString(bodyStyle);
    }
};
__decorate([
    Prop({
        type: String,
        default: '',
    })
], DemoBlock.prototype, "title", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], DemoBlock.prototype, "bordered", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], DemoBlock.prototype, "padding", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], DemoBlock.prototype, "background", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], DemoBlock.prototype, "direction", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], DemoBlock.prototype, "align", void 0);
DemoBlock = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-demo-block',
            },
        },
    })
], DemoBlock);
export default defineComponentHOC()(DemoBlock);
