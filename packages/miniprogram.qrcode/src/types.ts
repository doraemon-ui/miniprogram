import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Qrcode } from './index'

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
 * QrcodeStatus类型定义
 */
export type QrcodeStatus = 'activated' | 'expired' | 'loading'

/**
 * QrcodeLoadDetail接口定义
 */
export interface QrcodeLoadDetail {
  /**
   * base64Url
   * @type {string}
   */
  base64Url: string
}

/**
 * QrcodeProps接口定义
 */
export interface QrcodeProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 二维码版本号
   *
   * @type {number}
   */
  typeNumber?: number

  /**
   * 纠错等级
   *
   * @type {number}
   */
  errorCorrectLevel?: number

  /**
   * 宽度
   *
   * @type {number}
   */
  width?: number

  /**
   * 高度
   *
   * @type {number}
   */
  height?: number

  /**
   * 留白
   *
   * @type {number}
   */
  whiteSpace?: number

  /**
   * 前景色
   *
   * @type {string}
   */
  fgColor?: string

  /**
   * 背景色
   *
   * @type {string}
   */
  bgColor?: string

  /**
   * 二维码内容
   *
   * @type {string}
   */
  data?: string

  /**
   * 是否开启长按识别
   *
   * @type {boolean}
   */
  showMenuByLongpress?: boolean

  /**
   * 二维码状态
   *
   * @type {QrcodeStatus}
   */
  qrcodeStatus?: QrcodeStatus

  /**
   * 过期文案
   *
   * @type {string}
   */
  qrcodeExpiredText?: string

  /**
   * 刷新文案
   *
   * @type {string}
   */
  qrcodeRefreshText?: string
}

/**
 * QrcodeExpose接口定义
 */
export interface QrcodeExpose {
  /**
   * 获取画布节点
   *
   * @return {Promise<WechatMiniprogram.Canvas | undefined>}
   */
  getCanvasNode(): Promise<WechatMiniprogram.Canvas | undefined>

  /**
   * 获取 Base64 地址
   *
   * @return {string}
   */
  getBase64Url(): string
}

/**
 * QrcodeInstance类型定义
 */
export type QrcodeInstance = ComponentPublicInstance<Qrcode, QrcodeProps, QrcodeExpose>
