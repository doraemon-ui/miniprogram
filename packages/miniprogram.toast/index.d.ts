import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared';

import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

/**
 * 预设的图标
 *
 * @export
 */
export declare const presetIconRecord: {
    [T in ToastPresetIcon]: string;
};

declare function config(val: Pick<ToastShowProps, 'duration' | 'position' | 'maskClosable'>): void;

declare function clear(): void;

declare function show(p: ToastShowProps | string, options?: ToastShowOptions): () => void;

declare function show(p: ToastShowProps | string, selector?: string, instance?: MiniprogramPublicInstance): () => void;

declare function success(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>;

declare function success(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>;

declare function warning(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>;

declare function warning(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>;

declare function error(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>;

declare function error(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>;

declare function info(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>;

declare function info(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>;

declare function loading(p: ToastInternalProps | string, options?: ToastShowOptions): Promise<void>;

declare function loading(p: ToastInternalProps | string, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>;

export { config, show, success, warning, error, info, loading, clear };

declare class Toast extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Toast
     */
    prefixCls: string;
    /**
     * 自定义图片，image 的优先级高于 icon
     *
     * @type {string}
     * @memberof Toast
     */
    image: string;
    /**
     * 图标
     *
     * @type {ToastIcon}
     * @memberof Toast
     */
    icon: ToastIcon;
    /**
     * 图标的颜色
     *
     * @type {string}
     * @memberof Toast
     */
    iconColor: string;
    /**
     * 提示文本
     *
     * @type {string}
     * @memberof Toast
     */
    text: string;
    /**
     * 提示的延迟时间，若小于等于 0 则不会自动关闭
     *
     * @type {number}
     * @memberof Toast
     */
    duration: number;
    /**
     * 垂直方向显示位置
     *
     * @type {ToastPosition}
     * @memberof Toast
     */
    position: ToastPosition;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Toast
     */
    mask: boolean;
    /**
     * 点击蒙层是否允许关闭
     *
     * @type {boolean}
     * @memberof Toast
     */
    maskClosable: boolean;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof Toast
     */
    visible: boolean;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     * @memberof Toast
     */
    zIndex: number;
    get classes(): {
        wrap: string;
        content: string;
        img: string;
        icon: string;
        text: string;
    };
    get maskStyle(): Partial<CSSStyleDeclaration>;
    get iconType(): string;
    get bodyStyle(): Partial<CSSStyleDeclaration>;
    popupVisible: boolean;
    onVisibleChange(visible: boolean): void;
    setPopupVisible(popupVisible: boolean): void;
    onPopupClose(): void;
    onPopupClosed(): void;
    onClose(): void;
    onClosed(): void;
    mounted(): void;
}

export { Toast };

/**
 * 预设的图标的类型
 */
export type ToastPresetIcon = 'success' | 'error' | 'warning' | 'loading';

/**
 * 图标的类型
 */
export type ToastIcon = ToastPresetIcon | string;

/**
 * 显示位置的类型
 */
export type ToastPosition = 'top' | 'bottom' | 'center';

/**
 * 轻提示对应参数的类型
 */
export interface ToastProps {
    /**
     * 自定义类名前缀
     */
    prefixCls?: string;
    /**
     * 自定义图片，image 的优先级高于 icon
     */
    image?: string;
    /**
     * 图标，可选值为 success、error、warning、loading
     */
    icon?: ToastIcon;
    /**
     * 图标的颜色
     */
    iconColor?: string;
    /**
     * 提示文本
     */
    text?: string;
    /**
     * 垂直方向显示位置，可选值为 top、bottom、center
     */
    position?: ToastPosition;
    /**
     * 是否显示蒙层
     */
    mask?: boolean;
    /**
     * 点击蒙层是否允许关闭
     */
    maskClosable?: boolean;
    /**
     * 是否可见
     */
    visible?: boolean;
    /**
     * 设置蒙层的 z-index
     */
    zIndex?: number;
}

/**
 * show 方法对应参数的类型
 */
export interface ToastShowProps extends Omit<ToastProps, 'visible'> {
    /**
     * 提示的延迟时间，若小于等于 0 则不会自动关闭
     */
    duration?: number;
    /**
     * 点击关闭按钮或蒙层的回调函数
     */
    onClose?: () => void;
    /**
     * 关闭后的回调函数
     */
    onClosed?: () => void;
}

/**
 * 轻提示的参数
 */
export interface ToastShowOptions {
    /**
     * 组件的选择器
     */
    selector?: string;
    /**
     * 页面的实例
     */
    instance?: MiniprogramPublicInstance;
}

/**
 * 指令式方法对应参数的类型
 */
export type ToastInternalProps = Omit<ToastShowProps, 'image' | 'icon' | 'iconColor'>;

/**
 * ToastExpose接口定义
 */
export interface ToastExpose {
}

/**
 * ToastInternalMethods接口定义
 */
export interface ToastInternalMethods {
    /**
     * visible
     * @type {boolean}
     */
    visible?: boolean;
    onClose: () => void;
    onClosed: () => void;
}

/**
 * ToastInstance类型定义
 */
export type ToastInstance = ComponentPublicInstance<Toast, ToastProps, ToastExpose> & ToastInternalMethods;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
