import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Ellipsis extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Ellipsis
     */
    prefixCls: string;
    /**
     * 原始文本内容
     *
     * @type {string}
     * @memberof Ellipsis
     */
    content: string;
    /**
     * 省略方向：start | middle | end
     *
     * @type {EllipsisDirection}
     * @memberof Ellipsis
     */
    direction: EllipsisDirection;
    /**
     * 默认是否展开
     *
     * @type {boolean}
     * @memberof Ellipsis
     */
    defaultExpanded: boolean;
    /**
     * 展开按钮文本
     *
     * @type {string}
     * @memberof Ellipsis
     */
    expandText: string;
    /**
     * 收起按钮文本
     *
     * @type {string}
     * @memberof Ellipsis
     */
    collapseText: string;
    /**
     * 最大显示行数
     *
     * @type {number}
     * @memberof Ellipsis
     */
    rows: number;
    ellipsised: EllipsisTextRange;
    expanded: boolean;
    exceeded: boolean;
    innerText: string;
    end: number;
    containerStyle: string;
    get classes(): {
        wrap: string;
        container: string;
        expanded: string;
        collapsed: string;
    };
    onPropsChange(): void;
    /**
     * 点击组件
     */
    onTap(): void;
    /**
     * 展开/收起
     */
    setExpanded(e: CustomEvent<{}, {}, {
        expanded?: string | number;
    }>): void;
    /**
     * 计算省略文案
     * 注：按字符数近似计算，避免运行时测量抖动
     */
    calcEllipsised(): void;
    mounted(): void;
}

export { Ellipsis };

/**
 * EllipsisDirection类型定义
 */
export type EllipsisDirection = 'start' | 'middle' | 'end';

/**
 * EllipsisTextRange接口定义
 */
export interface EllipsisTextRange {
    /**
     * leading
     * @type {string}
     */
    leading: string;
    /**
     * tailing
     * @type {string}
     */
    tailing: string;
}

/**
 * EllipsisProps接口定义
 */
export interface EllipsisProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 原始文本内容
     *
     * @type {string}
     */
    content?: string;
    /**
     * 省略方向
     *
     * @type {EllipsisDirection}
     */
    direction?: EllipsisDirection;
    /**
     * 默认是否展开
     *
     * @type {boolean}
     */
    defaultExpanded?: boolean;
    /**
     * 展开按钮文本
     *
     * @type {string}
     */
    expandText?: string;
    /**
     * 收起按钮文本
     *
     * @type {string}
     */
    collapseText?: string;
    /**
     * 最大显示行数
     *
     * @type {number}
     */
    rows?: number;
}

/**
 * EllipsisExpose接口定义
 */
export interface EllipsisExpose {
}

/**
 * EllipsisInstance类型定义
 */
export type EllipsisInstance = ComponentPublicInstance<Ellipsis, EllipsisProps, EllipsisExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
