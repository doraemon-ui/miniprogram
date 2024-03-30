import { type CustomEvent, defineComponentHOC, Doraemon, Component, Prop, Watch, Event } from '@doraemon-ui/miniprogram.core-js'
import type { DialogButton, NativeButtonHandle, NativeButtonEvent } from './dialog'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-dialog',
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

  @Prop({
    type: Object,
    default: null,
  })
  bodyStyle: Partial<CSSStyleDeclaration>

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
    default: null,
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
    this.onClosed()
  }

  onClose () {
    this.$emit('close')
  }

  onClosed () {
    this.$emit('closed')
  }

  mounted () {
    this.setPopupVisible(this.visible)
  }

  async onAction (e: CustomEvent, method: keyof NativeButtonHandle<DialogButton>, closable: boolean = false) {
    const { index } = e.currentTarget.dataset
    const button = this.buttons[index]
    const eventName = method.replace(/^on/, '').toLowerCase() as NativeButtonEvent
    if (!button.disabled) {
      await Promise.all([
        button[method]?.({ method: eventName, button, index, detail: e.detail }),
        this.$emit('action', { method: eventName, button, index, detail: e.detail }),
      ])
      if (closable) {
        this.onClose()
      }
    }
  }

  @Event()
  async onClick (e: CustomEvent) {
    await this.onAction(e, 'onClick', this.buttonClosable)
  }

  @Event()
  async onGetUserInfo (e: CustomEvent) {
    await this.onAction(e, 'onGetUserInfo')
  }

  @Event()
  async onContact (e: CustomEvent) {
    await this.onAction(e, 'onContact')
  }

  @Event()
  async onGetPhoneNumber (e: CustomEvent) {
    await this.onAction(e, 'onGetPhoneNumber')
  }

  @Event()
  async onLaunchApp (e: CustomEvent) {
    await this.onAction(e, 'onLaunchApp')
  }

  @Event()
  async onError (e: CustomEvent) {
    await this.onAction(e, 'onError')
  }

  @Event()
  async onOpenSetting (e: CustomEvent) {
    await this.onAction(e, 'onOpenSetting')
  }

  @Event()
  async onChooseAvatar (e: CustomEvent) {
    await this.onAction(e, 'onChooseAvatar')
  }

  @Event()
  async onCreateLiveActivity (e: CustomEvent) {
    await this.onAction(e, 'onCreateLiveActivity')
  }

  @Event()
  async onGetRealtimePhoneNumber (e: CustomEvent) {
    await this.onAction(e, 'onGetRealtimePhoneNumber')
  }

  @Event()
  async onAgreePrivacyAuthorization (e: CustomEvent) {
    await this.onAction(e, 'onAgreePrivacyAuthorization')
  }
}

export type DialogInstance = Dialog
export default defineComponentHOC()(Dialog)
export * as dialog from './dialog'
