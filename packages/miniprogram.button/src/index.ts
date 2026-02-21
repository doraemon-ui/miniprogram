import { type CustomEvent, defineComponentHOC, Doraemon, Component, Event, Emit, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { PresetColor, NativeButtonOpenType } from '@doraemon-ui/miniprogram.shared'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-button',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    formType: {
      type: String,
      default: '',
    },
    openType: {
      type: String,
      default: '',
    },
    hoverClass: {
      type: String,
      default: 'default',
    },
    hoverStopPropagation: {
      type: Boolean,
      default: false,
    },
    hoverStartTime: {
      type: Number,
      default: 20,
    },
    hoverStayTime: {
      type: Number,
      default: 70,
    },
    lang: {
      type: String,
      default: 'en',
    },
    sessionFrom: {
      type: String,
      default: '',
    },
    sendMessageTitle: {
      type: String,
      default: '',
    },
    sendMessagePath: {
      type: String,
      default: '',
    },
    sendMessageImg: {
      type: String,
      default: '',
    },
    showMessageCard: {
      type: Boolean,
      default: false,
    },
    phoneNumberNoQuotaToast: {
      type: Boolean,
      default: true,
    },
    appParameter: {
      type: String,
      default: '',
    },
  },
})
class Button extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Button
   */
  prefixCls!: string

  /**
   * 按钮颜色
   *
   * @type {PresetColor}
   * @memberof Button
   */
  @Prop({
    type: String,
    default: 'positive',
  })
  color: PresetColor

  /**
   * 填充模式
   *
   * @type {('solid' | 'outline' | 'clear')}
   * @memberof Button
   */
  @Prop({
    type: String,
    default: 'solid',
  })
  fill: 'solid' | 'outline' | 'clear'

  /**
   * 扩展模式
   *
   * @type {('block' | 'full')}
   * @memberof Button
   */
  @Prop({
    type: String,
    default: '',
  })
  expand: 'block' | 'full'

  /**
   * 按钮的形状
   *
   * @type {('rounded' | 'rectangular')}
   * @memberof Button
   */
  @Prop({
    type: String,
    default: '',
  })
  shape: 'rounded' | 'rectangular'

  /**
   * 按钮的大小
   *
   * @type {('small' | 'default' | 'large')}
   * @memberof Button
   */
  @Prop({
    type: String,
    default: 'default',
  })
  size: 'small' | 'default' | 'large'

  /**
   * 是否粗体字体
   *
   * @type {boolean}
   * @memberof Button
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  strong: boolean

  // native button props
  // @see https://developers.weixin.qq.com/miniprogram/dev/component/button.html

  /**
   * 是否禁用按钮
   *
   * @type {boolean}
   * @default false
   * @memberof Button
   */
  disabled!: boolean

  /**
   * 是否显示加载状态
   *
   * @type {boolean}
   * @default false
   * @memberof Button
   */
  loading!: boolean

  /**
   * 用于 form 组件，点击后触发的表单事件类型
   *
   * @type {('submit' | 'reset')}
   * @default ''
   * @memberof Button
   */
  formType!: 'submit' | 'reset'

  /**
   * 微信开放能力
   *
   * @type {NativeButtonOpenType}
   * @default ''
   * @see https://developers.weixin.qq.com/miniprogram/dev/component/button.html
   * @memberof Button
   */
  openType!: NativeButtonOpenType

  /**
   * 按钮按下时的自定义样式类
   *
   * @type {string}
   * @default 'default'
   * @memberof Button
   */
  hoverClass!: string

  /**
   * 是否阻止本节点的祖先节点出现点击态
   *
   * @type {boolean}
   * @default false
   * @memberof Button
   */
  hoverStopPropagation!: boolean

  /**
   * 按住后多久出现点击态，单位毫秒
   *
   * @type {number}
   * @default 20
   * @memberof Button
   */
  hoverStartTime!: number

  /**
   * 手指松开后点击态保留时间，单位毫秒
   *
   * @type {number}
   * @default 70
   * @memberof Button
   */
  hoverStayTime!: number

  /**
   * 指定返回用户信息的语言
   *
   * @type {('en' | 'zh_CN' | 'zh_TW')}
   * @default 'en'
   * @memberof Button
   */
  lang!: 'en' | 'zh_CN' | 'zh_TW'

  /**
   * 会话来源，open-type="contact" 时有效
   *
   * @type {string}
   * @default ''
   * @memberof Button
   */
  sessionFrom!: string

  /**
   * 会话内消息卡片标题，open-type="contact" 时有效
   *
   * @type {string}
   * @default ''
   * @memberof Button
   */
  sendMessageTitle!: string

  /**
   * 会话内消息卡片点击跳转小程序路径，open-type="contact" 时有效
   *
   * @type {string}
   * @default ''
   * @memberof Button
   */
  sendMessagePath!: string

  /**
   * 会话内消息卡片图片，open-type="contact" 时有效
   *
   * @type {string}
   * @default ''
   * @memberof Button
   */
  sendMessageImg!: string

  /**
   * 是否显示会话内消息卡片，open-type="contact" 时有效
   *
   * @type {boolean}
   * @default false
   * @memberof Button
   */
  showMessageCard!: boolean

  /**
   * 当手机号快速验证或手机号实时验证额度用尽时，是否对用户展示"申请获取你的手机号，但该功能使用次数已达当前体验版 / 日 / 月上限"的toast提示
   *
   * @type {boolean}
   * @default true
   * @memberof Button
   */
  phoneNumberNoQuotaToast!: boolean

  /**
   * 打开 APP 时向 APP 传递的参数，open-type="launchApp" 时有效
   *
   * @type {string}
   * @default ''
   * @memberof Button
   */
  appParameter!: string

  /**
   * 计算按钮的 CSS 类名
   *
   * @description 根据组件属性动态生成按钮的包裹类名和点击态类名
   * @readonly
   * @returns {{ wrap: string, hover: string }} 包含 wrap（按钮类名）和 hover（点击态类名）的对象
   * @memberof Button
   */
  get classes() {
    const { prefixCls, hoverClass, color, size, fill, expand, shape, strong, disabled } = this
    const finalSize = ['small', 'large'].includes(size) ? size : ''
    const finalFill = ['solid', 'outline', 'clear'].includes(fill) ? fill : ''
    const finalExpand = ['block', 'full'].includes(expand) ? expand : ''
    const finalShape = ['rounded', 'rectangular'].includes(shape) ? shape : ''
    const wrap = classNames(prefixCls, {
      ['dora-color']: color,
      [`dora-color--${color}`]: color,
      [`${prefixCls}--${size}`]: finalSize,
      [`${prefixCls}--${fill}`]: finalFill,
      [`${prefixCls}--${expand}`]: finalExpand,
      [`${prefixCls}--${shape}`]: finalShape,
      [`${prefixCls}--strong`]: strong,
      [`${prefixCls}--disabled`]: disabled,
    })
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--activated`

    return {
      wrap,
      hover,
    }
  }

  /**
   * 按钮点击事件处理
   *
   * @description 当按钮未被禁用且未处于加载状态时，触发 click 事件
   * @fires click
   * @memberof Button
   */
  onClick() {
    if (!this.disabled && !this.loading) {
      this.$emit('click')
    }
  }

  /**
   * 获取用户信息回调，open-type="getUserInfo" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires getuserinfo
   * @memberof Button
   */
  @Event()
  @Emit('getuserinfo')
  onGetUserInfo(e: CustomEvent) {
    return e.target
  }

  /**
   * 客服消息回调，open-type="contact" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires contact
   * @memberof Button
   */
  @Event()
  @Emit('contact')
  onContact(e: CustomEvent) {
    return e.target
  }

  /**
   * 获取用户手机号回调，open-type="getPhoneNumber" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires getphonenumber
   * @memberof Button
   */
  @Event()
  @Emit('getphonenumber')
  onGetPhoneNumber(e: CustomEvent) {
    return e.target
  }

  /**
   * 打开 APP 回调，open-type="launchApp" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires launchapp
   * @memberof Button
   */
  @Event()
  @Emit('launchapp')
  onLaunchApp(e: CustomEvent) {
    return e.target
  }

  /**
   * 选择头像回调，open-type="chooseAvatar" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires chooseavatar
   * @memberof Button
   */
  @Event()
  @Emit('chooseavatar')
  onChooseAvatar(e: CustomEvent) {
    return e.target
  }

  /**
   * 打开授权设置页回调，open-type="openSetting" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires opensetting
   * @memberof Button
   */
  @Event()
  @Emit('opensetting')
  onOpenSetting(e: CustomEvent) {
    return e.target
  }

  /**
   * 创建直播活动回调，open-type="createLiveActivity" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires createliveactivity
   * @memberof Button
   */
  @Event()
  @Emit('createliveactivity')
  onCreateLiveActivity(e: CustomEvent) {
    return e.target
  }

  /**
   * 获取用户实时手机号回调，open-type="getRealtimePhoneNumber" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires getrealtimephonenumber
   * @memberof Button
   */
  @Event()
  @Emit('getrealtimephonenumber')
  onGetRealtimePhoneNumber(e: CustomEvent) {
    return e.target
  }

  /**
   * 同意隐私协议授权回调，open-type="agreePrivacyAuthorization" 时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires agreeprivacyauthorization
   * @memberof Button
   */
  @Event()
  @Emit('agreeprivacyauthorization')
  onAgreePrivacyAuthorization(e: CustomEvent) {
    return e.target
  }

  /**
   * 错误回调，使用开放能力发生错误时触发
   *
   * @param {CustomEvent} e - 微信原生事件对象
   * @fires error
   * @memberof Button
   */
  @Event()
  @Emit('error')
  onError(e: CustomEvent) {
    return e.target
  }
}

export default defineComponentHOC()(Button)
