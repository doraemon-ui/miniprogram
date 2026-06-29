import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Circle extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Circle
     */
    prefixCls: string;
    /**
     * 进度百分比
     *
     * @type {number}
     * @memberof Circle
     */
    percent: number;
    /**
     * 线条宽度
     *
     * @type {number}
     * @memberof Circle
     */
    strokeWidth: number;
    /**
     * 圆环尺寸（px）
     *
     * @type {number}
     * @memberof Circle
     */
    size: number;
    /**
     * 线条端点样式
     *
     * @type {CircleLineCap}
     * @memberof Circle
     */
    lineCap: CircleLineCap;
    /**
     * 背景颜色
     *
     * @type {string}
     * @memberof Circle
     */
    backgroundColor: string;
    /**
     * 进度颜色
     *
     * @type {string}
     * @memberof Circle
     */
    color: string;
    /**
     * 起始角度（角度制）
     *
     * @type {number}
     * @memberof Circle
     */
    sAngle: number;
    /**
     * 是否逆时针
     *
     * @type {boolean}
     * @memberof Circle
     */
    counterclockwise: boolean;
    /**
     * 动画时长（ms）
     *
     * @type {number}
     * @memberof Circle
     */
    speed: number;
    /**
     * 是否开启动画
     *
     * @type {boolean}
     * @memberof Circle
     */
    animate: boolean;
    /**
     * 是否绘制背景环
     *
     * @type {boolean}
     * @memberof Circle
     */
    background: boolean;
    beginAngle: number;
    startAngle: number;
    endAngle: number;
    currentAngle: number;
    style: string;
    timer: ReturnType<typeof setTimeout> | null;
    get classes(): {
        wrap: string;
        inner: string;
    };
    onSizeChange(newVal: number): void;
    onPercentChange(newVal: number): void;
    onSAngleChange(newVal: number): void;
    getCanvasNode(canvasId: string): Promise<WechatMiniprogram.Canvas>;
    /**
     * 更新样式
     */
    updateStyle(size?: number): void;
    /**
     * 着帧绘制 canvas
     */
    redraw(value?: number): void;
    /**
     * 绘制 canvas
     */
    draw(hasLine?: boolean): Promise<void>;
    /**
     * 开始动画
     */
    animateFrame(c: number, d: number, decrease: boolean): void;
    /**
     * 清除定时器
     */
    clearTimer(): void;
    mounted(): void;
    detached(): void;
}

export { Circle };

/**
 * CircleLineCap类型定义
 */
export type CircleLineCap = 'butt' | 'round' | 'square';

/**
 * CircleChangeDetail接口定义
 */
export interface CircleChangeDetail {
    /**
     * value
     * @type {number}
     */
    value: number;
}

/**
 * Canvas2DContext接口定义
 */
export interface Canvas2DContext {
    scale: (x: number, y: number) => void;
    fillRect: (x: number, y: number, w: number, h: number) => void;
    clearRect: (x: number, y: number, w: number, h: number) => void;
    beginPath: () => void;
    arc: (x: number, y: number, r: number, sAngle: number, eAngle: number) => void;
    stroke: () => void;
    /**
     * lineWidth
     * @type {number}
     */
    lineWidth: number;
    /**
     * strokeStyle
     * @type {string}
     */
    strokeStyle: string;
    /**
     * lineCap
     * @type {string}
     */
    lineCap: string;
}

/**
 * CircleProps接口定义
 */
export interface CircleProps {
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
     * 线条宽度
     *
     * @type {number}
     */
    strokeWidth?: number;
    /**
     * 圆环尺寸（px）
     *
     * @type {number}
     */
    size?: number;
    /**
     * 线条端点样式
     *
     * @type {CircleLineCap}
     */
    lineCap?: CircleLineCap;
    /**
     * 背景颜色
     *
     * @type {string}
     */
    backgroundColor?: string;
    /**
     * 进度颜色
     *
     * @type {string}
     */
    color?: string;
    /**
     * 起始角度（角度制）
     *
     * @type {number}
     */
    sAngle?: number;
    /**
     * 是否逆时针
     *
     * @type {boolean}
     */
    counterclockwise?: boolean;
    /**
     * 动画时长（ms）
     *
     * @type {number}
     */
    speed?: number;
    /**
     * 是否开启动画
     *
     * @type {boolean}
     */
    animate?: boolean;
    /**
     * 是否绘制背景环
     *
     * @type {boolean}
     */
    background?: boolean;
}

/**
 * CircleExpose接口定义
 */
export interface CircleExpose {
}

/**
 * CircleInstance类型定义
 */
export type CircleInstance = ComponentPublicInstance<Circle, CircleProps, CircleExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
