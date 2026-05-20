import type { ComponentPublicInstance, CSSStylePropertiesWithVars } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { Tag } from './index'

export type SemanticName = 'root' | 'icon'

/**
 * TagProps接口定义
 */
export interface TagProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string
  classNames?: Partial<Record<SemanticName, string>>
  styles?: Partial<Record<SemanticName, CSSStylePropertiesWithVars>>

  /**
   * 点击态类名
   *
   * @type {string}
   */
  hoverClass?: string

  /**
   * 标签颜色
   *
   * @type {(PresetColor | string)}
   */
  color?: PresetColor | string

  /**
   * 填充类型
   *
   * @type {('fill' | 'solid' | 'outline')}
   */
  fill?: 'fill' | 'solid' | 'outline'

  /**
   * 是否可关闭
   *
   * @type {boolean}
   */
  closable?: boolean

  /**
   * 默认是否可见
   *
   * @type {boolean}
   */
  defaultVisible?: boolean

  /**
   * 是否可见
   *
   * @type {boolean}
   */
  visible?: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   */
  controlled?: boolean
}

/**
 * TagExpose接口定义
 */
export interface TagExpose {}

/**
 * TagInstance类型定义
 */
export type TagInstance = ComponentPublicInstance<Tag, TagProps, TagExpose>
