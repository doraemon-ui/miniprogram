import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Calendar extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Calendar
     */
    prefixCls: string;
    visible: boolean;
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
    firstDay: number;
    weekendDays: number[];
    multiple: boolean;
    dateFormat: string;
    direction: CalendarDirection;
    minDate: number | string | null;
    maxDate: number | string | null;
    touchMove: boolean;
    animate: boolean;
    closeOnSelect: boolean;
    weekHeader: boolean;
    toolbar: boolean;
    value: Array<number | string>;
    weeks: CalendarWeek[];
    months: CalendarMonth[];
    monthsTranslate: string[];
    wrapperTranslate: string;
    swiping: boolean;
    currentMonth: number;
    currentYear: number;
    currentMonthName: string;
    private fns;
    private monthsTranslateIndex;
    private isH;
    private start;
    private move;
    private touchesDiff;
    private allowItemClick;
    private isMoved;
    private isRendered;
    get classes(): {
        wrap: string;
        content: string;
        hd: string;
        toolbar: string;
        picker: string;
        link: string;
        prev: string;
        next: string;
        value: string;
        bd: string;
        weekdays: string;
        weekday: string;
        months: string;
        monthsContent: string;
        month: string;
        days: string;
        day: string;
        text: string;
    };
    private mergeOptions;
    open(opts?: CalendarOpenOptions): void;
    close(): void;
    init(): void;
    setMonthsTranslate(translate?: number): string[];
    updateCurrentMonthYear(dir?: 'prev' | 'next'): {
        currentMonth: number;
        currentYear: number;
        currentMonthName: string;
    };
    onTouchStart(e: WechatMiniprogram.TouchEvent): void;
    onTouchMove(e: WechatMiniprogram.TouchEvent): Promise<void>;
    onTouchEnd(): void;
    onDayClick(e: WechatMiniprogram.TouchEvent): void;
    resetMonth(): void;
    setYearMonth(year?: number, month?: number): void;
    nextYear(): void;
    prevYear(): void;
    nextMonth(): void;
    prevMonth(): void;
    onMonthChangeStart(dir: 'prev' | 'next'): void;
    onMonthChangeEnd(dir?: 'next' | 'prev', rebuildBoth?: boolean): void;
    setWeekHeader(): CalendarWeek[];
    daysInMonth(date: number): number;
    monthHTML(date: number | Date, offset?: 'next' | 'prev'): {
        year: number;
        month: number;
        time: number;
        items: CalendarDay[][];
    };
    setMonthsHTML(): {
        year: number;
        month: number;
        time: number;
        items: CalendarDay[][];
    }[];
    formatDate(date: number | string): string;
    addValue(value: number): void;
    setValue(value: Array<number | string>): void;
    updateValue(): void;
}

export { Calendar };

/**
 * TouchPosition接口定义
 */
export interface TouchPosition {
    /**
     * x
     * @type {number}
     */
    x: number;
    /**
     * y
     * @type {number}
     */
    y: number;
}

/**
 * CalendarDirection类型定义
 */
export type CalendarDirection = 'horizontal' | 'vertical';

/**
 * CalendarDayType接口定义
 */
export interface CalendarDayType {
    /**
     * prev
     * @type {boolean}
     */
    prev?: boolean;
    /**
     * next
     * @type {boolean}
     */
    next?: boolean;
    /**
     * today
     * @type {boolean}
     */
    today?: boolean;
    /**
     * selected
     * @type {boolean}
     */
    selected?: boolean;
    /**
     * weekend
     * @type {boolean}
     */
    weekend?: boolean;
    /**
     * disabled
     * @type {boolean}
     */
    disabled?: boolean;
}

/**
 * CalendarWeek接口定义
 */
export interface CalendarWeek {
    /**
     * weekend
     * @type {boolean}
     */
    weekend: boolean;
    /**
     * dayName
     * @type {string}
     */
    dayName: string;
}

/**
 * CalendarDay接口定义
 */
export interface CalendarDay {
    /**
     * type
     * @type {CalendarDayType}
     */
    type: CalendarDayType;
    /**
     * year
     * @type {number}
     */
    year: number;
    /**
     * month
     * @type {number}
     */
    month: number;
    /**
     * day
     * @type {number}
     */
    day: number;
    /**
     * date
     * @type {string}
     */
    date: string;
}

/**
 * CalendarMonth接口定义
 */
export interface CalendarMonth {
    /**
     * year
     * @type {number}
     */
    year: number;
    /**
     * month
     * @type {number}
     */
    month: number;
    /**
     * time
     * @type {number}
     */
    time: number;
    /**
     * items
     * @type {CalendarDay[][]}
     */
    items: CalendarDay[][];
}

/**
 * CalendarOpenOptions类型定义
 */
export type CalendarOpenOptions = Partial<{
    monthNames: string[];
    monthNamesShort: string[];
    dayNames: string[];
    dayNamesShort: string[];
    firstDay: number;
    weekendDays: number[];
    multiple: boolean;
    dateFormat: string;
    direction: CalendarDirection;
    minDate: number | string | null;
    maxDate: number | string | null;
    touchMove: boolean;
    animate: boolean;
    closeOnSelect: boolean;
    weekHeader: boolean;
    toolbar: boolean;
    value: Array<number | string>;
    onMonthAdd: (month: CalendarMonth) => void;
    onChange: (values: number[], displayValues: string[]) => void;
    onOpen: () => void;
    onClose: () => void;
    onDayClick: (year: number, month: number, day: number) => void;
    onMonthYearChangeStart: (year: number, month: number) => void;
    onMonthYearChangeEnd: (year: number, month: number) => void;
}>;

/**
 * CalendarProps接口定义
 */
export interface CalendarProps {
    /**
     * prefixCls
     * @type {string}
     */
    prefixCls?: string;
}

/**
 * CalendarExpose接口定义
 */
export interface CalendarExpose {
    /**
     * 打开组件
     *
     * @return {void}
     */
    open(opts?: CalendarOpenOptions): void;
    /**
     * 关闭组件
     *
     * @return {void}
     */
    close(): void;
    /**
     * 设置年月
     *
     * @return {void}
     */
    setYearMonth(year?: number, month?: number): void;
    /**
     * 切换到下个月
     *
     * @return {void}
     */
    nextMonth(): void;
    /**
     * 切换到上个月
     *
     * @return {void}
     */
    prevMonth(): void;
    /**
     * 切换到下一年
     *
     * @return {void}
     */
    nextYear(): void;
    /**
     * 切换到上一年
     *
     * @return {void}
     */
    prevYear(): void;
}

/**
 * CalendarInstance类型定义
 */
export type CalendarInstance = ComponentPublicInstance<Calendar, CalendarProps, CalendarExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
