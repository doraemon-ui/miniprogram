import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { WingBlankSize } from './types'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-wing-blank',
    },
  },
})
class WingBlank extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof WingBlank
   */
  prefixCls!: string

  /**
   * 两侧留白尺寸
   *
   * @type {WingBlankSize}
   * @memberof WingBlank
   */
  @Prop({
    type: String,
    default: 'default',
  })
  size: WingBlankSize

  /**
   * 自定义样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof WingBlank
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

  mounted() {
    this.onBodyStyleChange(this.bodyStyle)
  }
}

export { WingBlank }
export default defineComponentHOC()(WingBlank)
