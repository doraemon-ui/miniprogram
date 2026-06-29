import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared';

declare class CheckboxGroup extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    prefixCls: string;
    /**
     * `dora-list` 组件的类名前缀
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    cellGroupPrefixCls: string;
    /**
     * 当前选中的值（受控）
     *
     * @type {string[]}
     * @memberof CheckboxGroup
     */
    value: string[];
    /**
     * 表单字段名
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    name: string;
    /**
     * 标题
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    title: string;
    /**
     * 描述
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    label: string;
    /**
     * 选项列表（支持 slot 或 options 传入）
     *
     * @type {CheckboxGroupOption[]}
     * @memberof CheckboxGroup
     */
    options: CheckboxGroupOption[];
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    disabled: boolean;
    /**
     * 是否只读
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    readOnly: boolean;
    /**
     * list 组件的模式
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    mode: string;
    /**
     * 自定义 body 样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof CheckboxGroup
     */
    bodyStyle: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    hasLine: boolean;
    /**
     * 是否使用 `dora-list` 组件包裹
     *
     * @type {boolean}
     * @memberof CheckboxGroup
     */
    withListComponent: boolean;
    /**
     * 图标位置
     *
     * @type {CheckboxIconPosition}
     * @memberof CheckboxGroup
     */
    iconPosition: CheckboxIconPosition;
    /**
     * 图标大小
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    iconSize: string;
    /**
     * 选中图标
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    iconOn: string;
    /**
     * 未选中图标
     *
     * @type {string}
     * @memberof CheckboxGroup
     */
    iconOff: string;
    hasFieldDecorator: boolean;
    inputValue: string[];
    keys: CheckboxProps[];
    showOptions: NormalizedCheckboxGroupOption[];
    onValueChange(newVal: string[]): void;
    onOptionsChange(): void;
    onContextChange(): void;
    onChildrenChanged(): void;
    updated(inputValue: string[]): void;
    changeValue(props?: Partial<{
        value: string[];
    }>): void;
    onChange(item: CheckboxChangeItem): void;
    onCheckboxChange(e: CustomEvent<CheckboxChangeItem>): void;
    getValue(value?: string[], cols?: CheckboxProps[]): {
        value: string[];
        displayValue: string[];
        selectedIndex: number[];
        selectedValue: string[];
        cols: CheckboxProps[];
    };
    getBoundingClientRect(): Promise<MiniprogramDOMRect>;
    mounted(): void;
}

export { CheckboxGroup };

declare class Checkbox extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Checkbox
     */
    prefixCls: string;
    /**
     * `dora-list-item` 组件的类名前缀
     *
     * @type {string}
     * @memberof Checkbox
     */
    cellPrefixCls: string;
    /**
     * `dora-selectable` 组件的类名前缀
     *
     * @type {string}
     * @memberof Checkbox
     */
    selectablePrefixCls: string;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Checkbox
     */
    title: string;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Checkbox
     */
    label: string;
    /**
     * 额外信息（仅在 `withListComponent` 且 `iconPosition='left'` 时展示）
     *
     * @type {string}
     * @memberof Checkbox
     */
    extra: string;
    /**
     * 值
     *
     * @type {string}
     * @memberof Checkbox
     */
    value: string;
    /**
     * 是否选中（受控）
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    checked: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    disabled: boolean;
    /**
     * 是否只读
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    readOnly: boolean;
    /**
     * 选中颜色，支持预设色值或自定义色值
     *
     * @type {string}
     * @memberof Checkbox
     */
    color: string;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof Checkbox
     */
    wrapStyle: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    hasLine: boolean;
    inputChecked: boolean;
    index: number;
    isLast: boolean;
    context: CheckboxContext;
    get classes(): {
        cell: string;
        extra: string;
        iconPosition: string;
        iconSelectable: string;
        selectable: string;
        selectableH: string;
    };
    onCheckedChange(newVal: boolean): void;
    checkboxChange(e: CustomEvent<CheckboxChangeDetail>): void;
    changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: CheckboxContext): void;
    onChange(inputChecked: boolean): void;
    setChecked(inputChecked: boolean): void;
    check(): void;
    uncheck(): void;
    toggle(): void;
    mounted(): void;
}

