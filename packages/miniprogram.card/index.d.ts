import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Card extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Card
     */
    prefixCls: string;
    /**
     * 点击态类名
     *
     * @type {string}
     * @memberof Card
     */
    hoverClass: string;
    /**
     * 是否显示边框
     *
     * @type {boolean}
     * @memberof Card
     */
    bordered: boolean;
    /**
     * 是否全宽
     *
     * @type {boolean}
     * @memberof Card
     */
    full: boolean;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Card
     */
    title: string;
    /**
     * 缩略图地址
     *
     * @type {string}
     * @memberof Card
     */
    thumb: string;
    /**
     * 缩略图样式
     *
     * @type {CardThumbStyle}
     * @memberof Card
     */
    thumbStyle: CardThumbStyle;
    /**
     * 右上角额外内容
     *
     * @type {string}
     * @memberof Card
     */
    extra: string;
    /**
     * 底部动作列表
     *
     * @type {CardAction[]}
     * @memberof Card
     */
    actions: CardAction[];
    disabled: boolean;
    extStyle: string;
    get classes(): {
        wrap: string;
        hover: string;
        hd: string;
        content: string;
        thumb: string;
        extra: string;
        bd: string;
        ft: string;
        actions: string;
        action: {
            wrap: string;
            hover: string;
        }[];
    };
    updateThumbStyle(newVal: CardThumbStyle): void;
    onThumbStyleChange(newVal: CardThumbStyle): void;
    onAction(e: CustomEvent<{}, {}, {
        index: number;
    }>): void;
    mounted(): void;
}

export { Card };

/**
 * CardActionType类型定义
 */
export type CardActionType = 'default' | 'primary' | 'warn';

/**
 * CardAction接口定义
 */
export interface CardAction {
    /**
     * 动作项文案
     *
     * @type {string}
     */
    text?: string;
    /**
     * 动作项类型
     *
     * @type {CardActionType}
     */
    type?: CardActionType;
    /**
     * 是否加粗
     *
     * @type {boolean}
     */
    bold?: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 自定义类名
     *
     * @type {string}
     */
    className?: string;
    /**
     * 自定义点击态类名
     *
     * @type {string}
     */
    hoverClass?: string;
}

/**
 * CardThumbStyle类型定义
 */
export type CardThumbStyle = string | Partial<CSSStyleDeclaration>;

/**
 * CardProps接口定义
 */
export interface CardProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 点击态类名
     *
     * @type {string}
     */
    hoverClass?: string;
    /**
     * 是否显示边框
     *
     * @type {boolean}
     */
    bordered?: boolean;
    /**
     * 是否全宽
     *
     * @type {boolean}
     */
    full?: boolean;
    /**
     * 标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 缩略图地址
     *
     * @type {string}
     */
    thumb?: string;
    /**
     * 缩略图样式
     *
     * @type {CardThumbStyle}
     */
    thumbStyle?: CardThumbStyle;
    /**
     * 右上角额外内容
     *
     * @type {string}
     */
    extra?: string;
    /**
     * 底部动作列表
     *
     * @type {CardAction[]}
     */
    actions?: CardAction[];
}

/**
 * CardExpose接口定义
 */
export interface CardExpose {
}

/**
 * CardInstance类型定义
 */
export type CardInstance = ComponentPublicInstance<Card, CardProps, CardExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
