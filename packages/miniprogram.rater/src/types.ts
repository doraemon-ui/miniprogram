import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Rater } from './index'

/**
 * RaterChangeDetail接口定义
 */
export interface RaterChangeDetail {
  /**
   * value
   * @type {number}
   */
  value: number

  /**
   * index
   * @type {number}
   */
  index: number
}

/**
 * RaterProps接口定义
 */
export interface RaterProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 最大评分数
   *
   * @type {number}
   */
  max?: number

  /**
   * 图标
   *
   * @type {string}
   */
  icon?: string

  /**
   * 星字符
   *
   * @type {string}
   */
  star?: string

  /**
   * 默认值
   *
   * @type {number}
   */
  defaultValue?: number

  /**
   * 当前值
   *
   * @type {number}
   */
  value?: number

  /**
   * 激活颜色
   *
   * @type {string}
   */
  activeColor?: string

  /**
   * 间距
   *
   * @type {number}
   */
  margin?: number

  /**
   * 字号
   *
   * @type {number}
   */
  fontSize?: number

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否允许半星
   *
   * @type {boolean}
   */
  allowHalf?: boolean

  /**
   * 是否允许清空
   *
   * @type {boolean}
   */
  allowClear?: boolean

  /**
   * 是否允许滑动选择
   *
   * @type {boolean}
   */
  allowTouchMove?: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean
}

/**
 * RaterExpose接口定义
 */
export interface RaterExpose {}

/**
 * RaterInstance类型定义
 */
export type RaterInstance = ComponentPublicInstance<Rater, RaterProps, RaterExpose>
