import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Rater extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Rater
     */
    prefixCls: string;
    /**
     * 最大评分数
     *
     * @type {number}
     * @memberof Rater
     */
    max: number;
    /**
     * 图标
     *
     * @type {string}
     * @memberof Rater
     */
    icon: string;
    /**
     * 星字符
     *
     * @type {string}
     * @memberof Rater
     */
    star: string;
    /**
     * 默认值
     *
     * @type {number}
     * @memberof Rater
     */
    defaultValue: number;
    /**
     * 当前值
     *
     * @type {number}
     * @memberof Rater
     */
    value: number;
    /**
     * 激活颜色
     *
     * @type {string}
     * @memberof Rater
     */
    activeColor: string;
    /**
     * 间距
     *
     * @type {number}
     * @memberof Rater
     */
    margin: number;
    /**
     * 字号
     *
     * @type {number}
     * @memberof Rater
     */
    fontSize: number;
    /**
     * 是否禁用
     *
     * @type {boolean}
     * @memberof Rater
     */
    disabled: boolean;
    /**
     * 是否允许半星
     *
     * @type {boolean}
     * @memberof Rater
     */
    allowHalf: boolean;
    /**
     * 是否允许清空
     *
     * @type {boolean}
     * @memberof Rater
     */
    allowClear: boolean;
    /**
     * 是否允许滑动选择
     *
     * @type {boolean}
     * @memberof Rater
     */
    allowTouchMove: boolean;
    /**
     * 是否受控
     *
     * @type {boolean}
     * @memberof Rater
     */
    controlled: boolean;
    inputValue: number;
    hasFieldDecorator: boolean;
    stars: number[];
    colors: string[];
    cutIndex: number;
    cutPercent: number;
    get classes(): {
        wrap: string;
        star: string;
        box: string;
        inner: string;
        outer: string;
        icon: string;
    };
    onRecalc(): void;
    onValueChange(newVal: number): void;
    onMaxChange(): void;
    updated(v: number): void;
    setValue(value: number): void;
    updateHalfStarValue(index: number, x: number, cb: (v: number, i: number) => void): void;
    onTap(e: CustomEvent<{
        index: number;
    }>): void;
    onChange(value: number, index: number): void;
    onTouchMove(e: WechatMiniprogram.TouchEvent): void;
    mounted(): void;
}

export { Rater };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * RaterChangeDetail接口定义
 */
export interface RaterChangeDetail {
    /**
     * value
     * @type {number}
     */
    value: number;
    /**
     * index
     * @type {number}
     */
    index: number;
}

/**
 * RaterProps接口定义
 */
export interface RaterProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 最大评分数
     *
     * @type {number}
     */
    max?: number;
    /**
     * 图标
     *
     * @type {string}
     */
    icon?: string;
    /**
     * 星字符
     *
     * @type {string}
     */
    star?: string;
    /**
     * 默认值
     *
     * @type {number}
     */
    defaultValue?: number;
    /**
     * 当前值
     *
     * @type {number}
     */
    value?: number;
    /**
     * 激活颜色
     *
     * @type {string}
     */
    activeColor?: string;
    /**
     * 间距
     *
     * @type {number}
     */
    margin?: number;
    /**
     * 字号
     *
     * @type {number}
     */
    fontSize?: number;
    /**
     * 是否禁用
     *
     * @type {boolean}
     */
    disabled?: boolean;
    /**
     * 是否允许半星
     *
     * @type {boolean}
     */
    allowHalf?: boolean;
    /**
     * 是否允许清空
     *
     * @type {boolean}
     */
    allowClear?: boolean;
    /**
     * 是否允许滑动选择
     *
     * @type {boolean}
     */
    allowTouchMove?: boolean;
    /**
     * 是否受控
     *
     * @type {boolean}
     */
    controlled?: boolean;
}

/**
 * RaterExpose接口定义
 */
export interface RaterExpose {
}

/**
 * RaterInstance类型定义
 */
export type RaterInstance = ComponentPublicInstance<Rater, RaterProps, RaterExpose>;
