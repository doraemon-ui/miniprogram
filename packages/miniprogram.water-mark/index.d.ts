import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class WaterMark extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof WaterMark
     */
    prefixCls: string;
    /**
     * 水印内容
     *
     * @type {(string | string[])}
     * @memberof WaterMark
     */
    content: string | string[];
    /**
     * 字体颜色
     *
     * @type {string}
     * @memberof WaterMark
     */
    fontColor: string;
    /**
     * 字体样式
     *
     * @type {string}
     * @memberof WaterMark
     */
    fontStyle: string;
    /**
     * 字体族
     *
     * @type {string}
     * @memberof WaterMark
     */
    fontFamily: string;
    /**
     * 字体粗细
     *
     * @type {string}
     * @memberof WaterMark
     */
    fontWeight: string;
    /**
     * 字体大小
     *
     * @type {number}
     * @memberof WaterMark
     */
    fontSize: number;
    /**
     * 是否全页显示
     *
     * @type {boolean}
     * @memberof WaterMark
     */
    fullPage: boolean;
    /**
     * 水平间距
     *
     * @type {number}
     * @memberof WaterMark
     */
    gapX: number;
    /**
     * 垂直间距
     *
     * @type {number}
     * @memberof WaterMark
     */
    gapY: number;
    /**
     * 单个水印宽度
     *
     * @type {number}
     * @memberof WaterMark
     */
    width: number;
    /**
     * 单个水印高度
     *
     * @type {number}
     * @memberof WaterMark
     */
    height: number;
    /**
     * 水印图片地址
     *
     * @type {string}
     * @memberof WaterMark
     */
    image: string;
    /**
     * 图片高度
     *
     * @type {number}
     * @memberof WaterMark
     */
    imageHeight: number;
    /**
     * 图片宽度
     *
     * @type {number}
     * @memberof WaterMark
     */
    imageWidth: number;
    /**
     * 旋转角度
     *
     * @type {number}
     * @memberof WaterMark
     */
    rotate: number;
    /**
     * 层级
     *
     * @type {number}
     * @memberof WaterMark
     */
    zIndex: number;
    wrapStyle: string;
    base64Url: string;
    get classes(): {
        wrap: string;
        canvas: string;
    };
    onStyleDepsChange(): void;
    onPaintDepsChange(): void;
    createCanvasContext(): Promise<void>;
    updateStyle(zIndex: number, gapX: number, width: number, base64Url: string): void;
    mounted(): void;
}

export { WaterMark };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * WaterMarkLoadDetail接口定义
 */
export interface WaterMarkLoadDetail {
    /**
     * base64Url
     * @type {string}
     */
    base64Url: string;
}

/**
 * WaterMarkProps接口定义
 */
export interface WaterMarkProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 水印内容
     *
     * @type {(string | string[])}
     */
    content?: string | string[];
    /**
     * 字体颜色
     *
     * @type {string}
     */
    fontColor?: string;
    /**
     * 字体样式
     *
     * @type {string}
     */
    fontStyle?: string;
    /**
     * 字体族
     *
     * @type {string}
     */
    fontFamily?: string;
    /**
     * 字体粗细
     *
     * @type {string}
     */
    fontWeight?: string;
    /**
     * 字体大小
     *
     * @type {number}
     */
    fontSize?: number;
    /**
     * 是否全页显示
     *
     * @type {boolean}
     */
    fullPage?: boolean;
    /**
     * 水平间距
     *
     * @type {number}
     */
    gapX?: number;
    /**
     * 垂直间距
     *
     * @type {number}
     */
    gapY?: number;
    /**
     * 单个水印宽度
     *
     * @type {number}
     */
    width?: number;
    /**
     * 单个水印高度
     *
     * @type {number}
     */
    height?: number;
    /**
     * 水印图片地址
     *
     * @type {string}
     */
    image?: string;
    /**
     * 图片高度
     *
     * @type {number}
     */
    imageHeight?: number;
    /**
     * 图片宽度
     *
     * @type {number}
     */
    imageWidth?: number;
    /**
     * 旋转角度
     *
     * @type {number}
     */
    rotate?: number;
    /**
     * 层级
     *
     * @type {number}
     */
    zIndex?: number;
}

/**
 * WaterMarkExpose接口定义
 */
export interface WaterMarkExpose {
}

/**
 * WaterMarkInstance类型定义
 */
export type WaterMarkInstance = ComponentPublicInstance<WaterMark, WaterMarkProps, WaterMarkExpose>;
