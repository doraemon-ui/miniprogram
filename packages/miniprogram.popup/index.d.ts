import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

import type { TouchPoint } from '@doraemon-ui/miniprogram.shared';

import type { BackdropInstance } from '@doraemon-ui/miniprogram.backdrop';

import type { SafeAreaProp } from '@doraemon-ui/miniprogram.safe-area';

declare class Popup extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Popup
     */
    prefixCls: string;
    /**
     * 自定义 animation 类名前缀
     *
     * @type {string}
     * @memberof Popup
     */
    animationPrefixCls: string;
    /**
     * 指定弹出的位置
     *
     * @type {Position}
     * @memberof Popup
     */
    position: Position;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Popup
     */
    wrapStyle: Partial<CSSStyleDeclaration>;
    /**
     * 自定义 body 样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Popup
     */
    bodyStyle: Partial<CSSStyleDeclaration>;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Popup
     */
    mask: boolean;
    /**
     * 点击蒙层是否允许关闭
     *
     * @type {boolean}
     * @memberof Popup
     */
    maskClosable: boolean;
    /**
     * 蒙层是否透明
     *
     * @type {boolean}
     * @memberof Popup
     */
    maskTransparent: boolean;
    /**
     * 自定义蒙层样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Popup
     */
    maskStyle: Partial<CSSStyleDeclaration>;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof Popup
     */
    visible: boolean;
    /**
     * 是否支持向上/下滑动关闭
     *
     * @type {boolean}
     * @memberof Popup
     */
    closeOnSwipe: boolean;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     * @memberof Popup
     */
    zIndex: number;
    /**
     * 首次进场动画时是否懒挂载组件
     *
     * @type {boolean}
     * @memberof Popup
     */
    mountOnEnter: boolean;
    /**
     * 离场动画完成时是否卸载组件
     *
     * @type {boolean}
     * @memberof Popup
     */
    unmountOnExit: boolean;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     * @memberof Popup
     */
    closable: boolean;
    /**
     * 是否开启安全区适配，关于 `SafeAreaProp` 的类型定义，请参考 `SafeArea` 的文档
     *
     * @type {SafeAreaProp}
     * @memberof Popup
     */
    safeArea: SafeAreaProp;
    get classes(): {
        wrap: string;
        body: string;
        close: string;
        x: string;
    };
    /**
     * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
     *
     * @readonly
     * @memberof Popup
     */
    get indexStyle(): Partial<CSSStyleDeclaration> | null;
    /**
     * 容器样式
     *
     * @readonly
     * @memberof Popup
     */
    get containerStyle(): string;
    /**
     * body 组件样式
     *
     * @readonly
     * @memberof Popup
     */
    get internalBodyStyle(): Partial<CSSStyleDeclaration>;
    onVisibleChange(visible: boolean): void;
    onPositionChange(position: Position): void;
    setPopupVisible(popupVisible: boolean): void;
    setBackdropVisible(visible: boolean): void;
    transitionName: string;
    popupVisible: boolean;
    _backdrop?: BackdropInstance;
    /**
     * 点击蒙层事件
     */
    onMaskClick(): void;
    /**
     * 点击关闭按钮
     */
    onXClose(): void;
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
     * 获取过渡的类名
     */
    getTransitionName(value: Position): void;
    isMoved: boolean;
    _start: TouchPoint;
    _move: TouchPoint;
    onTouchStart(e: TouchEvent): void;
    onTouchMove(e: TouchEvent): void;
    onTouchEnd(e: TouchEvent): void;
    created(): void;
    mounted(): void;
}

export { Popup };

/**
 * Position类型定义
 */
export type Position = 'bottom' | 'top' | 'left' | 'right' | 'center';

/**
 * PopupProps接口定义
 */
export interface PopupProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 自定义 animation 类名前缀
     *
     * @type {string}
     */
    animationPrefixCls?: string;
    /**
     * 指定弹出的位置
     *
     * @type {Position}
     */
    position?: Position;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     */
    wrapStyle?: Partial<CSSStyleDeclaration>;
    /**
     * 自定义 body 样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     */
    bodyStyle?: Partial<CSSStyleDeclaration>;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     */
    mask?: boolean;
    /**
     * 点击蒙层是否允许关闭
     *
     * @type {boolean}
     */
    maskClosable?: boolean;
    /**
     * 蒙层是否透明
     *
     * @type {boolean}
     */
    maskTransparent?: boolean;
    /**
     * 自定义蒙层样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     */
    maskStyle?: Partial<CSSStyleDeclaration>;
    /**
     * 是否可见
     *
     * @type {boolean}
     */
    visible?: boolean;
    /**
     * 是否支持向上/下滑动关闭
     *
     * @type {boolean}
     */
    closeOnSwipe?: boolean;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     */
    zIndex?: number;
    /**
     * 首次进场动画时是否懒挂载组件
     *
     * @type {boolean}
     */
    mountOnEnter?: boolean;
    /**
     * 离场动画完成时是否卸载组件
     *
     * @type {boolean}
     */
    unmountOnExit?: boolean;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     */
    closable?: boolean;
    /**
     * 是否开启安全区适配，关于 `SafeAreaProp` 的类型定义，请参考 `SafeArea` 的文档
     *
     * @type {SafeAreaProp}
     */
    safeArea?: SafeAreaProp;
}

/**
 * PopupExpose接口定义
 */
export interface PopupExpose {
}

/**
 * PopupInstance类型定义
 */
export type PopupInstance = ComponentPublicInstance<Popup, PopupProps, PopupExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
