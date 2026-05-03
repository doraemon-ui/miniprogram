/**
 * @doraemon-ui/miniprogram.backdrop.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-05-04, 00:42:19.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.32.
 */

import { Doraemon, Prop, Watch, Component, defineComponentHOC } from '@doraemon-ui/miniprogram.core-js';

function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const { classNames } = Doraemon.util;
let Backdrop = class Backdrop extends Doraemon {
    get classes() {
        const { prefixCls, transparent } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--transparent`]: transparent
        });
        const bd = `${prefixCls}__bd`;
        const ariaButton = `${prefixCls}__aria-button`;
        return {
            wrap,
            bd,
            ariaButton
        };
    }
    /**
   * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
   *
   * @readonly
   * @memberof Backdrop
   */ get indexStyle() {
        return this.zIndex ? {
            zIndex: this.zIndex
        } : null;
    }
    /**
   * 组件样式
   *
   * @readonly
   * @memberof Backdrop
   */ get containerStyle() {
        return this.wrapStyle ? {
            ...this.wrapStyle,
            ...this.indexStyle
        } : {
            ...this.indexStyle
        };
    }
    onVisibleChange(visible) {
        this.internalVisible = visible;
        if (!visible) {
            this.backdropHolds = 0;
            this.onClose();
        }
    }
    /**
   * 保持锁定
   *
   * @memberof Backdrop
   */ retain() {
        this.backdropHolds = this.backdropHolds + 1;
        if (this.backdropHolds === 1) {
            this.internalVisible = true;
        }
    }
    /**
   * 释放锁定
   *
   * @memberof Backdrop
   */ release() {
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
   */ onContentClick() {
    /**
     * Ignore
     */ }
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
   * 点击事件
   */ onClick() {
        this.$emit('click');
    }
    constructor(...args){
        super(...args);
        /**
   * 是否显示蒙层
   *
   * @type {boolean}
   * @memberof Backdrop
   */ this.internalVisible = false;
        /**
   * 锁定蒙层的次数
   *
   * @type {number}
   * @memberof Backdrop
   */ this.backdropHolds = 0;
    }
};
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Backdrop.prototype, "transparent", void 0);
_ts_decorate([
    Prop({
        type: Number,
        default: null
    })
], Backdrop.prototype, "zIndex", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Backdrop.prototype, "mountOnEnter", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Backdrop.prototype, "unmountOnExit", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: true
    })
], Backdrop.prototype, "disableScroll", void 0);
_ts_decorate([
    Prop({
        type: Boolean,
        default: false
    })
], Backdrop.prototype, "visible", void 0);
_ts_decorate([
    Prop({
        type: null,
        default: 'dora-animate--fadeIn'
    })
], Backdrop.prototype, "classNames", void 0);
_ts_decorate([
    Prop({
        type: Object,
        default: null
    })
], Backdrop.prototype, "wrapStyle", void 0);
_ts_decorate([
    Watch('visible')
], Backdrop.prototype, "onVisibleChange", null);
Backdrop = _ts_decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-backdrop'
            }
        },
        expose: [
            'backdropHolds',
            'retain',
            'release'
        ]
    })
], Backdrop);
var index = defineComponentHOC()(Backdrop);

export { Backdrop, index as default };
