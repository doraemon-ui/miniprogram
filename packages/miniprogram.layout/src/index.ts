import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-row',
    },
  },
})
class Row extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Row
   */
  prefixCls!: string

  /**
   * 栅格间隔（px）
   *
   * @type {number}
   * @memberof Row
   */
  @Prop({
    type: Number,
    default: 0,
  })
  gutter: number

  rowStyle: string = ''

  get classes() {
    const { prefixCls } = this
    const wrap = classNames(prefixCls)
    return {
      wrap,
    }
  }

  @Watch('gutter')
  onGutterChange(newVal: number) {
    this.updateStyle(newVal)
  }

  updateStyle(gutter: number = this.gutter) {
    const g = typeof gutter === 'number' && gutter > 0 ? gutter : 0
    const half = g / 2
    const rowStyle =
      g > 0
        ? `--dora-row-gutter: ${g}px; --dora-row-gutter-half: ${half}px; margin-left: -${half}px; margin-right: -${half}px;`
        : '--dora-row-gutter: 0px; --dora-row-gutter-half: 0px;'

    if (this.rowStyle !== rowStyle) {
      this.rowStyle = rowStyle
    }
  }

  mounted() {
    this.updateStyle()
  }
}

export { Row }

export default defineComponentHOC()(Row)
