import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Avatar } from './index'

/**
 * AvatarProps接口定义
 */
export interface AvatarProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 头像形状
   *
   * @type {('circle' | 'square')}
   */
  shape?: 'circle' | 'square'

  /**
   * 头像尺寸
   *
   * @type {('small' | 'default' | 'large')}
   */
  size?: 'small' | 'default' | 'large'

  /**
   * 图片地址
   *
   * @type {string}
   */
  src?: string

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   */
  bodyStyle?: string | Partial<CSSStyleDeclaration>

  /**
   * 是否自动缩放文字以适应头像尺寸
   *
   * @type {boolean}
   */
  scale?: boolean
}

/**
 * AvatarExpose接口定义
 */
export interface AvatarExpose {}

/**
 * AvatarInstance类型定义
 */
export type AvatarInstance = ComponentPublicInstance<Avatar, AvatarProps, AvatarExpose>
