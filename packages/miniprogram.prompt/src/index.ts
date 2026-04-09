import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-prompt',
    },
  },
})
class Prompt extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Prompt
   */
  prefixCls!: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Prompt
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
   * @memberof Prompt
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
   * @memberof Prompt
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

export { Prompt }

export default defineComponentHOC()(Prompt)
