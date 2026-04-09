import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import { mapVirtualToProps, getVisibleItemBounds, debounce } from './utils'
import type { VirtualListRenderPayload, VirtualListVirtualData } from './types'

const { classNames, styleToCssString } = Doraemon.util

@Component({
  components: {
    VirtualItem: () => ({
      module: './item',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  props: {
    prefixCls: {
      type: String,
      default: 'dora-virtual-list',
    },
  },
})
class VirtualList extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof VirtualList
   */
  prefixCls!: string

  /**
   * 每项高度
   *
   * @type {number}
   * @memberof VirtualList
   */
  @Prop({
    type: Number,
    default: 50,
  })
  itemHeight: number

  /**
   * 渲染缓冲区项数
   *
   * @type {number}
   * @memberof VirtualList
   */
  @Prop({
    type: Number,
    default: 0,
  })
  itemBuffer: number

  /**
   * 初始化滚动到的索引
   *
   * @type {number}
   * @memberof VirtualList
   */
  @Prop({
    type: Number,
    default: 0,
  })
  scrollToIndex: number

  /**
   * 距顶部阈值
   *
   * @type {number}
   * @memberof VirtualList
   */
  @Prop({
    type: Number,
    default: 50,
  })
  upperThreshold: number

  /**
   * 距底部阈值
   *
   * @type {number}
   * @memberof VirtualList
   */
  @Prop({
    type: Number,
    default: 50,
  })
  lowerThreshold: number

  /**
   * 滚动是否使用动画
   *
   * @type {boolean}
   * @memberof VirtualList
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  scrollWithAnimation: boolean

  /**
   * iOS 点击顶部状态栏是否返回顶部
   *
   * @type {boolean}
   * @memberof VirtualList
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  enableBackToTop: boolean

  /**
   * 是否禁止滚动
   *
   * @type {boolean}
   * @memberof VirtualList
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disableScroll: boolean

  /**
   * 是否启用页面滚动模式
   *
   * @type {boolean}
   * @memberof VirtualList
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  enablePageScroll: boolean

  /**
   * 容器高度
   *
   * @type {number}
   * @memberof VirtualList
   */
  @Prop({
    type: Number,
    default: 300,
  })
  height: number

  /**
   * 滚动事件防抖延迟
   *
   * @type {number}
   * @memberof VirtualList
   */
  @Prop({
    type: Number,
    default: 0,
  })
  debounce: number

  wrapStyle: string = ''
  scrollOffset: number = 0
  innerScrollOffset: number = 0
  startIndex: number = 0
  endIndex: number = -1
  offsetTop?: number
  virtual: VirtualListVirtualData = { items: [], style: '' }

  private items: any[] = []
  private firstRendered = false
  scrollHandler: (e: any) => void = () => {}

  get classes() {
    const p = this.prefixCls
    const wrap = classNames(p)
    return {
      wrap,
      mask: `${p}__mask`,
      scrollView: `${p}__scroll-view`,
      scrollArea: `${p}__scroll-area`,
    }
  }

  @Watch('itemHeight')
  onItemHeightChange() {
    this.updated(this.itemHeight)
  }

  @Watch('height')
  onHeightChange(v: number) {
    this.updatedStyle(v)
  }

  @Watch('debounce')
  onDebounceChange(v: number) {
    this.setScrollHandler(v)
  }

  @Watch('enablePageScroll')
  @Watch('itemBuffer')
  onViewportDepsChange() {
    if (this.firstRendered) this.onChange(this.scrollOffset, true)
  }

  @Watch('scrollToIndex')
  onScrollToIndexPropChange(v: number) {
    if (this.firstRendered) this.scrollToIndexFn(v)
  }

  private getChildrenItems() {
    const proxy = this._renderProxy as any
    if (proxy && typeof proxy.getRelationNodes === 'function') {
      return (proxy.getRelationNodes('./item') || []).map((n: any) => n.$component).filter(Boolean)
    }
    return []
  }

  onChildrenChanged() {
    this.updated()
  }

  updated(itemHeight = this.itemHeight) {
    const elements = this.getChildrenItems()
    elements.forEach((element: any, index: number) => {
      element.updated(this.startIndex + index, itemHeight)
    })
  }

  updatedStyle(height: number) {
    this.wrapStyle = styleToCssString({ height })
  }

  loadData(callback?: (values: VirtualListRenderPayload) => void) {
    const values = mapVirtualToProps(
      { items: this.items, itemHeight: this.itemHeight },
      { startIndex: this.startIndex, endIndex: this.endIndex },
    )
    this.virtual = values.virtual
    if (typeof callback === 'function')
      callback({ ...values, startIndex: this.startIndex, endIndex: this.endIndex, scrollOffset: this.scrollOffset })
  }

  onChange(scrollOffset: number, scrolled?: boolean, callback?: (values: VirtualListRenderPayload) => void) {
    const itemCount = Math.max(0, this.items.length - 1)
    const listTop = this.enablePageScroll ? this.offsetTop || 0 : 0
    const viewTop = scrollOffset - listTop
    const state = getVisibleItemBounds(viewTop, this.height, itemCount, this.itemHeight, this.itemBuffer)
    const hasChanged = state.startIndex !== this.startIndex || state.endIndex !== this.endIndex
    const direction = scrollOffset > this.scrollOffset ? 'Down' : 'Up'
    const firstItemVisible = direction === 'Up' && viewTop < this.startIndex * this.itemHeight
    const lastItemVisible = direction === 'Down' && viewTop > this.endIndex * this.itemHeight - this.height
    if (state.startIndex > state.endIndex) return

    if ((hasChanged && (firstItemVisible || lastItemVisible)) || scrolled) {
      this.startIndex = state.startIndex
      this.endIndex = state.endIndex
      this.loadData((values) => {
        if (scrolled) this.innerScrollOffset = scrollOffset
        this.$emit('change', { ...values, direction, scrollOffset })
        callback?.({ ...values, direction, scrollOffset })
      })
    }
    this.scrollOffset = scrollOffset
  }

  onScroll(e: CustomEvent<{ scrollTop: number }>) {
    this.onChange(e.detail.scrollTop)
    this.$emit('scroll', e.detail)
  }

  onScrollToUpper(e: CustomEvent) {
    this.$emit('scrolltoupper', e.detail)
  }

  onScrollToLower(e: CustomEvent) {
    this.$emit('scrolltolower', e.detail)
  }

  getOffsetForIndex(index: number, itemHeight = this.itemHeight, itemSize = this.items.length) {
    const realIndex = Math.max(0, Math.min(index, itemSize - 1))
    return realIndex * itemHeight
  }

  render(items?: any[], success?: (payload: VirtualListRenderPayload) => void) {
    let scrollOffset = this.scrollOffset
    if (Array.isArray(items)) this.items = items
    if (!this.firstRendered) {
      this.firstRendered = true
      scrollOffset = this.getOffsetForIndex(this.scrollToIndex)
    }
    this.getBoundingClientRect(() => this.onChange(scrollOffset, true, success), true)
  }

  scrollTo(scrollOffset: number, success?: (payload: VirtualListRenderPayload) => void) {
    if (typeof scrollOffset === 'number') {
      const offset = Math.max(0, Math.min(scrollOffset, this.items.length * this.itemHeight))
      this.onChange(offset, true, success)
    }
  }

  scrollToIndexFn(index: number, success?: (payload: VirtualListRenderPayload) => void) {
    if (typeof index === 'number') this.onChange(this.getOffsetForIndex(index), true, success)
  }

  setScrollHandler(useDebounce = this.debounce) {
    this.scrollHandler = useDebounce ? debounce(this.onScroll.bind(this), useDebounce) : this.onScroll.bind(this)
  }

  noop() {}

  async getBoundingClientRect(callback?: () => void, isForce?: boolean) {
    if (this.offsetTop !== undefined && !isForce) {
      callback?.()
      return
    }
    const rect = await useRect(`.${this.prefixCls}`, this._renderProxy as any)
    if (!rect) return
    this.offsetTop = rect.top
    callback?.()
  }

  mounted() {
    this.updatedStyle(this.height)
    this.setScrollHandler(this.debounce)
    void this.getBoundingClientRect(() => this.loadData())
  }
}

export { VirtualList }

export default defineComponentHOC()(VirtualList)
