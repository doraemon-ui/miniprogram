import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { NativeButtonHandle } from '@doraemon-ui/miniprogram.shared'
import { DialogButton } from './dialog'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-dialog',
    },
    darkmode: {
      type: String,
      default: Doraemon.config.darkmode,
    },
  },
})
class Dialog extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Dialog
   */
  prefixCls!: string

  /**
   * 当前的主题
   *
   * @type {string}
   * @memberof Dialog
   */
  darkmode!: string

  @Prop({
    type: Object,
    default: null,
  })
  bodyStyle: CSSStyleDeclaration

  @Prop({
    type: Boolean,
    default: true,
  })
  mask: boolean

  @Prop({
    type: Boolean,
    default: true,
  })
  maskClosable: boolean

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

  @Prop({
    type: Boolean,
    default: false,
  })
  closable: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  buttonClosable: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  verticalButtons: boolean

  @Prop({
    type: String,
    default: '',
  })
  image: string

  @Prop({
    type: String,
    default: '',
  })
  title: string

  @Prop({
    type: String,
    default: '',
  })
  content: string

  @Prop({
    type: Array,
    default: [],
  })
  buttons: DialogButton[]

  get classes () {
    const { prefixCls, verticalButtons, buttons: _buttons } = this
    const wrap = classNames(prefixCls)
    const hd = `${prefixCls}__hd`
    const title = `${prefixCls}__title`
    const content = `${prefixCls}__content`
    const bd = `${prefixCls}__bd`
    const ft = `${prefixCls}__ft`
    const image = `${prefixCls}__image`
    const img = `${prefixCls}__image-img`
    const close = `${prefixCls}__close`
    const x = `${prefixCls}__close-x`
    const buttons = classNames(`${prefixCls}__buttons`, {
      [`${prefixCls}__buttons--${verticalButtons ? 'vertical' : 'horizontal'}`]: true,
    })
    const button = _buttons.map((button) => {
      const wrap = classNames(`${prefixCls}__button`, {
        ['dora-color']: button.type,
        [`dora-color--${button.type}`]: button.type ?? 'dark',
        [`${prefixCls}__button--bold`]: button.bold,
        [`${prefixCls}__button--disabled`]: button.disabled,
        [`${button.className}`]: button.className,
      })
      const hover = button.hoverClass && button.hoverClass !== 'default' ? button.hoverClass : `${prefixCls}__button--hover`

      return {
        wrap,
        hover,
      }
    })

    return {
      wrap,
      hd,
      title,
      content,
      bd,
      ft,
      close,
      image,
      img,
      x,
      buttons,
      button,
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
    this.$emit('closed')
  }

  onXClose () {
    if (this.closable) {
      this.onClose()
    }
  }

  onClose () {
    this.$emit('close')
  }

  mounted () {
    this.setPopupVisible(this.visible)
  }

  async onAction (e, method: keyof NativeButtonHandle<DialogButton>, closable: boolean = false) {
    const { index } = e.currentTarget.dataset
    const button = this.buttons[index]
    if (!button.disabled) {
      await button[method]?.(button, index, { ...e.detail })
      if (closable) {
        this.onClose()
      }
    }
  }

  async onClick (e) {
    await this.onAction(e, 'onClick', this.buttonClosable)
  }

  async onGetUserInfo (e) {
    await this.onAction(e, 'onGetUserInfo')
  }

  async onContact (e) {
    await this.onAction(e, 'onContact')
  }

  async onGetPhoneNumber (e) {
    await this.onAction(e, 'onGetPhoneNumber')
  }

  async onLaunchApp (e) {
    await this.onAction(e, 'onLaunchApp')
  }

  async onError (e) {
    await this.onAction(e, 'onError')
  }

  async onOpenSetting (e) {
    await this.onAction(e, 'onOpenSetting')
  }
}

export default defineComponentHOC()(Dialog)
export * as dialog from './dialog'
