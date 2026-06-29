import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance, CustomEvent } from '@doraemon-ui/miniprogram.core-js';

declare class Result extends Doraemon {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     * @memberof Result
     */
    prefixCls: string;
    /**
     * 图标配置
     *
     * @type {unknown}
     * @memberof Result
     */
    icon: unknown;
    /**
     * 标题
     *
     * @type {string}
     * @memberof Result
     */
    title: string;
    /**
     * 描述
     *
     * @type {string}
     * @memberof Result
     */
    label: string;
    /**
     * 底部按钮
     *
     * @type {ResultButton[]}
     * @memberof Result
     */
    buttons: ResultButton[];
    /**
     * 额外信息
     *
     * @type {string}
     * @memberof Result
     */
    extra: string;
    /**
     * 是否固定底部
     *
     * @type {boolean}
     * @memberof Result
     */
    fixed: boolean;
    resultIcon: ResultIcon | null;
    get classes(): {
        wrap: string;
        hd: string;
        icon: string;
        bd: string;
        title: string;
        desc: string;
        buttons: string;
        ft: string;
    };
    onIconChange(v: unknown): void;
    onClick(e: CustomEvent<{
        index: number;
    }>): void;
    emitOpenTypeEvent(name: string, e: CustomEvent): void;
    bindgetuserinfo(e: CustomEvent): void;
    bindcontact(e: CustomEvent): void;
    bindgetphonenumber(e: CustomEvent): void;
    bindopensetting(e: CustomEvent): void;
    bindlaunchapp(e: CustomEvent): void;
    bindchooseavatar(e: CustomEvent): void;
    onError(e: CustomEvent): void;
    mounted(): void;
}

export { Result };

/**
 * ResultIcon接口定义
 */
export interface ResultIcon {
    /**
     * type
     * @type {string}
     */
    type: string;
    /**
     * size
     * @type {number}
     */
    size: number;
    /**
     * color
     * @type {string}
     */
    color: string;
}

/**
 * ResultButton类型定义
 */
export type ResultButton = Partial<{
    type: string;
    clear: boolean;
    block: boolean;
    full: boolean;
    outline: boolean;
    size: string;
    disabled: boolean;
    loading: boolean;
    formType: string;
    openType: string;
    hoverStopPropagation: boolean;
    hoverStartTime: number;
    hoverStayTime: number;
    lang: string;
    sessionFrom: string;
    sendMessageTitle: string;
    sendMessagePath: string;
    sendMessageImg: string;
    showMessageCard: boolean;
    appParameter: string;
    text: string;
}>;

/**
 * ResultProps接口定义
 */
export interface ResultProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * 图标配置
     *
     * @type {unknown}
     */
    icon?: unknown;
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
     * 底部按钮
     *
     * @type {ResultButton[]}
     */
    buttons?: ResultButton[];
    /**
     * 额外信息
     *
     * @type {string}
     */
    extra?: string;
    /**
     * 是否固定底部
     *
     * @type {boolean}
     */
    fixed?: boolean;
}

/**
 * ResultExpose接口定义
 */
export interface ResultExpose {
}

/**
 * ResultInstance类型定义
 */
export type ResultInstance = ComponentPublicInstance<Result, ResultProps, ResultExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
