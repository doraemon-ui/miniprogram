import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type {
  DefaultButtonHandle,
  MiniprogramPublicInstance,
  NativeButtonEvent,
  NativeButtonHandle,
  NativeButtonProps,
} from '@doraemon-ui/miniprogram.shared'

import type { ActionSheet } from './index'

export type { DefaultButtonHandle, NativeButtonHandle, NativeButtonEvent }

/**
 * 操作按钮的类型
 */
export type ActionSheetButton = Omit<NativeButtonProps, 'size' | 'type' | 'plain' | 'loading'> & {
  /**
   * 按钮文本
   */
  text?: string
  /**
   * 按钮图标
   */
  icon?: string
  /**
   * 类名
   */
  className?: string
} & NativeButtonHandle<ActionSheetButton>

/**
 * 动作面板对应参数的类型
 */
export interface ActionSheetProps {
  /**
   * 自定义类名前缀
   */
  prefixCls?: string

  /**
   * 主题风格
   */
  theme?: 'ios' | 'wx'

  /**
   * 标题文本
   */
  titleText?: string

  /**
   * 操作按钮列表
   */
  buttons?: ActionSheetButton[]

  /**
   * 取消按钮文本
   */
  cancelText?: string

  /**
   * 删除按钮文本
   */
  destructiveText?: string

  /**
   * 是否可见
   */
  visible?: boolean
}

/**
 * 动作面板的选项
 */
export interface ActionSheetShowOptions {
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
export interface ActionSheetShowProps extends Omit<ActionSheetProps, 'visible'> {
  /**
   * 按钮点击的回调函数
   */
  onAction?: (detail: { method: string; button: ActionSheetButton; index: number; detail?: any }) => void

  /**
   * 取消按钮点击的回调函数
   */
  onCancel?: () => void

  /**
   * 删除按钮点击的回调函数
   */
  onDestructive?: () => void

  /**
   * 关闭的回调函数
   */
  onClose?: () => void

  /**
   * 关闭后的回调函数
   */
  onClosed?: () => void
}

/**
 * ActionSheetExpose接口定义
 */
export interface ActionSheetExpose {}

/**
 * ActionSheetInternalMethods接口定义
 */
export interface ActionSheetInternalMethods {
  onClose: () => void
  onCancel: () => void
  onPopupClosed: () => void
  onDestructiveClick: () => void
}

/**
 * ActionSheetInstance类型定义
 */
export type ActionSheetInstance = ComponentPublicInstance<ActionSheet, ActionSheetProps, ActionSheetExpose> & ActionSheetInternalMethods
