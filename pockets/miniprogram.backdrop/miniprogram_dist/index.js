/**
 * @doraemon-ui/miniprogram.backdrop.
 * © 2021 - 2022 Doraemon UI.
 * Built on 2022-02-09, 13:44:28.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.17.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let Backdrop = class Backdrop extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Backdrop
     */
    prefixCls;
    transparent;
    zIndex;
    classNames;
    wrapStyle;
    get classes() {
        const { prefixCls, transparent } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--transparent`]: transparent,
        });
        return {
            wrap,
        };
    }
    /**
     * 组件样式
     *
     * @readonly
     * @memberof Popup
     */
    get extStyle() {
        return this.wrapStyle ? { ...this.wrapStyle, zIndex: this.zIndex } : { zIndex: this.zIndex };
    }
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    visible = false;
    onVisibleChange(visible) {
        if (visible) {
            this.$emit('afterShow');
        }
        else {
            this.$emit('afterClose');
        }
    }
    /**
     * 锁定蒙层的次数
     *
     * @type {number}
     * @memberof Backdrop
     */
    backdropHolds = 0;
    /**
     * 保持锁定
     *
     * @memberof Backdrop
     */
    retain() {
        this.backdropHolds = this.backdropHolds + 1;
        if (this.backdropHolds === 1) {
            this.visible = true;
        }
    }
    /**
     * 释放锁定
     *
     * @memberof Backdrop
     */
    release() {
        if (this.backdropHolds === 1) {
            this.visible = false;
        }
        this.backdropHolds = Math.max(0, this.backdropHolds - 1);
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
], Backdrop.prototype, "transparent", void 0);
__decorate([
    Prop({
        type: Number,
        default: 1000,
    })
], Backdrop.prototype, "zIndex", void 0);
__decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn',
    })
], Backdrop.prototype, "classNames", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], Backdrop.prototype, "wrapStyle", void 0);
__decorate([
    Watch('visible')
], Backdrop.prototype, "onVisibleChange", null);
Backdrop = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-backdrop',
            },
        },
    })
], Backdrop);
export default defineComponentHOC()(Backdrop);
