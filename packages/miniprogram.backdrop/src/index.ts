import { type ComponentPublicInstance, defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

export type BackdropExpose = {
  backdropHolds: number
  retain: () => void
  release: () => void
}

export interface BackdropProps {
  prefixCls: string
  transparent: boolean
  zIndex: number
  disableScroll: boolean
  mountOnEnter: boolean
  unmountOnExit: boolean
  visible: boolean
  classNames: string
  wrapStyle: Partial<CSSStyleDeclaration>
}

export type BackdropInstance = ComponentPublicInstance<
  Backdrop,
  BackdropProps,
  BackdropExpose
>

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-backdrop',
    },
  },
  expose: ['backdropHolds', 'retain', 'release']
})
class Backdrop extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Backdrop
   */
  prefixCls!: string

  /**
   * 是否显示透明蒙层
   *
   * @type {boolean}
   * @memberof Backdrop
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  transparent: boolean

  /**
   * 设置蒙层的 z-index
   *
   * @type {number}
   * @memberof Backdrop
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
   * @memberof Backdrop
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
   * @memberof Backdrop
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  unmountOnExit: boolean

  /**
   * 阻止移动触摸
   *
   * @type {boolean}
   * @memberof Backdrop
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  disableScroll: boolean

  /**
   * 是否可见
   *
   * @type {boolean}
   * @memberof Backdrop
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 过渡的类名
   *
   * @type {string}
   * @memberof Backdrop
   */
  @Prop({
    type: null,
    default: 'dora-animate--fadeIn',
  })
  classNames: string

  /**
   * 自定义样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof Backdrop
   */
  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  get classes () {
    const { prefixCls, transparent } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--transparent`]: transparent,
    })

    return {
      wrap,
    }
  }

  /**
   * 元素的 z-index。优先级高于 css 设置的 var(--z-index)。
   *
   * @readonly
   * @memberof Backdrop
   */
  get indexStyle(): Partial<CSSStyleDeclaration> | null {
    return this.zIndex ? { zIndex: this.zIndex } as unknown as Partial<CSSStyleDeclaration> : null
  }

  /**
   * 组件样式
   *
   * @readonly
   * @memberof Backdrop
   */
  get containerStyle (): Partial<CSSStyleDeclaration> {
    return this.wrapStyle ? { ...this.wrapStyle, ...this.indexStyle } : { ...this.indexStyle }
  }

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   * @memberof Backdrop
   */
  internalVisible: boolean = false

  @Watch('visible')
  onVisibleChange (visible: boolean) {
    this.internalVisible = visible
    if (!visible) {
      this.backdropHolds = 0
      this.onClose()
    }
  }

  /**
   * 锁定蒙层的次数
   *
   * @type {number}
   * @memberof Backdrop
   */
  backdropHolds: number = 0

  /**
   * 保持锁定
   *
   * @memberof Backdrop
   */
  retain() {
    this.backdropHolds = this.backdropHolds + 1
    if (this.backdropHolds === 1) {
      this.internalVisible = true
    }
  }

  /**
   * 释放锁定
   *
   * @memberof Backdrop
   */
  release() {
    if (this.backdropHolds === 1) {
      this.internalVisible = false
      this.onClose()
    }
    this.backdropHolds = Math.max(0, this.backdropHolds - 1)
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
   * 点击事件
   */
  onClick () {
    this.$emit('click')
  }
}

export default defineComponentHOC()(Backdrop)
