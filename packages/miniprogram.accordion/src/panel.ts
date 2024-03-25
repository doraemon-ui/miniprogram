import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'
const { classNames } = Doraemon.util

@Component({
  components: {
    Accordion: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-accordion-panel',
    },
    key: {
      type: String,
      default: '',
    },
    thumb: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showArrow: {
      type: Boolean,
      default: true,
    },
  },
})
class Panel extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Panel
   */
  prefixCls!: string

  get classes () {
    const { prefixCls, current, disabled } = this as any
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--current`]: current,
      [`${prefixCls}--disabled`]: disabled,
    })
    const hd = `${prefixCls}__hd`
    const thumb = `${prefixCls}__thumb`
    const title = `${prefixCls}__title`
    const arrow = `${prefixCls}__arrow`
    const bd = `${prefixCls}__bd`
    const content = `${prefixCls}__content`
  
    return {
      wrap,
      hd,
      thumb,
      title,
      arrow,
      bd,
      content,
    }
  }

  current: boolean = false
  index: string = '0'

  changeCurrent (current: boolean, index: string) {
    this.current = current
    this.index = index
  }

  onClick () {
    const { index, disabled } = this as any
    if (!disabled && this.$parent) {
      (this.$parent as any).onClickItem(index)
    }
  }
}

export default defineComponentHOC()(Panel)
