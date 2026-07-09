import { Component, defineComponentHOC, Doraemon, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'

import type { IndexListInstance } from './types'

const { classNames } = Doraemon.util

@Component({
  components: {
    IndexList: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-index-list-item',
    },
  },
})
class IndexListItem extends Doraemon {
  /**
   * 自定义类名前缀
   */
  prefixCls!: string

  /**
   * 分组名称
   */
  @Prop({
    type: String,
    default: '',
  })
  name: string

  index: number = 0
  top: number = 0
  height: number = 0
  brief: string = ''

  get classes() {
    const { prefixCls } = this
    return {
      root: classNames(prefixCls),
      hd: `${prefixCls}__hd`,
      bd: `${prefixCls}__bd`,
    }
  }

  getParentInstance() {
    return this.$parent as IndexListInstance | undefined
  }

  @Watch('name')
  @Watch('index')
  @Watch('top')
  @Watch('height')
  refreshBrief() {
    const name = this.name || ''
    const brief = name ? name.charAt(0) : String(this.index)
    if (brief !== this.brief) {
      this.brief = brief
    }
    this.getParentInstance()?.updateNavList()
  }

  /**
   * 更新 index item 位置信息
   */
  updated(index: number) {
    useRect(`.${this.prefixCls}`, this._renderProxy).then((rect) => {
      if (!rect) {
        return
      }
      this.top = rect.top
      this.height = rect.height
      this.index = index
    })
  }

  mounted() {
    this.refreshBrief()
  }
}

export { IndexListItem }

export default defineComponentHOC()(IndexListItem)
