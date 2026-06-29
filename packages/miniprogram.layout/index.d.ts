import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Row extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Row
     */
    prefixCls: string;
    /**
     * 栅格间隔（px）
     *
     * @type {number}
     * @memberof Row
     */
    gutter: number;
    rowStyle: string;
    get classes(): {
        wrap: string;
    };
    onGutterChange(newVal: number): void;
    updateStyle(gutter?: number): void;
    mounted(): void;
}

export { Row };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

declare class Col extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Col
     */
    prefixCls: string;
    /**
     * 栅格占位格数
     *
     * @type {number}
     * @memberof Col
     */
    span: number;
    /**
     * 栅格左侧偏移格数
     *
     * @type {number}
     * @memberof Col
     */
    offset: number;
    /**
     * 栅格向右移动格数（pull）
     *
     * @type {number}
     * @memberof Col
     */
    pull: number;
    /**
     * 栅格向左移动格数（push）
     *
     * @type {number}
     * @memberof Col
     */
    push: number;
    colStyle: string;
    get classes(): {
        wrap: string;
    };
}

export { Col };

/**
 * RowProps接口定义
 */
export interface RowProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 栅格间隔（px）
     *
     * @type {number}
     */
    gutter?: number;
}

/**
 * RowExpose接口定义
 */
export interface RowExpose {
}

/**
 * RowInstance类型定义
 */
export type RowInstance = ComponentPublicInstance<Row, RowProps, RowExpose>;
