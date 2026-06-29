import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class MultiPickerView extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof MultiPickerView
     */
    prefixCls: string;
    /**
     * picker-view 组件类名前缀
     *
     * @type {string}
     * @memberof MultiPickerView
     */
    pickerPrefixCls: string;
    /**
     * 当前选中值
     *
     * @type {string[]}
     * @memberof MultiPickerView
     */
    value: string[];
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof MultiPickerView
     */
    controlled: boolean;
    /**
     * 每项高度
     *
     * @type {number}
     * @memberof MultiPickerView
     */
    itemHeight: number;
    /**
     * 每项样式
     *
     * @type {unknown}
     * @memberof MultiPickerView
     */
    itemStyle: unknown;
    /**
     * 指示器样式
     *
     * @type {unknown}
     * @memberof MultiPickerView
     */
    indicatorStyle: unknown;
    /**
     * 指示器类名
     *
     * @type {string}
     * @memberof MultiPickerView
     */
    indicatorClass: string;
    /**
     * 蒙层样式
     *
     * @type {unknown}
     * @memberof MultiPickerView
     */
    maskStyle: unknown;
    /**
     * 蒙层类名
     *
     * @type {string}
     * @memberof MultiPickerView
     */
    maskClass: string;
    /**
     * 标签对齐方式
     *
     * @type {MultiPickerLabelAlign}
     * @memberof MultiPickerView
     */
    labelAlign: MultiPickerLabelAlign;
    /**
     * 是否加载中
     *
     * @type {boolean}
     * @memberof MultiPickerView
     */
    loading: boolean;
    /**
     * 多列选项数据
     *
     * @type {MultiPickerOptions}
     * @memberof MultiPickerView
     */
    options: MultiPickerOptions;
    /**
     * 选项字段映射
     *
     * @type {MultiPickerFieldNames}
     * @memberof MultiPickerView
     */
    defaultFieldNames: MultiPickerFieldNames;
    inputValue: string[];
    cols: MultiPickerOptionRecord[][];
    getFieldNamesSafe(): {
        label: string;
        value: string;
        disabled: string;
    };
    onValueOptionsChange(): void;
    updated(inputValue: string[], isForce?: boolean): void;
    setValue(value: string[], isForce?: boolean): void;
    getValue(value?: string[], cols?: MultiPickerOptionRecord[][]): {
        value: string[];
        displayValue: unknown[];
        selectedIndex: number[];
        selectedValue: string[];
        cols: MultiPickerOptionRecord[][];
    };
    onChange(index: number, value: string, method: 'beforeChange' | 'valueChange' | 'scrollChange'): void;
    onBeforeChange(e: CustomEvent<MultiPickerItemChangeDetail>): void;
    onValueChange(e: CustomEvent<MultiPickerItemChangeDetail>): void;
    onScrollChange(e: CustomEvent<MultiPickerItemChangeDetail>): void;
    mounted(): void;
}

export { MultiPickerView };

/**
 * MultiPickerFieldNames接口定义
 */
export interface MultiPickerFieldNames {
    /**
     * label
     * @type {string}
     */
    label?: string;
    /**
     * value
     * @type {string}
     */
    value?: string;
    /**
     * disabled
     * @type {string}
     */
    disabled?: string;
}

/**
 * MultiPickerUtilsFieldNames类型定义
 */
export type MultiPickerUtilsFieldNames = {
    /**
     * label
     * @type {string}
     */
    label: string;
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * disabled
     * @type {string}
     */
    disabled: string;
};

/**
 * MultiPickerOption类型定义
 */
export type MultiPickerOption = string | Record<string, unknown>;

/**
 * MultiPickerColumn类型定义
 */
export type MultiPickerColumn = MultiPickerOption[];

/**
 * MultiPickerOptions类型定义
 */
export type MultiPickerOptions = Array<MultiPickerColumn | MultiPickerOption>;

/**
 * MultiPickerOptionRecord接口定义
 */
export interface MultiPickerOptionRecord extends Record<string, unknown> {
}

/**
 * MultiPickerLabelAlign类型定义
 */
