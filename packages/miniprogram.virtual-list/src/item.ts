import { defineComponentHOC, Doraemon, Component } from '@doraemon-ui/miniprogram.core-js'

const { styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-virtual-item',
    },
  },
  components: {
    VirtualList: () => ({
      module: './index',
      type: 'parent',
    }),
  },
})
class VirtualListItem extends Doraemon {
  prefixCls!: string
  index: number = 0
  wrapStyle: string = ''

  updated(index: number, height: number) {
    this.index = index
    this.wrapStyle = styleToCssString({
      position: 'absolute',
      left: 0,
      top: index * height,
      width: '100%',
      height,
    })
  }
}

export { VirtualListItem }

export default defineComponentHOC()(VirtualListItem)
