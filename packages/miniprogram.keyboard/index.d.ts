import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Keyboard extends Doraemon {
    prefixCls: string;
    className: string;
    titleText: string;
    cancelText: string;
    inputText: string;
    showCancel: boolean;
    disorder: boolean;
    password: boolean;
    maxlength: number;
    closeOnReject: boolean;
    value: string;
    keys: number[];
    nums: number[][];
    'in': boolean;
    fns: Required<Pick<KeyboardShowOptions, 'onChange' | 'callback'>> & {
        onClose?: (value: string) => unknown;
    };
    get classes(): {
        wrap: string;
        hd: string;
        bd: string;
        label: string;
        password: string;
        input: string;
        ft: string;
        title: string;
        numbers: string;
        number: string;
        text: string;
        hover: string;
    };
    hide(): void;
    show(opts?: KeyboardShowOptions): any;
    increase(e: WechatMiniprogram.BaseEvent<{
        value?: number | string;
    }>): void;
    decrease(): void;
    updateValue(value?: string): void;
}

export { Keyboard };

export declare const $wuxKeyBoard: (selector?: string, context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>) => {
    show: (opts?: KeyboardShowOptions) => () => void;
    hide: () => void;
};

/**
 * KeyboardShowOptions接口定义
 */
export interface KeyboardShowOptions {
    /**
     * prefixCls
     * @type {string}
     */
    prefixCls?: string;
    /**
     * className
     * @type {string}
     */
    className?: string;
    /**
     * titleText
     * @type {string}
     */
    titleText?: string;
    /**
     * cancelText
     * @type {string}
     */
    cancelText?: string;
    /**
     * inputText
     * @type {string}
     */
    inputText?: string;
    /**
     * showCancel
     * @type {boolean}
     */
    showCancel?: boolean;
    /**
     * disorder
     * @type {boolean}
     */
    disorder?: boolean;
    /**
     * password
     * @type {boolean}
     */
    password?: boolean;
    /**
     * maxlength
     * @type {number}
     */
    maxlength?: number;
    /**
     * closeOnReject
     * @type {boolean}
     */
    closeOnReject?: boolean;
    onChange?: (value: string) => void;
    callback?: (value: string) => unknown;
    onClose?: (value: string) => unknown;
}

/**
 * KeyboardProps接口定义
 */
export interface KeyboardProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
}

/**
 * KeyboardExpose接口定义
 */
export interface KeyboardExpose {
    /**
     * 显示键盘
     *
     * @return {(() => void)}
     */
    show(opts?: KeyboardShowOptions): () => void;
    /**
     * 隐藏键盘
     *
     * @return {void}
     */
    hide(): void;
}

/**
 * KeyboardInstance类型定义
 */
export type KeyboardInstance = ComponentPublicInstance<Keyboard, KeyboardProps, KeyboardExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
