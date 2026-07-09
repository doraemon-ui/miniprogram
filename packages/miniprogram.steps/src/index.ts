import { Component, defineComponentHOC, Doraemon, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'

import type { StepInstance } from './types'

@Component({
  components: {
    Step: () => ({
      module: './step',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-steps',
    },
  },
})
class Steps extends Doraemon {
  prefixCls!: string

  @Prop({
    type: Number,
    default: 0,
  })
  current: number
  @Prop({
    type: String,
    default: 'horizontal',
  })
  direction: 'horizontal' | 'vertical'

  @Watch('current')
  onCurrentChange() {
    this.updateCurrent()
  }

  private getChildrenSteps(): StepInstance[] {
    const nodes = this.$children as StepInstance[] || []
    return nodes.filter(Boolean)
  }

  onChildrenChanged() {
    this.updateCurrent()
  }

  updateCurrent() {
    const elements = this.getChildrenSteps()
    const { current, direction } = this
    elements.forEach((element: StepInstance, index: number) => {
      element.updateCurrent({
        length: elements.length,
        index,
        current,
        direction,
      })
    })
  }

  mounted() {
    this.updateCurrent()
  }
}

export { Steps }

export default defineComponentHOC()(Steps)
