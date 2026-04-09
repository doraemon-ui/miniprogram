import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'

import type { Skeleton } from './index'
import type { SkeletonAvatar } from './skeleton-avatar'
import type { SkeletonParagraph } from './skeleton-paragraph'

/**
 * SkeletonProps接口定义
 */
export interface SkeletonProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 是否展示动画
   *
   * @type {boolean}
   */
  active?: boolean
}

/**
 * SkeletonExpose接口定义
 */
export interface SkeletonExpose {}

/**
 * SkeletonInstance类型定义
 */
export type SkeletonInstance = ComponentPublicInstance<Skeleton, SkeletonProps, SkeletonExpose>

/**
 * SkeletonAvatarProps接口定义
 */
export interface SkeletonAvatarProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 头像尺寸
   *
   * @type {string}
   */
  size?: string

  /**
   * 头像形状
   *
   * @type {string}
   */
  shape?: string

  /**
   * 是否展示动画
   *
   * @type {boolean}
   */
  active?: boolean
}

/**
 * SkeletonAvatarExpose接口定义
 */
export interface SkeletonAvatarExpose {}

/**
 * SkeletonAvatarInstance类型定义
 */
export type SkeletonAvatarInstance = ComponentPublicInstance<SkeletonAvatar, SkeletonAvatarProps, SkeletonAvatarExpose>

/**
 * SkeletonParagraphProps接口定义
 */
export interface SkeletonParagraphProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 段落行数
   *
   * @type {number}
   */
  rows?: number

  /**
   * 段落是否圆角
   *
   * @type {boolean}
   */
  rounded?: boolean

  /**
   * 是否展示动画
   *
   * @type {boolean}
   */
  active?: boolean
}

/**
 * SkeletonParagraphExpose接口定义
 */
export interface SkeletonParagraphExpose {}

/**
 * SkeletonParagraphInstance类型定义
 */
export type SkeletonParagraphInstance = ComponentPublicInstance<SkeletonParagraph, SkeletonParagraphProps, SkeletonParagraphExpose>
