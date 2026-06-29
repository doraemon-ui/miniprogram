import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class NoticeBar extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof NoticeBar
     */
    prefixCls: string;
    /**
     * 左侧图标
     *
     * @type {string}
     * @memberof NoticeBar
     */
    icon: string;
    /**
     * 通知内容
     *
     * @type {string}
     * @memberof NoticeBar
     */
    content: string;
    /**
     * 模式
     *
     * @type {NoticeBarMode}
     * @memberof NoticeBar
     */
    mode: NoticeBarMode;
    /**
     * 操作图标
     *
     * @type {string}
     * @memberof NoticeBar
     */
    action: string;
    /**
     * 是否循环滚动
     *
     * @type {boolean}
     * @memberof NoticeBar
     */
    loop: boolean;
    /**
     * 首次滚动延迟（ms）
     *
     * @type {number}
     * @memberof NoticeBar
     */
    leading: number;
    /**
     * 每轮滚动后停顿（ms）
     *
     * @type {number}
     * @memberof NoticeBar
     */
    trailing: number;
    /**
     * 滚动速度（ms）
     *
     * @type {number}
     * @memberof NoticeBar
     */
    speed: number;
    animatedWidth: number;
    overflowWidth: number;
    visible: boolean;
    marqueeTimer: ReturnType<typeof setTimeout> | null;
    get classes(): {
        wrap: string;
        hd: string;
        icon: string;
        bd: string;
        container: string;
        marquee: string;
        ft: string;
        action: string;
    };
    onContentChange(): void;
    clearMarqueeTimer(): void;
    startAnimation(): void;
    initAnimation(isForce?: boolean): void;
    resetAnimation(): void;
    stopAnimation(): void;
    onAction(): void;
    onClick(): void;
    mounted(): void;
    destroyed(): void;
}

export { NoticeBar };

/**
 * NoticeBarMode类型定义
 */
export type NoticeBarMode = '' | 'link' | 'closable';

/**
 * NoticeBarClickDetail接口定义
 */
export interface NoticeBarClickDetail {
}

/**
 * NoticeBarProps接口定义
 */
export interface NoticeBarProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 左侧图标
     *
     * @type {string}
     */
    icon?: string;
    /**
     * 通知内容
     *
     * @type {string}
     */
    content?: string;
    /**
     * 模式
     *
     * @type {NoticeBarMode}
     */
    mode?: NoticeBarMode;
    /**
     * 操作图标
     *
     * @type {string}
     */
    action?: string;
    /**
     * 是否循环滚动
     *
     * @type {boolean}
     */
    loop?: boolean;
    /**
     * 首次滚动延迟（ms）
     *
     * @type {number}
     */
    leading?: number;
    /**
     * 每轮滚动后停顿（ms）
     *
     * @type {number}
     */
    trailing?: number;
    /**
     * 滚动速度（ms）
     *
     * @type {number}
     */
    speed?: number;
}

/**
 * NoticeBarExpose接口定义
 */
export interface NoticeBarExpose {
    /**
     * 重置动画
     *
     * @return {void}
     */
    resetAnimation(): void;
    /**
     * 停止动画
     *
     * @return {void}
     */
    stopAnimation(): void;
}

/**
 * NoticeBarInstance类型定义
 */
export type NoticeBarInstance = ComponentPublicInstance<NoticeBar, NoticeBarProps, NoticeBarExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
