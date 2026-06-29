import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Timeline extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Timeline
     */
    prefixCls: string;
    /**
     * 是否显示 pending 节点
     *
     * @type {boolean}
     * @memberof Timeline
     */
    pending: boolean;
    /**
     * 时间轴位置
     *
     * @type {TimelinePosition}
     * @memberof Timeline
     */
    position: TimelinePosition;
    onChildrenChanged(): void;
    updateIsLastElement(): void;
    mounted(): void;
}

export { Timeline };

declare class TimelineItem extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof TimelineItem
     */
    prefixCls: string;
    /**
     * 内容
     *
     * @type {string}
     * @memberof TimelineItem
     */
    content: string;
    /**
     * 圆点样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof TimelineItem
     */
    dotStyle: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否自定义圆点
     *
     * @type {boolean}
     * @memberof TimelineItem
     */
    custom: boolean;
    isLast: boolean;
    isPending: boolean;
    pending: boolean;
    className: string;
    extStyle: string;
    onDotStyleChange(v: string | Partial<CSSStyleDeclaration>): void;
    get classes(): {
        wrap: string;
        tail: string;
        dot: string;
        content: string;
    };
    updateIsLastElement({ index, isLast, isPending, pending, position }: TimelineItemUpdatePayload): void;
    mounted(): void;
}

export { TimelineItem };

/**
 * TimelinePosition类型定义
 */
export type TimelinePosition = 'left' | 'right' | 'alternate';

/**
 * TimelineItemUpdatePayload接口定义
 */
export interface TimelineItemUpdatePayload {
    /**
     * index
     * @type {number}
     */
    index: number;
    /**
     * isLast
     * @type {boolean}
     */
    isLast: boolean;
    /**
     * isPending
     * @type {boolean}
     */
    isPending: boolean;
    /**
     * pending
     * @type {boolean}
     */
    pending: boolean;
    /**
     * position
     * @type {string}
     */
    position: string;
}

/**
 * TimelineProps接口定义
 */
export interface TimelineProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 是否显示 pending 节点
     *
     * @type {boolean}
     */
    pending?: boolean;
    /**
     * 时间轴位置
     *
     * @type {TimelinePosition}
     */
    position?: TimelinePosition;
}

/**
 * TimelineExpose接口定义
 */
export interface TimelineExpose {
}

/**
 * TimelineItemProps接口定义
 */
export interface TimelineItemProps {
    /**
     * prefixCls
     * @type {string}
     */
    prefixCls?: string;
    /**
     * content
     * @type {string}
     */
    content?: string;
    /**
     * dotStyle
     * @type {string | Partial<CSSStyleDeclaration>}
     */
    dotStyle?: string | Partial<CSSStyleDeclaration>;
    /**
     * custom
     * @type {boolean}
     */
    custom?: boolean;
}

/**
 * TimelineItemExpose接口定义
 */
export interface TimelineItemExpose {
}

/**
 * TimelineItemInternalMethods接口定义
 */
export interface TimelineItemInternalMethods {
    updateIsLastElement(payload: TimelineItemUpdatePayload): void;
}

/**
 * TimelineItemInstance类型定义
 */
export type TimelineItemInstance = ComponentPublicInstance<TimelineItem, TimelineItemProps, TimelineItemExpose> & TimelineItemInternalMethods;

/**
 * TimelineInstance类型定义
 */
export type TimelineInstance = ComponentPublicInstance<Timeline, TimelineProps, TimelineExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
