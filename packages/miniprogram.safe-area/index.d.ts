import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

export declare function getSafeAreaInset(safeAreaStyle?: SafeAreaStyle): {
    top: number;
    left: number;
    right: number;
    bottom: number;
};

export declare const checkIPhoneX: ({ model, windowHeight, windowWidth }: {
    model: string;
    windowHeight: number;
    windowWidth: number;
}) => boolean;

export declare const defaultSafeArea: SafeAreaConfig;

export declare const getSafeAreaConfig: (params: SafeAreaProp) => SafeAreaConfig;

declare class SafeArea extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof SafeArea
     */
    prefixCls: string;
    /**
     * 是否开启安全区适配
     *
     * @type {SafeAreaProp}
     * @memberof SafeArea
     */
    safeArea: SafeAreaProp;
    /**
     * 安全区的范围，当其值为 default 或 navBar，顶部计算的安全区包含 StatusBar & NavBar
     *
     * @type {ESafeAreaStyle}
     * @memberof SafeArea
     */
    safeAreaStyle: SafeAreaStyle;
    /**
     * 当其值为 false 时，组件内部会判断是否刘海屏，进而计算出安全区的距离
     *
     * @type {boolean}
     * @memberof SafeArea
     */
    forceRender: boolean;
    /**
     * 使用 css 的 @supports 属性适配安全区
     *
     * @type {boolean}
     * @memberof SafeArea
     */
    supports: boolean;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof SafeArea
     */
    wrapStyle: Partial<CSSStyleDeclaration>;
    /**
     * 组件样式
     *
     * @readonly
     * @memberof SafeArea
     */
    get containerStyle(): string;
    get classes(): {
        wrap: string;
    };
    /**
     * 内部判断是否刘海屏
     *
     * @readonly
     * @memberof SafeArea
     */
    get isIPhoneX(): boolean;
}

export { SafeArea };

/**
 * SafeAreaStyle类型定义
 */
export type SafeAreaStyle = 'default' | 'navBar' | 'statusBar';

/**
 * SafeAreaConfig接口定义
 */
export interface SafeAreaConfig {
    /**
     * top
     * @type {boolean}
     */
    top: boolean;
    /**
     * bottom
     * @type {boolean}
     */
    bottom: boolean;
}

/**
 * SafeAreaProp类型定义
 */
export type SafeAreaProp = boolean | 'top' | 'bottom' | SafeAreaConfig;

/**
 * SafeAreaProps接口定义
 */
export interface SafeAreaProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 是否开启安全区适配
     *
     * @type {SafeAreaProp}
     */
    safeArea?: SafeAreaProp;
    /**
     * 安全区范围样式
     *
     * @type {SafeAreaStyle}
     */
    safeAreaStyle?: SafeAreaStyle;
    /**
     * 是否强制渲染安全区
     *
     * @type {boolean}
     */
    forceRender?: boolean;
    /**
     * 是否使用 css @supports 适配安全区
     *
     * @type {boolean}
     */
    supports?: boolean;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     */
    wrapStyle?: Partial<CSSStyleDeclaration>;
}

/**
 * SafeAreaExpose接口定义
 */
export interface SafeAreaExpose {
}

/**
 * SafeAreaInstance类型定义
 */
export type SafeAreaInstance = ComponentPublicInstance<SafeArea, SafeAreaProps, SafeAreaExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
