import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Sticky extends Doraemon {
    prefixCls: string;
    scrollTop: number;
    get classes(): {
        wrap: string;
    };
    onScrollChange(scrollTop: number): void;
    getChildNodes(): StickyItemInstance[];
    onScroll(scrollTop?: number): void;
    updated(): void;
    onChildrenChanged(): void;
    emitStick(detail: {
        index: number;
    }): {
        index: number;
    };
    emitUnstick(detail: {
        index: number;
    }): {
        index: number;
    };
    mounted(): void;
}

export { Sticky };

declare class StickyItem extends Doraemon {
    prefixCls: string;
    title: string;
    content: string;
    isFixed: boolean;
    index: number;
    top: number;
    height: number;
    get classes(): {
        wrap: string;
        hd: string;
        title: string;
        bd: string;
        content: string;
    };
    onScroll(scrollTop: number): void;
    updated(index: number): void;
}

export { StickyItem };

export interface StickyItemProps {
    prefixCls?: string;
    title?: string;
    content?: string;
}

export interface StickyItemExpose {
    onScroll(scrollTop: number): void;
    updated(index: number): void;
}

export type StickyItemInstance = ComponentPublicInstance<StickyItem, StickyItemProps, StickyItemExpose>;

/**
 * StickyProps接口定义
 */
export interface StickyProps {
    /**
     * 自定义类名前缀
     */
    prefixCls?: string;
    /**
     * 页面滚动距离
     */
    scrollTop?: number;
}

/**
 * StickyExpose接口定义
 */
export interface StickyExpose {
    onScroll(scrollTop?: number): void;
    updated(): void;
    emitStick(detail: {
        index: number;
    }): {
        index: number;
    };
    emitUnstick(detail: {
        index: number;
    }): {
        index: number;
    };
}

/**
 * StickyInstance类型定义
 */
export type StickyInstance = ComponentPublicInstance<Sticky, StickyProps, StickyExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
