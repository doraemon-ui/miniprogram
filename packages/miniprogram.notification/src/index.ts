import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-notification',
    },
  },
})
class Notification extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Notification
   */
  prefixCls!: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Notification
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
   * @memberof Notification
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
   * @memberof Notification
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

export { Notification }

export default defineComponentHOC()(Notification)
