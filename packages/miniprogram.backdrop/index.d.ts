import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Backdrop extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Backdrop
     */
    prefixCls: string;
    /**
     * 是否显示透明蒙层
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    transparent: boolean;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     * @memberof Backdrop
     */
    zIndex: number;
    /**
     * 首次进场动画时是否懒挂载组件
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    mountOnEnter: boolean;
    /**
     * 离场动画完成时是否卸载组件
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    unmountOnExit: boolean;
    /**
     * 阻止移动触摸
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    disableScroll: boolean;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    visible: boolean;
    /**
     * 过渡的类名
     *
     * @type {string}
     * @memberof Backdrop
     */
    classNames: string;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Backdrop
     */
    wrapStyle: Partial<CSSStyleDeclaration>;
    get classes(): {
        wrap: string;
        bd: string;
        ariaButton: string;
    };
    /**
     * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
     *
     * @readonly
     * @memberof Backdrop
     */
    get indexStyle(): Partial<CSSStyleDeclaration> | null;
    /**
     * 组件样式
     *
     * @readonly
     * @memberof Backdrop
     */
    get containerStyle(): Partial<CSSStyleDeclaration>;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Backdrop
     */
    internalVisible: boolean;
    onVisibleChange(visible: boolean): void;
    /**
     * 锁定蒙层的次数
     *
     * @type {number}
     * @memberof Backdrop
     */
    backdropHolds: number;
    /**
     * 保持锁定
     *
     * @memberof Backdrop
     */
    retain(): void;
    /**
     * 释放锁定
     *
     * @memberof Backdrop
     */
    release(): void;
    /**
     * 阻止冒泡
     *
     * @memberof Backdrop
     */
    onContentClick(): void;
    /**
     * 开始展示前触发
     */
    onShow(): void;
    /**
     * 完全展示后触发
     */
    onShowed(): void;
    /**
     * 开始关闭前触发
     */
    onClose(): void;
    /**
     * 完全关闭后触发
     */
    onClosed(): void;
    /**
     * 点击事件
     */
    onClick(): void;
}

export { Backdrop };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * BackdropProps接口定义
 */
export interface BackdropProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * transparent
     * @type {boolean}
     */
    transparent?: boolean;
    /**
     * zIndex
     * @type {number}
     */
    zIndex?: number;
    /**
     * mountOnEnter
     * @type {boolean}
     */
    mountOnEnter?: boolean;
    /**
     * unmountOnExit
     * @type {boolean}
     */
    unmountOnExit?: boolean;
    /**
     * disableScroll
     * @type {boolean}
     */
    disableScroll?: boolean;
    /**
     * visible
     * @type {boolean}
     */
    visible?: boolean;
    /**
     * classNames
     * @type {string}
     */
    classNames?: string;
    /**
     * wrapStyle
     * @type {Partial<CSSStyleDeclaration>}
     */
    wrapStyle?: Partial<CSSStyleDeclaration>;
}

/**
 * BackdropExpose接口定义
 */
export interface BackdropExpose {
    /**
     * backdropHolds
     * @type {number}
     */
    backdropHolds: number;
    /**
     * 保持锁定
     *
     * @return {void}
     */
    retain(): void;
    /**
     * 释放锁定
     *
     * @return {void}
     */
    release(): void;
}

/**
 * BackdropInstance类型定义
 */
export type BackdropInstance = ComponentPublicInstance<Backdrop, BackdropProps, BackdropExpose>;
