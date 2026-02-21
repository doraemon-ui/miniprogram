/**
 * @doraemon-ui/miniprogram.avatar.
 * © 2021 - 2026 Doraemon UI.
 * Built on 2026-02-22, 01:42:40.
 * With @doraemon-ui/miniprogram.tools v0.0.2-alpha.23.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { useRect } from '@doraemon-ui/miniprogram.shared';
import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js';
const { classNames, styleToCssString } = Doraemon.util;
let Avatar = class Avatar extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Avatar
     */
    prefixCls;
    /**
     * 头像形状
     *
     * @type {('circle' | 'square')}
     * @default 'circle'
     * @memberof Avatar
     */
    shape;
    /**
     * 头像尺寸
     *
     * @type {('small' | 'default' | 'large')}
     * @default 'default'
     * @memberof Avatar
     */
    size;
    /**
     * 图片地址
     *
     * @type {string}
     * @default ''
     * @memberof Avatar
     */
    src;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @default ''
     * @memberof Avatar
     */
    bodyStyle;
    /**
     * 是否自动缩放文字以适应头像尺寸
     *
     * @type {boolean}
     * @default false
     * @memberof Avatar
     */
    scale;
    /**
     * 转换后的内联样式
     *
     * @type {string}
     * @memberof Avatar
     */
    extStyle = '';
    /**
     * 文字缩放样式
     *
     * @type {string}
     * @memberof Avatar
     */
    childrenStyle = '';
    /**
     * 计算头像的 CSS 类名
     *
     * @description 根据组件属性动态生成头像的包裹类名和文字容器类名
     * @readonly
     * @memberof Avatar
     */
    get classes() {
        const { prefixCls, shape, size, src } = this;
        const wrap = classNames(prefixCls, {
            [`${prefixCls}--${shape}`]: shape,
            [`${prefixCls}--${size}`]: size,
            [`${prefixCls}--thumb`]: src,
        });
        const string = `${prefixCls}__string`;
        return {
            wrap,
            string,
        };
    }
    /**
     * 自动缩放文字以适应头像尺寸
     *
     * @description 测量头像容器和文字元素的宽度，当文字超出容器时自动缩放
     * @memberof Avatar
     */
    setScale() {
        const { prefixCls } = this;
        useRect([`.${prefixCls}`, `.${prefixCls}__string`], this._renderProxy).then(([parent, child]) => {
            if (!parent || !child) {
                return;
            }
            const offset = parent.width - 8 < child.width;
            const childrenScale = offset ? (parent.width - 8) / child.width : 1;
            const childrenStyle = childrenScale !== 1
                ? styleToCssString({
                    position: 'absolute',
                    display: 'inline-block',
                    transform: `scale(${childrenScale})`,
                    left: `calc(50% - ${Math.round(child.width / 2)}px)`,
                })
                : '';
            this.childrenStyle = childrenStyle;
        });
    }
    /**
     * 监听 bodyStyle 属性变化，转换为 CSS 字符串
     *
     * @param {(string | Partial<CSSStyleDeclaration>)} newVal 新的样式值
     * @memberof Avatar
     */
    onBodyStyleChanged(newVal) {
        this.extStyle = styleToCssString(newVal);
    }
    /**
     * 组件挂载完成生命周期
     *
     * @description 当无图片且开启了缩放时，自动计算文字缩放比例
     * @memberof Avatar
     */
    mounted() {
        if (!this.src && this.scale) {
            this.setScale();
        }
    }
};
__decorate([
    Prop({
        type: String,
        default: 'circle',
    })
], Avatar.prototype, "shape", void 0);
__decorate([
    Prop({
        type: String,
        default: 'default',
    })
], Avatar.prototype, "size", void 0);
__decorate([
    Prop({
        type: String,
        default: '',
    })
], Avatar.prototype, "src", void 0);
__decorate([
    Prop({
        type: null,
        default: '',
    })
], Avatar.prototype, "bodyStyle", void 0);
__decorate([
    Prop({
        type: Boolean,
        default: false,
    })
], Avatar.prototype, "scale", void 0);
__decorate([
    Watch('bodyStyle')
], Avatar.prototype, "onBodyStyleChanged", null);
Avatar = __decorate([
    Component({
        props: {
            prefixCls: {
                type: String,
                default: 'dora-avatar',
            },
        },
    })
], Avatar);
export default defineComponentHOC()(Avatar);
