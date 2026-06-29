import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Spin extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Spin
     */
    prefixCls: string;
    /**
     * 过渡的类名
     *
     * @type {string}
     * @memberof Spin
     */
    classNames: string;
    /**
     * 提示文案
     *
     * @type {string}
     * @memberof Spin
     */
    tip: string;
    /**
     * 尺寸
     *
     * @type {string}
     * @memberof Spin
     */
    size: string;
    /**
     * 是否加载中
     *
     * @type {boolean}
     * @memberof Spin
     */
    spinning: boolean;
    /**
     * 是否嵌套模式
     *
     * @type {boolean}
     * @memberof Spin
     */
    nested: boolean;
    /**
     * 加载器颜色
     *
     * @type {string}
     * @memberof Spin
     */
    spinColor: string;
    spinVisible: boolean;
    dotStyle: string;
    tipStyle: string;
    get classes(): {
        wrap: string;
        anim: string;
        dots: string;
        dot: string;
        tip: string;
        container: string;
    };
    onSpinningChange(v: boolean): void;
    setStyles(spinColor: string): void;
    mounted(): void;
}

export { Spin };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * SpinProps接口定义
 */
export interface SpinProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 过渡的类名
     *
     * @type {string}
     */
    classNames?: string;
    /**
     * 提示文案
     *
     * @type {string}
     */
    tip?: string;
    /**
     * 尺寸
     *
     * @type {string}
     */
    size?: string;
    /**
     * 是否加载中
     *
     * @type {boolean}
     */
    spinning?: boolean;
    /**
     * 是否嵌套模式
     *
     * @type {boolean}
     */
    nested?: boolean;
    /**
     * 加载器颜色
     *
     * @type {string}
     */
    spinColor?: string;
}

/**
 * SpinExpose接口定义
 */
export interface SpinExpose {
}

/**
 * SpinInstance类型定义
 */
export type SpinInstance = ComponentPublicInstance<Spin, SpinProps, SpinExpose>;
