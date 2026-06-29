import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Progress extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Progress
     */
    prefixCls: string;
    /**
     * 进度百分比
     *
     * @type {number}
     * @memberof Progress
     */
    percent: number;
    /**
     * 进度条高度
     *
     * @type {number}
     * @memberof Progress
     */
    strokeWidth: number;
    /**
     * 进度条颜色
     *
     * @type {string}
     * @memberof Progress
     */
    activeColor: string;
    /**
     * 背景色
     *
     * @type {string}
     * @memberof Progress
     */
    backgroundColor: string;
    /**
     * 状态
     *
     * @type {ProgressStatus}
     * @memberof Progress
     */
    status: ProgressStatus;
    /**
     * 形状
     *
     * @type {ProgressShape}
     * @memberof Progress
     */
    shape: ProgressShape;
    /**
     * 进度条样式
     *
     * @type {string | Partial<CSSStyleDeclaration>}
     * @memberof Progress
     */
    barStyle: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否显示进度信息
     *
     * @type {boolean}
     * @memberof Progress
     */
    showInfo: boolean;
    width: number;
    style: string;
    extStyle: string;
    get classes(): {
        wrap: string;
        outer: string;
        inner: string;
        bar: string;
        text: string;
    };
    onBarStyleChange(newVal: string | Partial<CSSStyleDeclaration>): void;
    onStyleRelatedChange(): void;
    updateStyle(): void;
    mounted(): void;
}

export { Progress };

/**
 * ProgressStatus类型定义
 */
export type ProgressStatus = 'normal' | 'progress' | 'error' | 'success';

/**
 * ProgressShape类型定义
 */
export type ProgressShape = 'round' | 'square';

/**
 * ProgressProps接口定义
 */
export interface ProgressProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 进度百分比
     *
     * @type {number}
     */
    percent?: number;
    /**
     * 进度条高度
     *
     * @type {number}
     */
    strokeWidth?: number;
    /**
     * 进度条颜色
     *
     * @type {string}
     */
    activeColor?: string;
    /**
     * 背景色
     *
     * @type {string}
     */
    backgroundColor?: string;
    /**
     * 状态
     *
     * @type {ProgressStatus}
     */
    status?: ProgressStatus;
    /**
     * 形状
     *
     * @type {ProgressShape}
     */
    shape?: ProgressShape;
    /**
     * 进度条样式
     *
     * @type {string | Partial<CSSStyleDeclaration>}
     */
    barStyle?: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否显示进度信息
     *
     * @type {boolean}
     */
    showInfo?: boolean;
}

/**
 * ProgressExpose接口定义
 */
export interface ProgressExpose {
}

/**
 * ProgressInstance类型定义
 */
export type ProgressInstance = ComponentPublicInstance<Progress, ProgressProps, ProgressExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
