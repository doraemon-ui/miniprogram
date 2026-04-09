import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Vcode } from './index'

/**
 * VcodeChangeDetail接口定义
 */
export interface VcodeChangeDetail {
  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * base64Url
   * @type {string}
   */
  base64Url: string
}

/**
 * VcodeProps接口定义
 */
export interface VcodeProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 验证码字符源
   *
   * @type {string}
   */
  str?: string

  /**
   * 验证码长度
   *
   * @type {number}
   */
  num?: number

  /**
   * 画布宽度
   *
   * @type {number}
   */
  width?: number

  /**
   * 画布高度
   *
   * @type {number}
   */
  height?: number

  /**
   * 背景颜色
   *
   * @type {string}
   */
  bgColor?: string

  /**
   * 字体颜色
   *
   * @type {string}
   */
  fontColor?: string

  /**
   * 是否绘制噪点
   *
   * @type {boolean}
   */
  hasPoint?: boolean

  /**
   * 是否绘制干扰线
   *
   * @type {boolean}
   */
  hasLine?: boolean

  /**
   * canvas 节点 id
   *
   * @type {string}
   */
  canvasId?: string
}

/**
 * VcodeExpose接口定义
 */
export interface VcodeExpose {}

/**
 * VcodeInstance类型定义
 */
export type VcodeInstance = ComponentPublicInstance<Vcode, VcodeProps, VcodeExpose>
