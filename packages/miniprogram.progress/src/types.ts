import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Progress } from './index'

/**
 * ProgressStatus类型定义
 */
export type ProgressStatus = 'normal' | 'progress' | 'error' | 'success'
/**
 * ProgressShape类型定义
 */
export type ProgressShape = 'round' | 'square'

/**
 * ProgressProps接口定义
 */
export interface ProgressProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 进度百分比
   *
   * @type {number}
   */
  percent?: number

  /**
   * 进度条高度
   *
   * @type {number}
   */
  strokeWidth?: number

  /**
   * 进度条颜色
   *
   * @type {string}
   */
  activeColor?: string

  /**
   * 背景色
   *
   * @type {string}
   */
  backgroundColor?: string

  /**
   * 状态
   *
   * @type {ProgressStatus}
   */
  status?: ProgressStatus

  /**
   * 形状
   *
   * @type {ProgressShape}
   */
  shape?: ProgressShape

  /**
   * 进度条样式
   *
   * @type {string | Partial<CSSStyleDeclaration>}
   */
  barStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * 是否显示进度信息
   *
   * @type {boolean}
   */
  showInfo?: boolean
}

/**
 * ProgressExpose接口定义
 */
export interface ProgressExpose {}

/**
 * ProgressInstance类型定义
 */
export type ProgressInstance = ComponentPublicInstance<Progress, ProgressProps, ProgressExpose>
