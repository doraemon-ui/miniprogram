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
    default: 'positive'
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
    default: 'solid'
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
    default: ''
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
    default: ''
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
    default: 'default'
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
    default: false
  })
  strong: boolean

  // native button props
  // @see https://developers.weixin.qq.com/miniprogram/dev/component/button.html
  disabled!: boolean
  loading!: boolean
  formType!: 'submit' | 'reset'
  openType!: NativeButtonOpenType
  hoverClass!: string
  hoverStopPropagation!: boolean
  hoverStartTime!: number
  hoverStayTime!: number
  lang!: 'en' | 'zh_CN' | 'zh_TW'
  sessionFrom!: string
  sendMessageTitle!: string
  sendMessagePath!: string
  sendMessageImg!: string
  showMessageCard!: boolean
  phoneNumberNoQuotaToast!: boolean
  appParameter!: string

  get classes () {
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

  onClick () {
    if (!this.disabled && !this.loading) {
      this.$emit('click')
    }
  }

  @Event()
  @Emit('getuserinfo')
  onGetUserInfo (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('contact')
  onContact (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('getphonenumber')
  onGetPhoneNumber (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('launchapp')
  onLaunchApp (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('chooseavatar')
  onChooseAvatar (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('opensetting')
  onOpenSetting (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('createliveactivity')
  onCreateLiveActivity (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('getrealtimephonenumber')
  onGetRealtimePhoneNumber (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('agreeprivacyauthorization')
  onAgreePrivacyAuthorization (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('error')
  onError (e: CustomEvent) {
    return e.target
  }
}

export default defineComponentHOC()(Button)
