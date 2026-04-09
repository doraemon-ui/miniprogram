import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'

import type { RadioGroup } from './group'
import type { Radio } from './index'

/**
 * RadioIconPosition类型定义
 */
export type RadioIconPosition = 'left' | 'right'

/**
 * RadioContext接口定义
 */
export interface RadioContext {
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
   * hasLine
   * @type {boolean}
   */
  hasLine?: boolean

  /**
   * hasFieldDecorator
   * @type {boolean}
   */
  hasFieldDecorator?: boolean

  /**
   * withListComponent
   * @type {boolean}
   */
  withListComponent?: boolean

  /**
   * iconPosition
   * @type {RadioIconPosition}
   */
  iconPosition?: RadioIconPosition

  /**
   * iconSize
   * @type {string}
   */
  iconSize?: string

  /**
   * iconOn
   * @type {string}
   */
  iconOn?: string

  /**
   * iconOff
   * @type {string}
   */
  iconOff?: string
}

/**
 * SelectableChangeDetail接口定义
 */
export interface SelectableChangeDetail {
  /**
   * checked
   * @type {boolean}
   */
  checked: boolean

  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * type
   * @type {string}
   */
  type: string
}

/**
 * RadioChangeItem接口定义
 */
export interface RadioChangeItem {
  /**
   * checked
   * @type {boolean}
   */
  checked: boolean

  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * index
   * @type {number}
   */
  index: number
}

/**
 * RadioProps接口定义
 */
export interface RadioProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * `dora-list-item` 组件的类名前缀
   *
   * @type {string}
   */
  cellPrefixCls?: string

  /**
   * `dora-selectable` 组件的类名前缀
   *
   * @type {string}
   */
  selectablePrefixCls?: string

  /**
   * 缩略图
   *
   * @type {string}
   */
  thumb?: string

  /**
   * 标题
   *
   * @type {string}
   */
  title?: string

  /**
   * 描述
   *
   * @type {string}
   */
  label?: string

  /**
   * 值
   *
   * @type {string}
   */
  value?: string

  /**
   * 是否选中（受控）
   *
   * @type {boolean}
   */
  checked?: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   */
  readOnly?: boolean

  /**
   * 选中颜色，支持预设色值或自定义色值
   *
   * @type {string}
   */
  color?: string

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   */
  wrapStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   */
  hasLine?: boolean
}

/**
 * RadioExpose接口定义
 */
export interface RadioExpose {
  /**
   * 选中
   *
   * @return {void}
   */
  check(): void

  /**
   * 取消选中
   *
   * @return {void}
   */
  uncheck(): void

  /**
   * 切换选中状态
   *
   * @return {void}
   */
  toggle(): void

  /**
   * 设置选中状态
   *
   * @return {void}
   */
  setChecked(inputChecked: boolean): void

  /**
   * 更新值
   *
   * @return {void}
   */
  changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: RadioContext): void
}

/**
 * RadioInternalMethods接口定义
 */
export interface RadioInternalMethods {
  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * title
   * @type {string}
   */
  title: string
  changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: RadioContext): void
}

/**
 * RadioInstance类型定义
 */
export type RadioInstance = ComponentPublicInstance<Radio, RadioProps, RadioExpose> & RadioInternalMethods

/**
 * RadioGroupOption类型定义
 */
export type RadioGroupOption = string | RadioProps

/**
 * NormalizedRadioGroupOption类型定义
 */
export type NormalizedRadioGroupOption = Exclude<RadioGroupOption, string> & {
  /**
   * index
   * @type {number}
   */
  index: number

  /**
   * __comp_unique_key
   * @type {(string | number)}
   */
  __comp_unique_key: string | number

  /**
   * title
   * @type {string}
   */
  title: string

  /**
   * value
   * @type {string}
   */
  value: string
}

/**
 * RadioChildLike接口定义
 */
export interface RadioChildLike {
  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * title
   * @type {string}
   */
  title: string
  changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: RadioContext): void
}

/**
 * RenderProxyWithComponent接口定义
 */
export interface RenderProxyWithComponent {
  /**
   * $component
   * @type {unknown}
   */
  $component?: unknown
}

/**
 * RenderProxySelector接口定义
 */
export interface RenderProxySelector {
  /**
   * selectAllComponents
   * @type {(selector: string) => unknown[]}
   */
  selectAllComponents?: (selector: string) => unknown[]
  getRelationNodes(path: string): unknown[]
}

/**
 * RadioGroupDatasetIndex接口定义
 */
export interface RadioGroupDatasetIndex {
  /**
   * index
   * @type {number}
   */
  index?: number
}

/**
 * RadioGroupProps接口定义
 */
export interface RadioGroupProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * cellGroupPrefixCls
   * @type {string}
   */
  cellGroupPrefixCls?: string

  /**
   * value
   * @type {string}
   */
  value?: string

  /**
   * name
   * @type {string}
   */
  name?: string

  /**
   * title
   * @type {string}
   */
  title?: string

  /**
   * label
   * @type {string}
   */
  label?: string

  /**
   * options
   * @type {RadioGroupOption[]}
   */
  options?: RadioGroupOption[]

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
   * mode
   * @type {string}
   */
  mode?: string

  /**
   * bodyStyle
   * @type {string | Partial<CSSStyleDeclaration>}
   */
  bodyStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * hasLine
   * @type {boolean}
   */
  hasLine?: boolean

  /**
   * withListComponent
   * @type {boolean}
   */
  withListComponent?: boolean

  /**
   * iconPosition
   * @type {RadioIconPosition}
   */
  iconPosition?: RadioIconPosition

  /**
   * iconSize
   * @type {string}
   */
  iconSize?: string

  /**
   * iconOn
   * @type {string}
   */
  iconOn?: string

  /**
   * iconOff
   * @type {string}
   */
  iconOff?: string
}

/**
 * RadioGroupExpose接口定义
 */
export interface RadioGroupExpose {
  /**
   * 获取当前值
   *
   * @return {{
   *    value: string
   *    displayValue: string
   *    selectedIndex: number
   *    selectedValue: string
   *    cols: Array<{ title: string; value: string }>
   *  }}
   */
  getValue(
    /**
     * value
     * @type {string}
     */
    value?: string,

    /**
     * cols
     * @type {Array<{ title: string; value: string }>}
     */
    cols?: Array<{ title: string; value: string }>,

    /**
     * 属性
     * @type {{}
     */
  ): {
    value: string
    displayValue: string
    selectedIndex: number
    selectedValue: string
    cols: Array<{ title: string; value: string }>
  }
  /**
   * 获取组件尺寸
   *
   * @return {Promise<MiniprogramDOMRect>}
   */
  getBoundingClientRect(): Promise<MiniprogramDOMRect>
  /**
   * 更新值
   *
   * @return {void}
   */
  changeValue(props?: Partial<{ value: string }>): void
}

/**
 * RadioGroupInternalMethods接口定义
 */
export interface RadioGroupInternalMethods {
  onChange(item: RadioChangeItem): void
}

/**
 * RadioGroupInstance类型定义
 */
export type RadioGroupInstance = ComponentPublicInstance<RadioGroup, RadioGroupProps, RadioGroupExpose> & RadioGroupInternalMethods
