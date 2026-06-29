/**
 * CountUpSetData类型定义
 */
export type CountUpSetData = (data: Record<string, unknown>, callback?: () => void) => void;

/**
 * CountUpPageLike接口定义
 */
export interface CountUpPageLike {
    /**
     * setData
     * @type {CountUpSetData}
     */
    setData: CountUpSetData;
}

/**
 * CountUpEasingFn类型定义
 */
export type CountUpEasingFn = (t: number, b: number, c: number, d: number) => number;

/**
 * CountUpFormattingFn类型定义
 */
export type CountUpFormattingFn = (value: number) => string;

/**
 * CountUpPrintValue类型定义
 */
export type CountUpPrintValue = (value: string) => void;

/**
 * CountUpOptions接口定义
 */
export interface CountUpOptions {
    /**
     * useEasing
     * @type {boolean}
     */
    useEasing?: boolean;
    /**
     * useGrouping
     * @type {boolean}
     */
    useGrouping?: boolean;
    /**
     * separator
     * @type {string}
     */
    separator?: string;
    /**
     * decimal
     * @type {string}
     */
    decimal?: string;
    /**
     * easingFn
     * @type {CountUpEasingFn | null}
     */
    easingFn?: CountUpEasingFn | null;
    /**
     * formattingFn
     * @type {CountUpFormattingFn | null}
     */
    formattingFn?: CountUpFormattingFn | null;
    /**
     * printValue
     * @type {CountUpPrintValue | null}
     */
    printValue?: CountUpPrintValue | null;
    /**
     * prefix
     * @type {string}
     */
    prefix?: string;
    /**
     * suffix
     * @type {string}
     */
    suffix?: string;
}

/**
 * ResolvedCountUpOptions接口定义
 */
export interface ResolvedCountUpOptions {
    /**
     * useEasing
     * @type {boolean}
     */
    useEasing: boolean;
    /**
     * useGrouping
     * @type {boolean}
     */
    useGrouping: boolean;
    /**
     * separator
     * @type {string}
     */
    separator: string;
    /**
     * decimal
     * @type {string}
     */
    decimal: string;
    /**
     * easingFn
     * @type {CountUpEasingFn | null}
     */
    easingFn: CountUpEasingFn | null;
    /**
     * formattingFn
     * @type {CountUpFormattingFn | null}
     */
    formattingFn: CountUpFormattingFn | null;
    /**
     * printValue
     * @type {CountUpPrintValue}
     */
    printValue: CountUpPrintValue;
    /**
     * prefix
     * @type {string}
     */
    prefix: string;
    /**
     * suffix
     * @type {string}
     */
    suffix: string;
}

/**
 * CountUpInstance类型定义
 */
export type CountUpInstance = InstanceType<typeof CountUp>;

/**
 * 计数器工具类（来自 `wux-weapp/src/countup`）
 *
 * - 通过 `new CountUp(startVal, endVal, decimals, duration, options, page)` 创建实例
 * - 在 `printValue` 回调中使用 `this.setData` 更新页面数据
 */
export default class CountUp {
    page: CountUpPageLike;
    options: ResolvedCountUpOptions;
    setData: CountUpSetData;
    startVal: number;
    cacheVal: number;
    endVal: number;
    decimals: number;
    duration: number;
    countDown: boolean;
    frameVal: number;
    dec: number;
    lastTime: number;
    startTime?: number;
    timestamp?: number;
    remaining: number;
    paused: boolean;
    rAF: ReturnType<typeof setTimeout> | null;
    callback?: () => void;
    easingFn: CountUpEasingFn;
    formattingFn: CountUpFormattingFn;
    printValue: CountUpPrintValue;
    constructor(startVal: number, endVal: number, decimals: number, duration: number, options?: CountUpOptions, page?: CountUpPageLike);
    /**
     * 初始化
     */
    __init(options?: CountUpOptions): void;
    /**
     * 默认参数
     */
    setDefaultOptions(): ResolvedCountUpOptions;
    /**
     * 合并参数
     */
    mergeOptions(options: CountUpOptions): void;
    /**
     * 创建定时器
     */
    requestAnimationFrame(callback: (timestamp: number) => void): NodeJS.Timeout;
    /**
     * 清空定时器
     */
    cancelAnimationFrame(timeout: ReturnType<typeof setTimeout> | null): void;
    /**
     * 格式化数字
     */
    formatNumber(nStr: number): string;
    /**
     * 过渡效果
     */
    easeOutExpo(t: number, b: number, c: number, d: number): number;
    /**
     * 计数函数
     */
    count: (timestamp: number) => void;
    /**
     * 启动计数器
     */
    start(callback?: () => void): boolean;
    /**
     * 停止/继续计数器
     */
    pauseResume(): void;
    /**
     * 重置计数器
     */
    reset(): void;
    /**
     * 更新计数器
     */
    update(newEndVal: number): void;
}
