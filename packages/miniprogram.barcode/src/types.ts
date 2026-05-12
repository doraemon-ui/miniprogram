import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Barcode } from './index'

/**
 * BarcodeOptions接口定义
 */
export interface BarcodeOptions {
  /**
   * number
   * @type {boolean}
   */
  number?: boolean

  /**
   * prefix
   * @type {boolean}
   */
  prefix?: boolean

  /**
   * color
   * @type {string}
   */
  color?: string

  /**
   * debug
   * @type {boolean}
   */
  debug?: boolean
  // onValid?: () => void
  // onInvalid?: () => void
  // onSuccess?: () => void
  // onError?: () => void
}

/**
 * BarcodeProps接口定义
 */
export interface BarcodeProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 条码宽度
   *
   * @type {number}
   */
  width?: number

  /**
   * 条码高度
   *
   * @type {number}
   */
  height?: number

  /**
   * 条码内容
   *
   * @type {string}
   */
  number?: string

  /**
   * 条码配置
   *
   * @type {BarcodeOptions}
   */
  options?: BarcodeOptions

  /**
   * 画布节点 id
   *
   * @type {string}
   */
  canvasId?: string
}

/**
 * BarcodeExpose接口定义
 */
export interface BarcodeExpose {
  /**
   * 绘制条码
   *
   * @return {Promise<void>}
   */
  draw(opts?: Partial<BarcodeProps>): Promise<void>
}

/**
 * BarcodeInstance类型定义
 */
export type BarcodeInstance = ComponentPublicInstance<Barcode, BarcodeProps, BarcodeExpose>
