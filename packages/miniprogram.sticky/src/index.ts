import { Component, defineComponentHOC, Doraemon, Emit, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'

import type { StickyItemInstance } from './types'

const { classNames } = Doraemon.util

@Component({
  components: {
    StickyItem: () => ({
      module: './item',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-sticky',
    },
  },
  expose: ['onScroll', 'updated', 'emitStick', 'emitUnstick'],
})
class Sticky extends Doraemon {
  prefixCls!: string

  @Prop({
    type: Number,
    default: 0,
  })
  scrollTop: number

  get classes() {
    return {
      wrap: classNames(this.prefixCls),
    }
  }

  @Watch('scrollTop')
  onScrollChange(scrollTop: number) {
    this.onScroll(scrollTop)
  }

  getChildNodes() {
    return (this.$children as StickyItemInstance[]) || []
  }

  onScroll(scrollTop = this.scrollTop) {
    const elements = this.getChildNodes()
    if (elements.length > 0) {
      elements.forEach((element) => {
        element.onScroll(scrollTop)
      })
    }
  }

  updated() {
    const elements = this.getChildNodes()
    if (elements.length > 0) {
      elements.forEach((element, index) => {
        element.updated(index)
      })
    }
  }

  onChildrenChanged() {
    this.updated()
  }

  @Emit('stick')
  emitStick(detail: { index: number }) {
    return detail
  }

  @Emit('unstick')
  emitUnstick(detail: { index: number }) {
    return detail
  }

  mounted() {
    this.updated()
    this.onScroll(this.scrollTop)
  }
}

export { Sticky }

export default defineComponentHOC()(Sticky)
