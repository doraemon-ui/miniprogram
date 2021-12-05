/**
 * @doraemon-ui/miniprogram.button.
 * © 2021 - 2021 Doraemon UI.
 * Built on 2021-12-05, 21:44:30.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
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
    /**
     * 当前的主题
     *
     * @type {string}
     * @memberof Button
     */
    darkmode;
    get classes() {
        const { prefixCls, hoverClass, type, size, block, full, clear, outline, bordered, borderRadius, disabled } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${type}`]: type,
            [`${prefixCls}--${size}`]: size,
            [`${prefixCls}--block`]: block,
            [`${prefixCls}--full`]: full,
            [`${prefixCls}--clear`]: clear,
            [`${prefixCls}--outline`]: outline,
            [`${prefixCls}--bordered`]: bordered,
            [`${prefixCls}--border-radius`]: borderRadius,
            [`${prefixCls}--disabled`]: disabled,
        });
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`;
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
            darkmode: {
                type: String,
                default: Doraemon.config.darkmode,
            },
            type: {
                type: String,
                default: 'stable',
            },
            clear: {
                type: Boolean,
                default: false,
            },
            block: {
                type: Boolean,
                default: false,
            },
            full: {
                type: Boolean,
                default: false,
            },
            outline: {
                type: Boolean,
                default: false,
            },
            bordered: {
                type: Boolean,
                default: true,
            },
            borderRadius: {
                type: Boolean,
                default: true,
            },
            size: {
                type: String,
                default: 'default',
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
