/**
 * @doraemon-ui/miniprogram.icon.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-31, 01:23:29.
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
let Icon = class Icon extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Icon
     */
    prefixCls;
    hidden;
    type;
    size;
    color;
    get classes() {
        const { prefixCls, type } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}-${type}`]: type,
        });
        return {
            wrap,
        };
    }
    get containerStyle() {
        const getFontSize = (size) => {
            let fontSize = size;
            if (typeof size === 'number') {
                fontSize = `${size}px`;
            }
            else if (typeof size === 'string') {
                if (!isNaN(Number(size))) {
                    fontSize = `${size}px`;
                }
            }
            return fontSize;
        };
        return styleToCssString({
            fontSize: getFontSize(this.size),
            color: this.color !== '' ? this.color : 'unset',
        });
    }
    onClick() {
        this.$emit('click');
    }
};
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Icon.prototype, "hidden", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Icon.prototype, "type", void 0);
__decorate([
    Prop({
        type: [String, Number],
        default: 32,
    })
], Icon.prototype, "size", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Icon.prototype, "color", void 0);
Icon = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'doraicons',
            },
        },
    })
], Icon);
export default defineComponentHOC()(Icon);
