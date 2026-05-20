import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import type { AnimationGroupInstance, ClassNames } from '@doraemon-ui/miniprogram.animation-group'
import { findComponentNode, getPointsNumber, getTouchPoints } from '@doraemon-ui/miniprogram.shared'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-notification',
    },
  },
})
class Notification extends Doraemon {
  prefixCls!: string

  @Prop({
    type: null,
    default: 'dora-animate--slideInDown',
  })
  classNames: ClassNames

  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

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
  titleRightText: string

  @Prop({
    type: Boolean,
    default: false,
  })
  closable: boolean

  @Prop({
    type: Boolean,
    default: true,
  })
  swipeToClose: boolean

  @Prop({
    type: String,
    default: '',
  })
  subtitle: string

  @Prop({
    type: String,
    default: '',
  })
  text: string

  @Prop({
    type: Number,
    default: 3000,
  })
  duration: number

  @Prop({
    type: null,
    default: null,
  })
  data: Record<string, unknown> | null

  notificationVisible = false
  notificationWrapStyle: Partial<CSSStyleDeclaration> | null = null
  _closeTimer: ReturnType<typeof setTimeout> | null = null
  _isTouched = false
  _isMoved = false
  _isScrolling?: boolean
  _touchesDiff = 0
  _touchStartTime = 0
  _notificationHeight = 64
  _touchesStart = { x: 0, y: 0 }

  get classes() {
    const { prefixCls } = this
    return {
      wrap: classNames(prefixCls),
      content: `${prefixCls}__content`,
      hd: `${prefixCls}__hd`,
      icon: `${prefixCls}__icon`,
      image: `${prefixCls}__image`,
      bd: `${prefixCls}__bd`,
      header: `${prefixCls}__header`,
      title: `${prefixCls}__title`,
      titleRightText: `${prefixCls}__title-right-text`,
      closeButton: `${prefixCls}__close-button`,
      subtitle: `${prefixCls}__subtitle`,
      text: `${prefixCls}__text`,
      ft: `${prefixCls}__ft`,
    }
  }

  @Watch('visible')
  onVisibleChange(visible: boolean) {
    this.setNotificationVisible(visible)
  }

  @Watch('duration')
  onDurationChange() {
    if (this.notificationVisible) {
      this.scheduleClose()
    }
  }

  setNotificationVisible(notificationVisible: boolean) {
    const changed = this.notificationVisible !== notificationVisible
    this.notificationVisible = notificationVisible

    if (notificationVisible) {
      this.notificationWrapStyle = null
      void this.updateNotificationHeight()
      this.scheduleClose()
      return
    }

    this.clearCloseTimer()

    if (changed) {
      this.$nextTick(() => {
        this.onClosed()
      })
    }
  }

  clearCloseTimer() {
    if (this._closeTimer) {
      clearTimeout(this._closeTimer)
      this._closeTimer = null
    }
  }

  scheduleClose() {
    this.clearCloseTimer()
    if (this.duration > 0) {
      this._closeTimer = setTimeout(() => {
        this.onClose(this.data)
      }, this.duration)
    }
  }

  onTap() {
    this.onClick(this.data)
  }

  async updateNotificationHeight() {
    const animationGroup = findComponentNode('#dora-animation-group', this._renderProxy) as AnimationGroupInstance
    const rect = await animationGroup.getBoundingClientRect()
    if (rect?.height) {
      this._notificationHeight = rect.height / 2
    }
  }

  updateWrapStyle(transform = '', transition = '') {
    this.notificationWrapStyle = {
      transform,
      transition,
    }
  }

  onTouchStart(e: TouchEvent) {
    if (!this.swipeToClose || !this.notificationVisible || this._isTouched || getPointsNumber(e) > 1) return
    this.clearCloseTimer()
    this._isTouched = true
    this._isMoved = false
    this._isScrolling = undefined
    this._touchesDiff = 0
    this._touchStartTime = Date.now()
    const point = getTouchPoints(e)
    this._touchesStart = { x: point.x, y: point.y }
  }

  onTouchMove(e: TouchEvent) {
    if (!this.swipeToClose || !this._isTouched || getPointsNumber(e) > 1) return
    const point = getTouchPoints(e)

    if (typeof this._isScrolling === 'undefined') {
      this._isScrolling = Math.abs(point.y - this._touchesStart.y) < Math.abs(point.x - this._touchesStart.x)
    }
    if (this._isScrolling) {
      this._isTouched = false
      return
    }

    this._isMoved = true
    this._touchesDiff = point.y - this._touchesStart.y

    let translateY = this._touchesDiff
    if (translateY > 0) {
      translateY = translateY ** 0.8
    }

    this.updateWrapStyle(`translate3d(0, ${translateY}px, 0)`, 'none')
  }

  onTouchEnd() {
    if (!this.swipeToClose || !this._isTouched || !this._isMoved) {
      this._isTouched = false
      this._isMoved = false
      if (this.notificationVisible) {
        this.scheduleClose()
      }
      return
    }

    this._isTouched = false
    this._isMoved = false

    if (this._touchesDiff === 0) {
      this.scheduleClose()
      return
    }

    const timeDiff = Date.now() - this._touchStartTime
    this.updateWrapStyle('', '')

    if ((this._touchesDiff < -10 && timeDiff < 300) || -this._touchesDiff >= this._notificationHeight) {
      this.onClose(this.data)
      return
    }

    this.scheduleClose()
  }

  onCloseTap() {
    this.onClose(this.data)
  }

  onClick(data: Record<string, unknown> | null) {
    this.$emit('click', data)
  }

  onClose(data: Record<string, unknown> | null) {
    this.$emit('close', data)
  }

  onClosed() {
    this.$emit('closed')
  }

  mounted() {
    this.setNotificationVisible(this.visible)
  }

  destroyed() {
    this.clearCloseTimer()
  }
}

export { Notification }

export default defineComponentHOC()(Notification)

export * as notification from './notification'
