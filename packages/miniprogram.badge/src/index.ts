import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { BadgePosition, BadgeStatus } from './types'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-badge',
    },
  },
})
class Badge extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Badge
   */
  prefixCls!: string

  @Prop({
    type: Number,
    default: 0,
  })
  count: number

  @Prop({
    type: Number,
    default: 99,
  })
  overflowCount: number

  @Prop({
    type: Boolean,
    default: false,
  })
  dot: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  showZero: boolean

  @Prop({
    type: String,
    default: '',
  })
  status: BadgeStatus

  @Prop({
    type: String,
    default: '',
  })
  text: string

  @Prop({
    type: String,
    default: 'topRight',
  })
  position: BadgePosition

  @Prop({
    type: String,
    default: '#ed3f14',
  })
  backgroundColor: string

  @Prop({
    type: Boolean,
    default: false,
  })
  hideShadow: boolean

  @Prop({
    type: String,
    default: '',
  })
  title: string

  finalCount: string | number = 0

  badgeStyle: string = ''

  get classes() {
    const { prefixCls, position, hideShadow, status } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--position-${position}`]: position,
      [`${prefixCls}--hide-shadow`]: hideShadow,
    })
    const statusWrap = `${prefixCls}__status`
    const statusDot = classNames(`${prefixCls}__status-dot`, {
      [`${prefixCls}__status-dot--${status}`]: status,
    })
    const statusText = `${prefixCls}__status-text`
    const dot = `${prefixCls}__dot`
    const count = `${prefixCls}__count`

    return {
      wrap,
      status: statusWrap,
      statusDot,
      statusText,
      dot,
      count,
    }
  }

  updated(props: { count: number; overflowCount: number } = { count: this.count, overflowCount: this.overflowCount }) {
    const { count, overflowCount } = props
    this.finalCount = count >= overflowCount ? `${overflowCount}+` : count
  }

  updateStyle(backgroundColor: string) {
    const nextStyle = styleToCssString({
      backgroundColor,
    })
    if (nextStyle !== this.badgeStyle) {
      this.badgeStyle = nextStyle
    }
  }

  @Watch('count')
  @Watch('overflowCount')
  onCountChange() {
    this.updated()
  }

  @Watch('backgroundColor')
  onBackgroundColorChange(newVal: string) {
    this.updateStyle(newVal)
  }

  mounted() {
    this.updated()
    this.updateStyle(this.backgroundColor)
  }
}

export { Badge }

export default defineComponentHOC({ externalClasses: ['dora-class-badge'] })(Badge)
