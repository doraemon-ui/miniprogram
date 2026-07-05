import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { PresetColor } from '@doraemon-ui/miniprogram.shared';

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
     * @type {PresetColor}
     * @memberof InputNumber
     */
    color: PresetColor;
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
    _timeout: ReturnType<typeof setTimeout> | null;
    _inputTime: ReturnType<typeof setTimeout> | null;
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
    calculation(type: CalculationType, isLoop: boolean): void;
    onInput(e: CustomEvent<{
        value: string;
    }>): void;
    onFocus(e: CustomEvent): void;
    onBlur(e: CustomEvent): void;
    onLongpress(e: CustomEvent<{}, {}, {
        type: CalculationType;
    }>): void;
    onTap(e: CustomEvent<{}, {}, {
        type: CalculationType;
    }>): void;
    onTouchEnd(): void;
    onTouchCancel(): void;
    clearTimer(): void;
    clearInputTimer(): void;
    mounted(): void;
    destroyed(): void;
}

export { InputNumber };

export type CalculationType = 'add' | 'sub';

/**
 * InputNumberShape类型定义
 */
export type InputNumberShape = 'square' | 'round';

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
     * @type {PresetColor}
     */
    color?: PresetColor;
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
