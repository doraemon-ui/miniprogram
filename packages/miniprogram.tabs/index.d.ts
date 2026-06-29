import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

import type { PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class Tabs extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Tabs
     */
    prefixCls: string;
    /**
     * 默认当前激活项
     *
     * @type {string}
     * @memberof Tabs
     */
    defaultCurrent: string;
    /**
     * 当前激活项
     *
     * @type {string}
     * @memberof Tabs
     */
    current: string;
    /**
     * 是否可滚动
     *
     * @type {boolean}
     * @memberof Tabs
     */
    scroll: boolean;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Tabs
     */
    controlled: boolean;
    /**
     * 主题
     *
     * @type {PresetColor}
     * @memberof Tabs
     */
    color: PresetColor;
    /**
     * 方向
     *
     * @type {TabsDirection}
     * @memberof Tabs
     */
    direction: TabsDirection;
    /**
     * 对齐方式
     *
     * @type {string}
     * @memberof Tabs
     */
    justify: string;
    /**
     * 激活线模式
     *
     * @type {ActiveLineMode}
     * @memberof Tabs
     */
    activeLineMode: ActiveLineMode;
    activeKey: string;
    keys: Array<{
        key: string;
        title: string;
        disabled: boolean;
    }>;
    scrollLeft: number;
    scrollTop: number;
    showPrevMask: boolean;
    showNextMask: boolean;
    scrollViewStyle: string;
    private updateMask?;
    onCurrentChange(newVal: string): void;
    onJustifyChange(newVal: string): void;
    get classes(): {
        wrap: string;
        scrollView: string;
        prev: string;
        next: string;
    };
    tabsContainerRef(): Promise<{
        containerWidth: number;
        containerHeight: number;
        containerScrollWidth: number;
        containerScrollHeight: number;
        containerScrollLeft: number;
        containerScrollTop: number;
        containerOffsetX: number;
        containerOffsetY: number;
    }>;
    onScrollFix(): void;
    setNextScroll(activeElement: TabInstance): Promise<void>;
    onChildrenChanged(): void;
    updated(value?: string): void;
    emitEvent(key: string): void;
    setActiveKey(activeKey: string): void;
    setStyles(justify: string): void;
    mounted(): void;
}

export { Tabs };

declare class Tab extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Tab
     */
    prefixCls: string;
    /**
     * 唯一标识
     *
     * @type {string}
     * @memberof Tab
     */
    key: string;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Tab
     */
    title: string;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Tab
     */
    disabled: boolean;
    current: boolean;
    context: TabContext;
    get classes(): {
        wrap: string;
        title: string;
        bar: string;
    };
    activeTabRef(): Promise<{
        activeTabLeft: number;
        activeTabWidth: number;
        activeTabTop: number;
        activeTabHeight: number;
    }>;
    changeCurrent({ current, context }: {
        current: boolean;
        context: TabContext;
    }): void;
    onTap(): void;
}

export { Tab };

/**
 * TabsDirection类型定义
 */
export type TabsDirection = 'horizontal' | 'vertical';

/**
 * ActiveLineMode类型定义
 */
export type ActiveLineMode = 'auto' | 'full';

/**
 * TabContext接口定义
 */
export interface TabContext {
    /**
     * scroll
     * @type {boolean}
     */
    scroll: boolean;
    /**
     * 主题
     * @type {PresetColor}
     */
    color: PresetColor;
    /**
     * direction
     * @type {TabsDirection}
     */
    direction: TabsDirection;
    /**
     * activeLineMode
     * @type {ActiveLineMode}
     */
    activeLineMode: ActiveLineMode;
}

/**
 * TabsKeyItem接口定义
 */
export interface TabsKeyItem {
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
 * TabsChangeDetail接口定义
 */
export interface TabsChangeDetail {
    /**
     * key
     * @type {string}
     */
    key: string;
    /**
     * keys
     * @type {TabsKeyItem[]}
     */
    keys: TabsKeyItem[];
}

/**
 * TabProps接口定义
 */
export interface TabProps {
    /**
     * prefixCls
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
 * TabExpose接口定义
 */
export interface TabExpose {
    /**
     * 获取激活项位置信息
     *
     * @return {Promise<{ activeTabLeft: number; activeTabWidth: number; activeTabTop: number; activeTabHeight: number }>}
     */
    activeTabRef: () => Promise<{
        activeTabLeft: number;
        activeTabWidth: number;
        activeTabTop: number;
        activeTabHeight: number;
    }>;
    /**
     * 更新激活状态
     *
     * @return {void}
     */
    changeCurrent: (payload: {
        current: boolean;
        context: TabContext;
    }) => void;
}

/**
 * TabInstance类型定义
 */
export type TabInstance = ComponentPublicInstance<Tab, TabProps, TabExpose>;

/**
 * TabsProps接口定义
 */
export interface TabsProps {
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
     * scroll
     * @type {boolean}
     */
    scroll?: boolean;
    /**
     * controlled
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 主题
     * @type {PresetColor}
     */
    color?: PresetColor;
    /**
     * direction
     * @type {TabsDirection}
     */
    direction?: TabsDirection;
    /**
     * justify
     * @type {string}
     */
    justify?: string;
    /**
     * activeLineMode
     * @type {ActiveLineMode}
     */
    activeLineMode?: ActiveLineMode;
}

/**
 * TabsExpose接口定义
 */
export interface TabsExpose {
    /**
     * 设置当前激活项
     *
     * @return {void}
     */
    setActiveKey(activeKey: string): void;
}

/**
 * TabsInstance类型定义
 */
export type TabsInstance = ComponentPublicInstance<Tabs, TabsProps, TabsExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare const tabsProps: {
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    defaultCurrent: {
        type: StringConstructor;
        default: string;
    };
    current: {
        type: StringConstructor;
        default: string;
    };
    scroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    controlled: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    justify: {
        type: StringConstructor;
        default: string;
    };
    activeLineMode: {
        type: StringConstructor;
        default: string;
    };
};
