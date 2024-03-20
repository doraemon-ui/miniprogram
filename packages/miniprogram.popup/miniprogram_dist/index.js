/**
 * @doraemon-ui/miniprogram.popup.
 * © 2021 - 2024 Doraemon UI.
 * Built on 2024-03-20, 16:59:38.
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
/**
 * 弹出的位置
 *
 * @enum {number}
 */
var PositionEnum;
(function (PositionEnum) {
    PositionEnum["TOP"] = "top";
    PositionEnum["BOTTOM"] = "bottom";
    PositionEnum["LEFT"] = "left";
    PositionEnum["RIGHT"] = "right";
    PositionEnum["CENTER"] = "center";
})(PositionEnum || (PositionEnum = {}));
let Popup = class Popup extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Popup
     */
    prefixCls;
    animationPrefixCls;
    position;
    bodyStyle;
    mask;
    maskClosable;
    maskTransparent;
    maskStyle;
    visible;
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
    get classes() {
        const { prefixCls, position } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--position-${position}`]: position,
        });
        const body = `${prefixCls}-body`;
        return {
            wrap,
            body,
        };
    }
    /**
     * 组件样式
     *
     * @readonly
     * @memberof Popup
     */
    get extStyle() {
        return this.bodyStyle ? { ...this.bodyStyle, zIndex: this.zIndex } : { zIndex: this.zIndex };
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
        if (this.mask && this._wuxBackdrop) {
            if (visible) {
                this._wuxBackdrop.retain();
            }
            else {
                this._wuxBackdrop.release();
            }
        }
    }
    transitionName = '';
    popupVisible = false;
    _wuxBackdrop;
    close() {
        this.$emit('close');
    }
    onMaskClick() {
        if (this.maskClosable) {
            this.close();
        }
    }
    onExited() {
        this.$emit('closed');
    }
    getTransitionName(value) {
        const { animationPrefixCls } = this;
        let transitionName = '';
        switch (value) {
            case PositionEnum.TOP:
                transitionName = `${animationPrefixCls}--slideInDown`;
                break;
            case PositionEnum.RIGHT:
                transitionName = `${animationPrefixCls}--slideInRight`;
                break;
            case PositionEnum.BOTTOM:
                transitionName = `${animationPrefixCls}--slideInUp`;
                break;
            case PositionEnum.LEFT:
                transitionName = `${animationPrefixCls}--slideInLeft`;
                break;
            default:
                transitionName = `${animationPrefixCls}--fadeIn`;
                break;
        }
        this.transitionName = transitionName;
    }
    created() {
        if (this.mask) {
            this._wuxBackdrop = this._renderProxy.selectComponent('#dora-backdrop');
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
        default: PositionEnum.CENTER,
    })
], Popup.prototype, "position", void 0);
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
        type: Number,
        default: 1000,
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
