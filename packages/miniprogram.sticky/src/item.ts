import { Component, defineComponentHOC, Doraemon, Prop } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'

import type { StickyInstance } from './types'

const { classNames } = Doraemon.util

@Component({
  components: {
    Sticky: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-sticky-item',
    },
  },
  expose: ['onScroll', 'updated'],
})
class StickyItem extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: '',
  })
  title: string

  @Prop({
    type: String,
    default: '',
  })
  content: string

  isFixed = false
  index = 0
  top = 0
  height = 0

  get classes() {
    const { prefixCls, isFixed } = this
    return {
      wrap: classNames(prefixCls, {
        [`${prefixCls}--fixed`]: isFixed,
      }),
      hd: `${prefixCls}__hd`,
      title: `${prefixCls}__title`,
      bd: `${prefixCls}__bd`,
      content: `${prefixCls}__content`,
    }
  }

  onScroll(scrollTop: number) {
    const { top, height, index } = this
    const isFixed = scrollTop >= top && scrollTop < top + height

    if (this.isFixed !== isFixed) {
      this.isFixed = isFixed
      const parent = this.$parent as StickyInstance | undefined
      if (parent) {
        if (isFixed) {
          parent.emitStick({ index })
        } else {
          parent.emitUnstick({ index })
        }
      }
    }
  }

  updated(index: number) {
    useRect(`.${this.prefixCls}`, this._renderProxy).then((rect) => {
      if (!rect) return
      this.top = rect.top
      this.height = rect.height
      this.index = index
    })
  }
}

export { StickyItem }

export default defineComponentHOC()(StickyItem)
