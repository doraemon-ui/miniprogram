import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class DatePickerView extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof DatePickerView
     */
    prefixCls: string;
    /**
     * 多列选择器类名前缀
     *
     * @type {string}
     * @memberof DatePickerView
     */
    multiPickerPrefixCls: string;
    /**
     * 选择器视图类名前缀
     *
     * @type {string}
     * @memberof DatePickerView
     */
    pickerPrefixCls: string;
    /**
     * 当前值
     *
     * @type {unknown}
     * @memberof DatePickerView
     */
    value: unknown;
    /**
     * 每项高度
     *
     * @type {number}
     * @memberof DatePickerView
     */
    itemHeight: number;
    /**
     * 每项样式
     *
     * @type {unknown}
     * @memberof DatePickerView
     */
    itemStyle: unknown;
    /**
     * 指示器样式
     *
     * @type {unknown}
     * @memberof DatePickerView
     */
    indicatorStyle: unknown;
    /**
     * 指示器类名
     *
     * @type {string}
     * @memberof DatePickerView
     */
    indicatorClass: string;
    /**
     * 蒙层样式
     *
     * @type {unknown}
     * @memberof DatePickerView
     */
    maskStyle: unknown;
    /**
     * 蒙层类名
     *
     * @type {string}
     * @memberof DatePickerView
     */
    maskClass: string;
    /**
     * 标签对齐方式
     *
     * @type {string}
     * @memberof DatePickerView
     */
    labelAlign: string;
    /**
     * 选择模式
     *
     * @type {DatePickerViewMode}
     * @memberof DatePickerView
     */
    mode: DatePickerViewMode;
    /**
     * 分钟步长
     *
     * @type {number}
     * @memberof DatePickerView
     */
    minuteStep: number;
    /**
     * 是否使用 12 小时制
     *
     * @type {boolean}
     * @memberof DatePickerView
     */
    use12Hours: boolean;
    /**
     * 最小日期
     *
     * @type {unknown}
     * @memberof DatePickerView
     */
    minDate: unknown;
    /**
     * 最大日期
     *
     * @type {unknown}
     * @memberof DatePickerView
     */
    maxDate: unknown;
    /**
     * 最小小时
     *
     * @type {number}
     * @memberof DatePickerView
     */
    minHour: number;
    /**
     * 最大小时
     *
     * @type {number}
     * @memberof DatePickerView
     */
    maxHour: number;
    /**
     * 最小分钟
     *
     * @type {number}
     * @memberof DatePickerView
     */
    minMinute: number;
    /**
     * 最大分钟
     *
     * @type {number}
     * @memberof DatePickerView
     */
    maxMinute: number;
    /**
     * 语言
     *
     * @type {DatePickerViewLang}
     * @memberof DatePickerView
     */
    lang: DatePickerViewLang;
    /**
     * 是否包含至今选项
     *
     * @type {boolean}
     * @memberof DatePickerView
     */
    tillNow: boolean;
    inputValue: string[];
    cols: PickerOption[][];
    private defaultMinDate?;
    private defaultMaxDate?;
    onInputValue(): void;
    onDepsChange(): void;
    getDefaultMinDate(): Date;
    getDefaultMaxDate(): Date;
    getMinDate(): Date;
    getMaxDate(): Date;
    getDateMember(type: 'min' | 'max', member: 'year' | 'month' | 'day' | 'hour' | 'minute'): number;
    getDisplayHour(rawHour: number): number;
    setHours(date: Date, hour: number): number;
    setAmPm(date: Date, index: number): void;
    clipDate(date: Date): Date;
    getDate(d?: unknown): Date;
    getDateData(date: Date): {
        value: string;
        label: string;
    }[][];
    getTimeData(date: Date): {
        value: string;
        label: string;
    }[][];
    generateDatePickerColumns(selected?: string[], d?: unknown): PickerOption[][];
    getNewDate(values: string[], index: number): Date;
    onValueChange(e: CustomEvent<DatePickerViewValueChangeDetail>): void;
    updatedCols(inputValue: string[]): void;
    updated(inputValue: string[]): void;
    setValue(v: unknown): void;
    fixValue(v: any): string[];
    getValue(value?: string[], cols?: PickerOption[][]): {
        value: string[];
        displayValue: string[];
        selectedIndex: number[];
        selectedValue: string[];
        cols: PickerOption[][];
        date: number;
        tillNow: boolean;
    };
    mounted(): void;
}

export { DatePickerView };

/**
 * PickerOption接口定义
 */
export interface PickerOption {
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * label
     * @type {string}
     */
    label: string;
}

/**
 * DatePickerViewMode类型定义
 */
export type DatePickerViewMode = 'datetime' | 'date' | 'time' | 'month' | 'year';

/**
 * DatePickerViewLang类型定义
 */
export type DatePickerViewLang = 'zh_CN' | 'zh_TW' | 'en';

/**
 * DatePickerViewUtilsFieldNames类型定义
 */
