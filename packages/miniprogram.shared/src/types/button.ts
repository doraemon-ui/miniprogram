/**
 * 微信开放能力的类型
 *
 * @export
 */
export type NativeButtonOpenType = 'contact' | 'share' | 'getPhoneNumber' | 'getUserInfo' |
  'launchApp' | 'openSetting' | 'feedback'

/**
 * 原生按钮组件的类型
 *
 * @export
 * @interface NativeButtonProps
 */
export interface NativeButtonProps {
  /** 按钮的大小 */
  size?: 'default' | 'mini'
  /** 按钮的样式类型 */
  type?: 'default' | 'primary' | 'warn'
  /** 按钮是否镂空，背景色透明 */
  plain?: boolean
  /** 是否禁用 */
  disabled?: boolean
  /** 名称前是否带 loading 图标 */
  loading?: boolean
  /** 用于 form 组件，点击分别会触发 form 组件的 submit/reset 事件 */
  formType?: 'submit' | 'reset'
  /** 微信开放能力 */
  openType?: NativeButtonOpenType
  /** 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果 */
  hoverClass?: string
  /** 指定是否阻止本节点的祖先节点出现点击态 */
  hoverStopPropagation?: boolean
  /** 按住后多久出现点击态，单位毫秒 */
  hoverStartTime?: number
  /** 手指松开后点击态保留时间，单位毫秒 */
  hoverStayTime?: number
  /** 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文 */
  lang?: 'en' | 'zh_CN' | 'zh_TW'
  /** 会话来源，open-type="contact"时有效 */
  sessionFrom?: string
  /** 会话内消息卡片标题，open-type="contact"时有效 */
  sendMessageTitle?: string
  /** 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效 */
  sendMessagePath?: string
  /** 会话内消息卡片图片，open-type="contact"时有效 */
  sendMessageImg?: string
  /** 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效 */
  appParameter?: string
  /** 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 */
  showMessageCard?: boolean
}

/**
 * 默认事件的类型
 *
 * @export
 */
export type DefaultButtonHandle<Button = NativeButtonProps, Detail = Record<string, any>> = (
  /** 按钮组件 */
  button?: Button,
  /** 索引值 */
  index?: number,
  /** 回调的 detail 数据 */
  detail?: Detail
) => void | Promise<void>

/**
 * 原生按钮组件的事件类型
 *
 * @export
 * @interface NativeButtonHandle
 * @template Button
 */
export interface NativeButtonHandle<Button = NativeButtonProps> {
  /** 点击事件 */
  onClick?: DefaultButtonHandle<Button, WechatMiniprogram.CustomEvent>
  /** 获取用户信息回调 */
  onGetUserInfo?: DefaultButtonHandle<Button, WechatMiniprogram.ButtonGetUserInfo>
  /** 客服消息回调 */
  onContact?: DefaultButtonHandle<Button, WechatMiniprogram.ButtonContact>
  /** 获取用户手机号回调 */
  onGetPhoneNumber?: DefaultButtonHandle<Button, WechatMiniprogram.ButtonGetPhoneNumber>
  /** 打开 APP 成功的回调 */
  onLaunchApp?: DefaultButtonHandle<Button, WechatMiniprogram.ButtonLaunchApp>
  /** 当使用开放能力时，发生错误的回调 */
  onError?: DefaultButtonHandle<Button, WechatMiniprogram.ButtonError>
  /** 在打开授权设置页后回调 */
  onOpenSetting?: DefaultButtonHandle<Button, WechatMiniprogram.ButtonOpenSetting>
}
