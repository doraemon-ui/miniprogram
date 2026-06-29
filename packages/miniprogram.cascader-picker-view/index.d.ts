import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class CascaderPickerView extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof CascaderPickerView
     */
    prefixCls: string;
    /**
     * picker-view 组件类名前缀
     *
     * @type {string}
     * @memberof CascaderPickerView
     */
    pickerPrefixCls: string;
    /**
     * 当前选中值
     *
     * @type {string[]}
     * @memberof CascaderPickerView
     */
    value: string[];
    /**
     * 显示列数
     *
     * @type {number}
     * @memberof CascaderPickerView
     */
    cols: number;
    /**
     * 每项高度
     *
     * @type {number}
     * @memberof CascaderPickerView
     */
    itemHeight: number;
    /**
     * 每项样式
     *
     * @type {unknown}
     * @memberof CascaderPickerView
     */
    itemStyle: unknown;
    /**
     * 指示器样式
     *
     * @type {unknown}
     * @memberof CascaderPickerView
     */
    indicatorStyle: unknown;
    /**
     * 指示器类名
     *
     * @type {string}
     * @memberof CascaderPickerView
     */
    indicatorClass: string;
    /**
     * 蒙层样式
     *
     * @type {unknown}
     * @memberof CascaderPickerView
     */
    maskStyle: unknown;
    /**
     * 蒙层类名
     *
     * @type {string}
     * @memberof CascaderPickerView
     */
    maskClass: string;
    /**
     * 标签对齐方式
     *
     * @type {string}
     * @memberof CascaderPickerView
     */
    labelAlign: string;
    /**
     * 是否加载中
     *
     * @type {boolean}
     * @memberof CascaderPickerView
     */
    loading: boolean;
    /**
     * 级联选项数据
     *
     * @type {TreeOption[]}
     * @memberof CascaderPickerView
     */
    options: TreeOption[];
    /**
     * 选项字段映射
     *
     * @type {CascaderPickerFieldNames}
     * @memberof CascaderPickerView
     */
    defaultFieldNames: CascaderPickerFieldNames;
    inputValue: string[];
    showOptions: TreeOption[][];
    pickerFieldNamesData: {
        label: string;
        value: string;
        disabled: string;
    };
    getFieldNamesSafe(): {
        label: string;
        value: string;
        disabled: string;
        children: string;
    };
    onInputValueChange(newVal: string[]): void;
    onValueOptionsColsChange(): void;
    onFieldNamesChange(): void;
    updated(inputValue: string[], force?: boolean): void;
    setValue(value: string[], options: TreeOption[], cols: number): void;
    onValueChange(e: CustomEvent<CascaderPickerValueChangeDetail>): void;
    getValue(value?: string[]): {
        value: string[];
        displayValue: unknown[];
        selectedIndex: number[];
        selectedValue: string[];
        cols: TreeOption[][];
    };
    getNextValue(activeValue: string[], index: number): string[];
    getRealValue(options: TreeOption[], activeValue: string[], cols?: number): string[];
    getActiveOptions(activeValue: string[]): TreeOption[];
    getShowOptions(activeValue: string[]): TreeOption[][];
    mounted(): void;
}

export { CascaderPickerView };

/**
 * TreeOption类型定义
 */
export type TreeOption = Record<string, unknown>;

/**
 * CascaderPickerFieldNames接口定义
 */
export interface CascaderPickerFieldNames {
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
    /**
     * children
     * @type {string}
     */
    children?: string;
}

/**
 * CascaderPickerUtilsFieldNames类型定义
 */
export type CascaderPickerUtilsFieldNames = {
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
 * CascaderPickerLabelAlign类型定义
 */
export type CascaderPickerLabelAlign = 'left' | 'center' | 'right';

/**
 * CascaderPickerValueChangeDetail接口定义
 */
export interface CascaderPickerValueChangeDetail {
    /**
     * value
     * @type {string[]}
     */
    value: string[];
    /**
     * index
     * @type {number}
     */
    index: number;
}

/**
 * CascaderPickerValueDetail接口定义
 */
export interface CascaderPickerValueDetail {
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
     * @type {TreeOption[][]}
     */
    cols: TreeOption[][];
}

/**
 * CascaderPickerViewProps接口定义
 */
export interface CascaderPickerViewProps {
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
     * 显示列数
     *
     * @type {number}
     */
    cols?: number;
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
     * @type {CascaderPickerLabelAlign}
     */
    labelAlign?: CascaderPickerLabelAlign;
    /**
     * 是否加载中
     *
     * @type {boolean}
     */
    loading?: boolean;
    /**
     * 级联选项数据
     *
     * @type {TreeOption[]}
     */
    options?: TreeOption[];
    /**
     * 选项字段映射
     *
     * @type {CascaderPickerFieldNames}
     */
    defaultFieldNames?: CascaderPickerFieldNames;
}

/**
 * CascaderPickerViewExpose接口定义
 */
export interface CascaderPickerViewExpose {
}

/**
 * CascaderPickerViewInstance类型定义
 */
export type CascaderPickerViewInstance = ComponentPublicInstance<CascaderPickerView, CascaderPickerViewProps, CascaderPickerViewExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare function getRealIndex(value?: number, min?: number, max?: number): number;

export declare function getIndexFromValue(value: unknown, col?: Array<Record<string, unknown>>, fieldNames?: CascaderPickerUtilsFieldNames): number;

export declare function getIndexesFromValues(values?: string[], cols?: Array<Array<Record<string, unknown>>>, fieldNames?: CascaderPickerUtilsFieldNames): number[];

export declare function getRealValue(value?: string, col?: Array<Record<string, unknown>>, fieldNames?: CascaderPickerUtilsFieldNames): string;

export declare function getRealValues(values?: string[], cols?: Array<Array<Record<string, unknown>>>, fieldNames?: CascaderPickerUtilsFieldNames): string[];

export declare function getLabelFromIndex(index: number, col?: Array<Record<string, unknown>>, member?: string): unknown;

export declare function getLabelsFromIndexes(indexes: number[], cols?: Array<Array<Record<string, unknown>>>, member?: string): unknown[];
