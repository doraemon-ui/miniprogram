import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramCanvasRenderingContext2D } from '@doraemon-ui/miniprogram.shared'

import type { ESign } from './index'

/**
 * ESignCanvasRef接口定义
 */
export interface ESignCanvasRef {
  ctx: MiniprogramCanvasRenderingContext2D
  clear: () => void
  draw: () => Promise<string>
  resize: (updateCanvasContext: () => Promise<ESignCanvasRef>) => void
}

/**
 * ESignFileType类型定义
 */
export type ESignFileType = 'png' | 'jpg' | 'jpeg' | 'webp'

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
