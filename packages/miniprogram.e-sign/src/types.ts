import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { ESign } from './index'

/**
 * ESignFileType类型定义
 */
export type ESignFileType = 'png' | 'jpg' | 'jpeg' | 'webp'

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
   * @type {ESignFileType}
   */
  type?: ESignFileType

  /**
   * quality
   * @type {number}
   */
  quality?: number
}

/**
 * CanvasContext2D接口定义
 */
export interface CanvasContext2D {
  beginPath: () => void
  lineTo: (x: number, y: number) => void
  stroke: () => void
  scale: (x: number, y: number) => void
  clearRect: (x: number, y: number, width: number, height: number) => void
  closePath: () => void
  fillRect: (x: number, y: number, width: number, height: number) => void
  getImageData: (sx: number, sy: number, sw: number, sh: number) => unknown
  putImageData: (imagedata: unknown, dx: number, dy: number) => void

  /**
   * lineWidth
   * @type {number}
   */
  lineWidth: number

  /**
   * strokeStyle
   * @type {string}
   */
  strokeStyle: string

  /**
   * lineCap
   * @type {string}
   */
  lineCap: string

  /**
   * lineJoin
   * @type {string}
   */
  lineJoin: string

  /**
   * fillStyle
   * @type {string}
   */
  fillStyle: string
}

/**
 * CanvasNode类型定义
 */
export type CanvasNode = WechatMiniprogram.Canvas

/**
 * TouchLikeEvent类型定义
 */
export type TouchLikeEvent = {
  /**
   * touches
   * @type {Array<{ pageX: number; pageY: number }>}
   */
  touches?: Array<{ pageX: number; pageY: number }>

  /**
   * changedTouches
   * @type {Array<{ pageX: number; pageY: number }>}
   */
  changedTouches?: Array<{ pageX: number; pageY: number }>

  /**
   * currentTarget
   * @type {{}
   */
  currentTarget?: {
    offsetLeft?: number
    offsetTop?: number
  }
}

/**
 * ESignCanvasRef接口定义
 */
export interface ESignCanvasRef {
  /**
   * value
   * @type {CanvasContext2D}
   */
  value: CanvasContext2D
  clear: () => void
  draw: () => Promise<string>
  resize: (createCanvasContext: () => Promise<ESignCanvasRef>) => void
}

/**
 * ESignProps接口定义
 */
export interface ESignProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string
  /**
   * 导出图片类型
   *
   * @type {ESignFileType}
   */
  type?: ESignFileType
  /**
   * 画布宽度（px 或 auto）
   *
   * @type {(string | number)}
   */
  width?: string | number
  /**
   * 画布高度（px）
   *
   * @type {number}
   */
  height?: number
  /**
   * 画布背景色
   *
   * @type {string}
   */
  bgColor?: string
  /**
   * 画线宽度
   *
   * @type {number}
   */
  lineWidth?: number
  /**
   * 画线颜色
   *
   * @type {string}
   */
  lineColor?: string
  /**
   * 是否显示底部操作栏
   *
   * @type {boolean}
   */
  hasFooter?: boolean
  /**
   * 重置按钮文本
   *
   * @type {string}
   */
  cancelText?: string
  /**
   * 确定按钮文本
   *
   * @type {string}
   */
  confirmText?: string
}

/**
 * ESignExpose接口定义
 */
export interface ESignExpose {
  /**
   * 重新计算画布
   *
   * @return {void}
   */
  resize(): void
}

/**
 * ESignInstance类型定义
 */
export type ESignInstance = ComponentPublicInstance<ESign, ESignProps, ESignExpose>