export type DatePickerViewUtilsFieldNames = {
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
 * DatePickerViewValueChangeDetail接口定义
 */
export interface DatePickerViewValueChangeDetail {
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
 * DatePickerViewValueDetail接口定义
 */
export interface DatePickerViewValueDetail {
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
     * @type {PickerOption[][]}
     */
    cols: PickerOption[][];
    /**
     * date
     * @type {number}
     */
    date: number;
    /**
     * tillNow
     * @type {boolean}
     */
    tillNow: boolean;
}

/**
 * DatePickerViewProps接口定义
 */
export interface DatePickerViewProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 多列选择器类名前缀
     *
     * @type {string}
     */
    multiPickerPrefixCls?: string;
    /**
     * 选择器视图类名前缀
     *
     * @type {string}
     */
    pickerPrefixCls?: string;
    /**
     * 当前值
     *
     * @type {unknown}
     */
    value?: unknown;
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
     * @type {'left' | 'center' | 'right'}
     */
    labelAlign?: 'left' | 'center' | 'right';
    /**
     * 选择模式
     *
     * @type {DatePickerViewMode}
     */
    mode?: DatePickerViewMode;
    /**
     * 分钟步长
     *
     * @type {number}
     */
    minuteStep?: number;
    /**
     * 是否使用 12 小时制
     *
     * @type {boolean}
     */
    use12Hours?: boolean;
    /**
     * 最小日期
     *
     * @type {unknown}
     */
    minDate?: unknown;
    /**
     * 最大日期
     *
     * @type {unknown}
     */
    maxDate?: unknown;
    /**
     * 最小小时
     *
     * @type {number}
     */
    minHour?: number;
    /**
     * 最大小时
     *
     * @type {number}
     */
    maxHour?: number;
    /**
     * 最小分钟
     *
     * @type {number}
     */
    minMinute?: number;
    /**
     * 最大分钟
     *
     * @type {number}
     */
    maxMinute?: number;
    /**
     * 语言
     *
     * @type {DatePickerViewLang}
     */
    lang?: DatePickerViewLang;
    /**
     * 是否包含至今选项
     *
     * @type {boolean}
     */
    tillNow?: boolean;
}

/**
 * DatePickerViewExpose接口定义
 */
export interface DatePickerViewExpose {
}

/**
 * DatePickerViewInstance类型定义
 */
export type DatePickerViewInstance = ComponentPublicInstance<DatePickerView, DatePickerViewProps, DatePickerViewExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare const props: {
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    multiPickerPrefixCls: {
        type: StringConstructor;
        default: string;
    };
    pickerPrefixCls: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: any;
        default: any;
    };
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
    itemStyle: {
        type: any;
        default: string;
    };
    indicatorStyle: {
        type: any;
        default: string;
    };
    indicatorClass: {
        type: StringConstructor;
        default: string;
    };
    maskStyle: {
        type: any;
        default: string;
    };
    maskClass: {
        type: StringConstructor;
        default: string;
    };
    labelAlign: {
        type: StringConstructor;
        default: string;
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
    minuteStep: {
        type: NumberConstructor;
        default: number;
    };
    use12Hours: {
        type: BooleanConstructor;
        default: boolean;
    };
    minDate: {
        type: any;
        default: any;
    };
    maxDate: {
        type: any;
        default: any;
    };
    minHour: {
        type: NumberConstructor;
        default: number;
    };
    maxHour: {
        type: NumberConstructor;
        default: number;
    };
    minMinute: {
        type: NumberConstructor;
        default: number;
    };
    maxMinute: {
        type: NumberConstructor;
        default: number;
    };
    lang: {
        type: StringConstructor;
        default: string;
    };
    tillNow: {
        type: BooleanConstructor;
        default: boolean;
    };
};

export declare const DATETIME = "datetime";

export declare const DATE = "date";

export declare const TIME = "time";

export declare const MONTH = "month";

export declare const YEAR = "year";

export declare const ONE_DAY: number;

export declare const TILL_NOW = "TILL_NOW";

export declare function fomartArray(min: number, max: number, step?: number): number[];

export declare function getDaysInMonth(date: Date): number;

export declare function pad(n: number): string;

export declare function cloneDate(date: Date): Date;

export declare function setMonth(date: Date, month: number): void;

export declare function isTillNow(value: any): any;

export declare const modeRecord: Record<string, string>;

export declare function convertStringArrayToDate(value: any, props?: any): Date;

export declare function convertDateToStringArray(date: Date, props?: any): string[];

export declare function getRealIndex(value?: number, min?: number, max?: number): number;

export declare function getIndexFromValue(value: unknown, col?: Array<Record<string, unknown>>, fieldNames?: DatePickerViewUtilsFieldNames): number;

export declare function getIndexesFromValues(values?: string[], cols?: Array<Array<Record<string, unknown>>>, fieldNames?: DatePickerViewUtilsFieldNames): number[];

export declare function getRealValue(value?: string, col?: Array<Record<string, unknown>>, fieldNames?: DatePickerViewUtilsFieldNames): string;

export declare function getRealValues(values?: string[], cols?: Array<Array<Record<string, unknown>>>, fieldNames?: DatePickerViewUtilsFieldNames): string[];

export declare function getLabelFromIndex(index: number, col?: Array<Record<string, unknown>>, member?: string): unknown;

export declare function getLabelsFromIndexes(indexes: number[], cols?: Array<Array<Record<string, unknown>>>, member?: string): unknown[];
