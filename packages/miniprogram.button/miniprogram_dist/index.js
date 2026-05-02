/**
 * @doraemon-ui/miniprogram.button.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-04-28, 23:32:58.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.31.
 */

import { Doraemon, Prop, Event, Emit, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Button = class Button extends Doraemon {
    /**
   * 计算按钮的 CSS 类名
   *
   * @description 根据组件属性动态生成按钮的包裹类名和点击态类名
   * @readonly
   * @memberof Button
   */ get classes() {
        const { prefixCls, hoverClass, color, size, fill, expand, shape, strong, disabled } = this;
        const finalSize = [
            'small',
            'large'
        ].includes(size) ? size : '';
        const finalFill = [
            'solid',
            'outline',
            'clear'
        ].includes(fill) ? fill : '';
        const finalExpand = [
            'block',
            'full'
        ].includes(expand) ? expand : '';
        const finalShape = [
            'rounded',
            'rectangular'
        ].includes(shape) ? shape : '';
        const wrap = classNames(prefixCls, {
            ['dora-color']: color,
            [`dora-color--${color}`]: color,
            [`${prefixCls}--${size}`]: finalSize,
            [`${prefixCls}--${fill}`]: finalFill,
            [`${prefixCls}--${expand}`]: finalExpand,
            [`${prefixCls}--${shape}`]: finalShape,
            [`${prefixCls}--strong`]: strong,
            [`${prefixCls}--disabled`]: disabled
        });
        const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--activated`;
        return {
            wrap,
            hover
        };
    }
    /**
   * 按钮点击事件处理
   *
   * @description 当按钮未被禁用且未处于加载状态时，触发 click 事件
   * @fires click
   * @memberof Button
   */ onClick() {
        if (!this.disabled && !this.loading) {
            this.$emit('click');
        }
    }
    /**
   * 获取用户信息回调，open-type="getUserInfo" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires getuserinfo
   * @memberof Button
   */ onGetUserInfo(e) {
        return e.target;
    }
    /**
   * 客服消息回调，open-type="contact" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires contact
   * @memberof Button
   */ onContact(e) {
        return e.target;
    }
    /**
   * 获取用户手机号回调，open-type="getPhoneNumber" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires getphonenumber
   * @memberof Button
   */ onGetPhoneNumber(e) {
        return e.target;
    }
    /**
   * 打开 APP 回调，open-type="launchApp" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires launchapp
   * @memberof Button
   */ onLaunchApp(e) {
        return e.target;
    }
    /**
   * 选择头像回调，open-type="chooseAvatar" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires chooseavatar
   * @memberof Button
   */ onChooseAvatar(e) {
        return e.target;
    }
    /**
   * 打开授权设置页回调，open-type="openSetting" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires opensetting
   * @memberof Button
   */ onOpenSetting(e) {
        return e.target;
    }
    /**
   * 创建直播活动回调，open-type="createLiveActivity" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires createliveactivity
   * @memberof Button
   */ onCreateLiveActivity(e) {
        return e.target;
    }
    /**
   * 获取用户实时手机号回调，open-type="getRealtimePhoneNumber" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires getrealtimephonenumber
   * @memberof Button
   */ onGetRealtimePhoneNumber(e) {
        return e.target;
    }
    /**
   * 同意隐私协议授权回调，open-type="agreePrivacyAuthorization" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires agreeprivacyauthorization
   * @memberof Button
   */ onAgreePrivacyAuthorization(e) {
        return e.target;
    }
    /**
   * 错误回调，使用开放能力发生错误时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires error
   * @memberof Button
   */ onError(e) {
        return e.target;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'positive'
    })
], Button.prototype, "color", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'solid'
    })
], Button.prototype, "fill", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Button.prototype, "expand", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Button.prototype, "shape", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'default'
    })
], Button.prototype, "size", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Button.prototype, "strong", void 0);
_ts_decorate([
    Event(),
    Emit('getuserinfo')
], Button.prototype, "onGetUserInfo", null);
_ts_decorate([
    Event(),
    Emit('contact')
], Button.prototype, "onContact", null);
_ts_decorate([
    Event(),
    Emit('getphonenumber')
], Button.prototype, "onGetPhoneNumber", null);
_ts_decorate([
    Event(),
    Emit('launchapp')
], Button.prototype, "onLaunchApp", null);
_ts_decorate([
    Event(),
    Emit('chooseavatar')
], Button.prototype, "onChooseAvatar", null);
_ts_decorate([
    Event(),
    Emit('opensetting')
], Button.prototype, "onOpenSetting", null);
_ts_decorate([
    Event(),
    Emit('createliveactivity')
], Button.prototype, "onCreateLiveActivity", null);
_ts_decorate([
    Event(),
    Emit('getrealtimephonenumber')
], Button.prototype, "onGetRealtimePhoneNumber", null);
_ts_decorate([
    Event(),
    Emit('agreeprivacyauthorization')
], Button.prototype, "onAgreePrivacyAuthorization", null);
_ts_decorate([
    Event(),
    Emit('error')
], Button.prototype, "onError", null);
Button = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-button'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            loading: {
                type: Boolean,
                default: false
            },
            formType: {
                type: String,
                default: ''
            },
            openType: {
                type: String,
                default: ''
            },
            hoverClass: {
                type: String,
                default: 'default'
            },
            hoverStopPropagation: {
                type: Boolean,
                default: false
            },
            hoverStartTime: {
                type: Number,
                default: 20
            },
            hoverStayTime: {
                type: Number,
                default: 70
            },
            lang: {
                type: String,
                default: 'en'
            },
            sessionFrom: {
                type: String,
                default: ''
            },
            sendMessageTitle: {
                type: String,
                default: ''
            },
            sendMessagePath: {
                type: String,
                default: ''
            },
            sendMessageImg: {
                type: String,
                default: ''
            },
            showMessageCard: {
                type: Boolean,
                default: false
            },
            phoneNumberNoQuotaToast: {
                type: Boolean,
                default: true
            },
            appParameter: {
                type: String,
                default: ''
            }
        }
    })
], Button);
var index = defineComponentHOC()(Button);

export { Button, index as default };
