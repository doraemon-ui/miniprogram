import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { NativeButtonProps, PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { FabButton } from './index'

/**
 * FabButtonPosition类型定义
 */
export type FabButtonPosition = 'bottomRight' | 'bottomLeft' | 'topRight' | 'topLeft'

/**
 * FabButtonDirection类型定义
 */
export type FabButtonDirection = 'horizontal' | 'vertical' | 'circle'

/**
 * FabButtonOption接口定义
 */
export type FabButtonOption = Omit<NativeButtonProps, 'size' | 'type' | 'plain' | 'loading' | 'formType'> & {
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
   * hideShadow
   * @type {boolean}
   */
  hideShadow?: boolean

  /**
   * className
   * @type {string}
   */
  className?: string
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
   * color
   * @type {PresetColor}
   */
  color?: PresetColor

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
