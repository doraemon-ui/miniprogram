import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

import type { PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class Tabbar extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Tabbar
     */
    prefixCls: string;
    /**
     * 默认激活项
     *
     * @type {string}
     * @memberof Tabbar
     */
    defaultCurrent: string;
    /**
     * 当前激活项
     *
     * @type {string}
     * @memberof Tabbar
     */
    current: string;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Tabbar
     */
    controlled: boolean;
    /**
     * 颜色
     *
     * @type {PresetColor}
     * @memberof Tabbar
     */
    color: PresetColor;
    /**
     * 背景色
     *
     * @type {string}
     * @memberof Tabbar
     */
    backgroundColor: string;
    /**
     * 位置
     *
     * @type {TabbarPosition}
     * @memberof Tabbar
     */
    position: TabbarPosition;
    /**
     * 安全区配置
     *
     * @type {TabbarSafeArea}
     * @memberof Tabbar
     */
    safeArea: TabbarSafeArea;
    tabbarStyle: string;
    activeKey: string;
    keys: TabbarKeyItem[];
    get classes(): {
        wrap: string;
        tabbar: string;
    };
    onCurrentChange(v: string): void;
    onBackgroundChange(v: string): void;
    onChildrenChanged(): void;
    updated(activeKey?: string): void;
    changeCurrent(activeKey: string): void;
    emitEvent(key: string): void;
    setActiveKey(activeKey: string): void;
    updateStyle(backgroundColor: string): void;
    mounted(): void;
}

export { Tabbar };

declare class TabbarItem extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof TabbarItem
     */
    prefixCls: string;
    /**
     * 唯一标识
     *
     * @type {string}
     * @memberof TabbarItem
     */
    key: string;
    /**
     * 标题
     *
     * @type {string}
     * @memberof TabbarItem
     */
    title: string;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof TabbarItem
     */
    disabled: boolean;
    width: string;
    current: boolean;
    index: string;
    color: string;
    get classes(): {
        wrap: string;
        icon: string;
        title: string;
    };
    changeCurrent(current: boolean, index: string, color: string, length: number): void;
    onTap(): void;
}

export { TabbarItem };

/**
 * TabbarPosition类型定义
 */
export type TabbarPosition = '' | 'top' | 'bottom';

/**
 * TabbarSafeArea类型定义
 */
export type TabbarSafeArea = boolean | string | Record<string, unknown>;

/**
 * TabbarKeyItem接口定义
 */
export interface TabbarKeyItem {
    /**
     * key
     * @type {string}
     */
    key: string;
    /**
     * title
     * @type {string}
     */
    title: string;
    /**
     * disabled
     * @type {boolean}
     */
    disabled: boolean;
}

/**
 * TabbarChangeDetail接口定义
 */
export interface TabbarChangeDetail {
    /**
     * key
     * @type {string}
     */
    key: string;
    /**
     * keys
     * @type {TabbarKeyItem[]}
     */
    keys: TabbarKeyItem[];
}

/**
 * TabbarProps接口定义
 */
export interface TabbarProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * defaultCurrent
     * @type {string}
     */
    defaultCurrent?: string;
    /**
     * current
     * @type {string}
     */
    current?: string;
    /**
     * controlled
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * color
     * @type {PresetColor}
     */
    color?: PresetColor;
    /**
     * backgroundColor
     * @type {string}
     */
    backgroundColor?: string;
    /**
     * position
     * @type {TabbarPosition}
     */
    position?: TabbarPosition;
    /**
     * safeArea
     * @type {TabbarSafeArea}
     */
    safeArea?: TabbarSafeArea;
}

/**
 * TabbarExpose接口定义
 */
export interface TabbarExpose {
    /**
     * 设置当前激活项
     *
     * @return {void}
     */
    setActiveKey(activeKey: string): void;
}

/**
 * TabbarItemProps接口定义
 */
export interface TabbarItemProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * key
     * @type {string}
     */
    key?: string;
    /**
     * title
     * @type {string}
     */
    title?: string;
    /**
     * disabled
     * @type {boolean}
     */
    disabled?: boolean;
}

/**
 * TabbarItemExpose接口定义
 */
export interface TabbarItemExpose {
    changeCurrent(current: boolean, index: string, color: PresetColor, length: number): void;
}

/**
 * TabbarItemInstance类型定义
 */
export type TabbarItemInstance = ComponentPublicInstance<TabbarItem, TabbarItemProps, TabbarItemExpose>;

/**
 * TabbarInstance类型定义
 */
export type TabbarInstance = ComponentPublicInstance<Tabbar, TabbarProps, TabbarExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
