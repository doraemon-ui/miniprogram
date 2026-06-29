import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

import type { MiniprogramCanvasRenderingContext2D, MiniprogramNodeRef } from '@doraemon-ui/miniprogram.shared';

declare class ESign extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls: string;
    /**
     * 导出图片类型
     */
    type: ESignFileType;
    /**
     * 画布宽度（px 或 auto）
     */
    width: string | number;
    /**
     * 画布高度（px）
     */
    height: number;
    /**
     * 画布背景色
     */
    bgColor: string;
    /**
     * 画线宽度
     */
    lineWidth: number;
    /**
     * 画线颜色
     */
    lineColor: string;
    /**
     * 是否显示底部操作栏
     */
    hasFooter: boolean;
    /**
     * 重置按钮文本
     */
    cancelText: string;
    /**
     * 确定按钮文本
     */
    confirmText: string;
    isCanvasEmpty: boolean;
    bodyStyle: string;
    canvasRef: Promise<ESignCanvasRef> | null;
    wrapRef: Promise<MiniprogramNodeRef> | null;
    get classes(): {
        wrap: string;
        bd: string;
        ft: string;
        button: string;
    };
    onCanvasPropsChange(): void;
    /**
     * 获取并缓存 wrap ref
     */
    getWrapRef(forceUpdate?: boolean): Promise<MiniprogramNodeRef>;
    /**
     * 手指触摸动作开始
     */
    onTouchStart(): void;
    /**
     * 手指触摸后移动
     */
    onTouchMove(e: TouchEvent): boolean;
    /**
     * 手指触摸动作结束
     */
    onTouchEnd(): void;
    setBodyStyle(props: {
        width: string | number;
        height: number;
    }): void;
    createCanvasContext(props: {
        prefixCls: string;
        width: string | number;
        height: number;
        bgColor: string;
        type: ESignFileType;
    }, forceUpdate?: boolean): Promise<ESignCanvasRef>;
    clear(): void;
    submit(): void;
    resize(): void;
    mounted(): void;
}

export { ESign };

/**
 * ESignCanvasRef接口定义
 */
export interface ESignCanvasRef {
    ctx: MiniprogramCanvasRenderingContext2D;
    clear: () => void;
    draw: () => Promise<string>;
    resize: (updateCanvasContext: () => Promise<ESignCanvasRef>) => void;
}

/**
 * ESignFileType类型定义
 */
export type ESignFileType = 'png' | 'jpg' | 'jpeg' | 'webp';

/**
 * ESignProps接口定义
 */
export interface ESignProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 导出图片类型
     *
     * @type {ESignFileType}
     */
    type?: ESignFileType;
    /**
     * 画布宽度（px 或 auto）
     *
     * @type {(string | number)}
     */
    width?: string | number;
    /**
     * 画布高度（px）
     *
     * @type {number}
     */
    height?: number;
    /**
     * 画布背景色
     *
     * @type {string}
     */
    bgColor?: string;
    /**
     * 画线宽度
     *
     * @type {number}
     */
    lineWidth?: number;
    /**
     * 画线颜色
     *
     * @type {string}
     */
    lineColor?: string;
    /**
     * 是否显示底部操作栏
     *
     * @type {boolean}
     */
    hasFooter?: boolean;
    /**
     * 重置按钮文本
     *
     * @type {string}
     */
    cancelText?: string;
    /**
     * 确定按钮文本
     *
     * @type {string}
     */
    confirmText?: string;
}

/**
 * ESignExpose接口定义
 */
export interface ESignExpose {
    /**
     * 重新计算画布
     *
     * @return {void}
     */
    resize(): void;
}

/**
 * ESignInstance类型定义
 */
export type ESignInstance = ComponentPublicInstance<ESign, ESignProps, ESignExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
