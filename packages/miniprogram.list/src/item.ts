import { defineComponentHOC, Doraemon, Component, Emit, Event} from '@doraemon-ui/miniprogram.core-js'
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
    appParameter: {
      type: String,
      default: '',
    },
    thumb: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    extra: {
      type: String,
      default: '',
    },
    hasLine: {
      type: Boolean,
      default: true,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    openType: {
      type: String,
      default: 'navigateTo',
    },
    url: {
      type: String,
      default: '',
    },
    delta: {
      type: Number,
      default: 1,
    },
  },
})
class ListItem extends Doraemon {
  get classes () {
    const { prefixCls, hoverClass, isLast, hasLine, isLink, disabled } = this as any
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
    if (!(this as any).disabled) {
      this.$emit('click')
      this.linkTo()
    }
  }

  @Event()
  @Emit('getuserinfo')
  onGetUserInfo (e) {
    return e.target
  }

  @Event()
  @Emit('contact')
  onContact (e) {
    return e.target
  }

  @Event()
  @Emit('getphonenumber')
  onGetPhoneNumber (e) {
    return e.target
  }

  @Event()
  @Emit('launchapp')
  onLaunchApp (e) {
    return e.target
  }

  @Event()
  @Emit('opensetting')
  onOpenSetting (e) {
    return e.target
  }

  @Event()
  @Emit('error')
  onError (e) {
    return e.target
  }

  linkTo() {
    const { url, isLink, openType, delta } = this as any
    const navigate = [
      'navigateTo',
      'redirectTo',
      'switchTab',
      'navigateBack',
      'reLaunch',
    ]

    // openType 属性可选值为 navigateTo、redirectTo、switchTab、navigateBack、reLaunch
    if (!isLink || !url || !navigate.includes(openType)) {
      return false
    } else if (openType === 'navigateBack') {
      return wx[openType].call(wx, {
        delta,
      })
    } else {
      return wx[openType].call(wx, {
        url,
      })
    }
  }

  updateIsLastElement(isLast: boolean) {
    if (isLast !== this.isLast) {
      this.isLast = isLast
    }
  }
}

export default defineComponentHOC()(ListItem)
