import type { DefaultButtonHandle, MiniprogramPublicInstance, NativeButtonEvent, NativeButtonHandle, NativeButtonProps } from '@doraemon-ui/miniprogram.shared';

import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

export type { ActionSheetButton, ActionSheetShowOptions, ActionSheetShowProps, NativeButtonEvent, NativeButtonHandle };

declare function clear(): void;

declare function show(props?: ActionSheetShowProps, options?: ActionSheetShowOptions): () => void;

declare function show(props?: ActionSheetShowProps, selector?: string, instance?: MiniprogramPublicInstance): () => void;

export { show, clear };

declare class ActionSheet extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof ActionSheet
     */
    prefixCls: string;
    /**
     * 主题风格
     *
     * @type {('ios' | 'wx')}
     * @default 'ios'
     * @memberof ActionSheet
     */
    theme: 'ios' | 'wx';
    /**
     * 标题文本
     *
     * @type {string}
     * @default ''
     * @memberof ActionSheet
     */
    titleText: string;
    /**
     * 操作按钮列表
     *
     * @type {ActionSheetButton[]}
     * @default []
     * @memberof ActionSheet
     */
    buttons: ActionSheetButton[];
    /**
     * 取消按钮文本
     *
     * @type {string}
     * @default '取消'
     * @memberof ActionSheet
     */
    cancelText: string;
    /**
     * 删除按钮文本
     *
     * @type {string}
     * @default ''
     * @memberof ActionSheet
     */
    destructiveText: string;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @default false
     * @memberof ActionSheet
     */
    visible: boolean;
    /**
     * 计算动作面板的 CSS 类名
     *
     * @readonly
     * @memberof ActionSheet
     */
    get classes(): {
        wrap: string;
        popup: string;
        content: string;
        options: string;
        title: string;
        button: {
            wrap: string;
            hover: string;
        }[];
        icon: string;
        text: string;
        destructive: string;
        group: string;
        cancel: string;
        hover: string;
    };
    popupVisible: boolean;
    /**
     * 监听 visible 属性变化
     *
     * @param {boolean} visible
     * @memberof ActionSheet
     */
    onVisibleChange(visible: boolean): void;
    setPopupVisible(popupVisible: boolean): void;
    onPopupClose(): void;
    onPopupClosed(): void;
    onClose(): void;
    onCancel(): void;
    mounted(): void;
    onAction(e: CustomEvent, method: keyof NativeButtonHandle<ActionSheetButton>, closable?: boolean): Promise<void>;
    /**
     * 按钮点击事件
     *
     * @memberof ActionSheet
     */
    onClick(e: CustomEvent): Promise<void>;
    /**
     * 删除按钮点击事件
     *
     * @memberof ActionSheet
     */
    onDestructiveClick(): void;
    onGetUserInfo(e: CustomEvent): Promise<void>;
    onContact(e: CustomEvent): Promise<void>;
    onGetPhoneNumber(e: CustomEvent): Promise<void>;
    onLaunchApp(e: CustomEvent): Promise<void>;
    onError(e: CustomEvent): Promise<void>;
    onOpenSetting(e: CustomEvent): Promise<void>;
    onChooseAvatar(e: CustomEvent): Promise<void>;
    onCreateLiveActivity(e: CustomEvent): Promise<void>;
    onGetRealtimePhoneNumber(e: CustomEvent): Promise<void>;
    onAgreePrivacyAuthorization(e: CustomEvent): Promise<void>;
}

export { ActionSheet };

export type { DefaultButtonHandle, NativeButtonHandle, NativeButtonEvent };

/**
 * 操作按钮的类型
 */
export type ActionSheetButton = Omit<NativeButtonProps, 'size' | 'type' | 'plain' | 'loading'> & {
    /**
     * 按钮文本
     */
    text?: string;
    /**
     * 按钮图标
     */
    icon?: string;
    /**
     * 类名
     */
    className?: string;
} & NativeButtonHandle<ActionSheetButton>;

/**
 * 动作面板对应参数的类型
 */
export interface ActionSheetProps {
    /**
     * 自定义类名前缀
     */
    prefixCls?: string;
    /**
     * 主题风格
     */
    theme?: 'ios' | 'wx';
    /**
     * 标题文本
     */
    titleText?: string;
    /**
     * 操作按钮列表
     */
    buttons?: ActionSheetButton[];
    /**
     * 取消按钮文本
     */
    cancelText?: string;
    /**
     * 删除按钮文本
     */
    destructiveText?: string;
    /**
     * 是否可见
     */
    visible?: boolean;
}

/**
 * 动作面板的选项
 */
export interface ActionSheetShowOptions {
    /**
     * 组件的选择器
     */
    selector?: string;
    /**
     * 页面的实例
     */
    instance?: MiniprogramPublicInstance;
}

/**
 * show 方法对应参数的类型
 */
export interface ActionSheetShowProps extends Omit<ActionSheetProps, 'visible'> {
    /**
     * 按钮点击的回调函数
     */
    onAction?: (detail: {
        method: string;
        button: ActionSheetButton;
        index: number;
        detail?: any;
    }) => void;
    /**
     * 取消按钮点击的回调函数
     */
    onCancel?: () => void;
    /**
     * 删除按钮点击的回调函数
     */
    onDestructive?: () => void;
    /**
     * 关闭的回调函数
     */
    onClose?: () => void;
    /**
     * 关闭后的回调函数
     */
    onClosed?: () => void;
}

/**
 * ActionSheetExpose接口定义
 */
export interface ActionSheetExpose {
}

/**
 * ActionSheetInternalMethods接口定义
 */
export interface ActionSheetInternalMethods {
    onClose: () => void;
    onCancel: () => void;
    onPopupClosed: () => void;
    onDestructiveClick: () => void;
}

/**
 * ActionSheetInstance类型定义
 */
export type ActionSheetInstance = ComponentPublicInstance<ActionSheet, ActionSheetProps, ActionSheetExpose> & ActionSheetInternalMethods;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
