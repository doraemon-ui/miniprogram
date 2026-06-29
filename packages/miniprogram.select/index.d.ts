import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Select extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Select
     */
    prefixCls: string;
    /**
     * 当前值
     *
     * @type {(string | string[])}
     * @memberof Select
     */
    value: string | string[];
    /**
     * 选项数据
     *
     * @type {PopupOption[]}
     * @memberof Select
     */
    options: PopupOption[];
    /**
     * 是否多选
     *
     * @type {boolean}
     * @memberof Select
     */
    multiple: boolean;
    /**
     * 最大可选数
     *
     * @type {number}
     * @memberof Select
     */
    max: number;
    /**
     * 空状态文案
     *
     * @type {unknown}
     * @memberof Select
     */
    notFoundContent: unknown;
    /**
     * 是否虚拟列表
     *
     * @type {boolean}
     * @memberof Select
     */
    virtualized: boolean;
    /**
     * 工具栏配置
     *
     * @type {SelectToolbar}
     * @memberof Select
     */
    toolbar: SelectToolbar;
    visible: boolean;
    selectValue: string | string[];
    selectOptions: PopupOption[];
    selectMultiple: boolean;
    selectMax: number;
    selectNotFoundContent: unknown;
    selectVirtualized: boolean;
    selectToolbar: SelectToolbar;
    fns: Partial<Pick<OpenOptions, 'onChange' | 'onConfirm' | 'onCancel'>>;
    open(opts?: OpenOptions): void;
    close(callback?: () => void): void;
    runCallbacks(method: 'onChange' | 'onConfirm' | 'onCancel', detail: {
        value: string | string[];
    }): void;
    onConfirm(e: CustomEvent<{
        value: string | string[];
    }>): void;
    onCancel(e: CustomEvent<{
        value: string | string[];
    }>): void;
    onValueChange(e: CustomEvent<{
        value: string | string[];
    }>): void;
    onVisibleChange(e: CustomEvent<{
        visible: boolean;
    }>): void;
    mounted(): void;
}

export { Select };

/**
 * PopupOption类型定义
 */
export type PopupOption = string | {
    title?: string;
    label?: string;
    value?: string;
    key?: string;
    disabled?: boolean;
    options?: PopupOption[];
};

/**
 * FlattenOption接口定义
 */
export interface FlattenOption {
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
     * isGroup
     * @type {boolean}
     */
    isGroup?: boolean;
}

/**
 * SelectToolbar接口定义
 */
export interface SelectToolbar {
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
 * OpenOptions接口定义
 */
export interface OpenOptions {
    /**
     * prefixCls
     * @type {string}
     */
    prefixCls?: string;
    /**
     * value
     * @type {string | string[]}
     */
    value?: string | string[];
    /**
     * options
     * @type {PopupOption[]}
     */
    options?: PopupOption[];
    /**
     * multiple
     * @type {boolean}
     */
    multiple?: boolean;
    /**
     * max
     * @type {number | string}
     */
    max?: number | string;
    /**
     * notFoundContent
     * @type {unknown}
     */
    notFoundContent?: unknown;
    /**
     * virtualized
     * @type {boolean}
     */
    virtualized?: boolean;
    /**
     * toolbar
     * @type {SelectToolbar}
     */
    toolbar?: SelectToolbar;
    onChange?: (value: string | string[], index: number | number[], options: FlattenOption[]) => void;
    onConfirm?: (value: string | string[], index: number | number[], options: FlattenOption[]) => void;
    onCancel?: (value: string | string[], index: number | number[], options: FlattenOption[]) => void;
}

/**
 * SelectProps接口定义
 */
export interface SelectProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 当前值
     *
     * @type {(string | string[])}
     */
    value?: string | string[];
    /**
     * 选项数据
     *
     * @type {PopupOption[]}
     */
    options?: PopupOption[];
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
     * 空状态文案
     *
     * @type {unknown}
     */
    notFoundContent?: unknown;
    /**
     * 是否虚拟列表
     *
     * @type {boolean}
     */
    virtualized?: boolean;
    /**
     * 工具栏配置
     *
     * @type {SelectToolbar}
     */
    toolbar?: SelectToolbar;
}

/**
 * SelectExpose接口定义
 */
export interface SelectExpose {
    /**
     * 打开选择器
     *
     * @return {void}
     */
    open(opts?: OpenOptions): void;
    /**
     * 关闭选择器
     *
     * @return {void}
     */
    close(callback?: () => void): void;
}

/**
 * SelectInstance类型定义
 */
export type SelectInstance = ComponentPublicInstance<Select, SelectProps, SelectExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
