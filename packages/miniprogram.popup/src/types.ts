import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { SafeAreaProp } from '@doraemon-ui/miniprogram.safe-area'

import type { Popup } from './index'

/**
 * Position类型定义
 */
export type Position = 'bottom' | 'top' | 'left' | 'right' | 'center'

/**
 * PopupProps接口定义
 */
export interface PopupProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 自定义 animation 类名前缀
   *
   * @type {string}
   */
  animationPrefixCls?: string

  /**
   * 指定弹出的位置
   *
   * @type {Position}
   */
  position?: Position

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: Partial<CSSStyleDeclaration>

  /**
   * 自定义 body 样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  bodyStyle?: Partial<CSSStyleDeclaration>

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   */
  mask?: boolean

  /**
   * 点击蒙层是否允许关闭
   *
   * @type {boolean}
   */
  maskClosable?: boolean

  /**
   * 蒙层是否透明
   *
   * @type {boolean}
   */
  maskTransparent?: boolean

  /**
   * 自定义蒙层样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  maskStyle?: Partial<CSSStyleDeclaration>

  /**
   * 是否可见
   *
   * @type {boolean}
   */
  visible?: boolean

  /**
   * 是否支持向上/下滑动关闭
   *
   * @type {boolean}
   */
  closeOnSwipe?: boolean

  /**
   * 设置蒙层的 z-index
   *
   * @type {number}
   */
  zIndex?: number

  /**
   * 首次进场动画时是否懒挂载组件
   *
   * @type {boolean}
   */
  mountOnEnter?: boolean

  /**
   * 离场动画完成时是否卸载组件
   *
   * @type {boolean}
   */
  unmountOnExit?: boolean

  /**
   * 是否显示关闭按钮
   *
   * @type {boolean}
   */
  closable?: boolean

  /**
   * 是否开启安全区适配，关于 `SafeAreaProp` 的类型定义，请参考 `SafeArea` 的文档
   *
   * @type {SafeAreaProp}
   */
  safeArea?: SafeAreaProp
}

/**
 * PopupExpose接口定义
 */
export interface PopupExpose {}

/**
 * PopupInstance类型定义
 */
export type PopupInstance = ComponentPublicInstance<Popup, PopupProps, PopupExpose>
