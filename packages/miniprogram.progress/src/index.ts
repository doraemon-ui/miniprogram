import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { ProgressShape, ProgressStatus } from './types'
const { classNames, styleToCssString } = Doraemon.util

const defaultColors = {
  normal: '#387ef5',
  progress: '#387ef5',
  error: '#ef473a',
  success: '#33cd5f',
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-progress',
    },
  },
})
class Progress extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Progress
   */
  prefixCls!: string

  /**
   * 进度百分比
   *
   * @type {number}
   * @memberof Progress
   */
  @Prop({
    type: Number,
    default: 0,
  })
  percent: number

  /**
   * 进度条高度
   *
   * @type {number}
   * @memberof Progress
   */
  @Prop({
    type: Number,
    default: 10,
  })
  strokeWidth: number

  /**
   * 进度条颜色
   *
   * @type {string}
   * @memberof Progress
   */
  @Prop({
    type: String,
    default: '',
  })
  activeColor: string

  /**
   * 背景色
   *
   * @type {string}
   * @memberof Progress
   */
  @Prop({
    type: String,
    default: '#f3f3f3',
  })
  backgroundColor: string

  /**
   * 状态
   *
   * @type {ProgressStatus}
   * @memberof Progress
   */
  @Prop({
    type: String,
    default: 'normal',
  })
  status: ProgressStatus

  /**
   * 形状
   *
   * @type {ProgressShape}
   * @memberof Progress
   */
  @Prop({
    type: String,
    default: 'round',
  })
  shape: ProgressShape

  /**
   * 进度条样式
   *
   * @type {string | Partial<CSSStyleDeclaration>}
   * @memberof Progress
   */
  @Prop({
    type: [String, Object],
    default: '',
  })
  barStyle: string | Partial<CSSStyleDeclaration>

  /**
   * 是否显示进度信息
   *
   * @type {boolean}
   * @memberof Progress
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  showInfo: boolean

  width: number = 0
  style: string = ''
  extStyle: string = ''

  get classes() {
    const { prefixCls, shape, status } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${shape}`]: shape,
      [`${prefixCls}--${status}`]: status,
    })

    return {
      wrap,
      outer: `${prefixCls}__outer`,
      inner: `${prefixCls}__inner`,
      bar: `${prefixCls}__bar`,
      text: `${prefixCls}__text`,
    }
  }

  @Watch('barStyle')
  onBarStyleChange(newVal: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(newVal || '')
  }

  @Watch('percent')
  @Watch('strokeWidth')
  @Watch('activeColor')
  @Watch('status')
  onStyleRelatedChange() {
    this.updateStyle()
  }

  updateStyle() {
    const width = this.percent < 0 ? 0 : this.percent > 100 ? 100 : this.percent
    const height = this.strokeWidth > 0 ? this.strokeWidth : 10
    const backgroundColor = this.activeColor || defaultColors[this.status] || defaultColors.normal
    this.width = width
    this.style = `background-color: ${backgroundColor}; width: ${width}%; height: ${height}px;`
  }

  mounted() {
    this.onBarStyleChange(this.barStyle)
    this.updateStyle()
  }
}

export { Progress }

export default defineComponentHOC()(Progress)
