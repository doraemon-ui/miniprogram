import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type {
  DefaultButtonHandle,
  MiniprogramPublicInstance,
  NativeButtonEvent,
  NativeButtonHandle,
  NativeButtonProps,
  PresetColor,
} from '@doraemon-ui/miniprogram.shared'

import type { Dialog } from './index'

export type { NativeButtonHandle, NativeButtonEvent }

/**
 * 操作按钮的类型
 */
export type DialogButton = Omit<NativeButtonProps, 'size' | 'type' | 'plain' | 'loading'> & {
  /**
   * 标题
   */
  text?: string
  /**
   * 按钮类型
   */
  type?: PresetColor
  /**
   * 是否文字加粗
   */
  bold?: boolean
  /**
   * 类名
   */
  className?: string
} & NativeButtonHandle<DialogButton>

/**
 * 对话框对应参数的类型
 */
export interface DialogProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string

  /**
   * 弹窗对应的自定义样式
   */
  bodyStyle?: Partial<CSSStyleDeclaration>

  /**
   * 是否显示蒙层
   */
  mask?: boolean

  /**
   * 点击蒙层是否允许关闭
   */
  maskClosable?: boolean

  /**
   * 是否可见
   */
  visible?: boolean

  /**
   * 设置蒙层的 z-index
   */
  zIndex?: number

  /**
   * 是否显示关闭按钮
   */
  closable?: boolean

  /**
   * 点击操作按钮后后是否关闭
   */
  buttonClosable?: boolean

  /**
   * 是否显示垂直按钮布局
   */
  verticalButtons?: boolean

  /**
   * 图片
   */
  image?: string

  /**
   * 标题
   */
  title?: string

  /**
   * 内容
   */
  content?: string

  /**
   * 操作按钮列表
   */
  buttons?: DialogButton[]
}

/**
 * 对话框的参数
 */
export interface DialogShowOptions {
  /**
   * 组件的选择器
   */
  selector?: string

  /**
   * 页面的实例
   */
  instance?: MiniprogramPublicInstance
}

/**
 * show 方法对应参数的类型
 */
export interface DialogShowProps extends Omit<DialogProps, 'visible'> {
  /**
   * 点击关闭按钮或蒙层的回调函数
   */
  onClose?: () => void

  /**
   * 关闭后的回调函数
   */
  onClosed?: () => void
}

/**
 * alert 方法对应参数的类型
 */
export interface DialogAlertProps extends Omit<DialogShowProps, 'buttonClosable' | 'buttons'> {
  /**
   * 确定按钮的文字
   */
  confirmText?: string

  /**
   * 确定按钮的类型
   */
  confirmType?: PresetColor

  /**
   * 确定按钮的点击事件
   */
  onConfirm?: DefaultButtonHandle<DialogButton>
}

/**
 * confirm 方法对应参数的类型
 */
export interface DialogConfirmProps extends DialogAlertProps {
  /**
   * 取消按钮的文字
   */
  cancelText?: string

  /**
   * 取消按钮的类型
   */
  cancelType?: PresetColor

  /**
   * 取消按钮的点击事件
   */
  onCancel?: DefaultButtonHandle<DialogButton>
}

/**
 * DialogExpose接口定义
 */
export interface DialogExpose {}

/**
 * DialogInternalMethods接口定义
 */
export interface DialogInternalMethods {
  /**
   * visible
   * @type {boolean}
   */
  visible?: boolean
  onClose: () => void
  onClosed: () => void
}

/**
 * DialogInstance类型定义
 */
export type DialogInstance = ComponentPublicInstance<Dialog, DialogProps, DialogExpose> & DialogInternalMethods
