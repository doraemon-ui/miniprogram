import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared';

declare class Toptips extends Doraemon {
    prefixCls: string;
    classNames: string;
    icon: string;
    hidden: boolean;
    text: string;
    duration: number;
    in: boolean;
    private removed;
    private fns;
    get classes(): {
        wrap: string;
        content: string;
        icon: string;
        text: string;
    };
    hide(): boolean;
    show(opts?: ToptipsShowProps): any;
    success(opts?: ToptipsShowProps): any;
    info(opts?: ToptipsShowProps): any;
    warn(opts?: ToptipsShowProps): any;
    error(opts?: ToptipsShowProps): any;
    detached(): void;
}

export { Toptips };

/**
 * ToptipsShowProps接口定义
 */
export interface ToptipsShowProps {
    /**
     * prefixCls
     * @type {string}
     */
    prefixCls?: string;
    /**
     * classNames
     * @type {string}
     */
    classNames?: string;
    /**
     * icon
     * @type {string}
     */
    icon?: string;
    /**
     * hidden
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * text
     * @type {string}
     */
    text?: string;
    /**
     * duration
     * @type {number}
     */
    duration?: number;
    success?: () => void;
}

/**
 * ToptipsShowOptions接口定义
 */
export interface ToptipsShowOptions {
    /**
     * selector
     * @type {string}
     */
    selector?: string;
    /**
     * instance
     * @type {MiniprogramPublicInstance}
     */
    instance?: MiniprogramPublicInstance;
}

/**
 * ToptipsProps接口定义
 */
export interface ToptipsProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * classNames
     * @type {string}
     */
    classNames?: string;
    /**
     * icon
     * @type {string}
     */
    icon?: string;
    /**
     * hidden
     * @type {boolean}
     */
    hidden?: boolean;
    /**
     * text
     * @type {string}
     */
    text?: string;
    /**
     * duration
     * @type {number}
     */
    duration?: number;
}

/**
 * ToptipsExpose接口定义
 */
export interface ToptipsExpose {
}

/**
 * ToptipsInternalMethods接口定义
 */
export interface ToptipsInternalMethods {
    /**
     * 显示组件
     *
     * @return {any}
     */
    show(props?: ToptipsShowProps): any;
    /**
     * 隐藏组件
     *
     * @return {boolean}
     */
    hide(): boolean;
}

/**
 * ToptipsInstance类型定义
 */
export type ToptipsInstance = ComponentPublicInstance<Toptips, ToptipsProps, ToptipsExpose> & ToptipsInternalMethods;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

export declare function show(props: ToptipsShowProps, options?: ToptipsShowOptions): any;

export declare function show(props: ToptipsShowProps, selector?: string, instance?: MiniprogramPublicInstance): any;

export declare const defaults: Required<ToptipsShowProps>;
