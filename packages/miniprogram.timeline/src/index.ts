import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { TimelinePosition } from './types'

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-timeline',
    },
  },
  components: {
    TimelineItem: () => ({
      module: './timeline-item',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
})
class Timeline extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Timeline
   */
  prefixCls!: string

  /**
   * 是否显示 pending 节点
   *
   * @type {boolean}
   * @memberof Timeline
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  pending: boolean

  /**
   * 时间轴位置
   *
   * @type {TimelinePosition}
   * @memberof Timeline
   */
  @Prop({
    type: String,
    default: 'left',
  })
  position: TimelinePosition

  onChildrenChanged() {
    this.updateIsLastElement()
  }

  updateIsLastElement() {
    const proxy = this._renderProxy as any
    let elements: any[] = []
    if (proxy && typeof proxy.getRelationNodes === 'function') {
      elements = proxy.getRelationNodes('./timeline-item') || []
    }
    if (elements.length > 0) {
      const lastIndex = elements.length - 1
      elements.forEach((element, index) => {
        const isLast = this.pending ? index === Math.max(0, lastIndex - 1) : index === lastIndex
        const isPending = this.pending && index === lastIndex
        if (element && typeof element.updateIsLastElement === 'function') {
          element.updateIsLastElement({
            index,
            isLast,
            isPending,
            pending: this.pending,
            position: this.position,
          })
        }
      })
    }
  }

  mounted() {
    this.updateIsLastElement()
  }
}

export { Timeline }

export default defineComponentHOC()(Timeline)
