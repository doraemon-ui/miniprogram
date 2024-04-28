import { type CustomEvent, defineComponentHOC, Doraemon, Component, Emit, Event, Prop} from '@doraemon-ui/miniprogram.core-js'
import { type NativeButtonOpenType, type NativeRouteOpenType, useNativeRoute, NATIVE_ROUTES } from '@doraemon-ui/miniprogram.shared'
const { classNames, styleToCssString } = Doraemon.util

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
    url: {
      type: String,
      default: '',
    },
    urlParams: {
      type: Object,
      default: null,
    },
    delta: {
      type: Number,
      default: 1,
    },
    disabled: {
      type: Boolean,
      default: false,
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
  expose: ['updateIsLast']
})
class ListItem extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Button
   */
  prefixCls!: string

  /**
   * 左侧缩略图
   *
   * @type {string}
   * @memberof ListItem
   */
  @Prop({
    type: String,
    default: ''
  })
  thumb: string

  /**
   * 左侧标题
   *
   * @type {string}
   * @memberof ListItem
   */
  @Prop({
    type: String,
    default: ''
  })
  title: string

  /**
   * 标题下方的描述信息
   *
   * @type {string}
   * @memberof ListItem
   */
  @Prop({
    type: String,
    default: ''
  })
  label: string

  /**
   * 右侧内容
   *
   * @type {string}
   * @memberof ListItem
   */
  @Prop({
    type: String,
    default: ''
  })
  extra: string

  /**
   * 是否有底部横线
   *
   * @type {boolean}
   * @memberof ListItem
   */
  @Prop({
    type: Boolean,
    default: true
  })
  hasLine: boolean

  /**
   * 是否展示右侧箭头并开启尝试以 url 跳转
   *
   * @type {boolean}
   * @memberof ListItem
   */
  @Prop({
    type: Boolean,
    default: false
  })
  isLink: boolean

  /**
   * 对齐方式
   *
   * @type {('flex-start' | 'center')}
   * @memberof ListItem
   */
  @Prop({
    type: String,
    default: 'center'
  })
  align: 'flex-start' | 'center'

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof ListItem
   */
  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  // native route props
  url!: string
  urlParams!: object
  delta!: number
  // openType!: NativeRouteOpenType

  // native button props
  // @see https://developers.weixin.qq.com/miniprogram/dev/component/button.html
  disabled!: boolean
  // openType!: NativeButtonOpenType
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

  openType!: NativeButtonOpenType | NativeRouteOpenType
  
  get classes () {
    const { prefixCls, hoverClass, isLast, hasLine, isLink, align, disabled } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--last`]: isLast,
      [`${prefixCls}--has-line`]: hasLine,
      [`${prefixCls}--access`]: isLink,
      [`${prefixCls}--align-${align}`]: align,
      [`${prefixCls}--disabled`]: disabled,
    })
    const hd = `${prefixCls}__hd`
    const thumb = `${prefixCls}__thumb`
    const bd = `${prefixCls}__bd`
    const title = `${prefixCls}__title`
    const description = `${prefixCls}__description`
    const ft = `${prefixCls}__ft`
    const arrow = `${prefixCls}__arrow`
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`
  
    return {
      wrap,
      hd,
      thumb,
      bd,
      title,
      description,
      ft,
      arrow,
      hover,
    }
  }

  get containerStyle () {
    return this.wrapStyle ? styleToCssString(this.wrapStyle) : ''
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
    const { url, urlParams, isLink, openType: _ot, delta } = this
    const openType = (NATIVE_ROUTES.includes(_ot as unknown as NativeRouteOpenType) ? _ot : 'navigateTo') as NativeRouteOpenType
    if (isLink && url) {
      useNativeRoute(
        {
          url,
          urlParams,
          openType,
          delta,
        },
        this._renderProxy
      )
    }
  }

  updateIsLast(isLast: boolean) {
    this.$nextTick(() => {
      if (isLast !== this.isLast) {
        this.isLast = isLast
      }
    })
  }
}

export type ListItemInstance = ListItem
export default defineComponentHOC()(ListItem)
