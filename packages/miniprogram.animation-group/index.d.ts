import { Doraemon } from '@doraemon-ui/miniprogram.core-js';

import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js';

import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared';

declare class AnimationGroup extends Doraemon {
    /**
     * 触发组件进入或离场动画的状态
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    in: boolean;
    /**
     * 过渡的类名
     *
     * @type {ClassNames}
     * @memberof AnimationGroup
     */
    classNames: ClassNames;
    /**
     * 动画持续时间
     *
     * @type {Duration}
     * @memberof AnimationGroup
     */
    duration: Duration;
    /**
     * 动画的类型
     *
     * @type {AnimateType}
     * @memberof AnimationGroup
     */
    type: AnimateType;
    /**
     * 首次挂载时是否触发进场动画
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    appear: boolean;
    /**
     * 是否启用进场动画
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    enter: boolean;
    /**
     * 是否启用离场动画
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    exit: boolean;
    /**
     * 首次进场动画时是否懒挂载组件
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    mountOnEnter: boolean;
    /**
     * 离场动画完成时是否卸载组件
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    unmountOnExit: boolean;
    /**
     * 自定义类名
     *
     * @type {string}
     * @memberof AnimationGroup
     */
    wrapCls: string;
    /**
     * 自定义样式
     *
     * @type {Partial<CSSStyleDeclaration>}
     * @memberof AnimationGroup
     */
    wrapStyle: Partial<CSSStyleDeclaration>;
    /**
     * 阻止移动触摸
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    disableScroll: boolean;
    /**
     * 当前生效动画类
     *
     * @type {string}
     * @memberof AnimationGroup
     */
    animateCss: string;
    /**
     * 当前生效动画状态
     *
     * @type {AnimateStatus}
     * @memberof AnimationGroup
     */
    animateStatus: AnimateStatus;
    /**
     * 组件是否首次挂载
     *
     * @type {boolean}
     * @memberof AnimationGroup
     */
    isAppearing: boolean;
    /**
     * 更新组件状态
     *
     * @param {AnimateStatus} nextStatus 下一状态，ENTERING 或 EXITING
     * @param {boolean} [mounting=false] 是否首次挂载
     * @memberof AnimationGroup
     */
    updateStatus(nextStatus: AnimateStatus, mounting?: boolean): void;
    /**
     * 获取指定状态下的类名
     *
     * @param {'enter' | 'exit'} scene 动画场景，enter 或 exit
     * @returns
     * @memberof AnimationGroup
     */
    getClassNames(scene: 'enter' | 'exit'): {
        className: string;
        activeClassName: string;
        doneClassName: string;
    };
    /**
     * 获取动画持续时间
     *
     * @returns {{ enter?: number, exit?: number }}
     * @memberof AnimationGroup
     */
    getTimeouts(): {
        enter?: number;
        exit?: number;
    };
    /**
     * 设置下一阶段动画
     *
     * @param {NextAnimate} nextAnimate 下一阶段动画
     * @param {Function} callback 回调函数
     * @memberof AnimationGroup
     */
    setNextAnimate(nextAnimate: NextAnimate, callback: Function): void;
    /**
     * 进场动画开始
     *
     * @returns
     * @memberof AnimationGroup
     */
    performEnter(): void;
    /**
     * 进场动画完成
     *
     * @memberof AnimationGroup
     */
    performEntered(): void;
    /**
     * 离场动画开始
     *
     * @returns
     * @memberof AnimationGroup
     */
    performExit(): void;
    /**
     * 离场动画完成
     *
     * @memberof AnimationGroup
     */
    performExited(): void;
    /**
     * 点击事件
     *
     * @memberof AnimationGroup
     */
    onClick(): void;
    /**
     * 阻止移动触摸
     *
     * @memberof AnimationGroup
     */
    onTouchMove(): void;
    /**
     * 监听过渡或动画的回调函数
     *
     * @memberof AnimationGroup
     */
    addEventListener(): void;
    /**
     * 会在 WXSS transition 或 wx.createAnimation 动画结束后触发
     *
     * @memberof AnimationGroup
     */
    onTransitionEnd(): void;
    /**
     * 会在一个 WXSS animation 动画完成时触发
     *
     * @memberof AnimationGroup
     */
    onAnimationEnd(): void;
    /**
     * 属性值 in 被更改时的响应函数
     *
     * @param {boolean} newVal 触发组件进入或离场动画的状态
     * @memberof AnimationGroup
     */
    updated(newVal: boolean): void;
    /**
     * 组件样式
     *
     * @readonly
     * @memberof AnimationGroup
     */
    get containerStyle(): string;
    /**
     * 组件是否显示
     *
     * @readonly
     * @memberof AnimationGroup
     */
    get show(): boolean;
    /**
     * 组件挂载完成生命周期
     *
     * @memberof AnimationGroup
     */
    mounted(): void;
    getBoundingClientRect(): Promise<MiniprogramDOMRect>;
}

