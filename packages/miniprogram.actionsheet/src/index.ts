import { type CustomEvent, defineComponentHOC, Doraemon, Component, Prop, Watch, Event } from '@doraemon-ui/miniprogram.core-js'
import type { ActionSheetButton, NativeButtonHandle, NativeButtonEvent } from './actionsheet'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-actionsheet',
    },
  },
})
/**
 * ActionSheet 动作面板组件
 *
 * @description 从底部弹出的操作菜单面板，提供两种主题风格（iOS / WeChat）。
 * @class ActionSheet
 * @extends {Doraemon}
 */
class ActionSheet extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof ActionSheet
   */
  prefixCls!: string

  /**
   * 主题风格
   *
   * @type {('ios' | 'wx')}
   * @default 'ios'
   * @memberof ActionSheet
   */
  @Prop({
    type: String,
    default: 'ios',
  })
  theme: 'ios' | 'wx'

  /**
   * 标题文本
   *
   * @type {string}
   * @default ''
   * @memberof ActionSheet
   */
  @Prop({
    type: String,
    default: '',
  })
  titleText: string

  /**
   * 操作按钮列表
   *
   * @type {ActionSheetButton[]}
   * @default []
   * @memberof ActionSheet
   */
  @Prop({
    type: Array,
    default: [],
  })
  buttons: ActionSheetButton[]

  /**
   * 取消按钮文本
   *
   * @type {string}
   * @default '取消'
   * @memberof ActionSheet
   */
  @Prop({
    type: String,
    default: '取消',
  })
  cancelText: string

  /**
   * 删除按钮文本
   *
   * @type {string}
   * @default ''
   * @memberof ActionSheet
   */
  @Prop({
    type: String,
    default: '',
  })
  destructiveText: string

  /**
   * 是否可见
   *
   * @type {boolean}
   * @default false
   * @memberof ActionSheet
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 计算动作面板的 CSS 类名
   *
   * @readonly
   * @memberof ActionSheet
   */
  get classes() {
    const { prefixCls, theme, buttons: _buttons, cancelText } = this
    const wrap = classNames(prefixCls)
    const popup = `${prefixCls}__popup`
    const content = classNames(`${prefixCls}__content`, {
      [`${prefixCls}__content--theme-${theme}`]: theme,
      [`${prefixCls}__content--has-cancel`]: cancelText,
    })
    const options = classNames(`${prefixCls}__group`, {
      [`${prefixCls}__group--options`]: true,
    })
    const title = `${prefixCls}__title`
    const destructive = classNames(`${prefixCls}__button`, {
      [`${prefixCls}__button--destructive`]: true,
    })
    const button = _buttons.map((btn) => {
      const wrap = classNames(`${prefixCls}__button`, {
        [`${prefixCls}__button--option`]: true,
        [`${prefixCls}__button--disabled`]: btn.disabled,
        [`${btn.className}`]: btn.className,
      })
      const hover = btn.hoverClass && btn.hoverClass !== 'default' ? btn.hoverClass : `${prefixCls}__button--hover`

      return {
        wrap,
        hover,
      }
    })
    const icon = `${prefixCls}__icon`
    const text = `${prefixCls}__text`
    const group = classNames(`${prefixCls}__group`, {
      [`${prefixCls}__group--cancel`]: true,
    })
    const cancel = classNames(`${prefixCls}__button`, {
      [`${prefixCls}__button--cancel`]: true,
    })
    const hover = `${prefixCls}__button--hover`

    return {
      wrap,
      popup,
      content,
      options,
      title,
      button,
      icon,
      text,
      destructive,
      group,
      cancel,
      hover,
    }
  }

  popupVisible: boolean = false

  /**
   * 监听 visible 属性变化
   *
   * @param {boolean} visible
   * @memberof ActionSheet
   */
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
    this.onCancel()
  }

  onPopupClosed() {
    this.$emit('closed')
  }

  onClose() {
    this.$emit('close')
  }

  onCancel() {
    this.$emit('cancel')
    this.onClose()
  }

  mounted() {
    this.setPopupVisible(this.visible)
  }

  async onAction(e: CustomEvent, method: keyof NativeButtonHandle<ActionSheetButton>, closable: boolean = false) {
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

  /**
   * 按钮点击事件
   *
   * @memberof ActionSheet
   */
  @Event()
  async onClick(e: CustomEvent) {
    await this.onAction(e, 'onClick', true)
  }

  /**
   * 删除按钮点击事件
   *
   * @memberof ActionSheet
   */
  onDestructiveClick() {
    this.$emit('destructive')
    this.onClose()
  }

  @Event()
  async onGetUserInfo(e: CustomEvent) {
    await this.onAction(e, 'onGetUserInfo')
  }

  @Event()
  async onContact(e: CustomEvent) {
    await this.onAction(e, 'onContact')
  }

  @Event()
  async onGetPhoneNumber(e: CustomEvent) {
    await this.onAction(e, 'onGetPhoneNumber')
  }

  @Event()
  async onLaunchApp(e: CustomEvent) {
    await this.onAction(e, 'onLaunchApp')
  }

  @Event()
  async onError(e: CustomEvent) {
    await this.onAction(e, 'onError')
  }

  @Event()
  async onOpenSetting(e: CustomEvent) {
    await this.onAction(e, 'onOpenSetting')
  }

  @Event()
  async onChooseAvatar(e: CustomEvent) {
    await this.onAction(e, 'onChooseAvatar')
  }

  @Event()
  async onCreateLiveActivity(e: CustomEvent) {
    await this.onAction(e, 'onCreateLiveActivity')
  }

  @Event()
  async onGetRealtimePhoneNumber(e: CustomEvent) {
    await this.onAction(e, 'onGetRealtimePhoneNumber')
  }

  @Event()
  async onAgreePrivacyAuthorization(e: CustomEvent) {
    await this.onAction(e, 'onAgreePrivacyAuthorization')
  }
}

export type ActionSheetInstance = ActionSheet
export default defineComponentHOC()(ActionSheet)
export * as actionsheet from './actionsheet'
