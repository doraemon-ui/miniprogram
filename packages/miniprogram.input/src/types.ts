import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Input } from './index'

/**
 * InputType类型定义
 */
export type InputType = 'text' | 'number' | 'idcard' | 'digit' | 'safe-password' | 'nickname'

/**
 * PlaceholderStyle类型定义
 */
export type PlaceholderStyle = string | Partial<CSSStyleDeclaration>

/**
 * InputProps接口定义
 */
export interface InputProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * type
   * @type {InputType}
   */
  type?: InputType

  /**
   * password
   * @type {boolean}
   */
  password?: boolean

  /**
   * placeholder
   * @type {string}
   */
  placeholder?: string

  /**
   * placeholderStyle
   * @type {PlaceholderStyle}
   */
  placeholderStyle?: PlaceholderStyle

  /**
   * placeholderClass
   * @type {string}
   */
  placeholderClass?: string

  /**
   * maxlength
   * @type {number}
   */
  maxlength?: number

  /**
   * cursorSpacing
   * @type {number}
   */
  cursorSpacing?: number

  /**
   * focus
   * @type {boolean}
   */
  focus?: boolean

  /**
   * confirmType
   * @type {string}
   */
  confirmType?: string

  /**
   * alwaysEmbed
   * @type {boolean}
   */
  alwaysEmbed?: boolean

  /**
   * confirmHold
   * @type {boolean}
   */
  confirmHold?: boolean

  /**
   * cursor
   * @type {number}
   */
  cursor?: number

  /**
   * selectionStart
   * @type {number}
   */
  selectionStart?: number

  /**
   * selectionEnd
   * @type {number}
   */
  selectionEnd?: number

  /**
   * adjustPosition
   * @type {boolean}
   */
  adjustPosition?: boolean

  /**
   * holdKeyboard
   * @type {boolean}
   */
  holdKeyboard?: boolean

  /**
   * safePasswordCertPath
   * @type {string | null}
   */
  safePasswordCertPath?: string | null

  /**
   * safePasswordLength
   * @type {number | null}
   */
  safePasswordLength?: number | null

  /**
   * safePasswordTimeStamp
   * @type {number | null}
   */
  safePasswordTimeStamp?: number | null

  /**
   * safePasswordNonce
   * @type {string | null}
   */
  safePasswordNonce?: string | null

  /**
   * safePasswordSalt
   * @type {string | null}
   */
  safePasswordSalt?: string | null

  /**
   * safePasswordCustomHash
   * @type {string | null}
   */
  safePasswordCustomHash?: string | null

  /**
   * label
   * @type {string}
   */
  label?: string

  /**
   * extra
   * @type {string}
   */
  extra?: string

  /**
   * defaultValue
   * @type {string}
   */
  defaultValue?: string

  /**
   * value
   * @type {string}
   */
  value?: string

  /**
   * controlled
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * disabled
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * readOnly
   * @type {boolean}
   */
  readOnly?: boolean

  /**
   * clear
   * @type {boolean}
   */
  clear?: boolean

  /**
   * error
   * @type {boolean}
   */
  error?: boolean

  /**
   * labelWrap
   * @type {boolean}
   */
  labelWrap?: boolean

  /**
   * requiredMark
   * @type {boolean}
   */
  requiredMark?: boolean

  /**
   * onlyShowClearWhenFocus
   * @type {boolean}
   */
  onlyShowClearWhenFocus?: boolean

  /**
   * min
   * @type {number | null}
   */
  min?: number | null

  /**
   * max
   * @type {number | null}
   */
  max?: number | null

  /**
   * visibilityToggle
   * @type {boolean}
   */
  visibilityToggle?: boolean
}

/**
 * InputExpose接口定义
 */
export interface InputExpose {}

/**
 * InputInstance类型定义
 */
export type InputInstance = ComponentPublicInstance<Input, InputProps, InputExpose>
