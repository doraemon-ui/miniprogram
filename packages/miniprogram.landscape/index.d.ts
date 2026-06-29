import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Landscape extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Landscape
     */
    prefixCls: string;
    /**
     * 是否显示
     *
     * @type {boolean}
     * @memberof Landscape
     */
    visible: boolean;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     * @memberof Landscape
     */
    mask: boolean;
    /**
     * 点击蒙层是否关闭
     *
     * @type {boolean}
     * @memberof Landscape
     */
    maskClosable: boolean;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     * @memberof Landscape
     */
    closable: boolean;
    showMask: boolean;
    get classes(): {
        wrap: string;
        inner: string;
        close: string;
        x: string;
    };
    get popupBodyStyle(): Partial<CSSStyleDeclaration>;
    onMaskChange(mask: boolean): void;
    onClose(): void;
    mounted(): void;
}

export { Landscape };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * LandscapeCloseDetail接口定义
 */
export interface LandscapeCloseDetail {
    /**
     * visible
     * @type {boolean}
     */
    visible: boolean;
}

/**
 * LandscapeProps接口定义
 */
export interface LandscapeProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 是否显示
     *
     * @type {boolean}
     */
    visible?: boolean;
    /**
     * 是否显示蒙层
     *
     * @type {boolean}
     */
    mask?: boolean;
    /**
     * 点击蒙层是否关闭
     *
     * @type {boolean}
     */
    maskClosable?: boolean;
    /**
     * 是否显示关闭按钮
     *
     * @type {boolean}
     */
    closable?: boolean;
}

/**
 * LandscapeExpose接口定义
 */
export interface LandscapeExpose {
}

/**
 * LandscapeInstance类型定义
 */
export type LandscapeInstance = ComponentPublicInstance<Landscape, LandscapeProps, LandscapeExpose>;
