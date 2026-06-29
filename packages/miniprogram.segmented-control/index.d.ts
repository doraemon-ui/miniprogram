import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

import type { PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class SegmentedControl extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof SegmentedControl
     */
    prefixCls: string;
    /**
     * 主题
     *
     * @type {PresetColor}
     * @memberof SegmentedControl
     */
    color: PresetColor;
    /**
     * 默认选中项
     *
     * @type {number}
     * @memberof SegmentedControl
     */
    defaultCurrent: number;
    /**
     * 当前选中项
     *
     * @type {number}
     * @memberof SegmentedControl
     */
    current: number;
    /**
     * 选项列表
     *
     * @type {string[]}
     * @memberof SegmentedControl
     */
    values: string[];
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof SegmentedControl
     */
    disabled: boolean;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof SegmentedControl
     */
    controlled: boolean;
    activeKey: number;
    get classes(): {
        wrap: string;
        item: string;
    };
    onCurrentChange(v: number): void;
    onTap(e: CustomEvent<{
        index: number;
    }>): void;
    emitEvent(key: number): void;
    setActiveKey(activeKey: number): void;
    mounted(): void;
}

export { SegmentedControl };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * SegmentedControlChangeDetail接口定义
 */
export interface SegmentedControlChangeDetail {
    /**
     * key
     * @type {number}
     */
    key: number;
    /**
     * values
     * @type {string[]}
     */
    values: string[];
}

/**
 * SegmentedControlProps接口定义
 */
export interface SegmentedControlProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 主题
     *
     * @type {PresetColor}
     */
    color?: PresetColor;
    /**
     * 默认选中项
     *
     * @type {number}
     */
    defaultCurrent?: number;
    /**
     * 当前选中项
     *
     * @type {number}
     */
    current?: number;
    /**
     * 选项列表
     *
     * @type {string[]}
     */
    values?: string[];
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
}

/**
 * SegmentedControlExpose接口定义
 */
export interface SegmentedControlExpose {
}

/**
 * SegmentedControlInstance类型定义
 */
export type SegmentedControlInstance = ComponentPublicInstance<SegmentedControl, SegmentedControlProps, SegmentedControlExpose>;
