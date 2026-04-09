import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'
import type { CheckboxGroup } from './group'
import type { Checkbox } from './index'

/**
 * CheckboxIconPosition类型定义
 */
export type CheckboxIconPosition = 'left' | 'right'

/**
 * CheckboxContext接口定义
 */
export interface CheckboxContext {
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
   * @type {CheckboxIconPosition}
   */
  iconPosition?: CheckboxIconPosition

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
 * CheckboxProps接口定义
 */
export interface CheckboxProps {
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
   * 额外信息（仅在 `withListComponent` 且 `iconPosition='left'` 时展示）
   *
   * @type {string}
   */
  extra?: string

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
 * CheckboxExpose接口定义
 */
export interface CheckboxExpose {
  /**
   * 更新内部值
   *
   * @return {void}
   */
  changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: CheckboxContext): void

  /**
   * 设置选中状态
   *
   * @return {void}
   */
  setChecked(checked: boolean): void

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
}

/**
 * CheckboxInternalMethods接口定义
 */
export interface CheckboxInternalMethods {
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

  /**
   * $data
   * @type {CheckboxProps}
   */
  $data: CheckboxProps
  changeValue(inputChecked?: boolean, index?: number, isLast?: boolean, context?: CheckboxContext): void
}

/**
 * CheckboxInstance类型定义
 */
export type CheckboxInstance = ComponentPublicInstance<Checkbox, CheckboxProps, CheckboxExpose> & CheckboxInternalMethods

/**
 * CheckboxGroupOption类型定义
 */
export type CheckboxGroupOption = string | CheckboxProps

/**
 * NormalizedCheckboxGroupOption类型定义
 */
export type NormalizedCheckboxGroupOption = Exclude<CheckboxGroupOption, string> & {
  index: number
  __comp_unique_key: string | number
  title: string
  value: string
  __checked: boolean
}

/**
 * CheckboxGroupProps接口定义
 */
export interface CheckboxGroupProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * `dora-list` 组件的类名前缀
   *
   * @type {string}
   */
  cellGroupPrefixCls?: string

  /**
   * 当前选中的值（受控）
   *
   * @type {string[]}
   */
  value?: string[]

  /**
   * 表单字段名
   *
   * @type {string}
   */
  name?: string

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
   * 选项列表（支持 slot 或 options 传入）
   *
   * @type {CheckboxGroupOption[]}
   */
  options?: CheckboxGroupOption[]

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
   * list 组件的模式
   *
   * @type {string}
   */
  mode?: string

  /**
   * 自定义 body 样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   */
  bodyStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   */
  hasLine?: boolean

  /**
   * 是否使用 `dora-list` 组件包裹
   *
   * @type {boolean}
   */
  withListComponent?: boolean

  /**
   * 图标位置
   *
   * @type {CheckboxIconPosition}
   */
  iconPosition?: CheckboxIconPosition

  /**
   * 图标大小
   *
   * @type {string}
   */
  iconSize?: string

  /**
   * 选中图标
   *
   * @type {string}
   */
  iconOn?: string

  /**
   * 未选中图标
   *
   * @type {string}
   */
  iconOff?: string
}

/**
 * CheckboxGroupExpose接口定义
 */
export interface CheckboxGroupExpose {
  /**
   * 同步子组件状态
   *
   * @return {void}
   */
  changeValue(props?: Partial<{ value: string[] }>): void

  /**
   * 获取当前值
   *
   * @return {{ value: string[]; displayValue: string[]; selectedIndex: number[]; selectedValue: string[]; cols: CheckboxProps[] }}
   */
  getValue(
    /**
     * value
     * @type {string[]}
     */
    value?: string[],

    /**
     * cols
     * @type {CheckboxProps[]}
     */
    cols?: CheckboxProps[],

    /**
     * 属性
     * @type {{}
     */
  ): {
    value: string[]
    displayValue: string[]
    selectedIndex: number[]
    selectedValue: string[]
    cols: CheckboxProps[]
  }
  /**
   * 组选项变化事件
   *
   * @return {void}
   */
  onChange(item: CheckboxChangeItem): void
  /**
   * 获取组件尺寸
   *
   * @return {Promise<MiniprogramDOMRect>}
   */
  getBoundingClientRect(): Promise<MiniprogramDOMRect>
}

/**
 * CheckboxGroupInternalMethods接口定义
 */
export interface CheckboxGroupInternalMethods {
  onChange(item: CheckboxChangeItem): void
}

/**
 * CheckboxGroupInstance类型定义
 */
export type CheckboxGroupInstance = ComponentPublicInstance<CheckboxGroup, CheckboxGroupProps, CheckboxGroupExpose> &
  CheckboxGroupInternalMethods

/**
 * CheckboxChangeItem接口定义
 */
export interface CheckboxChangeItem {
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
 * CheckboxChangeDetail接口定义
 */
export interface CheckboxChangeDetail {
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
