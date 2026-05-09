import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import { getDefaultContext, useRect } from '@doraemon-ui/miniprogram.shared'
import type { TabContext, TabsInstance } from './types'
import { tabsProps } from './props'

const { classNames } = Doraemon.util

const defaultContext: TabContext = {
  ...(getDefaultContext(tabsProps, ['scroll', 'color', 'direction', 'activeLineMode']) as TabContext),
}

@Component({
  components: {
    Tabs: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-tabs__tab',
    },
  },
})
class Tab extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Tab
   */
  prefixCls!: string

  /**
   * 唯一标识
   *
   * @type {string}
   * @memberof Tab
   */
  @Prop({
    type: String,
    default: '',
  })
  key: string

  /**
   * 标题
   *
   * @type {string}
   * @memberof Tab
   */
  @Prop({
    type: String,
    default: '',
  })
  title: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Tab
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  current: boolean = false
  context: TabContext = defaultContext

  get classes() {
    const { prefixCls, disabled, current, context } = this
    const wrap = classNames(prefixCls, {
      ['dora-color']: context?.color,
      [`dora-color--${context?.color}`]: context?.color,
      [`${prefixCls}--${context?.direction}`]: context?.direction,
      [`${prefixCls}--scroll`]: context?.scroll,
      [`${prefixCls}--current`]: current,
      [`${prefixCls}--disabled`]: disabled,
    })
    const title = `${prefixCls}-title`
    const bar = classNames(`${prefixCls}-bar`, {
      [`${prefixCls}-bar--${context?.activeLineMode}`]: context?.activeLineMode,
    })

    return { wrap, title, bar }
  }

  async activeTabRef() {
    const prefixCls = this.prefixCls
    const activeTab = await useRect(`.${prefixCls}`, this._renderProxy)
    return {
      activeTabLeft: activeTab.left,
      activeTabWidth: activeTab.width,
      activeTabTop: activeTab.top,
      activeTabHeight: activeTab.height,
    }
  }

  changeCurrent({ current, context = defaultContext }: { current: boolean; context: TabContext }) {
    this.current = current
    this.context = context
  }

  onTap() {
    const { key, disabled } = this
    if (disabled) return
    this.$emit('click', { key })
    const parent = this.$parent as TabsInstance | undefined
    parent?.setActiveKey?.(key)
  }
}

export { Tab }

export default defineComponentHOC()(Tab)
