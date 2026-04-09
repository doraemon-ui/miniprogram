import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { WhiteSpaceSize } from './types'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-white-space',
    },
  },
})
class WhiteSpace extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof WhiteSpace
   */
  prefixCls!: string

  /**
   * 间距尺寸
   *
   * @type {WhiteSpaceSize}
   * @memberof WhiteSpace
   */
  @Prop({
    type: String,
    default: 'default',
  })
  size: WhiteSpaceSize

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof WhiteSpace
   */
  @Prop({
    type: null,
    default: '',
  })
  bodyStyle: string | Partial<CSSStyleDeclaration>
  extStyle: string = ''

  @Watch('bodyStyle')
  onBodyStyleChange(v: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(v as any)
  }

  get classes() {
    const { prefixCls, size } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${size}`]: !!size,
    })
    return { wrap }
  }

  onTap() {
    this.$emit('click')
  }

  mounted() {
    this.onBodyStyleChange(this.bodyStyle)
  }
}

export { WhiteSpace }
export default defineComponentHOC()(WhiteSpace)
