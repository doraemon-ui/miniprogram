/**
 * @doraemon-ui/miniprogram.toast.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-22, 00:38:18.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
import { presetIconRecord } from './toast';
const { classNames } = Doraemon.util;
let Toast = class Toast extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Toast
     */
    prefixCls;
    /**
     * 自定义图片，image 的优先级高于 icon
     *
     * @type {string}
     * @memberof Toast
     */
    image;
    /**
     * 图标
     *
     * @type {ToastIcon}
     * @memberof Toast
     */
    icon;
    /**
     * 图标的颜色
     *
     * @type {string}
     * @memberof Toast
     */
    iconColor;
    /**
     * 提示文本
     *
     * @type {string}
     * @memberof Toast
     */
    text;
    /**
     * 提示的延迟时间，若小于等于 0 则不会自动关闭
     *
     * @type {number}
     * @memberof Toast
     */
    duration;
    /**
     * 垂直方向显示位置
     *
     * @type {ToastPosition}
     * @memberof Toast
     */
    position;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Toast
     */
    mask;
    /**
     * 点击蒙层是否允许关闭
     *
     * @type {boolean}
     * @memberof Toast
     */
    maskClosable;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof Toast
     */
    visible;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     * @memberof Toast
     */
    zIndex;
    get classes() {
        const { prefixCls, iconType: hasIcon, image } = this;
        const wrap = classNames(prefixCls);
        const content = classNames(`${prefixCls}__content`, {
            [`${prefixCls}__content--has-icon`]: hasIcon !== '' || image !== '',
        });
        const img = `${prefixCls}__img`;
        const icon = classNames(`${prefixCls}__icon`, {
            [`${prefixCls}__icon--${this.icon}`]: this.icon,
        });
        const text = `${prefixCls}__text`;
        return {
            wrap,
            content,
            img,
            icon,
            text,
        };
    }
    get maskStyle() {
        return {
            pointerEvents: this.maskClosable ? 'none' : 'auto',
        };
    }
    get iconType() {
        return presetIconRecord[this.icon] ?? this.icon ?? '';
    }
    get bodyStyle() {
        const getTop = (position) => {
            switch (position) {
                case 'top':
                    return '20%';
                case 'bottom':
                    return '80%';
                default:
                    return '50%';
            }
        };
        return {
            maxWidth: '75vw',
            maxHeight: '75vh',
            backgroundColor: 'unset',
            top: getTop(this.position),
        };
    }
    popupVisible = false;
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
};
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Toast.prototype, "image", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Toast.prototype, "icon", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Toast.prototype, "iconColor", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Toast.prototype, "text", void 0);
__decorate([
    Prop({
        type: Number,
        default: 1500,
    })
], Toast.prototype, "duration", void 0);
__decorate([
    Prop({
        type: String,
        default: 'center',
    })
], Toast.prototype, "position", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Toast.prototype, "mask", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: true,
    })
], Toast.prototype, "maskClosable", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Toast.prototype, "visible", void 0);
__decorate([
    Prop({
        type: Number,
        default: null,
    })
], Toast.prototype, "zIndex", void 0);
__decorate([
    Watch('visible')
], Toast.prototype, "onVisibleChange", null);
Toast = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-toast',
            },
        },
    })
], Toast);
export default defineComponentHOC()(Toast);
import * as toast_1 from './toast';
export { toast_1 as toast };