export { AnimationGroup };

/**
 * AnimateStatus类型定义
 * 'enter': 进场动画的开始状态
 * 'entering': 进场动画的结束状态
 * 'entered': 进场动画的完成状态
 * 'exit': 离场动画的开始状态
 * 'exiting': 离场动画的结束状态
 * 'exited': 离场动画的完成状态
 * 'unmounted': 组件已卸载
 */
export type AnimateStatus = 'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited' | 'unmounted';

/**
 * AnimateType类型定义
 * 'transition': 过渡效果
 * 'animation': 动画效果
 */
export type AnimateType = 'transition' | 'animation';

/**
 * ClassNames类型定义
 */
export type ClassNames = string | {
    enter?: string;
    enterActive?: string;
    enterDone?: string;
    exit?: string;
    exitActive?: string;
    exitDone?: string;
};

/**
 * Duration类型定义
 */
export type Duration = number | {
    enter?: number;
    exit?: number;
};

/**
 * NextAnimate接口定义
 */
export interface NextAnimate {
    /**
     * animateStatus
     * @type {AnimateStatus}
     */
    animateStatus?: AnimateStatus;
    /**
     * animateCss
     * @type {string}
     */
    animateCss?: string;
}

/**
 * AnimationGroupProps接口定义
 */
export interface AnimationGroupProps {
    /**
     * in
     * @type {boolean}
     */
    in?: boolean;
    /**
     * classNames
     * @type {ClassNames}
     */
    classNames?: ClassNames;
    /**
     * duration
     * @type {Duration}
     */
    duration?: Duration;
    /**
     * type
     * @type {AnimateType}
     */
    type?: AnimateType;
    /**
     * appear
     * @type {boolean}
     */
    appear?: boolean;
    /**
     * enter
     * @type {boolean}
     */
    enter?: boolean;
    /**
     * exit
     * @type {boolean}
     */
    exit?: boolean;
    /**
     * mountOnEnter
     * @type {boolean}
     */
    mountOnEnter?: boolean;
    /**
     * unmountOnExit
     * @type {boolean}
     */
    unmountOnExit?: boolean;
    /**
     * wrapCls
     * @type {string}
     */
    wrapCls?: string;
    /**
     * wrapStyle
     * @type {Partial<CSSStyleDeclaration>}
     */
    wrapStyle?: Partial<CSSStyleDeclaration>;
    /**
     * disableScroll
     * @type {boolean}
     */
    disableScroll?: boolean;
}

/**
 * AnimationGroupExpose接口定义
 */
export interface AnimationGroupExpose {
    /**
     * 获取组件尺寸
     *
     * @return {Promise<MiniprogramDOMRect>}
     */
    getBoundingClientRect(): Promise<MiniprogramDOMRect>;
}

/**
 * AnimationGroupInstance类型定义
 */
export type AnimationGroupInstance = ComponentPublicInstance<AnimationGroup, AnimationGroupProps, AnimationGroupExpose>;

declare const _default: WechatMiniprogram.Component.Identifier<WechatMiniprogram.Component.DataOption, WechatMiniprogram.Component.PropertyOption, WechatMiniprogram.Component.MethodOption>;

export default _default;
