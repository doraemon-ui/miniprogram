import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Badge extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Badge
     */
    prefixCls: string;
    count: number;
    overflowCount: number;
    dot: boolean;
    showZero: boolean;
    status: BadgeStatus;
    text: string;
    position: BadgePosition;
    backgroundColor: string;
    hideShadow: boolean;
    title: string;
    finalCount: string | number;
    badgeStyle: string;
    get classes(): {
        wrap: string;
        status: string;
        statusDot: string;
        statusText: string;
        dot: string;
        count: string;
    };
    updated(props?: {
        count: number;
        overflowCount: number;
    }): void;
    updateStyle(backgroundColor: string): void;
    onCountChange(): void;
    onBackgroundColorChange(newVal: string): void;
    mounted(): void;
}

export { Badge };

/**
 * BadgeStatus类型定义
 */
export type BadgeStatus = '' | 'success' | 'processing' | 'default' | 'error' | 'warning';

/**
 * BadgePosition类型定义
 */
export type BadgePosition = 'topRight' | 'topLeft' | 'bottomRight' | 'bottomLeft';

/**
 * BadgeProps接口定义
 */
export interface BadgeProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * count
     * @type {number}
     */
    count?: number;
    /**
     * overflowCount
     * @type {number}
     */
    overflowCount?: number;
    /**
     * dot
     * @type {boolean}
     */
    dot?: boolean;
    /**
     * showZero
     * @type {boolean}
     */
    showZero?: boolean;
    /**
     * status
     * @type {BadgeStatus}
     */
    status?: BadgeStatus;
    /**
     * text
     * @type {string}
     */
    text?: string;
    /**
     * position
     * @type {BadgePosition}
     */
    position?: BadgePosition;
    /**
     * backgroundColor
     * @type {string}
     */
    backgroundColor?: string;
    /**
     * hideShadow
     * @type {boolean}
     */
    hideShadow?: boolean;
    /**
     * title
     * @type {string}
     */
    title?: string;
}

/**
 * BadgeExpose接口定义
 */
export interface BadgeExpose {
}

/**
 * BadgeInstance类型定义
 */
export type BadgeInstance = ComponentPublicInstance<Badge, BadgeProps, BadgeExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
