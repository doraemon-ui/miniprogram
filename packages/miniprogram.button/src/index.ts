import { type CustomEvent, defineComponentHOC, Doraemon, Component, Event, Emit } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-button',
    },
    color: {
      type: String,
      default: 'positive',
    },
    fill: {
      type: String,
      default: 'solid',
    },
    expand: {
      type: String,
      default: '',
    },
    shape: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    strong: {
      type: Boolean,
      default: false,
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

  get classes () {
    const { prefixCls, hoverClass, color, size, fill, expand, shape, strong, disabled } = this as any
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
    if (!(this as any).disabled && !(this as any).loading) {
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
  @Emit('opensetting')
  onOpenSetting (e: CustomEvent) {
    return e.target
  }

  @Event()
  @Emit('error')
  onError (e: CustomEvent) {
    return e.target
  }
}

export default defineComponentHOC()(Button)
