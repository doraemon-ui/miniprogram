import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Cascader } from './index'

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
 * CascaderValue类型定义
 */
export type CascaderValue = string[]

/**
 * CascaderChangeDetail接口定义
 */
export interface CascaderChangeDetail {
  /**
   * value
   * @type {CascaderValue}
   */
  value: CascaderValue

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
 * CascaderViewPublicInstance接口定义
 */
export interface CascaderViewPublicInstance {
  getValue: (activeValue?: CascaderValue) => CascaderChangeDetail
}

/**
 * CascaderProps接口定义
 */
export interface CascaderProps {
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
  defaultValue?: CascaderValue

  /**
   * 当前值（受控）
   *
   * @type {string[]}
   */
  value?: CascaderValue

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * 标题
   *
   * @type {string}
   */
  title?: string

  /**
   * 取消按钮文字
   *
   * @type {string}
   */
  cancelText?: string

  /**
   * 确定按钮文字
   *
   * @type {string}
   */
  confirmText?: string

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
   * 自定义高度
   *
   * @type {(string | number)}
   */
  height?: string | number

  /**
   * 未选择时的占位文案
   *
   * @type {string}
   */
  chooseTitle?: string

  /**
   * 是否显示
   *
   * @type {boolean}
   */
  visible?: boolean

  /**
   * 是否跳过动画
   *
   * @type {boolean}
   */
  skipAnimation?: boolean

  /**
   * 自定义字段名映射（透传给 `dora-cascader-view`）
   *
   * @type {Partial<CascaderFieldNames>}
   */
  defaultFieldNames?: Partial<CascaderFieldNames>
}

/**
 * CascaderExpose接口定义
 */
export interface CascaderExpose {
  /**
   * 获取当前选择的值与选项信息
   *
   * @return {(CascaderChangeDetail | null)}
   */
  getValue(value?: CascaderValue): CascaderChangeDetail | null

  /**
   * 组件关闭时的回调函数
   *
   * @return {void}
   */
  close(): void
}

/**
 * CascaderInstance类型定义
 */
export type CascaderInstance = ComponentPublicInstance<Cascader, CascaderProps, CascaderExpose>
