import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Divider extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Divider
     */
    prefixCls: string;
    /**
     * 文本位置
     *
     * @type {DividerPosition}
     * @memberof Divider
     */
    position: DividerPosition;
    /**
     * 是否虚线
     *
     * @type {boolean}
     * @memberof Divider
     */
    dashed: boolean;
    /**
     * 分割线文本
     *
     * @type {string}
     * @memberof Divider
     */
    text: string;
    /**
     * 是否显示文本
     *
     * @type {boolean}
     * @memberof Divider
     */
    showText: boolean;
    /**
     * 分割线方向
     *
     * @type {DividerDirection}
     * @memberof Divider
     */
    direction: DividerDirection;
    get classes(): {
        wrap: string;
        text: string;
    };
}

export { Divider };

/**
 * DividerPosition类型定义
 */
export type DividerPosition = 'left' | 'center' | 'right';

/**
 * DividerDirection类型定义
 */
export type DividerDirection = 'horizontal' | 'vertical';

/**
 * DividerProps接口定义
 */
export interface DividerProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 文本位置
     *
     * @type {DividerPosition}
     */
    position?: DividerPosition;
    /**
     * 是否虚线
     *
     * @type {boolean}
     */
    dashed?: boolean;
    /**
     * 分割线文本
     *
     * @type {string}
     */
    text?: string;
    /**
     * 是否显示文本
     *
     * @type {boolean}
     */
    showText?: boolean;
    /**
     * 分割线方向
     *
     * @type {DividerDirection}
     */
    direction?: DividerDirection;
}

/**
 * DividerExpose接口定义
 */
export interface DividerExpose {
}

/**
 * DividerInstance类型定义
 */
export type DividerInstance = ComponentPublicInstance<Divider, DividerProps, DividerExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
