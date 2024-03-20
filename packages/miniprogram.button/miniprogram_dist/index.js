/**
 * @doraemon-ui/miniprogram.button.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-20, 21:48:04.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.18.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Event, Emit } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Button = class Button extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Button
     */
    prefixCls;
    get classes() {
        const { prefixCls, hoverClass, color, size, fill, expand, shape, strong, disabled } = this;
        const finalSize = ['small', 'large'].includes(size) ? size : '';
        const finalFill = ['solid', 'outline', 'clear'].includes(fill) ? fill : '';
        const finalExpand = ['block', 'full'].includes(expand) ? expand : '';
        const finalShape = ['rounded', 'rectangular'].includes(shape) ? shape : '';
        const wrap = classNames(prefixCls, {
            ['dora-color']: color,
            [`dora-color--${color}`]: color,
            [`${prefixCls}--${size}`]: finalSize,
            [`${prefixCls}--${fill}`]: finalFill,
            [`${prefixCls}--${expand}`]: finalExpand,
            [`${prefixCls}--${shape}`]: finalShape,
            [`${prefixCls}--strong`]: strong,
            [`${prefixCls}--disabled`]: disabled,
        });
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--activated`;
        return {
            wrap,
            hover,
        };
    }
    onClick() {
        if (!this.disabled && !this.loading) {
            this.$emit('click');
        }
    }
    onGetUserInfo(e) {
        return e.target;
    }
    onContact(e) {
        return e.target;
    }
    onGetPhoneNumber(e) {
        return e.target;
    }
    onOpenSetting(e) {
        return e.target;
    }
    onError(e) {
        return e.target;
    }
};
__decorate([
    Event(),
    Emit('getuserinfo')
], Button.prototype, "onGetUserInfo", null);
__decorate([
    Event(),
    Emit('contact')
], Button.prototype, "onContact", null);
__decorate([
    Event(),
    Emit('getphonenumber')
], Button.prototype, "onGetPhoneNumber", null);
__decorate([
    Event(),
    Emit('opensetting')
], Button.prototype, "onOpenSetting", null);
__decorate([
    Event(),
    Emit('error')
], Button.prototype, "onError", null);
Button = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-button',
            },
            color: {
                type: String,
                default: 'positive',
            },
            fill: {
                type: String,
                default: 'solid',
            },
            expand: {
                type: String,
                default: '',
            },
            shape: {
                type: String,
                default: '',
            },
            size: {
                type: String,
                default: 'default',
            },
            strong: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            loading: {
                type: Boolean,
                default: false,
            },
            formType: {
                type: String,
                default: '',
            },
            openType: {
                type: String,
                default: '',
            },
            hoverClass: {
                type: String,
                default: 'default',
            },
            hoverStopPropagation: {
                type: Boolean,
                default: false,
            },
            hoverStartTime: {
                type: Number,
                default: 20,
            },
            hoverStayTime: {
                type: Number,
                default: 70,
            },
            lang: {
                type: String,
                default: 'en',
            },
            sessionFrom: {
                type: String,
                default: '',
            },
            sendMessageTitle: {
                type: String,
                default: '',
            },
            sendMessagePath: {
                type: String,
                default: '',
            },
            sendMessageImg: {
                type: String,
                default: '',
            },
            showMessageCard: {
                type: Boolean,
                default: false,
            },
            appParameter: {
                type: String,
                default: '',
            },
        },
    })
], Button);
export default defineComponentHOC()(Button);
