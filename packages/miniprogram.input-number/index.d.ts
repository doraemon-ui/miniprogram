import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class InputNumber extends Doraemon {
    prefixCls: string;
    /**
     * 外观形状
     *
     * @type {InputNumberShape}
     * @memberof InputNumber
     */
    shape: InputNumberShape;
    /**
     * 最小值
     *
     * @type {number}
     * @memberof InputNumber
     */
    min: number;
    /**
     * 最大值
     *
     * @type {number}
     * @memberof InputNumber
     */
    max: number;
    /**
     * 步进值
     *
     * @type {number}
     * @memberof InputNumber
     */
    step: number;
    /**
     * 默认值（非受控）
     *
     * @type {number}
     * @memberof InputNumber
     */
    defaultValue: number;
    /**
     * 当前值（受控）
     *
     * @type {number}
     * @memberof InputNumber
     */
    value: number;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof InputNumber
     */
    disabled: boolean;
    /**
     * 是否只读
     *
     * @type {boolean}
     * @memberof InputNumber
     */
    readOnly: boolean;
    /**
     * 是否支持长按连续触发
     *
     * @type {boolean}
     * @memberof InputNumber
     */
    longpress: boolean;
    /**
     * 主题色
     *
     * @type {InputNumberColor}
     * @memberof InputNumber
     */
    color: InputNumberColor;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof InputNumber
     */
    controlled: boolean;
    /**
     * 小数位数，-1 表示不限制
     *
     * @type {number}
     * @memberof InputNumber
     */
    digits: number;
    inputValue: number | string;
    disabledMin: boolean;
    disabledMax: boolean;
    timeout: ReturnType<typeof setTimeout> | null;
    inputTime: ReturnType<typeof setTimeout> | null;
    get classes(): {
        wrap: string;
        sub: string;
        add: string;
        icon: string;
        control: string;
        input: string;
    };
    onValueChange(newVal: number): void;
    onRangeChange(): void;
    updated(inputValue: number | string): void;
    setValue(value: number | string, runCallbacks?: boolean): void;
    calculation(type: 'add' | 'sub', isLoop: boolean): void;
    onInput(e: WechatMiniprogram.CustomEvent<{
        value: string;
    }>): void;
    onFocus(e: WechatMiniprogram.CustomEvent<Record<string, unknown>>): void;
    onBlur(e: WechatMiniprogram.CustomEvent<Record<string, unknown>>): void;
    onLongpress(e: WechatMiniprogram.BaseEvent<{
        type?: 'add' | 'sub';
    }>): void;
    onTap(e: WechatMiniprogram.BaseEvent<{
        type?: 'add' | 'sub';
    }>): void;
    onTouchEnd(): void;
    onTouchCancel(): void;
    clearTimer(): void;
    clearInputTimer(): void;
    mounted(): void;
    destroyed(): void;
}

export { InputNumber };

/**
 * InputNumberShape类型定义
 */
export type InputNumberShape = 'square' | 'round';

/**
 * InputNumberColor类型定义
 */
export type InputNumberColor = 'positive' | 'balanced' | 'assertive' | 'dark' | 'gray';

/**
 * InputNumberChangeDetail接口定义
 */
export interface InputNumberChangeDetail {
    /**
     * value
     * @type {number | string}
     */
    value: number | string;
}

/**
 * InputNumberProps接口定义
 */
export interface InputNumberProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 外观形状
     *
     * @type {InputNumberShape}
     */
    shape?: InputNumberShape;
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
     * 步进值
     *
     * @type {number}
     */
    step?: number;
    /**
     * 默认值（非受控）
     *
     * @type {number}
     */
    defaultValue?: number;
    /**
     * 当前值（受控）
     *
     * @type {number}
     */
    value?: number;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否只读
     *
     * @type {boolean}
     */
    readOnly?: boolean;
    /**
     * 是否支持长按连续触发
     *
     * @type {boolean}
     */
    longpress?: boolean;
    /**
     * 主题色
     *
     * @type {InputNumberColor}
     */
    color?: InputNumberColor;
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 小数位数，-1 表示不限制
     *
     * @type {number}
     */
    digits?: number;
}

/**
 * InputNumberExpose接口定义
 */
export interface InputNumberExpose {
}

/**
 * InputNumberInstance类型定义
 */
export type InputNumberInstance = ComponentPublicInstance<InputNumber, InputNumberProps, InputNumberExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * number-precision (trimmed for input-number)
 */
declare function strip(num: number, precision?: number): number;

declare function plus(num1: number, num2: number): number;

declare function minus(num1: number, num2: number): number;

declare function round(num: number, ratio: number): number;
