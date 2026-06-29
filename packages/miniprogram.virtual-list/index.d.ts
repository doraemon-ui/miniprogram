import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class VirtualList extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof VirtualList
     */
    prefixCls: string;
    /**
     * 每项高度
     *
     * @type {number}
     * @memberof VirtualList
     */
    itemHeight: number;
    /**
     * 渲染缓冲区项数
     *
     * @type {number}
     * @memberof VirtualList
     */
    itemBuffer: number;
    /**
     * 初始化滚动到的索引
     *
     * @type {number}
     * @memberof VirtualList
     */
    scrollToIndex: number;
    /**
     * 距顶部阈值
     *
     * @type {number}
     * @memberof VirtualList
     */
    upperThreshold: number;
    /**
     * 距底部阈值
     *
     * @type {number}
     * @memberof VirtualList
     */
    lowerThreshold: number;
    /**
     * 滚动是否使用动画
     *
     * @type {boolean}
     * @memberof VirtualList
     */
    scrollWithAnimation: boolean;
    /**
     * iOS 点击顶部状态栏是否返回顶部
     *
     * @type {boolean}
     * @memberof VirtualList
     */
    enableBackToTop: boolean;
    /**
     * 是否禁止滚动
     *
     * @type {boolean}
     * @memberof VirtualList
     */
    disableScroll: boolean;
    /**
     * 是否启用页面滚动模式
     *
     * @type {boolean}
     * @memberof VirtualList
     */
    enablePageScroll: boolean;
    /**
     * 容器高度
     *
     * @type {number}
     * @memberof VirtualList
     */
    height: number;
    /**
     * 滚动事件防抖延迟
     *
     * @type {number}
     * @memberof VirtualList
     */
    debounce: number;
    wrapStyle: string;
    scrollOffset: number;
    innerScrollOffset: number;
    startIndex: number;
    endIndex: number;
    offsetTop?: number;
    virtual: VirtualListVirtualData;
    private items;
    private firstRendered;
    scrollHandler: (e: any) => void;
    get classes(): {
        wrap: string;
        mask: string;
        scrollView: string;
        scrollArea: string;
    };
    onItemHeightChange(): void;
    onHeightChange(v: number): void;
    onDebounceChange(v: number): void;
    onViewportDepsChange(): void;
    onScrollToIndexPropChange(v: number): void;
    private getChildrenItems;
    onChildrenChanged(): void;
    updated(itemHeight?: number): void;
    updatedStyle(height: number): void;
    loadData(callback?: (values: VirtualListRenderPayload) => void): void;
    onChange(scrollOffset: number, scrolled?: boolean, callback?: (values: VirtualListRenderPayload) => void): void;
    onScroll(e: CustomEvent<{
        scrollTop: number;
    }>): void;
    onScrollToUpper(e: CustomEvent): void;
    onScrollToLower(e: CustomEvent): void;
    getOffsetForIndex(index: number, itemHeight?: number, itemSize?: number): number;
    render(items?: any[], success?: (payload: VirtualListRenderPayload) => void): void;
    scrollTo(scrollOffset: number, success?: (payload: VirtualListRenderPayload) => void): void;
    scrollToIndexFn(index: number, success?: (payload: VirtualListRenderPayload) => void): void;
    setScrollHandler(useDebounce?: number): void;
    noop(): void;
    getBoundingClientRect(callback?: () => void, isForce?: boolean): Promise<void>;
    mounted(): void;
}

export { VirtualList };

/**
 * VirtualListVirtualData接口定义
 */
export interface VirtualListVirtualData {
    /**
     * items
     * @type {any[]}
     */
    items: any[];
    /**
     * style
     * @type {string}
     */
    style: string;
}

/**
 * VirtualListRenderPayload接口定义
 */
export interface VirtualListRenderPayload {
    /**
     * virtual
     * @type {VirtualListVirtualData}
     */
    virtual: VirtualListVirtualData;
    /**
     * startIndex
     * @type {number}
     */
    startIndex: number;
    /**
     * endIndex
     * @type {number}
     */
    endIndex: number;
    /**
     * scrollOffset
     * @type {number}
     */
    scrollOffset: number;
    /**
     * direction
     * @type {'Down' | 'Up'}
     */
    direction?: 'Down' | 'Up';
}

/**
 * VirtualListProps接口定义
 */
export interface VirtualListProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 每项高度
     *
     * @type {number}
     */
    itemHeight?: number;
    /**
     * 渲染缓冲区项数
     *
     * @type {number}
     */
    itemBuffer?: number;
    /**
     * 初始化滚动到的索引
     *
     * @type {number}
     */
    scrollToIndex?: number;
    /**
     * 距顶部阈值
     *
     * @type {number}
     */
    upperThreshold?: number;
    /**
     * 距底部阈值
     *
     * @type {number}
     */
    lowerThreshold?: number;
    /**
     * 滚动是否使用动画
     *
     * @type {boolean}
     */
    scrollWithAnimation?: boolean;
    /**
     * iOS 点击顶部状态栏是否返回顶部
     *
     * @type {boolean}
     */
    enableBackToTop?: boolean;
    /**
     * 是否禁止滚动
     *
     * @type {boolean}
     */
    disableScroll?: boolean;
    /**
     * 是否启用页面滚动模式
     *
     * @type {boolean}
     */
    enablePageScroll?: boolean;
    /**
     * 容器高度
     *
     * @type {number}
     */
    height?: number;
    /**
     * 滚动事件防抖延迟
     *
     * @type {number}
     */
    debounce?: number;
}

/**
 * VirtualListExpose接口定义
 */
export interface VirtualListExpose {
}

/**
 * VirtualListInstance类型定义
 */
export type VirtualListInstance = ComponentPublicInstance<VirtualList, VirtualListProps, VirtualListExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

declare class VirtualListItem extends Doraemon {
    prefixCls: string;
    index: number;
    wrapStyle: string;
    updated(index: number, height: number): void;
}

export { VirtualListItem };

export declare const mapVirtualToProps: ({ items, itemHeight }: {
    items: any[];
    itemHeight: number;
}, { startIndex, endIndex }: {
    startIndex: number;
    endIndex: number;
}) => {
    virtual: {
        items: any[];
        style: string;
    };
};

export declare const getVisibleItemBounds: (viewTop: number, viewHeight: number, itemCount: number, itemHeight: number, itemBuffer: number) => {
    startIndex: number;
    endIndex: number;
};

export declare const debounce: <T extends (...args: any[]) => void>(fn: T, wait?: number) => (...args: Parameters<T>) => void;
