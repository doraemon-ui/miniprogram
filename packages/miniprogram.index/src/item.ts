import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { IndexExpose } from './types'

const { classNames } = Doraemon.util

@Component({
  components: {
    Index: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  expose: ['updated'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-index-item',
    },
  },
})
class IndexItem extends Doraemon {
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
      wrap: classNames(prefixCls),
      hd: `${prefixCls}__hd`,
      bd: `${prefixCls}__bd`,
    }
  }

  getParentInstance() {
    return this.$parent as IndexExpose | undefined
  }

  refreshBrief() {
    const name = this.name || ''
    const brief = name ? name.charAt(0) : String(this.index)
    if (brief !== this.brief) {
      this.brief = brief
    }
  }

  /**
   * 更新 index item 位置信息
   */
  updated(index: number) {
    this.index = index
    this.refreshBrief()
    void useRect(`.${this.prefixCls}`, this._renderProxy).then((rect) => {
      if (!rect) return
      this.top = rect.top
      this.height = rect.height
      const hooks = this.getParentInstance()?.getInternalHooks('INDEX_HOOK_MARK')
      hooks?.updateChildren()
    })
  }

  mounted() {
    this.refreshBrief()
  }
}

export { IndexItem }

export default defineComponentHOC()(IndexItem)
