import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

import type { PresetColor } from '@doraemon-ui/miniprogram.shared';

declare class Alert extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Alert
     */
    prefixCls: string;
    /**
     * 过渡的类名
     *
     * @type {string}
     * @memberof Alert
     */
    classNames: string;
    /**
     * 颜色
     *
     * @type {PresetColor}
     * @memberof Alert
     */
    color: PresetColor;
    /**
     * 缩略图
     *
     * @type {string}
     * @memberof Alert
     */
    thumb: string;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Alert
     */
    title: string;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Alert
     */
    label: string;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     * @memberof Alert
     */
    closable: boolean;
    /**
     * 是否可见
     */
    visible: boolean;
    get classes(): {
        wrap: string;
        hd: string;
        thumb: string;
        bd: string;
        text: string;
        desc: string;
        ft: string;
        closable: string;
    };
    /**
     * 关闭时触发的回调函数
     */
    onClose(): void;
    /**
     * 点击事件
     */
    onClick(): void;
}

export { Alert };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * AlertProps接口定义
 */
export interface AlertProps {
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
     * 主题色
     *
     * @type {PresetColor}
     */
    color?: PresetColor;
    /**
     * 缩略图
     *
     * @type {string}
     */
    thumb?: string;
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
     * 是否显示关闭按钮
     *
     * @type {boolean}
     */
    closable?: boolean;
}

/**
 * AlertExpose接口定义
 */
export interface AlertExpose {
}

/**
 * AlertInstance类型定义
 */
export type AlertInstance = ComponentPublicInstance<Alert, AlertProps, AlertExpose>;
