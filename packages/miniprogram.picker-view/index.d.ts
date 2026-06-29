import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class PickerView extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof PickerView
     */
    prefixCls: string;
    /**
     * 默认值
     *
     * @type {string}
     * @memberof PickerView
     */
    defaultValue: string;
    /**
     * 当前值
     *
     * @type {string}
     * @memberof PickerView
     */
    value: string;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof PickerView
     */
    controlled: boolean;
    /**
     * 每项高度
     *
     * @type {number}
     * @memberof PickerView
     */
    itemHeight: number;
    /**
     * 每项样式
     *
     * @type {unknown}
     * @memberof PickerView
     */
    itemStyle: unknown;
    /**
     * 指示器样式
     *
     * @type {unknown}
     * @memberof PickerView
     */
    indicatorStyle: unknown;
    /**
     * 指示器类名
     *
     * @type {string}
     * @memberof PickerView
     */
    indicatorClass: string;
    /**
     * 蒙层样式
     *
     * @type {unknown}
     * @memberof PickerView
     */
    maskStyle: unknown;
    /**
     * 蒙层类名
     *
     * @type {string}
     * @memberof PickerView
     */
    maskClass: string;
    /**
     * 标签对齐方式
     *
     * @type {PickerLabelAlign}
     * @memberof PickerView
     */
    labelAlign: PickerLabelAlign;
    /**
     * 是否加载中
     *
     * @type {boolean}
     * @memberof PickerView
     */
    loading: boolean;
    /**
     * 选项数据
     *
     * @type {PickerOption[]}
     * @memberof PickerView
     */
    options: PickerOption[];
    /**
     * 选项字段映射
     *
     * @type {PickerFieldNames}
     * @memberof PickerView
     */
    defaultFieldNames: PickerFieldNames;
    inputValue: string;
    selectedIndex: number;
    selectedValue: string;
    cols: PickerOptionRecord[];
    extIndicatorStyle: string | string[];
    extItemStyle: string | string[];
    extMaskStyle: string | string[];
    contentStyle: string;
    itemCount: number;
    styles: Record<string, string>;
    get classes(): {
        wrap: string;
        mask: string;
        indicator: string;
        content: string;
        item: string;
        image: string;
    };
    get optionsView(): PickerOptionRecord[];
    onItemHeightChange(v: number): void;
    onItemStyleChange(v: unknown): void;
    onIndicatorStyleChange(v: unknown): void;
    onMaskStyleChange(v: unknown): void;
    onValueOptionsChange(): void;
    getFieldNamesSafe(): {
        label: string;
        value: string;
        disabled: string;
    };
    normalizeCols(cols: PickerOptionRecord[], names: {
        label: string;
        value: string;
        disabled: string;
    }): {
        label: unknown;
        value: unknown;
        disabled: boolean;
        labelImage: unknown;
    }[];
    updatedStyles(itemHeight: number): void;
    updated(inputValue: string): void;
    setValue(value: string): void;
    getValue(value?: string): {
        value: string;
        displayValue: unknown;
        selectedIndex: number;
        selectedValue: string;
        cols: PickerOptionRecord[];
    };
    getIndexedStyle(style: string | string[], index: number): string;
    fireValueChange(value: string): void;
    onItemClick(e: WechatMiniprogram.BaseEvent<PickerViewItemDataset>): void;
    onTouchStart(): void;
    onTouchMove(): void;
    onTouchEnd(): void;
    mounted(): void;
}

export { PickerView };

/**
 * PickerFieldNames接口定义
 */
export interface PickerFieldNames {
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
 * PickerViewUtilsFieldNames类型定义
 */
export type PickerViewUtilsFieldNames = {
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
 * PickerOption类型定义
 */
export type PickerOption = string | Record<string, unknown>;

/**
 * PickerOptionRecord类型定义
 */
export type PickerOptionRecord = Record<string, unknown>;

/**
 * PickerLabelAlign类型定义
 */
export type PickerLabelAlign = 'left' | 'center' | 'right';

/**
 * PickerViewValueDetail接口定义
 */
export interface PickerViewValueDetail {
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * displayValue
     * @type {string}
     */
    displayValue: string;
    /**
     * selectedIndex
     * @type {number}
     */
    selectedIndex: number;
    /**
     * selectedValue
     * @type {string}
     */
    selectedValue: string;
    /**
     * cols
     * @type {PickerOptionRecord[]}
     */
    cols: PickerOptionRecord[];
}

/**
 * PickerViewItemDataset接口定义
 */
export interface PickerViewItemDataset {
    /**
     * disabled
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * value
     * @type {string}
     */
    value?: string;
}

/**
 * PickerViewProps接口定义
 */
export interface PickerViewProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 默认值
     *
     * @type {string}
     */
    defaultValue?: string;
    /**
     * 当前值
     *
     * @type {string}
     */
    value?: string;
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
     * @type {PickerLabelAlign}
     */
    labelAlign?: PickerLabelAlign;
    /**
     * 是否加载中
     *
     * @type {boolean}
     */
    loading?: boolean;
    /**
     * 选项数据
     *
     * @type {PickerOption[]}
     */
    options?: PickerOption[];
    /**
     * 选项字段映射
     *
     * @type {PickerFieldNames}
     */
    defaultFieldNames?: PickerFieldNames;
}

/**
 * PickerViewExpose接口定义
 */
export interface PickerViewExpose {
}

/**
 * PickerViewInstance类型定义
 */
export type PickerViewInstance = ComponentPublicInstance<PickerView, PickerViewProps, PickerViewExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare const props: {
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    defaultValue: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: StringConstructor;
        default: string;
    };
    controlled: {
        type: BooleanConstructor;
        default: boolean;
    };
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
    itemStyle: {
        type: any;
        default: any;
    };
    indicatorStyle: {
        type: any;
        default: any;
    };
    indicatorClass: {
        type: StringConstructor;
        default: string;
    };
    maskStyle: {
        type: any;
        default: any;
    };
    maskClass: {
        type: StringConstructor;
        default: string;
    };
    labelAlign: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    options: {
        type: ArrayConstructor;
        default: any[];
    };
    defaultFieldNames: {
        type: ObjectConstructor;
        default: {
            label: string;
            value: string;
            disabled: string;
        };
    };
};

export declare function getRealIndex(value?: number, min?: number, max?: number): number;

export declare function getIndexFromValue(value: unknown, col?: Array<Record<string, unknown>>, fieldNames?: PickerViewUtilsFieldNames): number;

export declare function getRealValue(value?: string, col?: Array<Record<string, unknown>>, fieldNames?: PickerViewUtilsFieldNames): string;

export declare function getLabelFromIndex(index: number, col?: Array<Record<string, unknown>>, member?: string): unknown;

export declare function getRealCol(data?: Array<string | Record<string, unknown>>, fieldNames?: PickerViewUtilsFieldNames): Record<string, unknown>[];
