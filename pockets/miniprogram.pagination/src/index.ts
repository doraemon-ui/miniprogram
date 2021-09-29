
import { defineComponentHOC, Doraemon, Component, Watch, Emit } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-pagination',
    },
    mode: {
      type: String,
      default: 'button',
    },
    defaultCurrent: {
      type: Number,
      default: 1,
    },
    current: {
      type: Number,
      default: 1,
    },
    controlled: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    simple: {
      type: Boolean,
      default: false,
    },
  },
})
class Pagination extends Doraemon {
  get classes () {
    const { prefixCls } = this as any
    const wrap = classNames(prefixCls)
    const prev = `${prefixCls}__prev`
    const button = `${prefixCls}__button`
    const number = `${prefixCls}__number`
    const active = `${prefixCls}__active`
    const pointer = `${prefixCls}__pointer`
    const dot = `${prefixCls}__dot`
    const next = `${prefixCls}__next`
    return {
      wrap,
      prev,
      button,
      number,
      active,
      pointer,
      dot,
      next,
    }
  }

  activeIndex: number = 1

  @Watch('current')
  watchCurrent (newVal: number) {
    if ((this as any).controlled) {
      this.updated(newVal)
    }
  }

  updated(activeIndex: number) {
    if (this.activeIndex !== activeIndex) {
      this.activeIndex = activeIndex
    }
  }

  @Emit('change')
  onChange(current: number, type: 'prev' | 'next') {
    if (!(this as any).controlled) {
      this.updated(current)
    }

    return {
      current,
      type,
    }
  }

  @Emit('prev')
  onPrev() {
    const current = this.activeIndex - 1
    this.onChange(current, 'prev')
    return {
      current,
    }
  }

  @Emit('next')
  onNext() {
    const current = this.activeIndex + 1
    this.onChange(current, 'next')
    return {
      current,
    }
  }
}

export default defineComponentHOC()(Pagination)
