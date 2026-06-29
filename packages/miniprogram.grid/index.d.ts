import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Grid extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Grid
     */
    prefixCls: string;
    /**
     * 列数
     *
     * @type {number}
     * @memberof Grid
     */
    col: number;
    /**
     * 是否有边框
     *
     * @type {boolean}
     * @memberof Grid
     */
    bordered: boolean;
    /**
     * 每个格子是否固定为正方形
     *
     * @type {boolean}
     * @memberof Grid
     */
    square: boolean;
    get classes(): {
        wrap: string;
    };
    onPropsChange(): void;
    changeCurrent(): void;
    onChildrenChanged(): void;
}

export { Grid };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

declare class GridItem extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof GridItem
     */
    prefixCls: string;
    /**
     * 自定义点击态类名
     *
     * @type {string}
     * @memberof GridItem
     */
    hoverClass: string;
    /**
     * 缩略图
     *
     * @type {string}
     * @memberof GridItem
     */
    thumb: string;
    /**
     * 描述信息
     *
     * @type {string}
     * @memberof GridItem
     */
    label: string;
    width: string;
    bordered: boolean;
    square: boolean;
    index: number;
    get classes(): {
        wrap: string;
        content: string;
        inner: string;
        hd: string;
        thumb: string;
        bd: string;
        label: string;
        hover: string;
    };
    changeCurrent(width: string, bordered: boolean, square: boolean, index: number): void;
    onClick(): void;
}

export { GridItem };

/**
 * GridItemProps接口定义
 */
export interface GridItemProps {
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
     * 缩略图
     *
     * @type {string}
     */
    thumb?: string;
    /**
     * 描述信息
     *
     * @type {string}
     */
    label?: string;
}

/**
 * GridItemExpose接口定义
 */
export interface GridItemExpose {
    changeCurrent(width: string, bordered: boolean, square: boolean, index: number): void;
}

/**
 * GridItemInstance类型定义
 */
export type GridItemInstance = ComponentPublicInstance<GridItem, GridItemProps, GridItemExpose>;

/**
 * GridProps接口定义
 */
export interface GridProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 列数
     *
     * @type {number}
     */
    col?: number;
    /**
     * 是否有边框
     *
     * @type {boolean}
     */
    bordered?: boolean;
    /**
     * 每个格子是否固定为正方形
     *
     * @type {boolean}
     */
    square?: boolean;
}

/**
 * GridExpose接口定义
 */
export interface GridExpose {
}

/**
 * GridInstance类型定义
 */
export type GridInstance = ComponentPublicInstance<Grid, GridProps, GridExpose>;
