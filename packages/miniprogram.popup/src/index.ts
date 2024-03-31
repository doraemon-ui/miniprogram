import { type TouchEvent, defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { type TouchPoint, findComponentNode, getPointsNumber, getTouchDirection, getTouchPoints } from '@doraemon-ui/miniprogram.shared'
import type { SafeAreaProp } from '@doraemon-ui/miniprogram.safe-area'
import type { BackdropInstance } from '@doraemon-ui/miniprogram.backdrop'

const { classNames, styleToCssString } = Doraemon.util

/**
 * 弹出的位置
 */
export type Position = 'bottom' | 'top' | 'left' | 'right' | 'center'

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-popup',
    },
  },
})
class Popup extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Popup
   */
  prefixCls!: string

  /**
   * 自定义 animation 类名前缀
   *
   * @type {string}
   * @memberof Popup
   */
  @Prop({
    type: String,
    default: 'dora-animate',
  })
  animationPrefixCls: string

  /**
   * 指定弹出的位置
   *
   * @type {Position}
   * @memberof Popup
   */
  @Prop({
    type: String,
    default: 'center',
  })
  position: Position

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof Popup
   */
  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  /**
   * 自定义 body 样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof Popup
   */
  @Prop({
    type: Object,
    default: null,
  })
  bodyStyle: Partial<CSSStyleDeclaration>

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   * @memberof Popup
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
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  maskClosable: boolean

  /**
   * 蒙层是否透明
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  maskTransparent: boolean
  
  /**
   * 自定义蒙层样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof Popup
   */
  @Prop({
    type: Object,
    default: null,
  })
  maskStyle: Partial<CSSStyleDeclaration>

  /**
   * 是否可见
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 是否支持向上/下滑动关闭
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  closeOnSwipe: boolean

  /**
   * 设置蒙层的 z-index
   *
   * @type {number}
   * @memberof Popup
   */
  @Prop({
    type: Number,
    default: null,
  })
  zIndex: number

  /**
   * 首次进场动画时是否懒挂载组件
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  mountOnEnter: boolean

  /**
   * 离场动画完成时是否卸载组件
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  unmountOnExit: boolean

  /**
   * 是否显示关闭按钮
   *
   * @type {boolean}
   * @memberof Popup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  closable: boolean

  /**
   * 是否开启安全区适配，关于 `SafeAreaProp` 的类型定义，请参考 `SafeArea` 的文档
   *
   * @type {SafeAreaProp}
   * @memberof Popup
   */
  @Prop({
    type: [Boolean, String, Object],
    default: false,
  })
  safeArea: SafeAreaProp

  get classes () {
    const { prefixCls, position } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--position-${position}`]: position,
    })
    const body = `${prefixCls}__body`
    const close = `${prefixCls}__close`
    const x = `${prefixCls}__close-x`

    return {
      wrap,
      body,
      close,
      x,
    }
  }

  /**
   * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
   *
   * @readonly
   * @memberof Popup
   */
  get indexStyle(): Partial<CSSStyleDeclaration> | null {
    return this.zIndex ? { zIndex: this.zIndex } as unknown as Partial<CSSStyleDeclaration> : null
  }

  /**
   * 容器样式
   *
   * @readonly
   * @memberof Popup
   */
  get containerStyle () {
    return styleToCssString({
      ...this.wrapStyle,
      ...this.indexStyle,
      touchAction: ['top', 'bottom'].includes(this.position)
        ? 'none'
        : 'auto'
    })
  }

  /**
   * body 组件样式
   *
   * @readonly
   * @memberof Popup
   */
  get internalBodyStyle (): Partial<CSSStyleDeclaration> {
    return this.bodyStyle ? { ...this.bodyStyle, ...this.indexStyle } : { ...this.indexStyle }
  }

  @Watch('visible')
  onVisibleChange(visible: boolean) {
    this.setPopupVisible(visible)
  }

  @Watch('position')
  onPositionChange(position: Position) {
    this.getTransitionName(position)
  }

  setPopupVisible(popupVisible: boolean) {
    if (this.popupVisible !== popupVisible) {
      this.popupVisible = popupVisible
      this.setBackdropVisible(popupVisible)
    }
  }

  setBackdropVisible(visible: boolean) {
    if (this.mask && this._backdrop) {
      if (visible) {
        this._backdrop.retain()
      } else {
        this._backdrop.release()
      }
    }
  }

  transitionName: string = ''
  popupVisible: boolean = false
  _backdrop?: BackdropInstance

  /**
   * 点击蒙层事件
   */
  onMaskClick() {
    if (this.maskClosable) {
      this.onClose()
    }
  }

  /**
   * 点击关闭按钮
   */
  onXClose () {
    if (this.closable) {
      this.onClose()
    }
  }

  /**
   * 开始展示前触发
   */
  onShow() {
    this.$emit('show')
  }

  /**
   * 完全展示后触发
   */
  onShowed() {
    this.$emit('showed')
  }

  /**
   * 开始关闭前触发
   */
  onClose() {
    this.$emit('close')
  }

  /**
   * 完全关闭后触发
   */
  onClosed() {
    this.$emit('closed')
  }

  /**
   * 获取过渡的类名
   */
  getTransitionName(value: Position) {
    const { animationPrefixCls } = this
    let transitionName = ''
    switch (value) {
      case 'top':
        transitionName = `${animationPrefixCls}--slideInDown`
        break
      case 'right':
        transitionName = `${animationPrefixCls}--slideInRight`
        break
      case 'bottom':
        transitionName = `${animationPrefixCls}--slideInUp`
        break
      case 'left':
        transitionName = `${animationPrefixCls}--slideInLeft`
        break
      default:
        transitionName = `${animationPrefixCls}--fadeIn`
        break
    }
    this.transitionName = transitionName
  }

  isMoved: boolean = false
  _start: TouchPoint
  _move: TouchPoint

  onTouchStart(e: TouchEvent) {
    if (
      !this.closeOnSwipe ||
      !['top', 'bottom'].includes(this.position) ||
      getPointsNumber(e) > 1
    ) {
      return
    }
    this._start = getTouchPoints(e)
  }

  onTouchMove(e: TouchEvent) {
    if (
      !this.closeOnSwipe ||
      !['top', 'bottom'].includes(this.position) ||
      getPointsNumber(e) > 1
    ) {
      return
    }
    this._move = getTouchPoints(e)
    const direction = getTouchDirection(this._start.x, this._move.x, this._start.y, this._move.y)
    if (
      (this.position === 'bottom' && direction === 'Down') ||
      (this.position === 'top' && direction === 'Up')
    ) {
      this.isMoved = true
    }
  }

  onTouchEnd(e: TouchEvent) {
    if (
      !this.closeOnSwipe ||
      !['top', 'bottom'].includes(this.position) ||
      getPointsNumber(e) > 1 ||
      !this.isMoved
    ) {
      return
    }
    this.isMoved = false
    this._start = null
    this._move = null
    this.onClose()
  }

  created() {
    if (this.mask) {
      this._backdrop = findComponentNode('#dora-backdrop', this._renderProxy)
    }
  }

  mounted() {
    this.setPopupVisible(this.visible)
    this.getTransitionName(this.position)
  }
}

export default defineComponentHOC()(Popup)
