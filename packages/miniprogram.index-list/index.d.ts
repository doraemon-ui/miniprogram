import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, TouchEvent } from '@doraemon-ui/miniprogram.core-js';

import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared';

declare class IndexList extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls: string;
    /**
     * 组件高度
     */
    height: string | number;
    /**
     * 是否显示提示指示器
     */
    showIndicator: boolean;
    /**
     * 提示指示器位置
     */
    indicatorPosition: IndexListIndicatorPosition;
    /**
     * 父容器顶部偏移
     */
    parentOffsetTop: number;
    colHight: number;
    points: IndexListPointNode[];
    scrollTop: number;
    navList: IndexListNavProps[];
    moving: boolean;
    current: number;
    currentName: string;
    currentBrief: string;
    extStyle: string;
    indicatorStyle: string;
    get classes(): {
        root: string;
        nav: string;
        navRow: string;
        navCol: string;
        navItem: string;
        indicator: string;
    };
    onHeightChange(newVal: string | number): void;
    onChildrenChanged(): void;
    /**
     * 更新样式
     */
    updateStyle(height?: string | number): void;
    getChildNodes(): IndexListItemInstance[];
    updateNavList(): void;
    /**
     * 刷新元素数据
     */
    updated(): void;
    /**
     * 设置当前激活项
     */
    setActive(current: number, currentName: string): void;
    onTouchStart(e: TouchEvent<{}, {}, {
        index?: number;
        name?: string;
    }>): void;
    onTouchMove(e: TouchEvent): void;
    onTouchEnd(): void;
    onScroll(e: TouchEvent<{
        scrollTop: number;
    }>): void;
    getNavPoints(): Promise<void>;
    getTargetFromPoint(y: number): IndexListPointNode;
    checkActiveIndex(scrollTop: number): void;
    scrollTo(index: number | string): void;
    mounted(): void;
}

export { IndexList };

declare class IndexListItem extends Doraemon {
    /**
     * 自定义类名前缀
     */
    prefixCls: string;
    /**
     * 分组名称
     */
    name: string;
    index: number;
    top: number;
    height: number;
    brief: string;
    get classes(): {
        root: string;
        hd: string;
        bd: string;
    };
    getParentInstance(): IndexListInstance | undefined;
    refreshBrief(): void;
    /**
     * 更新 index item 位置信息
     */
    updated(index: number): void;
    mounted(): void;
}

export { IndexListItem };

export interface IndexListNavProps {
    index: number;
    name: string;
    brief: string;
}

/**
 * IndexListPointNode接口定义
 */
export interface IndexListPointNode extends MiniprogramDOMRect {
    /**
     * offsets
     * @type {[number, number]}
     */
    offsets: [number, number];
}

/**
 * IndexListIndicatorPosition类型定义
 */
export type IndexListIndicatorPosition = 'left' | 'center' | 'right';

/**
 * IndexListProps接口定义
 */
export interface IndexListProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 组件高度
     *
     * @type {(string | number)}
     */
    height?: string | number;
    /**
     * 是否显示提示指示器
     *
     * @type {boolean}
     */
    showIndicator?: boolean;
    /**
     * 提示指示器位置
     *
     * @type {IndexListIndicatorPosition}
     */
    indicatorPosition?: IndexListIndicatorPosition;
    /**
     * 父容器顶部偏移
     *
     * @type {number}
     */
    parentOffsetTop?: number;
}

/**
 * IndexListExpose接口定义
 */
export interface IndexListExpose {
    /**
     * 滚动到指定项
     *
     * @return {void}
     */
    scrollTo(index: number | string): void;
}

/**
 * IndexListInstance类型定义
 */
export type IndexListInstance = ComponentPublicInstance<IndexList, IndexListProps, IndexListExpose>;

/**
 * IndexListItemProps接口定义
 */
export interface IndexListItemProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 分组名称
     *
     * @type {string}
     */
    name?: string;
}

/**
 * IndexListItemExpose接口定义
 */
export interface IndexListItemExpose {
    index: number;
    top: number;
    height: number;
    brief: string;
    /**
     * 更新激活状态
     *
     * @return {void}
     */
    updated(index: number): void;
}

/**
 * IndexListItemInstance类型定义
 */
export type IndexListItemInstance = ComponentPublicInstance<IndexListItem, IndexListItemProps, IndexListItemExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
