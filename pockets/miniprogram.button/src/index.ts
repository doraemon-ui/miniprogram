import { defineComponentHOC, Doraemon, Component, Event, Emit } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-button',
    },
    darkmode: {
      type: String,
      default: Doraemon.config.darkmode,
    },
    type: {
      type: String,
      default: 'stable',
    },
    clear: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    borderRadius: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'default',
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
   * 当前的主题
   *
   * @type {string}
   * @memberof Button
   */
  darkmode!: string

  get classes () {
    const { prefixCls, hoverClass, type, size, block, full, clear, outline, bordered, borderRadius, disabled } = this as any
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${type}`]: type,
      [`${prefixCls}--${size}`]: size,
      [`${prefixCls}--block`]: block,
      [`${prefixCls}--full`]: full,
      [`${prefixCls}--clear`]: clear,
      [`${prefixCls}--outline`]: outline,
      [`${prefixCls}--bordered`]: bordered,
      [`${prefixCls}--border-radius`]: borderRadius,
      [`${prefixCls}--disabled`]: disabled,
    })
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

    return {
      wrap,
      hover,
    }
  }

  onClick () {
    if (!(this as any).disabled && !(this as any).loading) {
      this.$emit('click')
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
  @Emit('opensetting')
  onOpenSetting (e) {
    return e.target
  }

  @Event()
  @Emit('error')
  onError (e) {
    return e.target
  }
}

export default defineComponentHOC()(Button)
