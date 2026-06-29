import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class PopupSelect extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof PopupSelect
     */
    prefixCls: string;
    /**
     * 过渡的类名
     *
     * @type {string}
     * @memberof PopupSelect
     */
    classNames: string;
    /**
     * 是否虚拟列表
     *
     * @type {boolean}
     * @memberof PopupSelect
     */
    virtualized: boolean;
    /**
     * 空状态文案
     *
     * @type {unknown}
     * @memberof PopupSelect
     */
    notFoundContent: unknown;
    /**
     * 当前值
     *
     * @type {string | string[]}
     * @memberof PopupSelect
     */
    value: string | string[];
    /**
     * 选项数据
     *
     * @type {Array<string | Record<string, unknown>>}
     * @memberof PopupSelect
     */
    options: Array<string | Record<string, unknown>>;
    /**
     * 图标位置
     *
     * @type {string}
     * @memberof PopupSelect
     */
    iconPosition: string;
    /**
     * 是否多选
     *
     * @type {boolean}
     * @memberof PopupSelect
     */
    multiple: boolean;
    /**
     * 最大可选数
     *
     * @type {number}
     * @memberof PopupSelect
     */
    max: number;
    /**
     * 工具栏配置
     *
     * @type {PopupSelectToolbar}
     * @memberof PopupSelect
     */
    toolbar: PopupSelectToolbar;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof PopupSelect
     */
    visible: boolean;
    /**
     * 默认是否可见
     *
     * @type {boolean}
     * @memberof PopupSelect
     */
    defaultVisible: boolean;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof PopupSelect
     */
    controlled: boolean;
    mergedOptions: SelectOption[];
    mergedNotFoundContent: null | PopupSelectNotFoundContent;
    inputValue: string | string[];
    popupVisible: boolean;
    get classes(): {
        wrap: string;
        toolbar: string;
        inner: string;
        cancel: string;
        title: string;
        confirm: string;
        hover: string;
        list: string;
        option: string;
        optionDisabled: string;
        optionSelected: string;
        group: string;
        prompt: string;
    };
    onOptionsChange(options: Array<string | Record<string, unknown>>): void;
    onNotFoundContentChange(v: unknown): void;
    onVisibleChange(v: boolean): void;
    updated(v: boolean): void;
    open(): void;
    close(): void;
    onTrigger(): void;
    onShow(): void;
    onClosed(): void;
    onCancel(): void;
    formatPickerValue(value: string | string[]): {
        value: string | string[];
        options: SelectOption[];
    };
    onConfirm(): void;
    noop(): void;
    onOptionTap(e: CustomEvent<{
        value: string;
    }>): void;
    isSelected(v: string): boolean;
    mounted(): void;
}

export { PopupSelect };

/**
 * SelectOption接口定义
 */
export interface SelectOption {
    /**
     * title
     * @type {string}
     */
    title: string;
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * disabled
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * isGroup
     * @type {boolean}
     */
    isGroup?: boolean;
    /**
     * isGroupOption
     * @type {boolean}
     */
    isGroupOption?: boolean;
}

/**
 * PopupSelectToolbar接口定义
 */
export interface PopupSelectToolbar {
    /**
     * title
     * @type {string}
     */
    title?: string;
    /**
     * cancelText
     * @type {string}
     */
    cancelText?: string;
    /**
     * confirmText
     * @type {string}
     */
    confirmText?: string;
}

/**
 * PopupSelectNotFoundContent接口定义
 */
export interface PopupSelectNotFoundContent {
    /**
     * icon
     * @type {string}
     */
    icon: string;
    /**
     * title
     * @type {string}
     */
    title: string;
    /**
     * text
     * @type {string}
     */
    text: string;
}

/**
 * PopupSelectChangeDetail接口定义
 */
export interface PopupSelectChangeDetail {
    /**
     * visible
     * @type {boolean}
     */
    visible: boolean;
}

/**
 * PopupSelectValueDetail接口定义
 */
export interface PopupSelectValueDetail {
    /**
     * value
     * @type {string | string[]}
     */
    value: string | string[];
    /**
     * options
     * @type {SelectOption[]}
     */
    options: SelectOption[];
}

/**
 * PopupSelectProps接口定义
 */
export interface PopupSelectProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 过渡的类名
     *
     * @type {string}
     */
    classNames?: string;
    /**
     * 是否虚拟列表
     *
     * @type {boolean}
     */
    virtualized?: boolean;
    /**
     * 空状态文案
     *
     * @type {unknown}
     */
    notFoundContent?: unknown;
    /**
     * 当前值
     *
     * @type {string | string[]}
     */
    value?: string | string[];
    /**
     * 选项数据
     *
     * @type {Array<string | Record<string, unknown>>}
     */
    options?: Array<string | Record<string, unknown>>;
    /**
     * 图标位置
     *
     * @type {string}
     */
    iconPosition?: string;
    /**
     * 是否多选
     *
     * @type {boolean}
     */
    multiple?: boolean;
    /**
     * 最大可选数
     *
     * @type {number}
     */
    max?: number;
    /**
     * 工具栏配置
     *
     * @type {PopupSelectToolbar}
     */
    toolbar?: PopupSelectToolbar;
    /**
     * 是否可见
     *
     * @type {boolean}
     */
    visible?: boolean;
    /**
     * 默认是否可见
     *
     * @type {boolean}
     */
    defaultVisible?: boolean;
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
}

/**
 * PopupSelectExpose接口定义
 */
export interface PopupSelectExpose {
    /**
     * 打开组件
     *
     * @return {void}
     */
    open(): void;
    /**
     * 关闭组件
     *
     * @return {void}
     */
    close(): void;
}

/**
 * PopupSelectInstance类型定义
 */
export type PopupSelectInstance = ComponentPublicInstance<PopupSelect, PopupSelectProps, PopupSelectExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
