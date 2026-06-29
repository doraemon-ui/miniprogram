import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Slider extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Slider
     */
    prefixCls: string;
    /**
     * 最小值
     *
     * @type {number}
     * @memberof Slider
     */
    min: number;
    /**
     * 最大值
     *
     * @type {number}
     * @memberof Slider
     */
    max: number;
    /**
     * 步长
     *
     * @type {number}
     * @memberof Slider
     */
    step: number;
    /**
     * 默认值
     *
     * @type {number[]}
     * @memberof Slider
     */
    defaultValue: number[];
    /**
     * 当前值
     *
     * @type {number[]}
     * @memberof Slider
     */
    value: number[];
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Slider
     */
    controlled: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Slider
     */
    disabled: boolean;
    /**
     * 是否显示刻度
     *
     * @type {boolean}
     * @memberof Slider
     */
    showMark: boolean;
    /**
     * 是否显示数值
     *
     * @type {SliderShowValue}
     * @memberof Slider
     */
    showValue: SliderShowValue;
    /**
     * 提示格式
     *
     * @type {string}
     * @memberof Slider
     */
    tipFormatter: string;
    /**
     * 刻度样式
     *
     * @type {unknown}
     * @memberof Slider
     */
    markStyle: unknown;
    /**
     * 手柄样式
     *
     * @type {unknown}
     * @memberof Slider
     */
    handleStyle: unknown;
    /**
     * 轨道样式
     *
     * @type {unknown}
     * @memberof Slider
     */
    trackStyle: unknown;
    /**
     * 底轨样式
     *
     * @type {unknown}
     * @memberof Slider
     */
    railStyle: unknown;
    /**
     * 外层样式
     *
     * @type {unknown}
     * @memberof Slider
     */
    wrapStyle: unknown;
    offsets: number[];
    inputValue: number[];
    extMarkStyle: string | string[];
    extHandleStyle: string | string[];
    extTrackStyle: string | string[];
    extRailStyle: string;
    extWrapStyle: string;
    marks: number[];
    isTouched: boolean;
    isMoved: boolean;
    last: number;
    private startX;
    private moveX;
    private startPos;
    private movedLocal;
    get classes(): {
        wrap: string;
        min: string;
        railWrap: string;
        rail: string;
        mark: string;
        track: string;
        handle: string;
        max: string;
    };
    get showMin(): boolean;
    get showMax(): boolean;
    onValuePropChange(v: number[]): void;
    onMarkStyleChange(v: unknown): void;
    onHandleStyleChange(v: unknown): void;
    onTrackStyleChange(v: unknown): void;
    onRailStyleChange(v: unknown): void;
    onWrapStyleChange(v: unknown): void;
    onMarkDepsChange(): void;
    updated(inputValue?: number[]): void;
    onTouchStart(e: any): void;
    onTouchMove(e: any): void;
    onTouchEnd(e: any): void;
    calcValue(ratio: number): number;
    calcOffset(value: number): number;
    checkValue(val: number, min?: number, max?: number): number;
    trimValue(val: number): number;
    getValue(offsets?: number[]): number[];
    getMarks(): void;
    formatTip(value: number): string;
    getTrackStyle(index: number): string;
    getIndexedStyle(style: string | string[], index: number): string;
    getMarkStyle(index: number): string;
    getTrackItemStyle(index: number): string;
    getHandleStyle(index: number): string;
    getValueByPosition(position: number): number;
    onRailClick(e: any): void;
    noop(): void;
    mounted(): void;
}

export { Slider };

/**
 * SliderShowValue类型定义
 */
export type SliderShowValue = boolean | {
    min?: boolean;
    max?: boolean;
};

/**
 * SliderValueDetail接口定义
 */
export interface SliderValueDetail {
    /**
     * offsets
     * @type {number[]}
     */
    offsets: number[];
    /**
     * value
     * @type {number[]}
     */
    value: number[];
}

/**
 * SliderProps接口定义
 */
export interface SliderProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 最小值
     *
     * @type {number}
     */
    min?: number;
    /**
     * 最大值
     *
     * @type {number}
     */
    max?: number;
    /**
     * 步长
     *
     * @type {number}
     */
    step?: number;
    /**
     * 默认值
     *
     * @type {number[]}
     */
    defaultValue?: number[];
    /**
     * 当前值
     *
     * @type {number[]}
     */
    value?: number[];
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否显示刻度
     *
     * @type {boolean}
     */
    showMark?: boolean;
    /**
     * 是否显示数值
     *
     * @type {SliderShowValue}
     */
    showValue?: SliderShowValue;
    /**
     * 提示格式
     *
     * @type {string}
     */
    tipFormatter?: string;
    /**
     * 刻度样式
     *
     * @type {unknown}
     */
    markStyle?: unknown;
    /**
     * 手柄样式
     *
     * @type {unknown}
     */
    handleStyle?: unknown;
    /**
     * 轨道样式
     *
     * @type {unknown}
     */
    trackStyle?: unknown;
    /**
     * 底轨样式
     *
     * @type {unknown}
     */
    railStyle?: unknown;
    /**
     * 外层样式
     *
     * @type {unknown}
     */
    wrapStyle?: unknown;
}

/**
 * SliderExpose接口定义
 */
export interface SliderExpose {
}

/**
 * SliderInstance类型定义
 */
export type SliderInstance = ComponentPublicInstance<Slider, SliderProps, SliderExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
