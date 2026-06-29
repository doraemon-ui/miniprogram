import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Vcode extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Vcode
     */
    prefixCls: string;
    /**
     * 验证码字符源
     *
     * @type {string}
     * @memberof Vcode
     */
    str: string;
    /**
     * 验证码长度
     *
     * @type {number}
     * @memberof Vcode
     */
    num: number;
    /**
     * 画布宽度
     *
     * @type {number}
     * @memberof Vcode
     */
    width: number;
    /**
     * 画布高度
     *
     * @type {number}
     * @memberof Vcode
     */
    height: number;
    /**
     * 背景颜色
     *
     * @type {string}
     * @memberof Vcode
     */
    bgColor: string;
    /**
     * 字体颜色
     *
     * @type {string}
     * @memberof Vcode
     */
    fontColor: string;
    /**
     * 是否绘制噪点
     *
     * @type {boolean}
     * @memberof Vcode
     */
    hasPoint: boolean;
    /**
     * 是否绘制干扰线
     *
     * @type {boolean}
     * @memberof Vcode
     */
    hasLine: boolean;
    /**
     * canvas 节点 id
     *
     * @type {string}
     * @memberof Vcode
     */
    canvasId: string;
    createCanvasContext(): Promise<void>;
    draw(): void;
    mounted(): void;
}

export { Vcode };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * VcodeChangeDetail接口定义
 */
export interface VcodeChangeDetail {
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * base64Url
     * @type {string}
     */
    base64Url: string;
}

/**
 * VcodeProps接口定义
 */
export interface VcodeProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 验证码字符源
     *
     * @type {string}
     */
    str?: string;
    /**
     * 验证码长度
     *
     * @type {number}
     */
    num?: number;
    /**
     * 画布宽度
     *
     * @type {number}
     */
    width?: number;
    /**
     * 画布高度
     *
     * @type {number}
     */
    height?: number;
    /**
     * 背景颜色
     *
     * @type {string}
     */
    bgColor?: string;
    /**
     * 字体颜色
     *
     * @type {string}
     */
    fontColor?: string;
    /**
     * 是否绘制噪点
     *
     * @type {boolean}
     */
    hasPoint?: boolean;
    /**
     * 是否绘制干扰线
     *
     * @type {boolean}
     */
    hasLine?: boolean;
    /**
     * canvas 节点 id
     *
     * @type {string}
     */
    canvasId?: string;
}

/**
 * VcodeExpose接口定义
 */
export interface VcodeExpose {
}

/**
 * VcodeInstance类型定义
 */
export type VcodeInstance = ComponentPublicInstance<Vcode, VcodeProps, VcodeExpose>;
