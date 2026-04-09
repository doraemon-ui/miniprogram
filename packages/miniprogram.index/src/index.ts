import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { useRectAll, vibrateShort } from '@doraemon-ui/miniprogram.shared'
import type { IndexChild, IndexIndicatorPosition, IndexItemExpose, IndexItemInstance, IndexPointNode } from './types'

const { classNames, styleToCssString } = Doraemon.util

const findActiveByIndex = (current: number, currentName: string, children: IndexChild[]) => {
  return children.filter((child) => child.index === current && child.name === currentName)[0]
}

const findActiveByPosition = (scrollTop: number, offsetY: number, children: IndexChild[]) => {
  return children.filter((child) => scrollTop < child.top + child.height - offsetY && scrollTop >= child.top - offsetY)[0]
}

@Component({
  components: {
    IndexItem: () => ({
      module: './item',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  expose: ['scrollTo', 'getInternalHooks'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-index',
    },
    height: {
      type: null,
      default: 300,
    },
    showIndicator: {
      type: Boolean,
      default: true,
    },
    indicatorPosition: {
      type: String,
      default: 'center',
    },
    parentOffsetTop: {
      type: Number,
      default: 0,
    },
  },
})
class Index extends Doraemon {
  /**
   * 自定义类名前缀
   */
  prefixCls!: string

  /**
   * 组件高度
   */
  @Prop({
    type: null,
    default: 300,
  })
  height: string | number

  /**
   * 是否显示提示指示器
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  showIndicator: boolean

  /**
   * 提示指示器位置
   */
  @Prop({
    type: String,
    default: 'center',
  })
  indicatorPosition: IndexIndicatorPosition

  /**
   * 父容器顶部偏移
   */
  @Prop({
    type: Number,
    default: 0,
  })
  parentOffsetTop: number

  colHight: number = 0
  points: IndexPointNode[] = []
  scrollTop: number = 0
  children: IndexChild[] = []
  moving: boolean = false
  current: number = 0
  currentName: string = ''
  currentBrief: string = ''
  extStyle: string = ''
  indicatorStyle: string = ''

  get classes() {
    const { prefixCls, indicatorPosition } = this
    return {
      wrap: classNames(prefixCls),
      nav: `${prefixCls}__nav`,
      navRow: `${prefixCls}__nav-row`,
      navCol: `${prefixCls}__nav-col`,
      navItem: `${prefixCls}__nav-item`,
      indicator: classNames(`${prefixCls}__indicator`, {
        [`${prefixCls}__indicator--${indicatorPosition}`]: indicatorPosition,
      }),
    }
  }

  @Watch('height')
  onHeightChange(newVal: string | number) {
    this.updateStyle(newVal)
  }

  onChildrenChanged() {
    this.updated()
  }

  /**
   * 更新样式
   */
  updateStyle(height: string | number = this.height) {
    const extStyle = styleToCssString({ height })
    if (extStyle !== this.extStyle) {
      this.extStyle = extStyle
    }
  }

  getChildrenNodes(): IndexItemInstance[] {
    const nodes = (
      (this._renderProxy as unknown as { getRelationNodes?: (path: string) => Array<{ $component?: unknown }> }).getRelationNodes?.(
        './item',
      ) || []
    )
      .map((node) => node.$component)
      .filter(Boolean) as IndexItemInstance[]
    return nodes
  }

  /**
   * 刷新元素数据
   */
  updated() {
    const elements = this.getChildrenNodes()
    if (elements.length > 0) {
      elements.forEach((element, index) => {
        const expose = element as unknown as IndexItemExpose
        expose.updated(index)
      })
      setTimeout(() => {
        this.getNavPoints().catch(() => {})
      }, 0)
    }
    this.updateChildren()
  }

  /**
   * 设置当前激活项
   */
  setActive(current: number, currentName: string) {
    if (current !== this.current || currentName !== this.currentName) {
      const target = findActiveByIndex(current, currentName, this.children)
      const currentBrief = target ? target.brief : currentName.charAt(0)
      if (target) {
        const indicatorStyle =
          this.indicatorPosition === 'right' ? styleToCssString({ top: current * this.colHight + this.colHight / 2 }) : ''
        this.current = current
        this.currentName = currentName
        this.currentBrief = currentBrief
        this.scrollTop = target.top - this.parentOffsetTop
        this.indicatorStyle = indicatorStyle
      }

      void vibrateShort({ type: 'light' })
      this.$emit('change', { index: current, name: currentName, brief: currentBrief })
    }
  }

  onTouchStart(e: WechatMiniprogram.BaseEvent<{ index?: number; name?: string }>) {
    if (this.moving) return
    const index = Number(e?.target?.dataset?.index ?? -1)
    const name = String(e?.target?.dataset?.name ?? '')
    this.setActive(index, name)
    this.moving = true
  }

  onTouchMove(e: WechatMiniprogram.TouchEvent) {
    const touch = e.changedTouches?.[0]
    if (!touch) return
    const target = this.getTargetFromPoint(touch.pageY)
    if (target) {
      const { index, name } = target.dataset
      this.setActive(index, name)
    }
  }

  onTouchEnd() {
    if (!this.moving) return
    setTimeout(() => {
      this.moving = false
    }, 300)
  }

  onScroll(e: WechatMiniprogram.ScrollViewScroll) {
    if (this.moving) return
    this.checkActiveIndex(e.detail.scrollTop)
  }

  async getNavPoints() {
    const navColCls = `.${this.prefixCls}__nav-col`
    const navItemCls = `.${this.prefixCls}__nav-item`
    const list = (await useRectAll([navColCls, navItemCls], this._renderProxy)) as unknown as [Array<{ height: number }>, Array<PointNode>]
    const cols = list[0] || []
    const items = list[1] || []
    if (!cols.length && !items.length) return
    this.colHight = cols[0].height
    this.points = items.map((n) => ({ ...n, offsets: [n.top, n.top + n.height] }))
  }

  getTargetFromPoint(y: number) {
    const points = this.points
    let target: PointNode | undefined
    for (let i = points.length - 1; i >= 0; i--) {
      const [a, b] = points[i].offsets
      if ((i === points.length - 1 && y > b) || (i === 0 && y < a) || (y >= a && y <= b)) {
        target = points[i]
        break
      }
    }
    return target
  }

  checkActiveIndex(scrollTop: number) {
    const target = findActiveByPosition(scrollTop, this.parentOffsetTop, this.children)
    if (target) {
      const current = target.index
      const currentName = target.name
      const currentBrief = target.brief
      if (current !== this.current || currentName !== this.currentName) {
        this.current = current
        this.currentName = currentName
        this.currentBrief = currentBrief
        this.$emit('change', { index: current, name: currentName, brief: currentBrief })
      }
    }
  }

  updateChildren() {
    const nodes = this.getChildrenNodes()
    this.children = nodes.map((node) => {
      const item = node as unknown as {
        name: string
        index: number
        top: number
        height: number
        brief: string
      }
      return {
        name: item.name,
        index: item.index,
        top: item.top,
        height: item.height,
        brief: item.brief,
      }
    })
  }

  getInternalHooks(key: string) {
    if (key === 'INDEX_HOOK_MARK') {
      return {
        updateChildren: this.updateChildren.bind(this),
      }
    }
    return null
  }

  scrollTo(index: number | string) {
    const child =
      typeof index === 'number'
        ? this.children.filter((item) => item.index === index)[0]
        : this.children.filter((item) => item.name === index)[0]
    if (child) {
      this.moving = true
      this.setActive(child.index, child.name)
      setTimeout(() => {
        this.moving = false
      }, 300)
    }
  }

  mounted() {
    this.updateStyle()
    void this.getNavPoints()
    this.updateChildren()
  }
}

export { Index }

export default defineComponentHOC()(Index)
