/**
 * @doraemon-ui/miniprogram.backdrop.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-19, 23:49:25.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
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
    /**
     * 是否显示透明蒙层
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    transparent;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     * @memberof Backdrop
     */
    zIndex;
    /**
     * 首次进场动画时是否懒挂载组件
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    mountOnEnter;
    /**
     * 离场动画完成时是否卸载组件
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    unmountOnExit;
    /**
     * 阻止移动触摸
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    disableScroll;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    visible;
    /**
     * 过渡的类名
     *
     * @type {string}
     * @memberof Backdrop
     */
    classNames;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Backdrop
     */
    wrapStyle;
    get classes() {
        const { prefixCls, transparent } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--transparent`]: transparent,
        });
        const bd = `${prefixCls}__bd`;
        const ariaButton = `${prefixCls}__aria-button`;
        return {
            wrap,
            bd,
            ariaButton,
        };
    }
    /**
     * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
     *
     * @readonly
     * @memberof Backdrop
     */
    get indexStyle() {
        return this.zIndex ? { zIndex: this.zIndex } : null;
    }
    /**
     * 组件样式
     *
     * @readonly
     * @memberof Backdrop
     */
    get containerStyle() {
        return this.wrapStyle ? { ...this.wrapStyle, ...this.indexStyle } : { ...this.indexStyle };
    }
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    internalVisible = false;
    onVisibleChange(visible) {
        this.internalVisible = visible;
        if (!visible) {
            this.backdropHolds = 0;
            this.onClose();
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
            this.internalVisible = true;
        }
    }
    /**
     * 释放锁定
     *
     * @memberof Backdrop
     */
    release() {
        if (this.backdropHolds === 1) {
            this.internalVisible = false;
            this.onClose();
        }
        this.backdropHolds = Math.max(0, this.backdropHolds - 1);
    }
    /**
     * 阻止冒泡
     *
     * @memberof Backdrop
     */
    onContentClick() {
        /** Ignore */
    }
    /**
     * 开始展示前触发
     */
    onShow() {
        this.$emit('show');
    }
    /**
     * 完全展示后触发
     */
    onShowed() {
        this.$emit('showed');
    }
    /**
     * 开始关闭前触发
     */
    onClose() {
        this.$emit('close');
    }
    /**
     * 完全关闭后触发
     */
    onClosed() {
        this.$emit('closed');
    }
    /**
     * 点击事件
     */
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
        default: null,
    })
], Backdrop.prototype, "zIndex", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Backdrop.prototype, "mountOnEnter", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Backdrop.prototype, "unmountOnExit", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Backdrop.prototype, "disableScroll", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Backdrop.prototype, "visible", void 0);
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
        expose: ['backdropHolds', 'retain', 'release']
    })
], Backdrop);
export default defineComponentHOC()(Backdrop);
