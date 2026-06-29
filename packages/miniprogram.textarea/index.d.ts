import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Textarea extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Textarea
     */
    prefixCls: string;
    /**
     * 标签
     *
     * @type {string}
     * @memberof Textarea
     */
    label: string;
    /**
     * 额外文案
     *
     * @type {string}
     * @memberof Textarea
     */
    extra: string;
    /**
     * 默认值
     *
     * @type {string}
     * @memberof Textarea
     */
    defaultValue: string;
    /**
     * 当前值
     *
     * @type {string}
     * @memberof Textarea
     */
    value: string;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Textarea
     */
    controlled: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Textarea
     */
    disabled: boolean;
    /**
     * 是否只读
     *
     * @type {boolean}
     * @memberof Textarea
     */
    readOnly: boolean;
    /**
     * 行数
     *
     * @type {number}
     * @memberof Textarea
     */
    rows: number;
    /**
     * 是否显示字数统计
     *
     * @type {boolean}
     * @memberof Textarea
     */
    hasCount: boolean;
    /**
     * 是否显示清空按钮
     *
     * @type {boolean}
     * @memberof Textarea
     */
    clear: boolean;
    /**
     * 是否错误态
     *
     * @type {boolean}
     * @memberof Textarea
     */
    error: boolean;
    /**
     * 占位样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof Textarea
     */
    placeholderStyle: string | Partial<CSSStyleDeclaration>;
    inputValue: string;
    inputFocus: boolean;
    inputRows: number;
    inputHeight: number | '';
    internalPlaceholderStyle: string;
    private timeout;
    get classes(): {
        wrap: string;
        label: string;
        control: string;
        item: string;
        clear: string;
        error: string;
        extra: string;
        count: string;
        current: string;
        keyboardAccessory: string;
    };
    onValueChange(v: string): void;
    onRowsChange(v: number): void;
    onPlaceholderStyleChange(v: string | Partial<CSSStyleDeclaration>): void;
    setInternalPlaceholderStyle(placeholderStyle: string | Partial<CSSStyleDeclaration>): void;
    updateHeight(val?: number): Promise<void>;
    updated(inputValue: string): void;
    onChange(e: CustomEvent<{
        value: string;
    }>): void;
    onFocus(e: CustomEvent<{
        value?: string;
    }>): void;
    onBlur(e: CustomEvent<{
        value?: string;
    }>): void;
    onConfirm(e: CustomEvent): void;
    onKeyboardHeightChange(e: CustomEvent): void;
    onClear(): void;
    onError(): void;
    onLineChange(e: CustomEvent): void;
    setTimer(): void;
    clearTimer(): void;
    mounted(): void;
}

export { Textarea };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare const nativeTextareaProps: {
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    placeholderStyle: {
        type: any;
        default: string;
    };
    placeholderClass: {
        type: StringConstructor;
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    autoHeight: {
        type: BooleanConstructor;
        default: boolean;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    cursorSpacing: {
        type: NumberConstructor;
        default: number;
    };
    focus: {
        type: BooleanConstructor;
        default: boolean;
    };
    cursor: {
        type: NumberConstructor;
        default: number;
    };
    showConfirmBar: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectionStart: {
        type: NumberConstructor;
        default: number;
    };
    selectionEnd: {
        type: NumberConstructor;
        default: number;
    };
    adjustPosition: {
        type: BooleanConstructor;
        default: boolean;
    };
    holdKeyboard: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableDefaultPadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    confirmType: {
        type: StringConstructor;
        default: string;
    };
    confirmHold: {
        type: BooleanConstructor;
        default: boolean;
    };
};

/**
 * TextareaProps接口定义
 */
export interface TextareaProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * label
     * @type {string}
     */
    label?: string;
    /**
     * extra
     * @type {string}
     */
    extra?: string;
    /**
     * defaultValue
     * @type {string}
     */
    defaultValue?: string;
    /**
     * value
     * @type {string}
     */
    value?: string;
    /**
     * controlled
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * disabled
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * readOnly
     * @type {boolean}
     */
    readOnly?: boolean;
    /**
     * rows
     * @type {number}
     */
    rows?: number;
    /**
     * hasCount
     * @type {boolean}
     */
    hasCount?: boolean;
    /**
     * clear
     * @type {boolean}
     */
    clear?: boolean;
    /**
     * error
     * @type {boolean}
     */
    error?: boolean;
    /**
     * placeholderStyle
     * @type {string | Partial<CSSStyleDeclaration>}
     */
    placeholderStyle?: string | Partial<CSSStyleDeclaration>;
}

/**
 * TextareaExpose接口定义
 */
export interface TextareaExpose {
}

/**
 * TextareaInstance类型定义
 */
export type TextareaInstance = ComponentPublicInstance<Textarea, TextareaProps, TextareaExpose>;
