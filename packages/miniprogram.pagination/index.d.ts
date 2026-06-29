import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Pagination extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Pagination
     */
    prefixCls: string;
    /**
     * 形态
     *
     * @type {('button' | 'number' | 'pointer')}
     * @memberof Pagination
     */
    mode: PaginationMode;
    /**
     * 默认页号
     *
     * @type {number}
     * @memberof Pagination
     */
    defaultCurrent: number;
    /**
     * 当前页号
     *
     * @type {number}
     * @memberof Pagination
     */
    current: number;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Pagination
     */
    controlled: boolean;
    /**
     * 总页数
     *
     * @type {number}
     * @memberof Pagination
     */
    total: number;
    /**
     * 是否隐藏数值
     *
     * @type {boolean}
     * @memberof Pagination
     */
    simple: boolean;
    get classes(): {
        wrap: string;
        prev: string;
        button: string;
        number: string;
        active: string;
        pointer: string;
        dot: string;
        next: string;
    };
    activeIndex: number;
    watchCurrent(newVal: number): void;
    updated(activeIndex: number): void;
    onChange(current: number, type: 'prev' | 'next'): {
        current: number;
        type: "prev" | "next";
    };
    onPrev(): {
        current: number;
    };
    onNext(): {
        current: number;
    };
    mounted(): void;
}

export { Pagination };

/**
 * PaginationMode类型定义
 */
export type PaginationMode = 'button' | 'number' | 'pointer';

/**
 * PaginationChangeType类型定义
 */
export type PaginationChangeType = 'prev' | 'next';

/**
 * PaginationChangeDetail接口定义
 */
export interface PaginationChangeDetail {
    /**
     * current
     * @type {number}
     */
    current: number;
    /**
     * type
     * @type {PaginationChangeType}
     */
    type: PaginationChangeType;
}

/**
 * PaginationStepDetail接口定义
 */
export interface PaginationStepDetail {
    /**
     * current
     * @type {number}
     */
    current: number;
}

/**
 * PaginationProps接口定义
 */
export interface PaginationProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 形态
     *
     * @type {PaginationMode}
     */
    mode?: PaginationMode;
    /**
     * 默认页号
     *
     * @type {number}
     */
    defaultCurrent?: number;
    /**
     * 当前页号
     *
     * @type {number}
     */
    current?: number;
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 总页数
     *
     * @type {number}
     */
    total?: number;
    /**
     * 是否隐藏数值
     *
     * @type {boolean}
     */
    simple?: boolean;
}

/**
 * PaginationExpose接口定义
 */
export interface PaginationExpose {
}

/**
 * PaginationInstance类型定义
 */
export type PaginationInstance = ComponentPublicInstance<Pagination, PaginationProps, PaginationExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
