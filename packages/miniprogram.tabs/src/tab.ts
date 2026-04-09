import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type { ActiveLineMode, TabContext, TabsDirection, TabsTheme } from './types'

const { classNames } = Doraemon.util

const defaultContext: TabContext = {
  scroll: false,
  theme: 'balanced',
  direction: 'horizontal',
  activeLineMode: 'auto',
}

@Component({
  components: {
    Tabs: () => ({
      module: './index',
      type: 'parent',
    }),
  },
  props: {
    prefixCls: { type: String, default: 'dora-tabs__tab' },
    key: { type: String, default: '' },
    title: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
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
  tabContext: TabContext = defaultContext

  get classes() {
    const { prefixCls, disabled, current } = this
    const ctx = this.tabContext || defaultContext
    const { direction, scroll, theme, activeLineMode } = ctx
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${direction}`]: direction,
      [`${prefixCls}--${theme}`]: theme,
      [`${prefixCls}--scroll`]: scroll,
      [`${prefixCls}--current`]: current,
      [`${prefixCls}--disabled`]: disabled,
    })
    const title = `${prefixCls}-title`
    const bar = classNames(`${prefixCls}-bar`, {
      [`${prefixCls}-bar--${activeLineMode}`]: activeLineMode,
    })

    return { wrap, title, bar }
  }

  activeTabRef() {
    const prefixCls = this.prefixCls
    return useRect(`.${prefixCls}`, this._renderProxy as unknown as MiniprogramPublicInstance).then((activeTab: any) => {
      return {
        activeTabLeft: activeTab.left,
        activeTabWidth: activeTab.width,
        activeTabTop: activeTab.top,
        activeTabHeight: activeTab.height,
      }
    })
  }

  changeCurrent({ current, context = defaultContext }: { current: boolean; context?: TabContext }) {
    this.current = current
    this.tabContext = context
  }

  onTap() {
    const { key, disabled } = this
    if (disabled) return
    this.$emit('click', { key })
    const parents = (this._renderProxy as any)?.getRelationNodes?.('./index') || []
    const parent = parents[0]?.$component as any
    parent?.setActiveKey?.(key)
  }
}

export { Tab }

export default defineComponentHOC()(Tab)
