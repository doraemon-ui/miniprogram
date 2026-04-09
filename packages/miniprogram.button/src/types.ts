import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { NativeButtonOpenType, PresetColor } from '@doraemon-ui/miniprogram.shared'

import type { Button } from './index'

/**
 * ButtonProps接口定义
 */
export interface ButtonProps {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   */
  prefixCls?: string

  /**
   * 按钮颜色
   *
   * @type {PresetColor}
   */
  color?: PresetColor

  /**
   * 填充模式
   *
   * @type {('solid' | 'outline' | 'clear')}
   */
  fill?: 'solid' | 'outline' | 'clear'

  /**
   * 扩展模式
   *
   * @type {('block' | 'full')}
   */
  expand?: 'block' | 'full'

  /**
   * 按钮的形状
   *
   * @type {('rounded' | 'rectangular')}
   */
  shape?: 'rounded' | 'rectangular'

  /**
   * 按钮的大小
   *
   * @type {('small' | 'default' | 'large')}
   */
  size?: 'small' | 'default' | 'large'

  /**
   * 是否粗体字体
   *
   * @type {boolean}
   */
  strong?: boolean

  /**
   * 是否禁用按钮
   *
   * @type {boolean}
   */
  disabled?: boolean

  /**
   * 是否显示加载状态
   *
   * @type {boolean}
   */
  loading?: boolean

  /**
   * 用于 form 组件，点击后触发的表单事件类型
   *
   * @type {('submit' | 'reset')}
   */
  formType?: 'submit' | 'reset'

  /**
   * 微信开放能力
   *
   * @type {NativeButtonOpenType}
   */
  openType?: NativeButtonOpenType

  /**
   * 按钮按下时的自定义样式类
   *
   * @type {string}
   */
  hoverClass?: string

  /**
   * 是否阻止本节点的祖先节点出现点击态
   *
   * @type {boolean}
   */
  hoverStopPropagation?: boolean

  /**
   * 按住后多久出现点击态，单位毫秒
   *
   * @type {number}
   */
  hoverStartTime?: number

  /**
   * 手指松开后点击态保留时间，单位毫秒
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
   * 会话来源，open-type="contact" 时有效
   *
   * @type {string}
   */
  sessionFrom?: string

  /**
   * 会话内消息卡片标题，open-type="contact" 时有效
   *
   * @type {string}
   */
  sendMessageTitle?: string

  /**
   * 会话内消息卡片点击跳转小程序路径，open-type="contact" 时有效
   *
   * @type {string}
   */
  sendMessagePath?: string

  /**
   * 会话内消息卡片图片，open-type="contact" 时有效
   *
   * @type {string}
   */
  sendMessageImg?: string

  /**
   * 是否显示会话内消息卡片，open-type="contact" 时有效
   *
   * @type {boolean}
   */
  showMessageCard?: boolean

  /**
   * 当手机号快速验证或手机号实时验证额度用尽时，是否对用户展示额度提示
   *
   * @type {boolean}
   */
  phoneNumberNoQuotaToast?: boolean

  /**
   * 打开 APP 时向 APP 传递的参数，open-type="launchApp" 时有效
   *
   * @type {string}
   */
  appParameter?: string
}

/**
 * ButtonExpose接口定义
 */
export interface ButtonExpose {}

/**
 * ButtonInstance类型定义
 */
export type ButtonInstance = ComponentPublicInstance<Button, ButtonProps, ButtonExpose>