export { Checkbox };

/**
 * CheckboxIconPosition类型定义
 */
export type CheckboxIconPosition = 'left' | 'right';

/**
 * CheckboxContext接口定义
 */
export interface CheckboxContext {
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
     * hasLine
     * @type {boolean}
     */
    hasLine?: boolean;
    /**
     * hasFieldDecorator
     * @type {boolean}
     */
    hasFieldDecorator?: boolean;
    /**
     * withListComponent
     * @type {boolean}
     */
    withListComponent?: boolean;
    /**
     * iconPosition
     * @type {CheckboxIconPosition}
     */
    iconPosition?: CheckboxIconPosition;
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
 * CheckboxProps接口定义
 */
export interface CheckboxProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * `dora-list-item` 组件的类名前缀
     *
     * @type {string}
     */
    cellPrefixCls?: string;
    /**
     * `dora-selectable` 组件的类名前缀
     *
     * @type {string}
     */
    selectablePrefixCls?: string;
    /**
     * 标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 描述
     *
     * @type {string}
     */
    label?: string;
    /**
     * 额外信息（仅在 `withListComponent` 且 `iconPosition='left'` 时展示）
     *
     * @type {string}
     */
    extra?: string;
    /**
     * 值
     *
     * @type {string}
     */
    value?: string;
    /**
     * 是否选中（受控）
     *
     * @type {boolean}
     */
    checked?: boolean;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否只读
     *
     * @type {boolean}
     */
    readOnly?: boolean;
    /**
     * 选中颜色，支持预设色值或自定义色值
     *
     * @type {string}
     */
    color?: string;
    /**
     * 自定义样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     */
    wrapStyle?: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     */
    hasLine?: boolean;
}

/**
 * CheckboxExpose接口定义
 */
export interface CheckboxExpose {
    /**
     * 值
     *
     * @type {string}
     */
    value?: string;
    /**
     * 更新内部值
     *
     * @return {void}
     */
    changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: CheckboxContext): void;
    /**
     * 设置选中状态
     *
     * @return {void}
     */
    setChecked(checked: boolean): void;
    /**
     * 选中
     *
     * @return {void}
     */
    check(): void;
    /**
     * 取消选中
     *
     * @return {void}
     */
    uncheck(): void;
    /**
     * 切换选中状态
     *
     * @return {void}
     */
    toggle(): void;
}

/**
 * CheckboxInternalMethods接口定义
 */
export interface CheckboxInternalMethods {
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * title
     * @type {string}
     */
    title: string;
    /**
     * $data
     * @type {CheckboxProps}
     */
    $data: CheckboxProps;
    changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: CheckboxContext): void;
}

/**
 * CheckboxInstance类型定义
 */
export type CheckboxInstance = ComponentPublicInstance<Checkbox, CheckboxProps, CheckboxExpose> & CheckboxInternalMethods;

/**
 * CheckboxGroupOption类型定义
 */
export type CheckboxGroupOption = string | CheckboxProps;

/**
 * NormalizedCheckboxGroupOption类型定义
 */
export type NormalizedCheckboxGroupOption = Exclude<CheckboxGroupOption, string> & {
    index: number;
    __comp_unique_key: string | number;
    title: string;
    value: string;
    __checked: boolean;
};

/**
 * CheckboxGroupProps接口定义
 */
