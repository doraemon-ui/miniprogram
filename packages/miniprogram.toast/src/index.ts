import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { type ToastIcon, type ToastPosition, presetIconRecord } from './toast'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-toast',
    },
  }
})
class Toast extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Toast
   */
  prefixCls!: string

  @Prop({
    type: String,
    default: '',
  })
  image: string

  @Prop({
    type: String,
    default: '',
  })
  icon: ToastIcon

  @Prop({
    type: String,
    default: '',
  })
  iconColor: string

  @Prop({
    type: String,
    default: '',
  })
  text: string

  @Prop({
    type: Number,
    default: 1500,
  })
  duration: number

  @Prop({
    type: String,
    default: 'center',
  })
  position: ToastPosition

  @Prop({
    type: Boolean,
    default: true,
  })
  mask: boolean

  @Prop({
    type: Boolean,
    default: true,
  })
  maskClickable: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  @Prop({
    type: Number,
    default: 1000,
  })
  zIndex: number

  get classes () {
    const { prefixCls, iconType: hasIcon, image } = this
    const wrap = classNames(prefixCls)
    const content = classNames(`${prefixCls}__content`, {
      [`${prefixCls}__content--has-icon`]: hasIcon !== '' || image !== '',
    })
    const img = `${prefixCls}__img`
    const icon = classNames(`${prefixCls}__icon`, {
      [`${prefixCls}__icon--${this.icon}`]: this.icon,
    })
    const text = `${prefixCls}__text`

    return {
      wrap,
      content,
      img,
      icon,
      text,
    }
  }

  get maskStyle () {
    return {
      pointerEvents: this.maskClickable ? 'none' : 'auto',
    }
  }

  get iconType (): string {
    return presetIconRecord[this.icon] ?? this.icon ?? ''
  }

  get bodyStyle (): Partial<CSSStyleDeclaration> {
    const getTop = (position: ToastPosition) => {
      switch (position) {
          case 'top':
            return '20%'
          case 'bottom':
            return '80%'
          default:
            return '50%'
      }
    }
    return {
      maxWidth: '75vw',
      maxHeight: '75vh',
      backgroundColor: 'unset',
      top: getTop(this.position),
    }
  }

  popupVisible: boolean = false

  @Watch('visible')
  onVisibleChange (visible: boolean) {
    this.setPopupVisible(visible)
  }

  setPopupVisible(popupVisible: boolean) {
    if (this.popupVisible !== popupVisible) {
      this.popupVisible = popupVisible
    }
  }

  onPopupClose () {
    this.onClose()
  }

  onPopupClosed () {
    this.onClosed()
  }

  onClosed () {
    this.$emit('closed')
  }

  onClose () {
    this.$emit('close')
  }

  mounted () {
    this.setPopupVisible(this.visible)
  }
}

export type ToastInstance = Toast
export default defineComponentHOC()(Toast)
export * as toast from './toast'
