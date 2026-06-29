import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Media extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Media
     */
    prefixCls: string;
    /**
     * 缩略图地址
     *
     * @type {string}
     * @memberof Media
     */
    thumb: string;
    /**
     * 缩略图样式
     *
     * @type {string | Partial<CSSStyleDeclaration>}
     * @memberof Media
     */
    thumbStyle: string | Partial<CSSStyleDeclaration>;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Media
     */
    title: string;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Media
     */
    label: string;
    /**
     * 垂直对齐方式
     *
     * @type {string}
     * @memberof Media
     */
    align: string;
    extStyle: string;
    get classes(): {
        wrap: string;
        hd: string;
        thumb: string;
        bd: string;
        title: string;
        desc: string;
    };
    onThumbStyleChange(value: string | Partial<CSSStyleDeclaration>): void;
    mounted(): void;
}

export { Media };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * MediaProps接口定义
 */
export interface MediaProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 缩略图地址
     *
     * @type {string}
     */
    thumb?: string;
    /**
     * 缩略图样式
     *
     * @type {string | Partial<CSSStyleDeclaration>}
     */
    thumbStyle?: string | Partial<CSSStyleDeclaration>;
    /**
     * 标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 描述
     *
     * @type {string}
     */
    label?: string;
    /**
     * 垂直对齐方式
     *
     * @type {string}
     */
    align?: string;
}

/**
 * MediaExpose接口定义
 */
export interface MediaExpose {
}

/**
 * MediaInstance类型定义
 */
export type MediaInstance = ComponentPublicInstance<Media, MediaProps, MediaExpose>;
