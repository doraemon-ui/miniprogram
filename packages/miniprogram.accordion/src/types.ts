import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Accordion } from './index'
import type { AccordionPanel } from './panel'

/**
 * AccordionProps接口定义
 */
export interface AccordionProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 默认激活 tab 面板的 key，当 `controlled` 为 `false` 时才生效
   *
   * @type {string[]}
   */
  defaultCurrent?: string[]

  /**
   * 用于手动激活 tab 面板的 key，当 `controlled` 为 `true` 时才生效
   *
   * @type {string[]}
   */
  current?: string[]

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean

  /**
   * 是否手风琴模式
   *
   * @type {boolean}
   */
  accordion?: boolean

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
}

/**
 * AccordionExpose接口定义
 */
export interface AccordionExpose {}

/**
 * AccordionInternalMethods接口定义
 */
export interface AccordionInternalMethods {
  /**
   * 点击面板项
   *
   * @return {void}
   */
  onClickItem(key: string): void
}

/**
 * AccordionInstance类型定义
 */
export type AccordionInstance = ComponentPublicInstance<Accordion, AccordionProps, AccordionExpose> & AccordionInternalMethods

/**
 * AccordionPanelProps接口定义
 */
export interface AccordionPanelProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 当前激活 tab 索引
   *
   * @type {string}
   */
  key?: string

  /**
   * 左侧缩略图
   *
   * @type {string}
   */
  thumb?: string

  /**
   * 左侧标题
   *
   * @type {string}
   */
  title?: string

  /**
   * 面板内容
   *
   * @type {string}
   */
  content?: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否显示箭头图标
   *
   * @type {boolean}
   */
  showArrow?: boolean
}

/**
 * AccordionPanelExpose接口定义
 */
export interface AccordionPanelExpose {}

/**
 * AccordionPanelInternalMethods接口定义
 */
export interface AccordionPanelInternalMethods {
  /**
   * 更新激活状态与索引
   *
   * @return {void}
   */
  updateCurrentAndIndex(current: boolean, index: string): void

  /**
   * $data
   * @type {Record<string, any>}
   */
  $data: Record<string, any>
}

/**
 * PanelInstance类型定义
 */
export type PanelInstance = ComponentPublicInstance<AccordionPanel, AccordionPanelProps, AccordionPanelExpose> &
  AccordionPanelInternalMethods
