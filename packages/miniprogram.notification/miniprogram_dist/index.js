/**
 * @doraemon-ui/miniprogram.notification.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-07-02, 20:47:09.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.66.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { findComponentNode, getPointsNumber, getTouchPoints } from '@doraemon-ui/miniprogram.shared';
import * as notification from './notification.js';
export { notification };

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Notification = class Notification extends Doraemon {
    get classes() {
        const { prefixCls } = this;
        return {
            wrap: classNames(prefixCls),
            content: `${prefixCls}__content`,
            hd: `${prefixCls}__hd`,
            icon: `${prefixCls}__icon`,
            image: `${prefixCls}__image`,
            bd: `${prefixCls}__bd`,
            header: `${prefixCls}__header`,
            title: `${prefixCls}__title`,
            titleRightText: `${prefixCls}__title-right-text`,
            closeButton: `${prefixCls}__close-button`,
            subtitle: `${prefixCls}__subtitle`,
            text: `${prefixCls}__text`,
            ft: `${prefixCls}__ft`
        };
    }
    onVisibleChange(visible) {
        this.setNotificationVisible(visible);
    }
    onDurationChange() {
        if (this.notificationVisible) {
            this.scheduleClose();
        }
    }
    setNotificationVisible(notificationVisible) {
        const changed = this.notificationVisible !== notificationVisible;
        this.notificationVisible = notificationVisible;
        if (notificationVisible) {
            this.notificationWrapStyle = null;
            void this.updateNotificationHeight();
            this.scheduleClose();
            return;
        }
        this.clearCloseTimer();
        if (changed) {
            this.$nextTick(()=>{
                this.onClosed();
            });
        }
    }
    clearCloseTimer() {
        if (this._closeTimer) {
            clearTimeout(this._closeTimer);
            this._closeTimer = null;
        }
    }
    scheduleClose() {
        this.clearCloseTimer();
        if (this.duration > 0) {
            this._closeTimer = setTimeout(()=>{
                this.onClose(this.data);
            }, this.duration);
        }
    }
    onTap() {
        this.onClick(this.data);
    }
    async updateNotificationHeight() {
        const animationGroup = findComponentNode('#dora-animation-group', this._renderProxy);
        const rect = await animationGroup.getBoundingClientRect();
        if (rect?.height) {
            this._notificationHeight = rect.height / 2;
        }
    }
    updateWrapStyle(transform = '', transition = '') {
        this.notificationWrapStyle = {
            transform,
            transition
        };
    }
    onTouchStart(e) {
        if (!this.swipeToClose || !this.notificationVisible || this._isTouched || getPointsNumber(e) > 1) return;
        this.clearCloseTimer();
        this._isTouched = true;
        this._isMoved = false;
        this._isScrolling = undefined;
        this._touchesDiff = 0;
        this._touchStartTime = Date.now();
        const point = getTouchPoints(e);
        this._touchesStart = {
            x: point.x,
            y: point.y
        };
    }
    onTouchMove(e) {
        if (!this.swipeToClose || !this._isTouched || getPointsNumber(e) > 1) return;
        const point = getTouchPoints(e);
        if (typeof this._isScrolling === 'undefined') {
            this._isScrolling = Math.abs(point.y - this._touchesStart.y) < Math.abs(point.x - this._touchesStart.x);
        }
        if (this._isScrolling) {
            this._isTouched = false;
            return;
        }
        this._isMoved = true;
        this._touchesDiff = point.y - this._touchesStart.y;
        let translateY = this._touchesDiff;
        if (translateY > 0) {
            translateY = translateY ** 0.8;
        }
        this.updateWrapStyle(`translate3d(0, ${translateY}px, 0)`, 'none');
    }
    onTouchEnd() {
        if (!this.swipeToClose || !this._isTouched || !this._isMoved) {
            this._isTouched = false;
            this._isMoved = false;
            if (this.notificationVisible) {
                this.scheduleClose();
            }
            return;
        }
        this._isTouched = false;
        this._isMoved = false;
        if (this._touchesDiff === 0) {
            this.scheduleClose();
            return;
        }
        const timeDiff = Date.now() - this._touchStartTime;
        this.updateWrapStyle('', '');
        if (this._touchesDiff < -10 && timeDiff < 300 || -this._touchesDiff >= this._notificationHeight) {
            this.onClose(this.data);
            return;
        }
        this.scheduleClose();
    }
    onCloseTap() {
        this.onClose(this.data);
    }
    onClick(data) {
        this.$emit('click', data);
    }
    onClose(data) {
        this.$emit('close', data);
    }
    onClosed() {
        this.$emit('closed');
    }
    mounted() {
        this.setNotificationVisible(this.visible);
    }
    destroyed() {
        this.clearCloseTimer();
    }
    constructor(...args){
        super(...args);
        this.notificationVisible = false;
        this.notificationWrapStyle = null;
        this._closeTimer = null;
        this._isTouched = false;
        this._isMoved = false;
        this._touchesDiff = 0;
        this._touchStartTime = 0;
        this._notificationHeight = 64;
        this._touchesStart = {
            x: 0,
            y: 0
        };
    }
};
_ts_decorate([
    Prop({
        type: null,
        default: 'dora-animate--slideInDown'
    })
], Notification.prototype, "classNames", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Notification.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Notification.prototype, "image", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Notification.prototype, "title", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Notification.prototype, "titleRightText", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Notification.prototype, "closable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Notification.prototype, "swipeToClose", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Notification.prototype, "subtitle", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: ''
    })
], Notification.prototype, "text", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: 3000
    })
], Notification.prototype, "duration", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: null
    })
], Notification.prototype, "data", void 0);
_ts_decorate([
    Watch('visible')
], Notification.prototype, "onVisibleChange", null);
_ts_decorate([
    Watch('duration')
], Notification.prototype, "onDurationChange", null);
Notification = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-notification'
            }
        }
    })
], Notification);
var index = defineComponentHOC()(Notification);

export { Notification, index as default };
