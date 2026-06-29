import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Switch extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Switch
     */
    prefixCls: string;
    /**
     * 当前值
     *
     * @type {boolean}
     * @memberof Switch
     */
    value: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Switch
     */
    disabled: boolean;
    /**
     * 是否加载中
     *
     * @type {boolean}
     * @memberof Switch
     */
    loading: boolean;
    /**
     * 主题色
     *
     * @type {string}
     * @memberof Switch
     */
    color: string;
    /**
     * 选中文案
     *
     * @type {string}
     * @memberof Switch
     */
    checkedText: string;
    /**
     * 未选中文案
     *
     * @type {string}
     * @memberof Switch
     */
    uncheckedText: string;
    inputStyle: string;
    inputChecked: boolean;
    get classes(): {
        wrap: string;
        input: string;
        text: string;
        spin: string;
    };
    updated(inputChecked: boolean): void;
    onValueChange(v: boolean): void;
    onColorChange(c: string): void;
    onTap(_e: CustomEvent): void;
    mounted(): void;
}

export { Switch };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * SwitchProps接口定义
 */
export interface SwitchProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 当前值
     *
     * @type {boolean}
     */
    value?: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否加载中
     *
     * @type {boolean}
     */
    loading?: boolean;
    /**
     * 主题色
     *
     * @type {string}
     */
    color?: string;
    /**
     * 选中文案
     *
     * @type {string}
     */
    checkedText?: string;
    /**
     * 未选中文案
     *
     * @type {string}
     */
    uncheckedText?: string;
}

/**
 * SwitchExpose接口定义
 */
export interface SwitchExpose {
}

/**
 * SwitchInstance类型定义
 */
export type SwitchInstance = ComponentPublicInstance<Switch, SwitchProps, SwitchExpose>;
