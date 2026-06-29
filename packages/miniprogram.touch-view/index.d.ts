import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class TouchView extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof TouchView
     */
    prefixCls: string;
    /**
     * 点击态类名
     *
     * @type {string}
     * @memberof TouchView
     */
    hoverClass: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     *
     * @type {boolean}
     * @memberof TouchView
     */
    hoverStopPropagation: boolean;
    /**
     * 按住后多久出现点击态，单位毫秒
     *
     * @type {number}
     * @memberof TouchView
     */
    hoverStartTime: number;
    /**
     * 手指松开后点击态保留时间，单位毫秒
     *
     * @type {number}
     * @memberof TouchView
     */
    hoverStayTime: number;
    /**
     * 外层样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     * @memberof TouchView
     */
    wrapStyle: string | Partial<CSSStyleDeclaration>;
    extStyle: string;
    get classes(): {
        wrap: string;
        hover: string;
    };
    onWrapStyleChange(v: string | Partial<CSSStyleDeclaration>): void;
    onClick(): void;
    mounted(): void;
}

export { TouchView };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

/**
 * TouchViewProps接口定义
 */
export interface TouchViewProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 点击态类名
     *
     * @type {string}
     */
    hoverClass?: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     *
     * @type {boolean}
     */
    hoverStopPropagation?: boolean;
    /**
     * 按住后多久出现点击态，单位毫秒
     *
     * @type {number}
     */
    hoverStartTime?: number;
    /**
     * 手指松开后点击态保留时间，单位毫秒
     *
     * @type {number}
     */
    hoverStayTime?: number;
    /**
     * 外层样式
     *
     * @type {(string | Partial<CSSStyleDeclaration>)}
     */
    wrapStyle?: string | Partial<CSSStyleDeclaration>;
}

/**
 * TouchViewExpose接口定义
 */
export interface TouchViewExpose {
}

/**
 * TouchViewInstance类型定义
 */
export type TouchViewInstance = ComponentPublicInstance<TouchView, TouchViewProps, TouchViewExpose>;
