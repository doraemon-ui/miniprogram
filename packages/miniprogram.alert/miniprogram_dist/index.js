/**
 * @doraemon-ui/miniprogram.alert.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-03-04, 23:18:37.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js';
const { classNames } = Doraemon.util;
let AlertClass = class AlertClass extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Alert
     */
    prefixCls;
    /**
     * 过渡的类名
     *
     * @type {string}
     * @memberof Alert
     */
    classNames;
    /**
     * 主题色
     *
     * @type {PresetColor}
     * @memberof Alert
     */
    theme;
    /**
     * 缩略图
     *
     * @type {string}
     * @memberof Alert
     */
    thumb;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Alert
     */
    title;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Alert
     */
    label;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     * @memberof Alert
     */
    closable;
    /**
     * 是否可见
     */
    visible = true;
    get classes() {
        const { prefixCls, theme } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${theme}`]: theme,
        });
        const hd = `${prefixCls}__hd`;
        const thumb = `${prefixCls}__thumb`;
        const bd = `${prefixCls}__bd`;
        const text = `${prefixCls}__text`;
        const desc = `${prefixCls}__desc`;
        const ft = `${prefixCls}__ft`;
        const closable = `${prefixCls}__closable`;
        return {
            wrap,
            hd,
            thumb,
            bd,
            text,
            desc,
            ft,
            closable,
        };
    }
    /**
     * 关闭时触发的回调函数
     */
    onClose() {
        if (this.closable) {
            this.visible = false;
        }
        this.$emit('click');
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
        type: null,
        default: 'dora-animate--fadeIn',
    })
], AlertClass.prototype, "classNames", void 0);
__decorate([
    Prop({
        type: String,
        default: 'balanced',
    })
], AlertClass.prototype, "theme", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], AlertClass.prototype, "thumb", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], AlertClass.prototype, "title", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], AlertClass.prototype, "label", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], AlertClass.prototype, "closable", void 0);
AlertClass = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-alert',
            },
        },
    })
], AlertClass);
export const Alert = defineComponentHOC()(AlertClass);
export default Alert;
