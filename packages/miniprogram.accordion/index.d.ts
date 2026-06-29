import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Accordion extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Accordion
     */
    prefixCls: string;
    /**
     * 默认激活 tab 面板的 key，当 `controlled` 为 `false` 时才生效
     *
     * @type {string[]}
     * @memberof Accordion
     */
    defaultCurrent: string[];
    /**
     * 用于手动激活 tab 面板的 key，当 `controlled` 为 `true` 时才生效
     *
     * @type {string[]}
     * @memberof Accordion
     */
    current: string[];
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Accordion
     */
    controlled: boolean;
    /**
     * 是否手风琴模式
     *
     * @type {boolean}
     * @memberof Accordion
     */
    accordion: boolean;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Accordion
     */
    title: string;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Accordion
     */
    label: string;
    get classes(): {
        wrap: string;
        hd: string;
        bd: string;
        ft: string;
    };
    activeKey: string[];
    keys: Record<string, any>[];
    watchCurrent(newVal: string[]): void;
    updated(activeKey?: string[]): void;
    updateCurrentAndIndex(activeKey: string[]): void;
    setActiveKey(activeKey: string[]): {
        key: string | string[];
        keys: Record<string, any>[];
    };
    onClickItem(key: string): void;
    onChildrenChanged(): void;
    mounted(): void;
}

export { Accordion };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

declare class AccordionPanel extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof AccordionPanel
     */
    prefixCls: string;
    /**
     * 当前激活 tab 索引
     *
     * @type {string}
     * @memberof AccordionPanel
     */
    key: string;
    /**
     * 左侧缩略图
     *
     * @type {string}
     * @memberof AccordionPanel
     */
    thumb: string;
    /**
     * 左侧标题
     *
     * @type {string}
     * @memberof AccordionPanel
     */
    title: string;
    /**
     * 面板内容
     *
     * @type {string}
     * @memberof AccordionPanel
     */
    content: string;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof AccordionPanel
     */
    disabled: boolean;
    /**
     * 是否显示箭头图标
     *
     * @type {boolean}
     * @memberof AccordionPanel
     */
    showArrow: boolean;
    get classes(): {
        wrap: string;
        hd: string;
        thumb: string;
        title: string;
        arrow: string;
        bd: string;
        content: string;
    };
    /**
     * 是否激动当前面板
     *
     * @type {boolean}
     * @memberof AccordionPanel
     */
    current: boolean;
    /**
     * 对应 Key 值。如果没有设置 key，默认取 index 索引值
     *
     * @type {string}
     * @memberof AccordionPanel
     */
    index: string;
    updateCurrentAndIndex(current: boolean, index: string): void;
    onClick(): void;
}

export { AccordionPanel };

/**
 * AccordionProps接口定义
 */
export interface AccordionProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 默认激活 tab 面板的 key，当 `controlled` 为 `false` 时才生效
     *
     * @type {string[]}
     */
    defaultCurrent?: string[];
    /**
     * 用于手动激活 tab 面板的 key，当 `controlled` 为 `true` 时才生效
     *
     * @type {string[]}
     */
    current?: string[];
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 是否手风琴模式
     *
     * @type {boolean}
     */
    accordion?: boolean;
    /**
     * 标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 描述
     *
     * @type {string}
     */
    label?: string;
}

/**
 * AccordionExpose接口定义
 */
export interface AccordionExpose {
    /**
     * 点击面板项
     *
     * @return {void}
     */
    onClickItem(key: string): void;
}

/**
 * AccordionInstance类型定义
 */
export type AccordionInstance = ComponentPublicInstance<Accordion, AccordionProps, AccordionExpose>;

/**
 * AccordionPanelProps接口定义
 */
export interface AccordionPanelProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 当前激活 tab 索引
     *
     * @type {string}
     */
    key?: string;
    /**
     * 左侧缩略图
     *
     * @type {string}
     */
    thumb?: string;
    /**
     * 左侧标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 面板内容
     *
     * @type {string}
     */
    content?: string;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否显示箭头图标
     *
     * @type {boolean}
     */
    showArrow?: boolean;
}

/**
 * AccordionPanelExpose接口定义
 */
export interface AccordionPanelExpose {
    /**
     * 更新激活状态与索引
     *
     * @return {void}
     */
    updateCurrentAndIndex(current: boolean, index: string): void;
}

/**
 * PanelInstance类型定义
 */
export type PanelInstance = ComponentPublicInstance<AccordionPanel, AccordionPanelProps, AccordionPanelExpose>;
