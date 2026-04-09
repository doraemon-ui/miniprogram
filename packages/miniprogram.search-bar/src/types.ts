import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { SearchBar } from './index'

/**
 * SearchBarProps接口定义
 */
export interface SearchBarProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 默认值
   *
   * @type {string}
   */
  defaultValue?: string

  /**
   * 当前值
   *
   * @type {string}
   */
  value?: string

  /**
   * 占位文案
   *
   * @type {string}
   */
  placeholder?: string

  /**
   * 占位样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   */
  placeholderStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * 占位类名
   *
   * @type {string}
   */
  placeholderClass?: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 最大输入长度
   *
   * @type {number}
   */
  maxlength?: number

  /**
   * 光标与键盘距离
   *
   * @type {number}
   */
  cursorSpacing?: number

  /**
   * 是否聚焦
   *
   * @type {boolean}
   */
  focus?: boolean

  /**
   * 键盘确认键类型
   *
   * @type {string}
   */
  confirmType?: string

  /**
   * 是否保持键盘不收起
   *
   * @type {boolean}
   */
  confirmHold?: boolean

  /**
   * 指定光标位置
   *
   * @type {number}
   */
  cursor?: number

  /**
   * 光标起始位置
   *
   * @type {number}
   */
  selectionStart?: number

  /**
   * 光标结束位置
   *
   * @type {number}
   */
  selectionEnd?: number

  /**
   * 键盘弹起时是否自动上推页面
   *
   * @type {boolean}
   */
  adjustPosition?: boolean

  /**
   * 是否显示清除按钮
   *
   * @type {boolean}
   */
  clear?: boolean

  /**
   * 取消按钮文案
   *
   * @type {string}
   */
  cancelText?: string

  /**
   * 是否显示取消按钮
   *
   * @type {boolean}
   */
  showCancel?: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * 是否仅在聚焦时显示清除按钮
   *
   * @type {boolean}
   */
  onlyShowClearWhenFocus?: boolean
}

/**
 * SearchBarExpose接口定义
 */
export interface SearchBarExpose {}

/**
 * SearchBarInstance类型定义
 */
export type SearchBarInstance = ComponentPublicInstance<SearchBar, SearchBarProps, SearchBarExpose>
