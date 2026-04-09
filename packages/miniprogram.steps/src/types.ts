import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Step } from './step'
import type { Steps } from './index'

/**
 * StepsDirection类型定义
 */
export type StepsDirection = 'horizontal' | 'vertical'

/**
 * StepUpdateOptions接口定义
 */
export interface StepUpdateOptions {
  /**
   * length
   * @type {number}
   */
  length?: number

  /**
   * index
   * @type {number}
   */
  index?: number

  /**
   * current
   * @type {number}
   */
  current?: number

  /**
   * direction
   * @type {StepsDirection}
   */
  direction?: StepsDirection
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
  prefixCls?: string

  /**
   * status
   * @type {string}
   */
  status?: string

  /**
   * title
   * @type {string}
   */
  title?: string

  /**
   * content
   * @type {string}
   */
  content?: string

  /**
   * icon
   * @type {string}
   */
  icon?: string
}

/**
 * StepExpose接口定义
 */
export interface StepExpose {}

/**
 * StepInternalMethods接口定义
 */
export interface StepInternalMethods {
  /**
   * 更新当前步骤状态
   *
   * @return {void}
   */
  updateCurrent(opts?: StepUpdateOptions): void
}

/**
 * StepInstance类型定义
 */
export type StepInstance = ComponentPublicInstance<Step, StepProps, StepExpose> & StepInternalMethods

/**
 * StepsProps接口定义
 */
export interface StepsProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * current
   * @type {number}
   */
  current?: number

  /**
   * direction
   * @type {StepsDirection}
   */
  direction?: StepsDirection
}

/**
 * StepsExpose接口定义
 */
export interface StepsExpose {}

/**
 * StepsInstance类型定义
 */
export type StepsInstance = ComponentPublicInstance<Steps, StepsProps, StepsExpose>
