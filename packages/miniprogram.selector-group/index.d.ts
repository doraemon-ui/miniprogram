import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class SelectorGroup extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof SelectorGroup
     */
    prefixCls: string;
    /**
     * 颜色
     *
     * @type {PresetColor}
     * @memberof SelectorGroup
     */
    color: PresetColor;
    /**
     * 形状
     *
     * @type {string}
     * @memberof SelectorGroup
     */
    shape: string;
    /**
     * 列数
     *
     * @type {number}
     * @memberof SelectorGroup
     */
    columns: number;
    /**
     * 间距
     *
     * @type {number}
     * @memberof SelectorGroup
     */
    gap: number;
    /**
     * 选项列表
     *
     * @type {(string | Record<string, unknown>)[]}
     * @memberof SelectorGroup
     */
    options: (string | Record<string, unknown>)[];
    /**
     * 默认值
     *
     * @type {string[]}
     * @memberof SelectorGroup
     */
    defaultValue: string[];
    /**
     * 当前值
     *
     * @type {string[]}
     * @memberof SelectorGroup
     */
    value: string[];
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof SelectorGroup
     */
    controlled: boolean;
    /**
     * 是否多选
     *
     * @type {boolean}
     * @memberof SelectorGroup
     */
    multiple: boolean;
    /**
     * 是否展示勾选图标
     *
     * @type {boolean}
     * @memberof SelectorGroup
     */
    showCheckMark: boolean;
    /**
     * 字段映射
     *
     * @type {SelectorFieldNames}
     * @memberof SelectorGroup
     */
    defaultFieldNames: SelectorFieldNames;
    extStyle: string;
    inputValue: string[];
    get classes(): {
        wrap: string;
        grid: string;
        gridItem: string;
        desc: string;
        checkMark: string;
        checkMarkIcon: string;
        selectable: string;
    };
    get optionsView(): {
        label: string;
        value: string;
        disabled: boolean;
        desc: string;
        checked: boolean;
    }[];
    onValueChange(v: string[]): void;
    onStyleDepsChange(): void;
    updated(inputValue: string[]): void;
    updateStyle(columns: number, gap: number): void;
    getValue(value?: string[]): {
        value: string[];
        displayValue: string[];
        selectedIndex: number[];
        selectedValue: string[];
        cols: {
            label: string;
            value: string;
            disabled: boolean;
            desc: string;
            checked: boolean;
        }[];
    };
    onCheckboxChange(e: CustomEvent<{
        value: string;
        checked: boolean;
    }>): void;
    mounted(): void;
}

export { SelectorGroup };

/**
 * SelectorFieldNames接口定义
 */
export interface SelectorFieldNames {
    /**
     * label
     * @type {string}
     */
    label?: string;
    /**
     * value
     * @type {string}
     */
    value?: string;
    /**
     * disabled
     * @type {string}
     */
    disabled?: string;
}

/**
 * SelectorOptionView接口定义
 */
export interface SelectorOptionView {
    /**
     * label
     * @type {string}
     */
    label: string;
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * disabled
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * desc
     * @type {string}
     */
    desc: string;
    /**
     * checked
     * @type {boolean}
     */
    checked: boolean;
}

/**
 * SelectorGroupValueDetail接口定义
 */
export interface SelectorGroupValueDetail {
    /**
     * value
     * @type {string[]}
     */
    value: string[];
    /**
     * displayValue
     * @type {string[]}
     */
    displayValue: string[];
    /**
     * selectedIndex
     * @type {number[]}
     */
    selectedIndex: number[];
    /**
     * selectedValue
     * @type {string[]}
     */
    selectedValue: string[];
    /**
     * cols
     * @type {SelectorOptionView[]}
     */
    cols: SelectorOptionView[];
}

/**
 * SelectorGroupProps接口定义
 */
export interface SelectorGroupProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 颜色
     *
     * @type {PresetColor}
     */
    color?: PresetColor;
    /**
     * 形状
     *
     * @type {string}
     */
    shape?: string;
    /**
     * 列数
     *
     * @type {number}
     */
    columns?: number;
    /**
     * 间距
     *
     * @type {number}
     */
    gap?: number;
    /**
     * 选项列表
     *
     * @type {(string | Record<string, unknown>)[]}
     */
    options?: (string | Record<string, unknown>)[];
    /**
     * 默认值
     *
     * @type {string[]}
     */
    defaultValue?: string[];
    /**
     * 当前值
     *
     * @type {string[]}
     */
    value?: string[];
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 是否多选
     *
     * @type {boolean}
     */
    multiple?: boolean;
    /**
     * 是否展示勾选图标
     *
     * @type {boolean}
     */
    showCheckMark?: boolean;
    /**
     * 字段映射
     *
     * @type {SelectorFieldNames}
     */
    defaultFieldNames?: SelectorFieldNames;
}

/**
 * SelectorGroupExpose接口定义
 */
export interface SelectorGroupExpose {
}

/**
 * SelectorGroupInstance类型定义
 */
export type SelectorGroupInstance = ComponentPublicInstance<SelectorGroup, SelectorGroupProps, SelectorGroupExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