export type MultiPickerLabelAlign = 'left' | 'center' | 'right';

/**
 * MultiPickerChangeMethod类型定义
 */
export type MultiPickerChangeMethod = 'beforeChange' | 'valueChange' | 'scrollChange';

/**
 * MultiPickerItemChangeDetail接口定义
 */
export interface MultiPickerItemChangeDetail {
    /**
     * value
     * @type {string}
     */
    value: string;
}

/**
 * MultiPickerValueDetail接口定义
 */
export interface MultiPickerValueDetail {
    /**
     * value
     * @type {string[]}
     */
    value: string[];
    /**
     * displayValue
     * @type {string[]}
     */
    displayValue: string[];
    /**
     * selectedIndex
     * @type {number[]}
     */
    selectedIndex: number[];
    /**
     * selectedValue
     * @type {string[]}
     */
    selectedValue: string[];
    /**
     * cols
     * @type {MultiPickerOptionRecord[][]}
     */
    cols: MultiPickerOptionRecord[][];
}

/**
 * MultiPickerProps接口定义
 */
export interface MultiPickerProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * picker-view 组件类名前缀
     *
     * @type {string}
     */
    pickerPrefixCls?: string;
    /**
     * 当前选中值
     *
     * @type {string[]}
     */
    value?: string[];
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 每项高度
     *
     * @type {number}
     */
    itemHeight?: number;
    /**
     * 每项样式
     *
     * @type {unknown}
     */
    itemStyle?: unknown;
    /**
     * 指示器样式
     *
     * @type {unknown}
     */
    indicatorStyle?: unknown;
    /**
     * 指示器类名
     *
     * @type {string}
     */
    indicatorClass?: string;
    /**
     * 蒙层样式
     *
     * @type {unknown}
     */
    maskStyle?: unknown;
    /**
     * 蒙层类名
     *
     * @type {string}
     */
    maskClass?: string;
    /**
     * 标签对齐方式
     *
     * @type {MultiPickerLabelAlign}
     */
    labelAlign?: MultiPickerLabelAlign;
    /**
     * 是否加载中
     *
     * @type {boolean}
     */
    loading?: boolean;
    /**
     * 多列选项数据
     *
     * @type {MultiPickerOptions}
     */
    options?: MultiPickerOptions;
    /**
     * 选项字段映射
     *
     * @type {MultiPickerFieldNames}
     */
    defaultFieldNames?: MultiPickerFieldNames;
}

/**
 * MultiPickerViewExpose接口定义
 */
export interface MultiPickerViewExpose {
}

/**
 * MultiPickerViewInstance类型定义
 */
export type MultiPickerViewInstance = ComponentPublicInstance<MultiPickerView, MultiPickerProps, MultiPickerViewExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare function getRealIndex(value?: number, min?: number, max?: number): number;

export declare function getIndexFromValue(value: unknown, col?: Array<Record<string, unknown>>, fieldNames?: MultiPickerUtilsFieldNames): number;

export declare function getIndexesFromValues(values?: string[], cols?: Array<Array<Record<string, unknown>>>, fieldNames?: MultiPickerUtilsFieldNames): number[];

export declare function getRealValue(value?: string, col?: Array<Record<string, unknown>>, fieldNames?: MultiPickerUtilsFieldNames): string;

export declare function getRealValues(values?: string[], cols?: Array<Array<Record<string, unknown>>>, fieldNames?: MultiPickerUtilsFieldNames): string[];

export declare function getLabelFromIndex(index: number, col?: Array<Record<string, unknown>>, member?: string): unknown;

export declare function getLabelsFromIndexes(indexes: number[], cols?: Array<Array<Record<string, unknown>>>, member?: string): unknown[];

export declare function isMultiPicker(data?: unknown[]): boolean;

export declare function getRealCol(data?: Array<string | Record<string, unknown>>, fieldNames?: MultiPickerUtilsFieldNames): Record<string, unknown>[];

export declare function getRealCols(data?: any[], fieldNames?: MultiPickerUtilsFieldNames): Record<string, unknown>[][];
