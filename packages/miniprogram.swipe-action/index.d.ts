import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class SwipeAction extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof SwipeAction
     */
    prefixCls: string;
    /**
     * 点击后是否自动关闭
     *
     * @type {boolean}
     * @memberof SwipeAction
     */
    autoClose: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof SwipeAction
     */
    disabled: boolean;
    /**
     * 左侧操作项
     *
     * @type {ActionItem[]}
     * @memberof SwipeAction
     */
    left: ActionItem[];
    /**
     * 右侧操作项
     *
     * @type {ActionItem[]}
     * @memberof SwipeAction
     */
    right: ActionItem[];
    /**
     * 是否使用插槽渲染操作区
     *
     * @type {boolean}
     * @memberof SwipeAction
     */
    useSlots: boolean;
    /**
     * 附加数据
     *
     * @type {unknown}
     * @memberof SwipeAction
     */
    data: unknown;
    index: number;
    swiping: boolean;
    showCover: boolean;
    offsetStyle: string;
    btnsLeftWidth: number;
    btnsRightWidth: number;
    openedLeft: boolean;
    openedRight: boolean;
    needShowLeft: boolean;
    needShowRight: boolean;
    start: {
        x: number;
        y: number;
    };
    move: {
        x: number;
        y: number;
    };
    end: {
        x: number;
        y: number;
    };
    get classes(): {
        wrap: string;
        cover: string;
        left: string;
        right: string;
        action: string;
        text: string;
        content: string;
    };
    updated(index: number): void;
    getContentEasing(value: number, limit: number): number;
    setStyle(value: number): void;
    updateBtns(): void;
    onTap(e: CustomEvent<{
        type: 'left' | 'right';
        index: number;
        value: ActionItem;
    }>): void;
    onAcitons(): void;
    onOpen(value: number, openedLeft: boolean, openedRight: boolean): void;
    onClose(): void;
    onOpenLeft(): void;
    onOpenRight(): void;
    onTouchStart(e: any): void;
    onTouchMove(e: any): void;
    onTouchEnd(e: any): void;
    noop(): void;
    mounted(): void;
}

export { SwipeAction };

/**
 * ActionItem接口定义
 */
export interface ActionItem {
    /**
     * text
     * @type {string}
     */
    text?: string;
    /**
     * style
     * @type {string}
     */
    style?: string;
    /**
     * className
     * @type {string}
     */
    className?: string;
    /**
     * key: string
     * @type {string]: unknown}
     */
    [key: string]: unknown;
}

/**
 * SwipeActionProps接口定义
 */
export interface SwipeActionProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 点击后是否自动关闭
     *
     * @type {boolean}
     */
    autoClose?: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 左侧操作项
     *
     * @type {ActionItem[]}
     */
    left?: ActionItem[];
    /**
     * 右侧操作项
     *
     * @type {ActionItem[]}
     */
    right?: ActionItem[];
    /**
     * 是否使用插槽渲染操作区
     *
     * @type {boolean}
     */
    useSlots?: boolean;
    /**
     * 附加数据
     *
     * @type {unknown}
     */
    data?: unknown;
}

/**
 * SwipeActionExpose接口定义
 */
export interface SwipeActionExpose {
}

/**
 * SwipeActionInstance类型定义
 */
export type SwipeActionInstance = ComponentPublicInstance<SwipeAction, SwipeActionProps, SwipeActionExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
