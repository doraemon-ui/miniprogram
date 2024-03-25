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
  classNames: string
  wrapStyle: object
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

  @Prop({
    type: Boolean,
    default: false,
  })
  transparent: boolean

  @Prop({
    type: Number,
    default: 1000,
  })
  zIndex: number

  @Prop({
    type: null,
    default: 'dora-animate--fadeIn',
  })
  classNames: string

  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: object

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
   * 组件样式
   *
   * @readonly
   * @memberof Backdrop
   */
  get extStyle () {
    return this.wrapStyle ? { ...this.wrapStyle, zIndex: this.zIndex } : { zIndex: this.zIndex }
  }

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   * @memberof Backdrop
   */
  visible: boolean = false

  @Watch('visible')
  onVisibleChange (visible: boolean) {
    if (visible) {
      this.$emit('afterShow')
    } else {
      this.$emit('afterClose')
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
      this.visible = true
    }
  }

  /**
   * 释放锁定
   *
   * @memberof Backdrop
   */
  release() {
    if (this.backdropHolds === 1) {
      this.visible = false
    }
    this.backdropHolds = Math.max(0, this.backdropHolds - 1)
  }

  onClick () {
    this.$emit('click')
  }
}

export default defineComponentHOC()(Backdrop)
