/**
 * @doraemon-ui/miniprogram.popup.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-19, 23:51:07.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { findComponentNode, getPointsNumber, getSwipeDirection, getTouchPoints } from '@doraemon-ui/miniprogram.shared';
const { classNames, styleToCssString } = Doraemon.util;
let Popup = class Popup extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Popup
     */
    prefixCls;
    /**
     * 自定义 animation 类名前缀
     *
     * @type {string}
     * @memberof Popup
     */
    animationPrefixCls;
    /**
     * 指定弹出的位置
     *
     * @type {Position}
     * @memberof Popup
     */
    position;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Popup
     */
    wrapStyle;
    /**
     * 自定义 body 样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Popup
     */
    bodyStyle;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Popup
     */
    mask;
    /**
     * 点击蒙层是否允许关闭
     *
     * @type {boolean}
     * @memberof Popup
     */
    maskClosable;
    /**
     * 蒙层是否透明
     *
     * @type {boolean}
     * @memberof Popup
     */
    maskTransparent;
    /**
     * 自定义蒙层样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Popup
     */
    maskStyle;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof Popup
     */
    visible;
    /**
     * 是否支持向上/下滑动关闭
     *
     * @type {boolean}
     * @memberof Popup
     */
    closeOnSwipe;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     * @memberof Popup
     */
    zIndex;
    /**
     * 首次进场动画时是否懒挂载组件
     *
     * @type {boolean}
     * @memberof Popup
     */
    mountOnEnter;
    /**
     * 离场动画完成时是否卸载组件
     *
     * @type {boolean}
     * @memberof Popup
     */
    unmountOnExit;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     * @memberof Popup
     */
    closable;
    /**
     * 是否开启安全区适配，关于 `SafeAreaProp` 的类型定义，请参考 `SafeArea` 的文档
     *
     * @type {SafeAreaProp}
     * @memberof Popup
     */
    safeArea;
    get classes() {
        const { prefixCls, position } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--position-${position}`]: position,
        });
        const body = `${prefixCls}__body`;
        const close = `${prefixCls}__close`;
        const x = `${prefixCls}__close-x`;
        return {
            wrap,
            body,
            close,
            x,
        };
    }
    /**
     * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
     *
     * @readonly
     * @memberof Popup
     */
    get indexStyle() {
        return this.zIndex ? { zIndex: this.zIndex } : null;
    }
    /**
     * 容器样式
     *
     * @readonly
     * @memberof Popup
     */
    get containerStyle() {
        return styleToCssString({
            ...this.wrapStyle,
            ...this.indexStyle,
            touchAction: ['top', 'bottom'].includes(this.position)
                ? 'none'
                : 'auto'
        });
    }
    /**
     * body 组件样式
     *
     * @readonly
     * @memberof Popup
     */
    get internalBodyStyle() {
        return this.bodyStyle ? { ...this.bodyStyle, ...this.indexStyle } : { ...this.indexStyle };
    }
    onVisibleChange(visible) {
        this.setPopupVisible(visible);
    }
    onPositionChange(position) {
        this.getTransitionName(position);
    }
    setPopupVisible(popupVisible) {
        if (this.popupVisible !== popupVisible) {
            this.popupVisible = popupVisible;
            this.setBackdropVisible(popupVisible);
        }
    }
    setBackdropVisible(visible) {
        if (this.mask && this._backdrop) {
            if (visible) {
                this._backdrop.retain?.();
            }
            else {
                this._backdrop.release?.();
            }
        }
    }
    transitionName = '';
    popupVisible = false;
    _backdrop;
    /**
     * 点击蒙层事件
     */
    onMaskClick() {
        if (this.maskClosable) {
            this.onClose();
        }
    }
    /**
     * 点击关闭按钮
     */
    onXClose() {
        if (this.closable) {
            this.onClose();
        }
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
     * 获取过渡的类名
     */
    getTransitionName(value) {
        const { animationPrefixCls } = this;
        let transitionName = '';
        switch (value) {
            case 'top':
                transitionName = `${animationPrefixCls}--slideInDown`;
                break;
            case 'right':
                transitionName = `${animationPrefixCls}--slideInRight`;
                break;
            case 'bottom':
                transitionName = `${animationPrefixCls}--slideInUp`;
                break;
            case 'left':
                transitionName = `${animationPrefixCls}--slideInLeft`;
                break;
            default:
                transitionName = `${animationPrefixCls}--fadeIn`;
                break;
        }
        this.transitionName = transitionName;
    }
    isMoved = false;
    _start;
    _move;
    onTouchStart(e) {
        if (!this.closeOnSwipe ||
            !['top', 'bottom'].includes(this.position) ||
            getPointsNumber(e) > 1) {
            return;
        }
        this._start = getTouchPoints(e);
    }
    onTouchMove(e) {
        if (!this.closeOnSwipe ||
            !['top', 'bottom'].includes(this.position) ||
            getPointsNumber(e) > 1) {
            return;
        }
        this._move = getTouchPoints(e);
        const direction = getSwipeDirection(this._start.x, this._move.x, this._start.y, this._move.y);
        if ((this.position === 'bottom' && direction === 'Down') ||
            (this.position === 'top' && direction === 'Up')) {
            this.isMoved = true;
        }
    }
    onTouchEnd(e) {
        if (!this.closeOnSwipe ||
            !['top', 'bottom'].includes(this.position) ||
            getPointsNumber(e) > 1 ||
            !this.isMoved) {
            return;
        }
        this.isMoved = false;
        this._start = null;
        this._move = null;
        this.onClose();
    }
    created() {
        if (this.mask) {
            this._backdrop = findComponentNode('#dora-backdrop', this._renderProxy);
        }
    }
    mounted() {
        this.setPopupVisible(this.visible);
        this.getTransitionName(this.position);
    }
};
__decorate([
    Prop({
        type: String,
        default: 'dora-animate',
    })
], Popup.prototype, "animationPrefixCls", void 0);
__decorate([
    Prop({
        type: String,
        default: 'center',
    })
], Popup.prototype, "position", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], Popup.prototype, "wrapStyle", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], Popup.prototype, "bodyStyle", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Popup.prototype, "mask", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Popup.prototype, "maskClosable", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popup.prototype, "maskTransparent", void 0);
__decorate([
    Prop({
        type: Object,
        default: null,
    })
], Popup.prototype, "maskStyle", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popup.prototype, "visible", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popup.prototype, "closeOnSwipe", void 0);
__decorate([
    Prop({
        type: Number,
        default: null,
    })
], Popup.prototype, "zIndex", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Popup.prototype, "mountOnEnter", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Popup.prototype, "unmountOnExit", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Popup.prototype, "closable", void 0);
__decorate([
    Prop({
        type: [Boolean, String, Object],
        default: false,
    })
], Popup.prototype, "safeArea", void 0);
__decorate([
    Watch('visible')
], Popup.prototype, "onVisibleChange", null);
__decorate([
    Watch('position')
], Popup.prototype, "onPositionChange", null);
Popup = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-popup',
            },
        },
    })
], Popup);
export default defineComponentHOC()(Popup);
