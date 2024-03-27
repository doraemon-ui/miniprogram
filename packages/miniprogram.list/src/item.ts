import { type CustomEvent, defineComponentHOC, Doraemon, Component, Emit, Event, Prop} from '@doraemon-ui/miniprogram.core-js'
import { type NativeButtonOpenType, type NativeRouteOpenType, useNativeRoute, NATIVE_ROUTES } from '@doraemon-ui/miniprogram.shared'
const { classNames } = Doraemon.util

@Component({
  components: {
    List: () => ({
      module: './index',
      type: 'ancestor',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-list-item',
    },
    disabled: {
      type: Boolean,
      default: false,
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
class ListItem extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Button
   */
  prefixCls!: string

  @Prop({
    type: String,
    default: ''
  })
  thumb: string

  @Prop({
    type: String,
    default: ''
  })
  title: string

  @Prop({
    type: String,
    default: ''
  })
  label: string

  @Prop({
    type: String,
    default: ''
  })
  extra: string

  @Prop({
    type: Boolean,
    default: true
  })
  hasLine: boolean

  @Prop({
    type: Boolean,
    default: false
  })
  isLink: boolean

  @Prop({
    type: String,
    default: ''
  })
  url: string

  @Prop({
    type: Number,
    default: 1
  })
  delta: number
  
  // native button props
  // @see https://developers.weixin.qq.com/miniprogram/dev/component/button.html
  disabled!: boolean
  // openType!: NativeButtonOpenType
  openType!: NativeButtonOpenType | NativeRouteOpenType
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
    const { prefixCls, hoverClass, isLast, hasLine, isLink, disabled } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--last`]: isLast,
      [`${prefixCls}--has-line`]: hasLine,
      [`${prefixCls}--access`]: isLink,
      [`${prefixCls}--disabled`]: disabled,
    })
    const hd = `${prefixCls}__hd`
    const thumb = `${prefixCls}__thumb`
    const bd = `${prefixCls}__bd`
    const text = `${prefixCls}__text`
    const desc = `${prefixCls}__desc`
    const ft = `${prefixCls}__ft`
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`
  
    return {
      wrap,
      hd,
      thumb,
      bd,
      text,
      desc,
      ft,
      hover,
    }
  }

  isLast: boolean = false

  onClick () {
    if (!this.disabled) {
      this.$emit('click')
      this.linkTo()
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

  linkTo() {
    const { url, isLink, openType: _ot, delta } = this
    const openType = (NATIVE_ROUTES.includes(_ot as unknown as NativeRouteOpenType) ? _ot : 'navigateTo') as NativeRouteOpenType
    if (isLink && url) {
      useNativeRoute(
        {
          url,
          openType,
          delta,
        },
        this._renderProxy
      )
    }
  }

  updateIsLastElement(isLast: boolean) {
    if (isLast !== this.isLast) {
      this.isLast = isLast
    }
  }
}

export default defineComponentHOC()(ListItem)
