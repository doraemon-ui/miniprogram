import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Selectable extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Selectable
     */
    prefixCls: string;
    type: SelectableType;
    value: string;
    defaultChecked: boolean;
    checked: boolean;
    disabled: boolean;
    readOnly: boolean;
    color: string;
    controlled: boolean;
    wrapStyle: string | Partial<CSSStyleDeclaration>;
    iconSize: string;
    iconOn: string;
    iconOff: string;
    inputChecked: boolean;
    inputColor: string;
    extStyle: string;
    innerIconSize: number;
    innerIconOn: string;
    innerIconOff: string;
    get classes(): {
        wrap: string;
        input: string;
        icon: string;
    };
    updated(inputChecked: boolean): void;
    updateTypeIcons(type: SelectableType, iconSize: string, iconOn: string, iconOff: string): void;
    onCheckedChange(newVal: boolean): void;
    onColorChange(newVal: string): void;
    onWrapStyleChange(newVal: string | Partial<CSSStyleDeclaration>): void;
    onIconPropsChange(): void;
    onChange(): void;
    mounted(): void;
}

export { Selectable };

/**
 * SelectableType类型定义
 */
export type SelectableType = 'checkbox' | 'radio';

/**
 * SelectableProps接口定义
 */
export interface SelectableProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * type
     * @type {SelectableType}
     */
    type?: SelectableType;
    /**
     * value
     * @type {string}
     */
    value?: string;
    /**
     * defaultChecked
     * @type {boolean}
     */
    defaultChecked?: boolean;
    /**
     * checked
     * @type {boolean}
     */
    checked?: boolean;
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
     * color
     * @type {string}
     */
    color?: string;
    /**
     * controlled
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * wrapStyle
     * @type {string | Partial<CSSStyleDeclaration>}
     */
    wrapStyle?: string | Partial<CSSStyleDeclaration>;
    /**
     * iconSize
     * @type {string}
     */
    iconSize?: string;
    /**
     * iconOn
     * @type {string}
     */
    iconOn?: string;
    /**
     * iconOff
     * @type {string}
     */
    iconOff?: string;
}

/**
 * SelectableExpose接口定义
 */
export interface SelectableExpose {
}

/**
 * SelectableInstance类型定义
 */
export type SelectableInstance = ComponentPublicInstance<Selectable, SelectableProps, SelectableExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
