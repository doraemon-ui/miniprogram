import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class WingBlank extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof WingBlank
     */
    prefixCls: string;
    /**
     * 两侧留白尺寸
     *
     * @type {WingBlankSize}
     * @memberof WingBlank
     */
    size: WingBlankSize;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof WingBlank
     */
    bodyStyle: string | Partial<CSSStyleDeclaration>;
    extStyle: string;
    onBodyStyleChange(v: string | Partial<CSSStyleDeclaration>): void;
    get classes(): {
        wrap: string;
    };
    mounted(): void;
}

export { WingBlank };

/**
 * WingBlankSize类型定义
 */
export type WingBlankSize = 'small' | 'default' | 'large';

/**
 * WingBlankProps接口定义
 */
export interface WingBlankProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 两侧留白尺寸
     *
     * @type {WingBlankSize}
     */
    size?: WingBlankSize;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     */
    bodyStyle?: string | Partial<CSSStyleDeclaration>;
}

/**
 * WingBlankExpose接口定义
 */
export interface WingBlankExpose {
}

/**
 * WingBlankInstance类型定义
 */
export type WingBlankInstance = ComponentPublicInstance<WingBlank, WingBlankProps, WingBlankExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
