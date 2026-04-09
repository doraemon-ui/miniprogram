import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-popover',
    },
  },
})
class Popover extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Popover
   */
  prefixCls!: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Popover
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 点击态类名
   *
   * @type {string}
   * @memberof Popover
   */
  @Prop({
    type: String,
    default: 'default',
  })
  hoverClass: string

  /**
   * 外层样式
   *
   * @type {Partial<CSSStyleDeclaration>}
   * @memberof Popover
   */
  @Prop({
    type: Object,
    default: null,
  })
  wrapStyle: Partial<CSSStyleDeclaration>

  get classes() {
    const { prefixCls, hoverClass, disabled } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--disabled`]: disabled,
    })
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`

    return {
      wrap,
      hover,
    }
  }

  get containerStyle() {
    return this.wrapStyle ? styleToCssString(this.wrapStyle) : ''
  }

  onClick() {
    if (!this.disabled) {
      this.$emit('click')
    }
  }
}

export { Popover }

export default defineComponentHOC()(Popover)
