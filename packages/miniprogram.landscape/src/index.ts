import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { LandscapeCloseDetail } from './types'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-landscape',
    },
  },
})
class Landscape extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Landscape
   */
  prefixCls!: string

  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof Landscape
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 是否显示蒙层
   *
   * @type {boolean}
   * @memberof Landscape
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  mask: boolean

  /**
   * 点击蒙层是否关闭
   *
   * @type {boolean}
   * @memberof Landscape
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  maskClosable: boolean

  /**
   * 是否显示关闭按钮
   *
   * @type {boolean}
   * @memberof Landscape
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  closable: boolean

  showMask: boolean = true

  get classes() {
    const { prefixCls, showMask } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--has-mask`]: showMask,
    })

    return {
      wrap,
      inner: `${prefixCls}__inner`,
      close: `${prefixCls}__close`,
      x: `${prefixCls}__close-x`,
    }
  }

  get popupBodyStyle(): Partial<CSSStyleDeclaration> {
    return {
      backgroundColor: 'transparent',
      padding: '0',
    }
  }

  @Watch('mask')
  onMaskChange(mask: boolean) {
    if (this.showMask !== mask) {
      this.showMask = mask
    }
  }

  onClose() {
    this.$emit('close', { visible: !this.visible } as LandscapeCloseDetail)
  }

  mounted() {
    this.onMaskChange(this.mask)
  }
}

export { Landscape }

export default defineComponentHOC()(Landscape)
