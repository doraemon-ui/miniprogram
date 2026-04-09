import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Barcode } from './index'

/**
 * BarcodeEvent类型定义
 */
export type BarcodeEvent = 'valid' | 'invalid' | 'success' | 'error' | 'load'

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
  onValid?: () => void
  onInvalid?: () => void
  onSuccess?: () => void
  onError?: () => void
}

/**
 * DataUrlOptions接口定义
 */
export interface DataUrlOptions {
  /**
   * width
   * @type {number}
   */
  width: number

  /**
   * height
   * @type {number}
   */
  height: number

  /**
   * type
   * @type {'png' | 'jpg' | 'jpeg' | 'webp'}
   */
  type?: 'png' | 'jpg' | 'jpeg' | 'webp'

  /**
   * quality
   * @type {number}
   */
  quality?: number
}

/**
 * BarcodeSettings接口定义
 */
export interface BarcodeSettings {
  /**
   * width
   * @type {number}
   */
  width: number

  /**
   * height
   * @type {number}
   */
  height: number

  /**
   * number
   * @type {boolean}
   */
  number: boolean

  /**
   * prefix
   * @type {boolean}
   */
  prefix: boolean

  /**
   * color
   * @type {string}
   */
  color: string

  /**
   * debug
   * @type {boolean}
   */
  debug: boolean
  onValid: () => void
  onInvalid: () => void
  onSuccess: () => void
  onError: () => void
}

/**
 * BarcodeCanvas2DContext接口定义
 */
export interface BarcodeCanvas2DContext {
  clearRect: (x: number, y: number, w: number, h: number) => void
  fillRect: (x: number, y: number, w: number, h: number) => void
  scale: (x: number, y: number) => void
  fillText: (text: string, x: number, y: number) => void
  beginPath: () => void
  rect: (x: number, y: number, w: number, h: number) => void
  fill: () => void

  /**
   * font
   * @type {string}
   */
  font: string

  /**
   * fillStyle
   * @type {string}
   */
  fillStyle: string
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
  draw(opts?: Partial<{ canvasId: string; number: string; width: number; height: number; options: BarcodeOptions }>): Promise<void>
}

/**
 * BarcodeInstance类型定义
 */
export type BarcodeInstance = ComponentPublicInstance<Barcode, BarcodeProps, BarcodeExpose>
