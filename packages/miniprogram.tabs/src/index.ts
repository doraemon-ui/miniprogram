import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRef } from '@doraemon-ui/miniprogram.shared'
import type { MiniprogramPublicInstance } from '@doraemon-ui/miniprogram.shared'
import type { ActiveLineMode, TabContext, TabInstance, TabsChangeDetail, TabsDirection, TabsTheme } from './types'

const { classNames, styleToCssString } = Doraemon.util

const bound = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max)

const getDefaultActiveKey = (elements: Array<{ key: string; disabled?: boolean }>) => {
  const target = elements.filter((e) => !e.disabled)[0]
  return target ? target.key : null
}

const activeKeyIsValid = (elements: Array<{ key: string }>, key: string) => elements.map((e) => e.key).includes(key)

const getActiveKey = (elements: Array<{ key: string; disabled?: boolean }>, activeKey: string) => {
  const defaultActiveKey = getDefaultActiveKey(elements)
  return !activeKey ? defaultActiveKey : !activeKeyIsValid(elements, activeKey) ? defaultActiveKey : activeKey
}

@Component({
  components: {
    Tab: () => ({
      module: './tab',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-tabs',
    },
    defaultCurrent: {
      type: String,
      default: '',
    },
    current: {
      type: String,
      default: '',
    },
    scroll: {
      type: Boolean,
      default: false,
    },
    controlled: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'balanced',
    },
    direction: {
      type: String,
      default: 'horizontal',
    },
    justify: {
      type: String,
      default: 'space-around',
    },
    activeLineMode: {
      type: String,
      default: 'auto',
    },
  },
  expose: ['setActiveKey'],
})
class Tabs extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Tabs
   */
  prefixCls!: string

  @Prop({
    type: String,
    default: '',
  })
  defaultCurrent: string

  /**
   * 当前激活项
   *
   * @type {string}
   * @memberof Tabs
   */
  @Prop({
    type: String,
    default: '',
  })
  current: string

  /**
   * 是否可滚动
   *
   * @type {boolean}
   * @memberof Tabs
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  scroll: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Tabs
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 主题
   *
   * @type {TabsTheme}
   * @memberof Tabs
   */
  @Prop({
    type: String,
    default: 'balanced',
  })
  theme: TabsTheme

  /**
   * 方向
   *
   * @type {TabsDirection}
   * @memberof Tabs
   */
  @Prop({
    type: String,
    default: 'horizontal',
  })
  direction: TabsDirection

  /**
   * 对齐方式
   *
   * @type {string}
   * @memberof Tabs
   */
  @Prop({
    type: String,
    default: 'space-around',
  })
  justify: string

  /**
   * 激活线模式
   *
   * @type {ActiveLineMode}
   * @memberof Tabs
   */
  @Prop({
    type: String,
    default: 'auto',
  })
  activeLineMode: ActiveLineMode

  activeKey: string = ''
  keys: Array<{ key: string; title: string; disabled: boolean }> = []
  scrollLeft: number = 0
  scrollTop: number = 0
  showPrevMask: boolean = false
  showNextMask: boolean = false
  scrollViewStyle: string = ''

  private updateMask?: () => void

  @Watch('current')
  onCurrentChange(newVal: string) {
    if (this.controlled) {
      this.updated(newVal)
    }
  }

  @Watch('justify')
  onJustifyChange(newVal: string) {
    this.setStyles(newVal)
  }

  get classes() {
    const { prefixCls, direction, scroll } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${direction}`]: direction,
      [`${prefixCls}--scroll`]: scroll,
    })
    const scrollView = `${prefixCls}__scroll-view`
    const prev = classNames([`${prefixCls}__mask`, `${prefixCls}__mask--prev`])
    const next = classNames([`${prefixCls}__mask`, `${prefixCls}__mask--next`])

    return {
      wrap,
      scrollView,
      prev,
      next,
    }
  }

  tabsContainerRef() {
    const prefixCls = this.prefixCls
    return useRef(`.${prefixCls}__scroll-view`, this._renderProxy as unknown as MiniprogramPublicInstance).then((container: any) => {
      return {
        containerWidth: container.width,
        containerHeight: container.height,
        containerScrollWidth: container.scrollWidth,
        containerScrollHeight: container.scrollHeight,
        containerScrollLeft: container.scrollLeft,
        containerScrollTop: container.scrollTop,
        containerOffsetX: container.left,
        containerOffsetY: container.top,
      }
    })
  }

  onScrollFix() {
    const { direction } = this
    if (direction === 'horizontal') {
      if (!this.updateMask) {
        this.updateMask = () => {
          this.tabsContainerRef().then((container) => {
            const scrollLeft = container.containerScrollLeft
            const showPrevMask = scrollLeft > 0
            const showNextMask = Math.round(scrollLeft + container.containerWidth) < Math.round(container.containerScrollWidth)
            this.showPrevMask = showPrevMask
            this.showNextMask = showNextMask
          })
        }
      }
      this.updateMask()
    }

    if (direction === 'vertical') {
      if (!this.updateMask) {
        this.updateMask = () => {
          this.tabsContainerRef().then((container) => {
            const scrollTop = container.containerScrollTop
            const showPrevMask = scrollTop > 0
            const showNextMask = Math.round(scrollTop + container.containerHeight) < Math.round(container.containerScrollHeight)
            this.showPrevMask = showPrevMask
            this.showNextMask = showNextMask
          })
        }
      }
      this.updateMask()
    }
  }

  async setNextScroll(activeElement: TabInstance) {
    const { direction, scroll } = this
    if (!scroll) return

    const [container, activeTab] = await Promise.all([this.tabsContainerRef(), activeElement.activeTabRef()])

    if (direction === 'horizontal') {
      const maxScrollDistance = container.containerScrollWidth - container.containerWidth
      if (maxScrollDistance <= 0) return
      const nextScrollLeft = Math.round(
        bound(
          container.containerScrollLeft +
            (activeTab.activeTabLeft - container.containerOffsetX) -
            (container.containerWidth - activeTab.activeTabWidth) / 2,
          0,
          maxScrollDistance,
        ),
      )
      this.scrollLeft = nextScrollLeft
      this.onScrollFix()
    }

    if (direction === 'vertical') {
      const maxScrollDistance = container.containerScrollHeight - container.containerHeight
      if (maxScrollDistance <= 0) return
      const nextScrollTop = Math.round(
        bound(
          container.containerScrollTop +
            (activeTab.activeTabTop - container.containerOffsetY) -
            (container.containerHeight - activeTab.activeTabHeight) / 2,
          0,
          maxScrollDistance,
        ),
      )
      this.scrollTop = nextScrollTop
      this.onScrollFix()
    }
  }

  private getChildrenTabs(): TabInstance[] {
    const nodes = (this._renderProxy as any)?.getRelationNodes?.('./tab') || []
    return nodes.map((n: any) => n?.$component).filter(Boolean)
  }

  onChildrenChanged() {
    // 关系节点变动时，刷新 keys 和 active 状态
    this.updated(this.activeKey)
  }

  updated(value: string = this.activeKey) {
    const children = this.getChildrenTabs()
    const elements = children.map((c) => ({ key: c.key, title: c.title, disabled: !!c.disabled }))
    const activeKey = getActiveKey(elements, value) || ''

    this.keys = elements
    if (this.activeKey !== activeKey) {
      this.activeKey = activeKey
    }

    const context: TabContext = {
      scroll: this.scroll,
      theme: this.theme,
      direction: this.direction,
      activeLineMode: this.activeLineMode,
    }

    children.forEach((child) => {
      child.changeCurrent({
        current: child.key === activeKey,
        context,
      })
      if (child.key === activeKey) {
        this.setNextScroll(child).catch(() => {})
      }
    })
  }

  emitEvent(key: string) {
    this.$emit('change', {
      key,
      keys: this.keys,
    } as TabsChangeDetail)
  }

  setActiveKey(activeKey: string) {
    if (!this.controlled) {
      this.activeKey = activeKey
    }
    this.updated(activeKey)
    this.emitEvent(activeKey)
  }

  setStyles(justify: string) {
    if (this.direction === 'horizontal') {
      const scrollViewStyle = styleToCssString({ 'justify-content': justify } as any)
      if (this.scrollViewStyle !== scrollViewStyle) {
        this.scrollViewStyle = scrollViewStyle
      }
    }
  }

  mounted() {
    const activeKey = this.controlled ? this.current : this.defaultCurrent
    this.activeKey = activeKey
    this.setStyles(this.justify)
    this.updated(activeKey)
  }
}

export { Tabs }

export default defineComponentHOC()(Tabs)
