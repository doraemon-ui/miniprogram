import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'

import type { AnimationGroup } from './index'

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
export type AnimateStatus = 'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited' | 'unmounted'

/**
 * AnimateType类型定义
 * 'transition': 过渡效果
 * 'animation': 动画效果
 */
export type AnimateType = 'transition' | 'animation'

/**
 * ClassNames类型定义
 */
export type ClassNames =
  | string
  | {
      enter?: string
      enterActive?: string
      enterDone?: string
      exit?: string
      exitActive?: string
      exitDone?: string
    }

/**
 * Duration类型定义
 */
export type Duration =
  | number
  | {
      enter?: number
      exit?: number
    }

/**
 * NextAnimate接口定义
 */
export interface NextAnimate {
  /**
   * animateStatus
   * @type {AnimateStatus}
   */
  animateStatus?: AnimateStatus

  /**
   * animateCss
   * @type {string}
   */
  animateCss?: string
}

/**
 * AnimationGroupProps接口定义
 */
export interface AnimationGroupProps {
  /**
   * in
   * @type {boolean}
   */
  in?: boolean

  /**
   * classNames
   * @type {ClassNames}
   */
  classNames?: ClassNames

  /**
   * duration
   * @type {Duration}
   */
  duration?: Duration

  /**
   * type
   * @type {AnimateType}
   */
  type?: AnimateType

  /**
   * appear
   * @type {boolean}
   */
  appear?: boolean

  /**
   * enter
   * @type {boolean}
   */
  enter?: boolean

  /**
   * exit
   * @type {boolean}
   */
  exit?: boolean

  /**
   * mountOnEnter
   * @type {boolean}
   */
  mountOnEnter?: boolean

  /**
   * unmountOnExit
   * @type {boolean}
   */
  unmountOnExit?: boolean

  /**
   * wrapCls
   * @type {string}
   */
  wrapCls?: string

  /**
   * wrapStyle
   * @type {Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: Partial<CSSStyleDeclaration>

  /**
   * disableScroll
   * @type {boolean}
   */
  disableScroll?: boolean
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
  getBoundingClientRect(): Promise<MiniprogramDOMRect>
}

/**
 * AnimationGroupInstance类型定义
 */
export type AnimationGroupInstance = ComponentPublicInstance<AnimationGroup, AnimationGroupProps, AnimationGroupExpose>
