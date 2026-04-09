import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-touch-view',
    },
  },
})
class TouchView extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof TouchView
   */
  prefixCls!: string

  /**
   * 点击态类名
   *
   * @type {string}
   * @memberof TouchView
   */
  @Prop({
    type: String,
    default: 'none',
  })
  hoverClass: string

  /**
   * 指定是否阻止本节点的祖先节点出现点击态
   *
   * @type {boolean}
   * @memberof TouchView
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  hoverStopPropagation: boolean

  /**
   * 按住后多久出现点击态，单位毫秒
   *
   * @type {number}
   * @memberof TouchView
   */
  @Prop({
    type: Number,
    default: 20,
  })
  hoverStartTime: number

  /**
   * 手指松开后点击态保留时间，单位毫秒
   *
   * @type {number}
   * @memberof TouchView
   */
  @Prop({
    type: Number,
    default: 70,
  })
  hoverStayTime: number

  /**
   * 外层样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof TouchView
   */
  @Prop({
    type: null,
    default: '',
  })
  wrapStyle: string | Partial<CSSStyleDeclaration>

  extStyle: string = ''

  get classes() {
    const { prefixCls, hoverClass } = this
    const wrap = classNames(prefixCls)
    const hover = hoverClass && hoverClass !== 'default' ? hoverClass : `${prefixCls}--hover`
    return {
      wrap,
      hover,
    }
  }

  @Watch('wrapStyle')
  onWrapStyleChange(v: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(v as any)
  }

  onClick() {
    this.$emit('click')
  }

  mounted() {
    this.onWrapStyleChange(this.wrapStyle)
  }
}

export { TouchView }

export default defineComponentHOC()(TouchView)
