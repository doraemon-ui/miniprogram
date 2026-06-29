import type { DefaultButtonHandle, MiniprogramPublicInstance, NativeButtonEvent, NativeButtonHandle, NativeButtonProps, PresetColor } from '@doraemon-ui/miniprogram.shared';

import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

export type { DialogAlertProps, DialogButton, DialogConfirmProps, DialogProps, DialogShowOptions, DialogShowProps, NativeButtonEvent, NativeButtonHandle, };

declare function clear(): void;

declare function show(props?: DialogShowProps, options?: DialogShowOptions): () => void;

declare function show(props?: DialogShowProps, selector?: string, instance?: MiniprogramPublicInstance): () => void;

declare function alert(props?: DialogAlertProps, options?: DialogShowOptions): Promise<void>;

declare function alert(props?: DialogAlertProps, selector?: string, instance?: MiniprogramPublicInstance): Promise<void>;

declare function confirm(props?: DialogConfirmProps, options?: DialogShowOptions): Promise<boolean>;

declare function confirm(props?: DialogConfirmProps, selector?: string, instance?: MiniprogramPublicInstance): Promise<boolean>;

export { show, alert, confirm, clear };

declare class Dialog extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Dialog
     */
    prefixCls: string;
    /**
     * 弹窗对应的自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof Dialog
     */
    bodyStyle: Partial<CSSStyleDeclaration>;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Dialog
     */
    mask: boolean;
    /**
     * 点击蒙层是否允许关闭
     *
     * @type {boolean}
     * @memberof Dialog
     */
    maskClosable: boolean;
    /**
     * 是否可见
     *
     * @type {boolean}
     * @memberof Dialog
     */
    visible: boolean;
    /**
     * 设置蒙层的 z-index
     *
     * @type {number}
     * @memberof Dialog
     */
    zIndex: number;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     * @memberof Dialog
     */
    closable: boolean;
    /**
     * 点击操作按钮后后是否关闭
     *
     * @type {boolean}
     * @memberof Dialog
     */
    buttonClosable: boolean;
    /**
     * 是否显示垂直按钮布局
     *
     * @type {boolean}
     * @memberof Dialog
     */
    verticalButtons: boolean;
    /**
     * 图片
     *
     * @type {string}
     * @memberof Dialog
     */
    image: string;
    /**
     * 提示标题
     *
     * @type {string}
     * @memberof Dialog
     */
    title: string;
    /**
     * 提示文本
     *
     * @type {string}
     * @memberof Dialog
     */
    content: string;
    /**
     * 操作按钮列表
     *
     * @type {DialogButton[]}
     * @memberof Dialog
     */
    buttons: DialogButton[];
    get classes(): {
        wrap: string;
        hd: string;
        title: string;
        content: string;
        bd: string;
        ft: string;
        close: string;
        image: string;
        img: string;
        x: string;
        buttons: string;
        button: {
            wrap: string;
            hover: string;
        }[];
    };
    popupVisible: boolean;
    onVisibleChange(visible: boolean): void;
    setPopupVisible(popupVisible: boolean): void;
    onPopupClose(): void;
    onPopupClosed(): void;
    onClose(): void;
    onClosed(): void;
    mounted(): void;
    onAction(e: CustomEvent, method: keyof NativeButtonHandle<DialogButton>, closable?: boolean): Promise<void>;
    onClick(e: CustomEvent): Promise<void>;
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

export { Dialog };

export type { NativeButtonHandle, NativeButtonEvent };

/**
 * 操作按钮的类型
 */
export type DialogButton = Omit<NativeButtonProps, 'size' | 'type' | 'plain' | 'loading'> & {
    /**
     * 标题
     */
    text?: string;
    /**
     * 按钮类型
     */
    type?: PresetColor;
    /**
     * 是否文字加粗
     */
    bold?: boolean;
    /**
     * 类名
     */
    className?: string;
} & NativeButtonHandle<DialogButton>;

/**
 * 对话框对应参数的类型
 */
export interface DialogProps {
    /**
     * 自定义类名前缀
     */
    prefixCls?: string;
    /**
     * 弹窗对应的自定义样式
     */
    bodyStyle?: Partial<CSSStyleDeclaration>;
    /**
     * 是否显示蒙层
     */
    mask?: boolean;
    /**
     * 点击蒙层是否允许关闭
     */
    maskClosable?: boolean;
    /**
     * 是否可见
     */
    visible?: boolean;
    /**
     * 设置蒙层的 z-index
     */
    zIndex?: number;
    /**
     * 是否显示关闭按钮
     */
    closable?: boolean;
    /**
     * 点击操作按钮后后是否关闭
     */
    buttonClosable?: boolean;
    /**
     * 是否显示垂直按钮布局
     */
    verticalButtons?: boolean;
    /**
     * 图片
     */
    image?: string;
    /**
     * 标题
     */
    title?: string;
    /**
     * 内容
     */
    content?: string;
    /**
     * 操作按钮列表
     */
    buttons?: DialogButton[];
}

/**
 * 对话框的参数
 */
export interface DialogShowOptions {
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
export interface DialogShowProps extends Omit<DialogProps, 'visible'> {
    /**
     * 点击关闭按钮或蒙层的回调函数
     */
    onClose?: () => void;
    /**
     * 关闭后的回调函数
     */
    onClosed?: () => void;
}

/**
 * alert 方法对应参数的类型
 */
export interface DialogAlertProps extends Omit<DialogShowProps, 'buttonClosable' | 'buttons'> {
    /**
     * 确定按钮的文字
     */
    confirmText?: string;
    /**
     * 确定按钮的类型
     */
    confirmType?: PresetColor;
    /**
     * 确定按钮的点击事件
     */
    onConfirm?: DefaultButtonHandle<DialogButton>;
}

/**
 * confirm 方法对应参数的类型
 */
export interface DialogConfirmProps extends DialogAlertProps {
    /**
     * 取消按钮的文字
     */
    cancelText?: string;
    /**
     * 取消按钮的类型
     */
    cancelType?: PresetColor;
    /**
     * 取消按钮的点击事件
     */
    onCancel?: DefaultButtonHandle<DialogButton>;
}

/**
 * DialogExpose接口定义
 */
export interface DialogExpose {
    visible?: boolean;
    onClose: () => void;
    onClosed: () => void;
}

/**
 * DialogInstance类型定义
 */
export type DialogInstance = ComponentPublicInstance<Dialog, DialogProps, DialogExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
