/**
 * @doraemon-ui/miniprogram.button.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-28, 00:13:49.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.20.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Event, Emit, Prop } from '@doraemon-ui/miniprogram.core-js';
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
     * 按钮颜色
     *
     * @type {PresetColor}
     * @memberof Button
     */
    color;
    /**
     * 填充模式
     *
     * @type {('solid' | 'outline' | 'clear')}
     * @memberof Button
     */
    fill;
    /**
     * 扩展模式
     *
     * @type {('block' | 'full')}
     * @memberof Button
     */
    expand;
    /**
     * 按钮的形状
     *
     * @type {('rounded' | 'rectangular')}
     * @memberof Button
     */
    shape;
    /**
     * 按钮的大小
     *
     * @type {('small' | 'default' | 'large')}
     * @memberof Button
     */
    size;
    /**
     * 是否粗体字体
     *
     * @type {boolean}
     * @memberof Button
     */
    strong;
    // native button props
    // @see https://developers.weixin.qq.com/miniprogram/dev/component/button.html
    disabled;
    loading;
    formType;
    openType;
    hoverClass;
    hoverStopPropagation;
    hoverStartTime;
    hoverStayTime;
    lang;
    sessionFrom;
    sendMessageTitle;
    sendMessagePath;
    sendMessageImg;
    showMessageCard;
    phoneNumberNoQuotaToast;
    appParameter;
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
    onLaunchApp(e) {
        return e.target;
    }
    onChooseAvatar(e) {
        return e.target;
    }
    onOpenSetting(e) {
        return e.target;
    }
    onCreateLiveActivity(e) {
        return e.target;
    }
    onGetRealtimePhoneNumber(e) {
        return e.target;
    }
    onAgreePrivacyAuthorization(e) {
        return e.target;
    }
    onError(e) {
        return e.target;
    }
};
__decorate([
    Prop({
        type: String,
        default: 'positive'
    })
], Button.prototype, "color", void 0);
__decorate([
    Prop({
        type: String,
        default: 'solid'
    })
], Button.prototype, "fill", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], Button.prototype, "expand", void 0);
__decorate([
    Prop({
        type: String,
        default: ''
    })
], Button.prototype, "shape", void 0);
__decorate([
    Prop({
        type: String,
        default: 'default'
    })
], Button.prototype, "size", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Button.prototype, "strong", void 0);
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
    Emit('launchapp')
], Button.prototype, "onLaunchApp", null);
__decorate([
    Event(),
    Emit('chooseavatar')
], Button.prototype, "onChooseAvatar", null);
__decorate([
    Event(),
    Emit('opensetting')
], Button.prototype, "onOpenSetting", null);
__decorate([
    Event(),
    Emit('createliveactivity')
], Button.prototype, "onCreateLiveActivity", null);
__decorate([
    Event(),
    Emit('getrealtimephonenumber')
], Button.prototype, "onGetRealtimePhoneNumber", null);
__decorate([
    Event(),
    Emit('agreeprivacyauthorization')
], Button.prototype, "onAgreePrivacyAuthorization", null);
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
            phoneNumberNoQuotaToast: {
                type: Boolean,
                default: true,
            },
            appParameter: {
                type: String,
                default: '',
            },
        },
    })
], Button);
export default defineComponentHOC()(Button);
