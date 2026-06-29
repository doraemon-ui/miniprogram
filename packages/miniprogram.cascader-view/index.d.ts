import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

export declare function getDefaultFieldNames(): CascaderFieldNames;

export declare function setFieldNames(fieldNames?: Partial<CascaderFieldNames>): CascaderFieldNames;

declare class CascaderView extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof CascaderView
     */
    prefixCls: string;
    /**
     * 默认值（非受控）
     *
     * @type {string[]}
     * @memberof CascaderView
     */
    defaultValue: CascaderViewValue;
    /**
     * 当前值（受控）
     *
     * @type {string[]}
     * @memberof CascaderView
     */
    value: CascaderViewValue;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof CascaderView
     */
    controlled: boolean;
    /**
     * 级联选项
     *
     * @type {CascaderOption[]}
     * @memberof CascaderView
     */
    options: CascaderOption[];
    /**
     * 是否占满宽度（双列布局变为单列）
     *
     * @type {boolean}
     * @memberof CascaderView
     */
    full: boolean;
    /**
     * 占位文案
     *
     * @type {string}
     * @memberof CascaderView
     */
    placeholder: string;
    /**
     * 自定义高度
     *
     * @type {(string | number)}
     * @memberof CascaderView
     */
    height: string | number;
    /**
     * 是否跳过动画
     *
     * @type {boolean}
     * @memberof CascaderView
     */
    skipAnimation: boolean;
    /**
     * 自定义字段名映射
     *
     * @type {Partial<CascaderFieldNames>}
     * @memberof CascaderView
     */
    defaultFieldNames: Partial<CascaderFieldNames>;
    useFieldNames: boolean;
    fieldNames: CascaderFieldNames;
    activeOptions: CascaderOption[];
    activeIndex: number;
    bodyStyle: string;
    activeValue: CascaderViewValue;
    showOptions: CascaderOption[][];
    scrollViewStyle: string;
    get classes(): {
        wrap: string;
        hd: string;
        bd: string;
        innerScroll: string;
        scrollView: string;
        ft: string;
    };
    getFieldNames(): CascaderFieldNames;
    getFieldName(name: keyof CascaderFieldNames): string;
    onValueChange(newVal: CascaderViewValue): void;
    onOptionsChange(): void;
    onHeightChange(newVal: string | number): void;
    onDefaultFieldNamesChange(newVal: Partial<CascaderFieldNames>): void;
    getActiveOptions(activeValue: CascaderViewValue): CascaderOption[];
    getShowOptions(activeValue: CascaderViewValue): {
        __comp_unique_key: string | number;
        isLeaf?: boolean;
    }[][];
    getMenus(activeValue: CascaderViewValue, hasChildren: boolean): CascaderOption[];
    getNextActiveValue(value: string, optionIndex: number): CascaderViewValue;
    updated(currentOptions: CascaderOption, optionIndex: number, condition: boolean, callback?: (o: CascaderOption, v: CascaderViewValue) => void): void;
    /**
     * 更新级联数据
     *
     * @param {string[]} activeValue 当前选中值
     * @memberof CascaderView
     */
    getCurrentOptions(activeValue?: CascaderViewValue): void;
    setCascaderView(props: {
        activeValue?: CascaderViewValue;
        activeOptions?: CascaderOption[];
        activeIndex?: number;
        showOptions?: CascaderOption[][];
        bodyStyle?: string;
    }): void;
    getTransform(index: number, animating?: boolean): string;
    /**
     * 点击菜单时的回调函数
     */
    onTabsChange(e: WechatMiniprogram.CustomEvent<{
        key: string;
    }>): void;
    /**
     * 点击选项时的回调函数
     */
    onItemSelect(e: WechatMiniprogram.CustomEvent<{
        index: number;
    }>): void;
    /**
     * 选择完成时的回调函数
     */
    onChange(currentOptions?: CascaderOption, activeValue?: CascaderViewValue): void;
    getValue(activeValue?: CascaderViewValue): CascaderViewChangeDetail;
    updateStyle(height: string | number): void;
    mounted(): void;
}

export { CascaderView };

/**
 * CascaderFieldNames接口定义
 */
export interface CascaderFieldNames {
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
     * children
     * @type {string}
     */
    children: string;
    /**
     * disabled
     * @type {string}
     */
    disabled: string;
}

/**
 * CascaderOption接口定义
 */
export interface CascaderOption {
    /**
     * key: string
     * @type {string]: unknown}
     */
    [key: string]: unknown;
    /**
     * isLeaf
     * @type {boolean}
     */
    isLeaf?: boolean;
}

/**
 * CascaderViewValue类型定义
 */
export type CascaderViewValue = string[];

/**
 * CascaderViewChangeDetail接口定义
 */
export interface CascaderViewChangeDetail {
    /**
     * value
     * @type {string[]}
     */
    value: string[];
    /**
     * options
     * @type {CascaderOption[]}
     */
    options: CascaderOption[];
    /**
     * done
     * @type {boolean}
     */
    done: boolean;
}

/**
 * CascaderViewItemDataset接口定义
 */
export interface CascaderViewItemDataset {
    /**
     * optionIndex
     * @type {(string | number)}
     */
    optionIndex: string | number;
}

/**
 * CascaderViewProps接口定义
 */
export interface CascaderViewProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 默认值（非受控）
     *
     * @type {string[]}
     */
    defaultValue?: CascaderViewValue;
    /**
     * 当前值（受控）
     *
     * @type {string[]}
     */
    value?: CascaderViewValue;
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 级联选项
     *
     * @type {CascaderOption[]}
     */
    options?: CascaderOption[];
    /**
     * 是否占满宽度（双列布局变为单列）
     *
     * @type {boolean}
     */
    full?: boolean;
    /**
     * 占位文案
     *
     * @type {string}
     */
    placeholder?: string;
    /**
     * 自定义高度
     *
     * @type {(string | number)}
     */
    height?: string | number;
    /**
     * 是否跳过动画
     *
     * @type {boolean}
     */
    skipAnimation?: boolean;
    /**
     * 自定义字段名映射
     *
     * @type {Partial<CascaderFieldNames>}
     */
    defaultFieldNames?: Partial<CascaderFieldNames>;
}

/**
 * CascaderViewExpose接口定义
 */
export interface CascaderViewExpose {
    /**
     * 获取当前选中值
     *
     * @return {CascaderViewChangeDetail}
     */
    getValue(activeValue?: CascaderViewValue): CascaderViewChangeDetail;
    /**
     * 更新级联数据
     *
     * @return {void}
     */
    getCurrentOptions(activeValue?: CascaderViewValue): void;
}

/**
 * CascaderViewInstance类型定义
 */
export type CascaderViewInstance = ComponentPublicInstance<CascaderView, CascaderViewProps, CascaderViewExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
