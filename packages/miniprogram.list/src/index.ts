import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'

@Component({
  components: {
    ListItem: () => ({
      module: './item',
      type: 'descendant',
      observer: 'updateIsLastElement',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-list',
    },
    title: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
  },
})
class List extends Doraemon {
  get classes () {
    const { prefixCls } = this as any
    const wrap = prefixCls
    const hd = `${prefixCls}__hd`
    const bd = `${prefixCls}__bd`
    const ft = `${prefixCls}__ft`

    return {
      wrap,
      hd,
      bd,
      ft,
    }
  }

  updateIsLastElement() {
    const elements = this.$children
    if (elements.length > 0) {
      const lastIndex = elements.length - 1
      elements.forEach((element, index) => {
        (element as any).updateIsLastElement(index === lastIndex)
      })
    }
  }
}

export default defineComponentHOC({ multipleSlots: false })(List)
