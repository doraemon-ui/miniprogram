import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

declare class Steps extends Doraemon {
    prefixCls: string;
    current: number;
    direction: 'horizontal' | 'vertical';
    onCurrentChange(): void;
    private getChildrenSteps;
    onChildrenChanged(): void;
    updateCurrent(): void;
    mounted(): void;
}

export { Steps };

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;

declare class Step extends Doraemon {
    prefixCls: string;
    status: string;
    title: string;
    content: string;
    icon: string;
    width: string;
    length: number;
    index: number;
    current: number;
    direction: 'horizontal' | 'vertical';
    hasIcon: boolean;
    thumb: string;
    className: string;
    get classes(): {
        wrap: string;
        hd: string;
        icon: string;
        thumb: string;
        bd: string;
        title: string;
        content: string;
        ft: string;
    };
    updateCurrent(opts?: {
        length?: number;
        index?: number;
        current?: number;
        direction?: 'horizontal' | 'vertical';
    }): void;
    mounted(): void;
}

export { Step };

/**
 * StepsDirection类型定义
 */
export type StepsDirection = 'horizontal' | 'vertical';

/**
 * StepUpdateOptions接口定义
 */
export interface StepUpdateOptions {
    /**
     * length
     * @type {number}
     */
    length?: number;
    /**
     * index
     * @type {number}
     */
    index?: number;
    /**
     * current
     * @type {number}
     */
    current?: number;
    /**
     * direction
     * @type {StepsDirection}
     */
    direction?: StepsDirection;
}

/**
 * StepProps接口定义
 */
export interface StepProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * status
     * @type {string}
     */
    status?: string;
    /**
     * title
     * @type {string}
     */
    title?: string;
    /**
     * content
     * @type {string}
     */
    content?: string;
    /**
     * icon
     * @type {string}
     */
    icon?: string;
}

/**
 * StepExpose接口定义
 */
export interface StepExpose {
}

/**
 * StepInternalMethods接口定义
 */
export interface StepInternalMethods {
    /**
     * 更新当前步骤状态
     *
     * @return {void}
     */
    updateCurrent(opts?: StepUpdateOptions): void;
}

/**
 * StepInstance类型定义
 */
export type StepInstance = ComponentPublicInstance<Step, StepProps, StepExpose> & StepInternalMethods;

/**
 * StepsProps接口定义
 */
export interface StepsProps {
    /**
     * 自定义类名前缀
     *
     * @type {string}
     */
    prefixCls?: string;
    /**
     * current
     * @type {number}
     */
    current?: number;
    /**
     * direction
     * @type {StepsDirection}
     */
    direction?: StepsDirection;
}

/**
 * StepsExpose接口定义
 */
export interface StepsExpose {
}

/**
 * StepsInstance类型定义
 */
export type StepsInstance = ComponentPublicInstance<Steps, StepsProps, StepsExpose>;
