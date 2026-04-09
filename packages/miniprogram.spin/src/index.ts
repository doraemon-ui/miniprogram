import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

const presetColors: Record<string, string> = {
  light: '#ddd',
  stable: '#b2b2b2',
  positive: '#387ef5',
  calm: '#11c1f3',
  balanced: '#33cd5f',
  energized: '#ffc900',
  assertive: '#ef473a',
  royal: '#886aea',
  dark: '#444',
  default: 'default',
}

const isPresetColor = (color: string) => {
  if (!color) return 'default'
  return presetColors[color] ? presetColors[color] : color
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-spin',
    },
  },
})
class Spin extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Spin
   */
  prefixCls!: string

  /**
   * 过渡的类名
   *
   * @type {string}
   * @memberof Spin
   */
  @Prop({
    type: null,
    default: 'dora-animate--fadeIn',
  })
  classNames: string

  /**
   * 提示文案
   *
   * @type {string}
   * @memberof Spin
   */
  @Prop({
    type: String,
    default: '',
  })
  tip: string

  /**
   * 尺寸
   *
   * @type {string}
   * @memberof Spin
   */
  @Prop({
    type: String,
    default: 'default',
  })
  size: string

  /**
   * 是否加载中
   *
   * @type {boolean}
   * @memberof Spin
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  spinning: boolean

  /**
   * 是否嵌套模式
   *
   * @type {boolean}
   * @memberof Spin
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  nested: boolean

  /**
   * 加载器颜色
   *
   * @type {string}
   * @memberof Spin
   */
  @Prop({
    type: String,
    default: 'default',
  })
  spinColor: string

  spinVisible: boolean = true
  dotStyle: string = ''
  tipStyle: string = ''

  get classes() {
    const { prefixCls, size, nested, tip } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${size}`]: !!size,
      [`${prefixCls}--nested`]: nested,
      [`${prefixCls}--show-text`]: !!tip,
    })
    return {
      wrap,
      anim: !nested ? `${prefixCls}__spinning` : `${prefixCls}__spinning--nested`,
      dots: `${prefixCls}__dots`,
      dot: `${prefixCls}__dot`,
      tip: `${prefixCls}__tip`,
      container: classNames(`${prefixCls}__container`, {
        [`${prefixCls}__container--blur`]: this.spinVisible,
      }),
    }
  }

  @Watch('spinning')
  onSpinningChange(v: boolean) {
    if (this.nested) this.spinVisible = v
  }

  @Watch('spinColor')
  setStyles(spinColor: string) {
    const inputColor = isPresetColor(spinColor)
    this.dotStyle = inputColor !== 'default' ? styleToCssString({ backgroundColor: inputColor }) : ''
    this.tipStyle = inputColor !== 'default' ? styleToCssString({ color: inputColor }) : ''
  }

  mounted() {
    this.setStyles(this.spinColor)
    this.onSpinningChange(this.spinning)
  }
}

export { Spin }

export default defineComponentHOC()(Spin)
