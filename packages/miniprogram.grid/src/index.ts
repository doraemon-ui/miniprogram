import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { GridItemInstance } from './types'
const { classNames } = Doraemon.util

@Component({
  components: {
    GridItem: () => ({
      module: './item',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-grid',
    },
  },
})
class Grid extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Grid
   */
  prefixCls!: string

  /**
   * 列数
   *
   * @type {number}
   * @memberof Grid
   */
  @Prop({
    type: Number,
    default: 3,
  })
  col: number

  /**
   * 是否有边框
   *
   * @type {boolean}
   * @memberof Grid
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  bordered: boolean

  /**
   * 每个格子是否固定为正方形
   *
   * @type {boolean}
   * @memberof Grid
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  square: boolean

  get classes() {
    const { prefixCls, bordered } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--bordered`]: bordered,
    })

    return {
      wrap,
    }
  }

  @Watch('col')
  @Watch('bordered')
  @Watch('square')
  onPropsChange() {
    this.changeCurrent()
  }

  changeCurrent() {
    const elements = this.$children as GridItemInstance[]
    const { col, bordered, square } = this
    const colNum = col > 0 ? col : 1
    const width = `${100 / colNum}%`

    if (elements.length > 0) {
      elements.forEach((element, index) => {
        element.changeCurrent(width, bordered, square, index)
      })
    }
  }

  onChildrenChanged() {
    this.changeCurrent()
  }
}

export { Grid }

export default defineComponentHOC()(Grid)
