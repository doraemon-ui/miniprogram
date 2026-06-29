import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Icon extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Icon
     */
    prefixCls: string;
    /**
     * 是否隐藏
     *
     * @type {boolean}
     * @memberof Icon
     */
    hidden: boolean;
    /**
     * 图标类型
     *
     * @type {string}
     * @memberof Icon
     */
    type: string;
    /**
     * 图标尺寸
     *
     * @type {(string | number)}
     * @memberof Icon
     */
    size: string | number;
    /**
     * 图标颜色
     *
     * @type {string}
     * @memberof Icon
     */
    color: string;
    get classes(): {
        wrap: string;
    };
    get containerStyle(): string;
    onClick(): void;
}

export { Icon };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * IconProps接口定义
 */
export interface IconProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 是否隐藏
     *
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * 图标类型
     *
     * @type {string}
     */
    type?: string;
    /**
     * 图标尺寸
     *
     * @type {(string | number)}
     */
    size?: string | number;
    /**
     * 图标颜色
     *
     * @type {string}
     */
    color?: string;
}

/**
 * IconExpose接口定义
 */
export interface IconExpose {
}

/**
 * IconInstance类型定义
 */
export type IconInstance = ComponentPublicInstance<Icon, IconProps, IconExpose>;
