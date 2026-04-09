import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect, NativeButtonOpenType, NativeRouteOpenType } from '@doraemon-ui/miniprogram.shared'

import type { List } from './index'
import type { ListItem } from './item'

/**
 * ListItemProps接口定义
 */
export interface ListItemProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

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
   * 标题下方的描述信息
   *
   * @type {string}
   */
  label?: string

  /**
   * 右侧内容
   *
   * @type {string}
   */
  extra?: string

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   */
  hasLine?: boolean

  /**
   * 是否展示右侧箭头并开启尝试以 url 跳转
   *
   * @type {boolean}
   */
  isLink?: boolean

  /**
   * 对齐方式
   *
   * @type {('flex-start' | 'center')}
   */
  align?: 'flex-start' | 'center'

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: Partial<CSSStyleDeclaration>

  /**
   * 跳转链接
   *
   * @type {string}
   */
  url?: string

  /**
   * 跳转参数
   *
   * @type {object}
   */
  urlParams?: object

  /**
   * 页面返回层级，openType 为 navigateBack 时有效
   *
   * @type {number}
   */
  delta?: number

  /**
   * 是否禁用
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 微信开放能力或路由打开方式
   *
   * @type {(NativeButtonOpenType | NativeRouteOpenType)}
   */
  openType?: NativeButtonOpenType | NativeRouteOpenType

  /**
   * 点击态类名
   *
   * @type {string}
   */
  hoverClass?: string

  /**
   * 是否阻止祖先节点点击态
   *
   * @type {boolean}
   */
  hoverStopPropagation?: boolean

  /**
   * 点击态延时出现时间
   *
   * @type {number}
   */
  hoverStartTime?: number

  /**
   * 点击态保留时间
   *
   * @type {number}
   */
  hoverStayTime?: number

  /**
   * 指定返回用户信息的语言
   *
   * @type {('en' | 'zh_CN' | 'zh_TW')}
   */
  lang?: 'en' | 'zh_CN' | 'zh_TW'

  /**
   * 会话来源
   *
   * @type {string}
   */
  sessionFrom?: string

  /**
   * 会话内消息卡片标题
   *
   * @type {string}
   */
  sendMessageTitle?: string

  /**
   * 会话内消息卡片跳转路径
   *
   * @type {string}
   */
  sendMessagePath?: string

  /**
   * 会话内消息卡片图片
   *
   * @type {string}
   */
  sendMessageImg?: string

  /**
   * 是否显示会话内消息卡片
   *
   * @type {boolean}
   */
  showMessageCard?: boolean

  /**
   * 手机号额度用尽时是否弹 toast
   *
   * @type {boolean}
   */
  phoneNumberNoQuotaToast?: boolean

  /**
   * 打开 APP 时传递参数
   *
   * @type {string}
   */
  appParameter?: string
}

/**
 * ListItemExpose接口定义
 */
export interface ListItemExpose {
  /**
   * 更新当前项是否是最后一项
   *
   * @param {boolean} isLast
   * @return {void}
   */
  updateIsLast(isLast: boolean): void
}

/**
 * ListItemInstance类型定义
 */
export type ListItemInstance = ComponentPublicInstance<ListItem, ListItemProps, ListItemExpose>

/**
 * ListProps接口定义
 */
export interface ListProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

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
   * 支持默认和卡片两种模式
   *
   * @type {('default' | 'card')}
   */
  mode?: 'default' | 'card'

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   */
  hasLine?: boolean

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  wrapStyle?: Partial<CSSStyleDeclaration>

  /**
   * 自定义 body 样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   */
  bodyStyle?: Partial<CSSStyleDeclaration>
}

/**
 * ListExpose接口定义
 */
export interface ListExpose {
  /**
   * 获取组件尺寸
   *
   * @return {Promise<MiniprogramDOMRect>}
   */
  getBoundingClientRect(): Promise<MiniprogramDOMRect>
}

/**
 * ListInstance类型定义
 */
export type ListInstance = ComponentPublicInstance<List, ListProps, ListExpose>
