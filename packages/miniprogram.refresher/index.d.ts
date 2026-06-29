import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Refresher extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Refresher
     */
    prefixCls: string;
    /**
     * 下拉图标
     *
     * @type {string}
     * @memberof Refresher
     */
    pullingIcon: string;
    /**
     * 下拉文案
     *
     * @type {string}
     * @memberof Refresher
     */
    pullingText: string;
    /**
     * 刷新图标
     *
     * @type {string}
     * @memberof Refresher
     */
    refreshingIcon: string;
    /**
     * 刷新文案
     *
     * @type {string}
     * @memberof Refresher
     */
    refreshingText: string;
    /**
     * 是否禁用下拉旋转动画
     *
     * @type {boolean}
     * @memberof Refresher
     */
    disablePullingRotation: boolean;
    /**
     * 触发刷新距离
     *
     * @type {number}
     * @memberof Refresher
     */
    distance: number;
    /**
     * 加载区类名前缀
     *
     * @type {string}
     * @memberof Refresher
     */
    prefixLCls: string;
    /**
     * 是否显示加载文案
     *
     * @type {boolean}
     * @memberof Refresher
     */
    isShowLoadingText: boolean;
    /**
     * 加载中文案
     *
     * @type {string}
     * @memberof Refresher
     */
    loadingText: string;
    /**
     * 无更多数据文案
     *
     * @type {string}
     * @memberof Refresher
     */
    loadNoDataText: string;
    /**
     * 当前滚动位置
     *
     * @type {number}
     * @memberof Refresher
     */
    scrollTop: number;
    style: string;
    visible: boolean;
    active: boolean;
    refreshing: boolean;
    tail: boolean;
    lVisible: boolean;
    noData: boolean;
    windowHeight: number;
    newContentHeight: number;
    oldContentHeight: number;
    loading: boolean;
    lastTime: number;
    activated: boolean;
    start: TouchPoint | false;
    move: TouchPoint | false;
    diffX: number;
    diffY: number;
    isMoved: boolean;
    direction: string;
    get classes(): {
        wrap: string;
        content: string;
        iconPulling: string;
        textPulling: string;
        iconRefreshing: string;
        textRefreshing: string;
        pIcon: string;
        rIcon: string;
        lWrap: string;
        lContent: string;
        loadingText: string;
    };
    onScrollPropChange(n: number): void;
    activate(): void;
    deactivate(): void;
    doRefreshing(): void;
    doTail(): void;
    hide(): void;
    translate(diffY: number): void;
    isRefreshing(): boolean;
    isLoading(): boolean;
    getTouchPoints(e: TouchEvent, index?: number): {
        x: number;
        y: number;
    };
    getSwipeDirection(x1: number, x2: number, y1: number, y2: number): "Left" | "Right" | "Up" | "Down";
    requestAnimationFrame(callback: () => void): NodeJS.Timeout;
    finishPullToRefresh(): void;
    finishLoadmore(isEnd?: boolean): void;
    onTouchStart(e: TouchEvent): void;
    onTouchMove(e: TouchEvent): void;
    onTouchEnd(): void;
    triggerPull(diffY: number): void;
    triggerRefresh(diffY?: number): void;
    onScroll(n: number): void;
    noop(): void;
    mounted(): void;
}

export { Refresher };

export declare const $startWuxRefresher: (selector?: string, context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>) => void;

export declare const $stopWuxRefresher: (selector?: string, context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>) => void;

export declare const $stopWuxLoader: (selector?: string, context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>, isEnd?: boolean) => void;

/**
 * TouchPoint接口定义
 */
export interface TouchPoint {
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
 * RefresherProps接口定义
 */
export interface RefresherProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 下拉图标
     *
     * @type {string}
     */
    pullingIcon?: string;
    /**
     * 下拉文案
     *
     * @type {string}
     */
    pullingText?: string;
    /**
     * 刷新图标
     *
     * @type {string}
     */
    refreshingIcon?: string;
    /**
     * 刷新文案
     *
     * @type {string}
     */
    refreshingText?: string;
    /**
     * 是否禁用下拉旋转动画
     *
     * @type {boolean}
     */
    disablePullingRotation?: boolean;
    /**
     * 触发刷新距离
     *
     * @type {number}
     */
    distance?: number;
    /**
     * 加载区类名前缀
     *
     * @type {string}
     */
    prefixLCls?: string;
    /**
     * 是否显示加载文案
     *
     * @type {boolean}
     */
    isShowLoadingText?: boolean;
    /**
     * 加载中文案
     *
     * @type {string}
     */
    loadingText?: string;
    /**
     * 无更多数据文案
     *
     * @type {string}
     */
    loadNoDataText?: string;
    /**
     * 当前滚动位置
     *
     * @type {number}
     */
    scrollTop?: number;
}

/**
 * RefresherExpose接口定义
 */
export interface RefresherExpose {
    /**
     * 触发刷新
     *
     * @return {void}
     */
    triggerRefresh(diffY?: number): void;
    /**
     * 结束下拉刷新
     *
     * @return {void}
     */
    finishPullToRefresh(): void;
    /**
     * 结束加载更多
     *
     * @return {void}
     */
    finishLoadmore(isEnd?: boolean): void;
}

/**
 * RefresherInstance类型定义
 */
export type RefresherInstance = ComponentPublicInstance<Refresher, RefresherProps, RefresherExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
