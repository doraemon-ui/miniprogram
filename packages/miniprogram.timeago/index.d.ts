import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Timeago extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Timeago
     */
    prefixCls: string;
    /**
     * 目标时间
     *
     * @type {any}
     * @memberof Timeago
     */
    to: any;
    /**
     * 基准时间
     *
     * @type {any}
     * @memberof Timeago
     */
    from: any;
    /**
     * 是否自动刷新
     *
     * @type {boolean}
     * @memberof Timeago
     */
    refreshable: boolean;
    /**
     * 语言
     *
     * @type {TimeagoLang}
     * @memberof Timeago
     */
    lang: TimeagoLang;
    currentTo: any;
    currentFrom: any;
    timeago: string;
    private timeout;
    onToChange(v: any): void;
    onFromChange(v: any): void;
    onRefreshableChange(_v: boolean): void;
    onLangChange(v: TimeagoLang): void;
    updated(currentTo: any, currentFrom: any, lang: TimeagoLang, isForce?: boolean): void;
    clearTimer(): void;
    getNow(): Date;
    detached(): void;
}

export { Timeago };

/**
 * TimeagoLang类型定义
 */
export type TimeagoLang = 'zh_CN' | 'zh_TW' | 'en';

/**
 * TimeagoProps接口定义
 */
export interface TimeagoProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * to
     * @type {any}
     */
    to?: any;
    /**
     * from
     * @type {any}
     */
    from?: any;
    /**
     * refreshable
     * @type {boolean}
     */
    refreshable?: boolean;
    /**
     * lang
     * @type {TimeagoLang}
     */
    lang?: TimeagoLang;
}

/**
 * TimeagoExpose接口定义
 */
export interface TimeagoExpose {
}

/**
 * TimeagoInstance类型定义
 */
export type TimeagoInstance = ComponentPublicInstance<Timeago, TimeagoProps, TimeagoExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare const parse: (date: any) => Date;

export declare const monthDiff: (startMonth: any, endMonth: any) => number;

export declare const diff: (date: any, nowDate?: any, unit?: string) => number;

export declare const format: (delta: number, opts?: Record<string, string[]>) => string;
