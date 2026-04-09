import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { TimelineItemUpdatePayload } from './types'

const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-timeline-item',
    },
  },
  components: {
    Timeline: () => ({
      module: './index',
      type: 'parent',
    }),
  },
})
class TimelineItem extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof TimelineItem
   */
  prefixCls!: string

  /**
   * 内容
   *
   * @type {string}
   * @memberof TimelineItem
   */
  @Prop({
    type: String,
    default: '',
  })
  content: string

  /**
   * 圆点样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof TimelineItem
   */
  @Prop({
    type: null,
    default: '',
  })
  dotStyle: string | Partial<CSSStyleDeclaration>

  /**
   * 是否自定义圆点
   *
   * @type {boolean}
   * @memberof TimelineItem
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  custom: boolean

  isLast: boolean = false
  isPending: boolean = false
  pending: boolean = false
  className: string = ''
  extStyle: string = ''

  @Watch('dotStyle')
  onDotStyleChange(v: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(v as any)
  }

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p, {
        [`${p}--last`]: this.isLast,
        [`${p}--pending`]: this.pending,
      }),
      tail: classNames(`${p}__tail`, {
        [`${p}__tail--pending`]: this.isPending,
      }),
      dot: classNames(`${p}__dot`, {
        [`${p}__dot--custom`]: this.custom,
      }),
      content: `${p}__content`,
    }
  }

  updateIsLastElement({ index, isLast, isPending, pending, position }: TimelineItemUpdatePayload) {
    const p = this.prefixCls
    const className =
      position === 'alternate'
        ? index % 2 === 0
          ? `${p}--alternate ${p}--left`
          : `${p}--alternate ${p}--right`
        : position === 'right'
          ? `${p}--right`
          : ''
    this.isLast = isLast
    this.isPending = isPending
    this.pending = pending
    this.className = className
  }

  mounted() {
    this.onDotStyleChange(this.dotStyle)
  }
}

export { TimelineItem }

export default defineComponentHOC()(TimelineItem)
