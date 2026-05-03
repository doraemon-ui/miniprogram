/**
 * @doraemon-ui/miniprogram.popup.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-03, 17:07:01.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';
import { getPointsNumber, getTouchPoints, getSwipeDirection, findComponentNode } from '@doraemon-ui/miniprogram.shared';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames, styleToCssString } = Doraemon.util;
let Popup = class Popup extends Doraemon {
    get classes() {
        const { prefixCls, position } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--position-${position}`]: position
        });
        const body = `${prefixCls}__body`;
        const close = `${prefixCls}__close`;
        const x = `${prefixCls}__close-x`;
        return {
            wrap,
            body,
            close,
            x
        };
    }
    /**
   * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
   *
   * @readonly
   * @memberof Popup
   */ get indexStyle() {
        return this.zIndex ? {
            zIndex: this.zIndex
        } : null;
    }
    /**
   * 容器样式
   *
   * @readonly
   * @memberof Popup
   */ get containerStyle() {
        return styleToCssString({
            ...this.wrapStyle,
            ...this.indexStyle,
            touchAction: [
                'top',
                'bottom'
            ].includes(this.position) ? 'none' : 'auto'
        });
    }
    /**
   * body 组件样式
   *
   * @readonly
   * @memberof Popup
   */ get internalBodyStyle() {
        return this.bodyStyle ? {
            ...this.bodyStyle,
            ...this.indexStyle
        } : {
            ...this.indexStyle
        };
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
            } else {
                this._backdrop.release?.();
            }
        }
    }
    /**
   * 点击蒙层事件
   */ onMaskClick() {
        if (this.maskClosable) {
            this.onClose();
        }
    }
    /**
   * 点击关闭按钮
   */ onXClose() {
        if (this.closable) {
            this.onClose();
        }
    }
    /**
   * 开始展示前触发
   */ onShow() {
        this.$emit('show');
    }
    /**
   * 完全展示后触发
   */ onShowed() {
        this.$emit('showed');
    }
    /**
   * 开始关闭前触发
   */ onClose() {
        this.$emit('close');
    }
    /**
   * 完全关闭后触发
   */ onClosed() {
        this.$emit('closed');
    }
    /**
   * 获取过渡的类名
   */ getTransitionName(value) {
        const { animationPrefixCls } = this;
        let transitionName = '';
        switch(value){
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
    onTouchStart(e) {
        if (!this.closeOnSwipe || ![
            'top',
            'bottom'
        ].includes(this.position) || getPointsNumber(e) > 1) {
            return;
        }
        this._start = getTouchPoints(e);
    }
    onTouchMove(e) {
        if (!this.closeOnSwipe || ![
            'top',
            'bottom'
        ].includes(this.position) || getPointsNumber(e) > 1) {
            return;
        }
        this._move = getTouchPoints(e);
        const direction = getSwipeDirection(this._start.x, this._move.x, this._start.y, this._move.y);
        if (this.position === 'bottom' && direction === 'Down' || this.position === 'top' && direction === 'Up') {
            this.isMoved = true;
        }
    }
    onTouchEnd(e) {
        if (!this.closeOnSwipe || ![
            'top',
            'bottom'
        ].includes(this.position) || getPointsNumber(e) > 1 || !this.isMoved) {
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
    constructor(...args){
        super(...args);
        this.transitionName = '';
        this.popupVisible = false;
        this.isMoved = false;
    }
};
_ts_decorate([
    Prop({
        type: String,
        default: 'dora-animate'
    })
], Popup.prototype, "animationPrefixCls", void 0);
_ts_decorate([
    Prop({
        type: String,
        default: 'center'
    })
], Popup.prototype, "position", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Popup.prototype, "wrapStyle", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Popup.prototype, "bodyStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Popup.prototype, "mask", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Popup.prototype, "maskClosable", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popup.prototype, "maskTransparent", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Popup.prototype, "maskStyle", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popup.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popup.prototype, "closeOnSwipe", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Popup.prototype, "zIndex", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Popup.prototype, "mountOnEnter", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Popup.prototype, "unmountOnExit", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Popup.prototype, "closable", void 0);
_ts_decorate([
    Prop({
        type: [
            Boolean,
            String,
            Object
        ],
        default: false
    })
], Popup.prototype, "safeArea", void 0);
_ts_decorate([
    Watch('visible')
], Popup.prototype, "onVisibleChange", null);
_ts_decorate([
    Watch('position')
], Popup.prototype, "onPositionChange", null);
Popup = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-popup'
            }
        }
    })
], Popup);
var index = defineComponentHOC()(Popup);

export { Popup, index as default };