export interface CheckboxGroupProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * `dora-list` 组件的类名前缀
     *
     * @type {string}
     */
    cellGroupPrefixCls?: string;
    /**
     * 当前选中的值（受控）
     *
     * @type {string[]}
     */
    value?: string[];
    /**
     * 表单字段名
     *
     * @type {string}
     */
    name?: string;
    /**
     * 标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 描述
     *
     * @type {string}
     */
    label?: string;
    /**
     * 选项列表（支持 slot 或 options 传入）
     *
     * @type {CheckboxGroupOption[]}
     */
    options?: CheckboxGroupOption[];
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否只读
     *
     * @type {boolean}
     */
    readOnly?: boolean;
    /**
     * list 组件的模式
     *
     * @type {string}
     */
    mode?: string;
    /**
     * 自定义 body 样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     */
    bodyStyle?: string | Partial<CSSStyleDeclaration>;
    /**
     * 是否有底部横线
     *
     * @type {boolean}
     */
    hasLine?: boolean;
    /**
     * 是否使用 `dora-list` 组件包裹
     *
     * @type {boolean}
     */
    withListComponent?: boolean;
    /**
     * 图标位置
     *
     * @type {CheckboxIconPosition}
     */
    iconPosition?: CheckboxIconPosition;
    /**
     * 图标大小
     *
     * @type {string}
     */
    iconSize?: string;
    /**
     * 选中图标
     *
     * @type {string}
     */
    iconOn?: string;
    /**
     * 未选中图标
     *
     * @type {string}
     */
    iconOff?: string;
}

/**
 * CheckboxGroupExpose接口定义
 */
export interface CheckboxGroupExpose {
    /**
     * 同步子组件状态
     *
     * @return {void}
     */
    changeValue(props?: Partial<{
        value: string[];
    }>): void;
    /**
     * 获取当前值
     *
     * @return {{ value: string[]; displayValue: string[]; selectedIndex: number[]; selectedValue: string[]; cols: CheckboxProps[] }}
     */
    getValue(
    /**
     * value
     * @type {string[]}
     */
    value?: string[], 
    /**
     * cols
     * @type {CheckboxProps[]}
     */
    cols?: CheckboxProps[]): {
        value: string[];
        displayValue: string[];
        selectedIndex: number[];
        selectedValue: string[];
        cols: CheckboxProps[];
    };
    /**
     * 组选项变化事件
     *
     * @return {void}
     */
    onChange(item: CheckboxChangeItem): void;
    /**
     * 获取组件尺寸
     *
     * @return {Promise<MiniprogramDOMRect>}
     */
    getBoundingClientRect(): Promise<MiniprogramDOMRect>;
}

/**
 * CheckboxGroupInternalMethods接口定义
 */
export interface CheckboxGroupInternalMethods {
    onChange(item: CheckboxChangeItem): void;
}

/**
 * CheckboxGroupInstance类型定义
 */
export type CheckboxGroupInstance = ComponentPublicInstance<CheckboxGroup, CheckboxGroupProps, CheckboxGroupExpose> & CheckboxGroupInternalMethods;

/**
 * CheckboxChangeItem接口定义
 */
export interface CheckboxChangeItem {
    /**
     * checked
     * @type {boolean}
     */
    checked: boolean;
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * index
     * @type {number}
     */
    index: number;
}

/**
 * CheckboxChangeDetail接口定义
 */
export interface CheckboxChangeDetail {
    /**
     * checked
     * @type {boolean}
     */
    checked: boolean;
    /**
     * value
     * @type {string}
     */
    value: string;
    /**
     * type
     * @type {string}
     */
    type: string;
}

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare const checkboxGroupProps: {
    prefixCls: {
        type: StringConstructor;
        default: string;
    };
    cellGroupPrefixCls: {
        type: StringConstructor;
        default: string;
    };
    value: {
        type: ArrayConstructor;
        default: () => any[];
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    options: {
        type: ArrayConstructor;
        default: () => any[];
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
    bodyStyle: {
        type: any;
        default: any;
    };
    hasLine: {
        type: BooleanConstructor;
        default: boolean;
    };
    withListComponent: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconPosition: {
        type: StringConstructor;
        default: string;
    };
    iconSize: {
        type: StringConstructor;
        default: string;
    };
    iconOn: {
        type: StringConstructor;
        default: string;
    };
    iconOff: {
        type: StringConstructor;
        default: string;
    };
};
