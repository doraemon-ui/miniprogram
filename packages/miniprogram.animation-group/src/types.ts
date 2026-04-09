import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { AnimationGroup } from './index'

export enum AnimateStatus {
  ENTER = 'enter',
  ENTERING = 'entering',
  ENTERED = 'entered',
  EXIT = 'exit',
  EXITING = 'exiting',
  EXITED = 'exited',
  UNMOUNTED = 'unmounted',
}

export enum AnimateType {
  TRANSITION = 'transition',
  ANIMATION = 'animation',
}

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
export interface AnimationGroupExpose {}

/**
 * AnimationGroupInstance类型定义
 */
export type AnimationGroupInstance = ComponentPublicInstance<AnimationGroup, AnimationGroupProps, AnimationGroupExpose>
