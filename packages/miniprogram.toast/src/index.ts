import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { type ToastIcon, type ToastPosition, presetIconRecord } from './toast'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-toast',
    },
  },
})
class Toast extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Toast
   */
  prefixCls!: string

  /**
   * 自定义图片，image 的优先级高于 icon
   *
   * @type {string}
   * @memberof Toast
   */
  @Prop({
    type: String,
    default: '',
  })
  image: string

  /**
   * 图标
   *
   * @type {ToastIcon}
   * @memberof Toast
   */
  @Prop({
    type: String,
    default: '',
  })
  icon: ToastIcon

  /**
   * 图标的颜色
   *
   * @type {string}
   * @memberof Toast
   */
  @Prop({
    type: String,
    default: '',
  })
  iconColor: string

  /**
   * 提示文本
   *
   * @type {string}
   * @memberof Toast
   */
  @Prop({
    type: String,
    default: '',
  })
  text: string

  /**
   * 提示的延迟时间，若小于等于 0 则不会自动关闭
   *
   * @type {number}
   * @memberof Toast
   */
  @Prop({
    type: Number,
    default: 1500,
  })
  duration: number

  /**
   * 垂直方向显示位置
   *
   * @type {ToastPosition}
   * @memberof Toast
   */
  @Prop({
    type: String,
    default: 'center',
  })
  position: ToastPosition

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   * @memberof Toast
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  mask: boolean

  /**
   * 点击蒙层是否允许关闭
   *
   * @type {boolean}
   * @memberof Toast
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  maskClosable: boolean

  /**
   * 是否可见
   *
   * @type {boolean}
   * @memberof Toast
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 设置蒙层的 z-index
   *
   * @type {number}
   * @memberof Toast
   */
  @Prop({
    type: Number,
    default: null,
  })
  zIndex: number

  get classes() {
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

  get maskStyle(): Partial<CSSStyleDeclaration> {
    return {
      pointerEvents: this.maskClosable ? 'none' : 'auto',
    }
  }

  get iconType(): string {
    return presetIconRecord[this.icon] ?? this.icon ?? ''
  }

  get bodyStyle(): Partial<CSSStyleDeclaration> {
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
  onVisibleChange(visible: boolean) {
    this.setPopupVisible(visible)
  }

  setPopupVisible(popupVisible: boolean) {
    if (this.popupVisible !== popupVisible) {
      this.popupVisible = popupVisible
    }
  }

  onPopupClose() {
    this.onClose()
  }

  onPopupClosed() {
    this.onClosed()
  }

  onClose() {
    this.$emit('close')
  }

  onClosed() {
    this.$emit('closed')
  }

  mounted() {
    this.setPopupVisible(this.visible)
  }
}

export type ToastInstance = Toast
export default defineComponentHOC()(Toast)
export * as toast from './toast'
