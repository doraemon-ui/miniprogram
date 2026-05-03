/**
 * @doraemon-ui/miniprogram.dialog.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:33.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Event, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import * as dialog from './dialog.js';
export { dialog };

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Dialog = class Dialog extends Doraemon {
    get classes() {
        const { prefixCls, verticalButtons, buttons: _buttons } = this;
        const wrap = classNames(prefixCls);
        const hd = `${prefixCls}__hd`;
        const title = `${prefixCls}__title`;
        const content = `${prefixCls}__content`;
        const bd = `${prefixCls}__bd`;
        const ft = `${prefixCls}__ft`;
        const image = `${prefixCls}__image`;
        const img = `${prefixCls}__image-img`;
        const close = `${prefixCls}__close`;
        const x = `${prefixCls}__close-x`;
        const buttons = classNames(`${prefixCls}__buttons`, {
            [`${prefixCls}__buttons--${verticalButtons ? 'vertical' : 'horizontal'}`]: true
        });
        const button = _buttons.map((button)=>{
            const wrap = classNames(`${prefixCls}__button`, {
                ['dora-color']: button.type,
                [`dora-color--${button.type}`]: button.type ?? 'dark',
                [`${prefixCls}__button--bold`]: button.bold,
                [`${prefixCls}__button--disabled`]: button.disabled,
                [`${button.className}`]: button.className
            });
            const hover = button.hoverClass && button.hoverClass !== 'default' ? button.hoverClass : `${prefixCls}__button--hover`;
            return {
                wrap,
                hover
            };
        });
        return {
            wrap,
            hd,
            title,
            content,
            bd,
            ft,
            close,
            image,
            img,
            x,
            buttons,
            button
        };
    }
    onVisibleChange(visible) {
        this.setPopupVisible(visible);
    }
    setPopupVisible(popupVisible) {
        if (this.popupVisible !== popupVisible) {
            this.popupVisible = popupVisible;
        }
    }
    onPopupClose() {
        this.onClose();
    }
    onPopupClosed() {
        this.onClosed();
    }
    onClose() {
        this.$emit('close');
    }
    onClosed() {
        this.$emit('closed');
    }
    mounted() {
        this.setPopupVisible(this.visible);
    }
    async onAction(e, method, closable = false) {
        const { index } = e.currentTarget.dataset;
        const button = this.buttons[index];
        const eventName = method.replace(/^on/, '').toLowerCase();
        if (!button.disabled) {
            await Promise.all([
                button[method]?.({
                    method: eventName,
                    button,
                    index,
                    detail: e.detail
                }),
                this.$emit('action', {
                    method: eventName,
                    button,
                    index,
                    detail: e.detail
                })
            ]);
            if (closable) {
                this.onClose();
            }
        }
    }
    async onClick(e) {
        await this.onAction(e, 'onClick', this.buttonClosable);
    }
    async onGetUserInfo(e) {
        await this.onAction(e, 'onGetUserInfo');
    }
    async onContact(e) {
        await this.onAction(e, 'onContact');
    }
    async onGetPhoneNumber(e) {
        await this.onAction(e, 'onGetPhoneNumber');
    }
    async onLaunchApp(e) {
        await this.onAction(e, 'onLaunchApp');
    }
    async onError(e) {
        await this.onAction(e, 'onError');
    }
    async onOpenSetting(e) {
        await this.onAction(e, 'onOpenSetting');
    }
    async onChooseAvatar(e) {
        await this.onAction(e, 'onChooseAvatar');
    }
    async onCreateLiveActivity(e) {
        await this.onAction(e, 'onCreateLiveActivity');
    }
    async onGetRealtimePhoneNumber(e) {
        await this.onAction(e, 'onGetRealtimePhoneNumber');
    }
    async onAgreePrivacyAuthorization(e) {
        await this.onAction(e, 'onAgreePrivacyAuthorization');
    }
    constructor(...args){
        super(...args);
        this.popupVisible = false;
    }
};
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Dialog.prototype, "bodyStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Dialog.prototype, "mask", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Dialog.prototype, "maskClosable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Dialog.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Dialog.prototype, "zIndex", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Dialog.prototype, "closable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Dialog.prototype, "buttonClosable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Dialog.prototype, "verticalButtons", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Dialog.prototype, "image", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Dialog.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Dialog.prototype, "content", void 0);
_ts_decorate([
    Prop({
        type: Array,
        default: []
    })
], Dialog.prototype, "buttons", void 0);
_ts_decorate([
    Watch('visible')
], Dialog.prototype, "onVisibleChange", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onClick", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onGetUserInfo", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onContact", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onGetPhoneNumber", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onLaunchApp", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onError", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onOpenSetting", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onChooseAvatar", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onCreateLiveActivity", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onGetRealtimePhoneNumber", null);
_ts_decorate([
    Event()
], Dialog.prototype, "onAgreePrivacyAuthorization", null);
Dialog = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-dialog'
            }
        }
    })
], Dialog);
var index = defineComponentHOC()(Dialog);

export { Dialog, index as default };
