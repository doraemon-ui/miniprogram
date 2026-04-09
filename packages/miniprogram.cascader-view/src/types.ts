import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { CascaderView } from './index'

/**
 * CascaderFieldNames接口定义
 */
export interface CascaderFieldNames {
  /**
   * label
   * @type {string}
   */
  label: string

  /**
   * value
   * @type {string}
   */
  value: string

  /**
   * children
   * @type {string}
   */
  children: string

  /**
   * disabled
   * @type {string}
   */
  disabled: string
}

/**
 * CascaderOption接口定义
 */
export interface CascaderOption {
  /**
   * key: string
   * @type {string]: unknown}
   */
  [key: string]: unknown

  /**
   * isLeaf
   * @type {boolean}
   */
  isLeaf?: boolean
}

/**
 * CascaderViewValue类型定义
 */
export type CascaderViewValue = string[]

/**
 * CascaderViewChangeDetail接口定义
 */
export interface CascaderViewChangeDetail {
  /**
   * value
   * @type {string[]}
   */
  value: string[]

  /**
   * options
   * @type {CascaderOption[]}
   */
  options: CascaderOption[]

  /**
   * done
   * @type {boolean}
   */
  done: boolean
}

/**
 * CascaderViewItemDataset接口定义
 */
export interface CascaderViewItemDataset {
  /**
   * optionIndex
   * @type {(string | number)}
   */
  optionIndex: string | number
}

/**
 * CascaderViewProps接口定义
 */
export interface CascaderViewProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 默认值（非受控）
   *
   * @type {string[]}
   */
  defaultValue?: CascaderViewValue

  /**
   * 当前值（受控）
   *
   * @type {string[]}
   */
  value?: CascaderViewValue

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * 级联选项
   *
   * @type {CascaderOption[]}
   */
  options?: CascaderOption[]

  /**
   * 是否占满宽度（双列布局变为单列）
   *
   * @type {boolean}
   */
  full?: boolean

  /**
   * 占位文案
   *
   * @type {string}
   */
  placeholder?: string

  /**
   * 自定义高度
   *
   * @type {(string | number)}
   */
  height?: string | number

  /**
   * 是否跳过动画
   *
   * @type {boolean}
   */
  skipAnimation?: boolean

  /**
   * 自定义字段名映射
   *
   * @type {Partial<CascaderFieldNames>}
   */
  defaultFieldNames?: Partial<CascaderFieldNames>
}

/**
 * CascaderViewExpose接口定义
 */
export interface CascaderViewExpose {
  /**
   * 获取当前选中值
   *
   * @return {CascaderViewChangeDetail}
   */
  getValue(activeValue?: CascaderViewValue): CascaderViewChangeDetail

  /**
   * 更新级联数据
   *
   * @return {void}
   */
  getCurrentOptions(activeValue?: CascaderViewValue): void
}

/**
 * CascaderViewInstance类型定义
 */
export type CascaderViewInstance = ComponentPublicInstance<CascaderView, CascaderViewProps, CascaderViewExpose>
