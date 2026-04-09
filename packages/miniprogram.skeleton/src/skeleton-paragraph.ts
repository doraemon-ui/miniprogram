import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-skeleton-paragraph',
    },
  },
})
class SkeletonParagraph extends Doraemon {
  prefixCls!: string

  @Prop({
    type: Number,
    default: 3,
  })
  rows: number
  @Prop({
    type: Boolean,
    default: false,
  })
  rounded: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  active: boolean

  rowList: number[] = []

  get classes() {
    const { prefixCls, active, rounded } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--active`]: active,
      [`${prefixCls}--rounded`]: rounded,
    })
    return {
      wrap,
      row: `${prefixCls}__row`,
    }
  }

  updateRows(rows = this.rows) {
    const n = Math.max(0, Number(rows) || 0)
    this.rowList = Array.from({ length: n }, (_, i) => i)
  }

  @Watch('rows')
  onRowsChange(v: number) {
    this.updateRows(v)
  }

  mounted() {
    this.updateRows(this.rows)
  }
}

export { SkeletonParagraph }
export default defineComponentHOC()(SkeletonParagraph)
