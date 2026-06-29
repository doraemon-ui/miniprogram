import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

export declare function getDefaultFieldNames(): CascaderFieldNames;

declare class Cascader extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Cascader
     */
    prefixCls: string;
    /**
     * 默认值（非受控）
     *
     * @type {string[]}
     * @memberof Cascader
     */
    defaultValue: CascaderValue;
    /**
     * 当前值（受控）
     *
     * @type {string[]}
     * @memberof Cascader
     */
    value: CascaderValue;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Cascader
     */
    controlled: boolean;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Cascader
     */
    title: string;
    /**
     * 取消按钮文字
     *
     * @type {string}
     * @memberof Cascader
     */
    cancelText: string;
    /**
     * 确定按钮文字
     *
     * @type {string}
     * @memberof Cascader
     */
    confirmText: string;
    /**
     * 级联选项
     *
     * @type {CascaderOption[]}
     * @memberof Cascader
     */
    options: CascaderOption[];
    /**
     * 是否占满宽度（双列布局变为单列）
     *
     * @type {boolean}
     * @memberof Cascader
     */
    full: boolean;
    /**
     * 自定义高度
     *
     * @type {(string | number)}
     * @memberof Cascader
     */
    height: string | number;
    /**
     * 未选择时的占位文案
     *
     * @type {string}
     * @memberof Cascader
     */
    chooseTitle: string;
    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof Cascader
     */
    visible: boolean;
    /**
     * 是否跳过动画
     *
     * @type {boolean}
     * @memberof Cascader
     */
    skipAnimation: boolean;
    /**
     * 自定义字段名映射（透传给 `dora-cascader-view`）
     *
     * @type {Partial<CascaderFieldNames>}
     * @memberof Cascader
     */
    defaultFieldNames: Partial<CascaderFieldNames>;
    shouldRender: boolean;
    innerValue: CascaderValue;
    activeValue: CascaderValue;
    cascaderView: CascaderViewPublicInstance | null;
    get classes(): {
        wrap: string;
        hd: string;
        bd: string;
        toolbar: string;
        inner: string;
        cancel: string;
        confirm: string;
        hover: string;
        title: string;
    };
    onValueChange(newVal: CascaderValue): void;
    onVisibleChange(shouldRender: boolean): void;
    setShouldRender(shouldRender: boolean): void;
    setActiveValue(activeValue: CascaderValue, forceTrigger?: boolean): void;
    setInnerValue(innerValue: CascaderValue): void;
    /**
     * 获取当前选择的值与选项信息
     */
    getValue(value?: CascaderValue): CascaderChangeDetail | null;
    /**
     * 切换面板的回调
     */
    onTabsChange(e: WechatMiniprogram.CustomEvent<{
        index: number;
    }>): void;
    /**
     * 叶子节点加载的回调
     */
    onLoadOptions(e: WechatMiniprogram.CustomEvent<{
        value: CascaderValue;
        options: CascaderOption[];
    }>): void;
    /**
     * 选项改变时触发
     */
    onChange(e: WechatMiniprogram.CustomEvent<CascaderChangeDetail>): void;
    /**
     * 组件关闭时的回调函数
     */
    close(): void;
    /**
     * 组件关闭时重置其内部数据
     */
    onClosed(): void;
    /**
     * 点击确定按钮时的回调函数
     */
    onConfirm(): void;
    /**
     * 点击取消按钮时的回调函数
     */
    onCancel(): void;
    /**
     * 阻止移动触摸
     */
    noop(): void;
    mounted(): void;
}

export { Cascader };

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
 * CascaderValue类型定义
 */
export type CascaderValue = string[];

/**
 * CascaderChangeDetail接口定义
 */
export interface CascaderChangeDetail {
    /**
     * value
     * @type {CascaderValue}
     */
    value: CascaderValue;
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
 * CascaderViewPublicInstance接口定义
 */
export interface CascaderViewPublicInstance {
    getValue: (activeValue?: CascaderValue) => CascaderChangeDetail;
}

/**
 * CascaderProps接口定义
 */
export interface CascaderProps {
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
    defaultValue?: CascaderValue;
    /**
     * 当前值（受控）
     *
     * @type {string[]}
     */
    value?: CascaderValue;
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
    /**
     * 标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 取消按钮文字
     *
     * @type {string}
     */
    cancelText?: string;
    /**
     * 确定按钮文字
     *
     * @type {string}
     */
    confirmText?: string;
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
     * 自定义高度
     *
     * @type {(string | number)}
     */
    height?: string | number;
    /**
     * 未选择时的占位文案
     *
     * @type {string}
     */
    chooseTitle?: string;
    /**
     * 是否显示
     *
     * @type {boolean}
     */
    visible?: boolean;
    /**
     * 是否跳过动画
     *
     * @type {boolean}
     */
    skipAnimation?: boolean;
    /**
     * 自定义字段名映射（透传给 `dora-cascader-view`）
     *
     * @type {Partial<CascaderFieldNames>}
     */
    defaultFieldNames?: Partial<CascaderFieldNames>;
}

/**
 * CascaderExpose接口定义
 */
export interface CascaderExpose {
    /**
     * 获取当前选择的值与选项信息
     *
     * @return {(CascaderChangeDetail | null)}
     */
    getValue(value?: CascaderValue): CascaderChangeDetail | null;
    /**
     * 组件关闭时的回调函数
     *
     * @return {void}
     */
    close(): void;
}

/**
 * CascaderInstance类型定义
 */
export type CascaderInstance = ComponentPublicInstance<Cascader, CascaderProps, CascaderExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
