import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class WhiteSpace extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof WhiteSpace
     */
    prefixCls: string;
    /**
     * 间距尺寸
     *
     * @type {WhiteSpaceSize}
     * @memberof WhiteSpace
     */
    size: WhiteSpaceSize;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof WhiteSpace
     */
    bodyStyle: string | Partial<CSSStyleDeclaration>;
    extStyle: string;
    onBodyStyleChange(v: string | Partial<CSSStyleDeclaration>): void;
    get classes(): {
        wrap: string;
    };
    onTap(): void;
    mounted(): void;
}

export { WhiteSpace };

/**
 * WhiteSpaceSize类型定义
 */
export type WhiteSpaceSize = 'small' | 'default' | 'large';

/**
 * WhiteSpaceProps接口定义
 */
export interface WhiteSpaceProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 间距尺寸
     *
     * @type {WhiteSpaceSize}
     */
    size?: WhiteSpaceSize;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     */
    bodyStyle?: string | Partial<CSSStyleDeclaration>;
}

/**
 * WhiteSpaceExpose接口定义
 */
export interface WhiteSpaceExpose {
}

/**
 * WhiteSpaceInstance类型定义
 */
export type WhiteSpaceInstance = ComponentPublicInstance<WhiteSpace, WhiteSpaceProps, WhiteSpaceExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
