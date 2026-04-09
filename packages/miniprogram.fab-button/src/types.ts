import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { FabButton } from './index'

/**
 * FabButtonTheme类型定义
 */
export type FabButtonTheme = string
/**
 * FabButtonPosition类型定义
 */
export type FabButtonPosition = 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft' | string
/**
 * FabButtonDirection类型定义
 */
export type FabButtonDirection = 'horizontal' | 'vertical' | 'circle' | string

/**
 * FabButtonOption接口定义
 */
export interface FabButtonOption {
  /**
   * value
   * @type {unknown}
   */
  value?: unknown

  /**
   * label
   * @type {string}
   */
  label?: string

  /**
   * disabled
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * hideShadow
   * @type {boolean}
   */
  hideShadow?: boolean

  /**
   * className
   * @type {string}
   */
  className?: string

  /**
   * hoverClass
   * @type {string}
   */
  hoverClass?: string

  /**
   * openType
   * @type {string}
   */
  openType?: string
}

/**
 * FabButtonProps接口定义
 */
export interface FabButtonProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * hoverClass
   * @type {string}
   */
  hoverClass?: string

  /**
   * theme
   * @type {FabButtonTheme}
   */
  theme?: FabButtonTheme

  /**
   * position
   * @type {FabButtonPosition}
   */
  position?: FabButtonPosition

  /**
   * action
   * @type {string}
   */
  action?: string

  /**
   * actionRotate
   * @type {boolean}
   */
  actionRotate?: boolean

  /**
   * hideShadow
   * @type {boolean}
   */
  hideShadow?: boolean

  /**
   * backdrop
   * @type {boolean}
   */
  backdrop?: boolean

  /**
   * buttons
   * @type {FabButtonOption[]}
   */
  buttons?: FabButtonOption[]

  /**
   * direction
   * @type {FabButtonDirection}
   */
  direction?: FabButtonDirection

  /**
   * spaceBetween
   * @type {number}
   */
  spaceBetween?: number

  /**
   * duration
   * @type {number}
   */
  duration?: number

  /**
   * scale
   * @type {number}
   */
  scale?: number

  /**
   * reverse
   * @type {boolean}
   */
  reverse?: boolean

  /**
   * sAngle
   * @type {number}
   */
  sAngle?: number

  /**
   * eAngle
   * @type {number}
   */
  eAngle?: number

  /**
   * defaultVisible
   * @type {boolean}
   */
  defaultVisible?: boolean

  /**
   * visible
   * @type {boolean}
   */
  visible?: boolean

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean
}

/**
 * FabButtonExpose接口定义
 */
export interface FabButtonExpose {}

/**
 * FabButtonClassItem接口定义
 */
export interface FabButtonClassItem {
  /**
   * wrap
   * @type {string}
   */
  wrap: string

  /**
   * hover
   * @type {string}
   */
  hover: string
}

/**
 * FabButtonInstance类型定义
 */
export type FabButtonInstance = ComponentPublicInstance<FabButton, FabButtonProps, FabButtonExpose>
