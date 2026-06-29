/**
 * CountdownDateInput类型定义
 */
export type CountdownDateInput = string | number | Date;

/**
 * CountdownDiffDate接口定义
 */
export interface CountdownDiffDate {
    /**
     * years
     * @type {number}
     */
    years: number;
    /**
     * days
     * @type {number}
     */
    days: number;
    /**
     * hours
     * @type {number}
     */
    hours: number;
    /**
     * min
     * @type {number}
     */
    min: number;
    /**
     * sec
     * @type {number}
     */
    sec: number;
    /**
     * millisec
     * @type {number}
     */
    millisec: number;
}

/**
 * CountdownSetData类型定义
 */
export type CountdownSetData = (data: Record<string, unknown>, callback?: () => void) => void;

/**
 * CountdownPageLike接口定义
 */
export interface CountdownPageLike {
    /**
     * setData
     * @type {CountdownSetData}
     */
    setData: CountdownSetData;
}

/**
 * CountdownOptions接口定义
 */
export interface CountdownOptions {
    /**
     * 目标时间
     */
    date: CountdownDateInput;
    /**
     * 刷新频率（ms），为 0 时不会启动定时器
     */
    refresh: number;
    /**
     * 时间偏移量（ms）
     */
    offset: number;
    /**
     * 倒计时结束时触发
     */
    onEnd: () => void;
    /**
     * 每次渲染时触发
     */
    render: (date: CountdownDiffDate) => void;
}

/**
 * CountdownInstance类型定义
 */
export type CountdownInstance = InstanceType<typeof Countdown>;

/**
 * 倒计时工具类（来自 `wux-weapp/src/countdown`）
 *
 * - 通过 `new Countdown(options, page)` 创建实例
 * - 在 `render` 回调中使用 `this.setData` 更新页面数据
 */
export default class Countdown {
    /**
     * 页面实例（用于 setData）
     */
    page: CountdownPageLike;
    /**
     * 配置项
     */
    options: CountdownOptions;
    /**
     * setData 方法（绑定到 page.setData）
     */
    setData: CountdownSetData;
    /**
     * 定时器句柄
     */
    interval: ReturnType<typeof setInterval> | null;
    constructor(options?: Partial<CountdownOptions>, page?: CountdownPageLike);
    /**
     * 初始化
     */
    __init(options?: Partial<CountdownOptions>): void;
    /**
     * 默认参数
     */
    setDefaults(): CountdownOptions;
    /**
     * 合并参数
     */
    mergeOptions(options: Partial<CountdownOptions>): void;
    /**
     * 计算日期差
     */
    getDiffDate(): CountdownDiffDate;
    /**
     * 补零
     */
    leadingZeros(num: number | string, length?: number): string;
    /**
     * 更新组件
     */
    update(newDate: CountdownDateInput): this;
    /**
     * 停止倒计时
     */
    stop(): this;
    /**
     * 渲染组件
     */
    render(): this;
    /**
     * 启动倒计时
     */
    start(): false | this;
    /**
     * 更新 offset
     */
    updateOffset(offset: number): this;
    /**
     * 重启倒计时
     */
    restart(options?: Partial<CountdownOptions>): this;
}
