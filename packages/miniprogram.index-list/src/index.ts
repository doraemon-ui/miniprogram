import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import { useRectAll, vibrateShort } from '@doraemon-ui/miniprogram.shared'
import type { IndexListIndicatorPosition, IndexListItemInstance, IndexListNavProps, IndexListPointNode } from './types'

const { classNames, styleToCssString } = Doraemon.util

const findActiveByIndex = (current: number, currentName: string, children: IndexListItemInstance[]) => {
  return children.filter((child) => child.index === current && child.name === currentName)[0]
}

const findActiveByPosition = (scrollTop: number, offsetY: number, children: IndexListItemInstance[]) => {
  return children.filter((child) => scrollTop < child.top + child.height - offsetY && scrollTop >= child.top - offsetY)[0]
}

@Component({
  components: {
    IndexListItem: () => ({
      module: './item',
      type: 'child',
      observer: 'onChildrenChanged',
    }),
  },
  expose: ['scrollTo', 'updateNavList'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-index-list',
    },
  },
})
class IndexList extends Doraemon {
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
  indicatorPosition: IndexListIndicatorPosition

  /**
   * 父容器顶部偏移
   */
  @Prop({
    type: Number,
    default: 0,
  })
  parentOffsetTop: number

  colHight: number = 0
  points: IndexListPointNode[] = []
  scrollTop: number = 0
  navList: IndexListNavProps[] = []
  moving: boolean = false
  current: number = 0
  currentName: string = ''
  currentBrief: string = ''
  extStyle: string = ''
  indicatorStyle: string = ''

  get classes() {
    const { prefixCls, indicatorPosition } = this
    return {
      root: classNames(prefixCls),
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

  getChildNodes() {
    return this.$children as IndexListItemInstance[]
  }

  updateNavList() {
    const navList = this.getChildNodes().map((child) => ({ index: child.index, name: child.name, brief: child.brief }))
    this.navList = navList
  }

  /**
   * 刷新元素数据
   */
  updated() {
    const elements = this.getChildNodes()
    if (elements.length > 0) {
      elements.forEach((element, index) => {
        element.updated(index)
      })
      setTimeout(() => {
        this.getNavPoints().catch(() => {})
      }, 0)
    }
    this.updateNavList()
  }

  /**
   * 设置当前激活项
   */
  setActive(current: number, currentName: string) {
    if (current !== this.current || currentName !== this.currentName) {
      const target = findActiveByIndex(current, currentName, this.getChildNodes())
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

      vibrateShort({ type: 'light' })
      this.$emit('change', { index: current, name: currentName, brief: currentBrief })
    }
  }

  onTouchStart(e: TouchEvent<{}, {}, { index?: number; name?: string }>) {
    if (this.moving) return
    const index = Number(e.target.dataset?.index ?? -1)
    const name = String(e.target.dataset?.name ?? '')
    this.setActive(index, name)
    this.moving = true
  }

  onTouchMove(e: TouchEvent) {
    const touch = e.changedTouches?.[0]
    if (!touch) return
    const target = this.getTargetFromPoint(touch.pageY)
    if (target) {
      const { index, name } = target.dataset as IndexListNavProps
      this.setActive(index, name)
    }
  }

  onTouchEnd() {
    if (!this.moving) return
    setTimeout(() => {
      this.moving = false
    }, 300)
  }

  onScroll(e: TouchEvent<{ scrollTop: number }>) {
    if (this.moving) return
    this.checkActiveIndex(e.detail.scrollTop)
  }

  async getNavPoints() {
    const navColCls = `.${this.prefixCls}__nav-col`
    const navItemCls = `.${this.prefixCls}__nav-item`
    const list = await useRectAll([navColCls, navItemCls], this._renderProxy)
    const cols = list[0] || []
    const items = list[1] || []
    if (!cols.length && !items.length) return
    this.colHight = cols[0].height
    this.points = items.map((n) => ({ ...n, offsets: [n.top, n.top + n.height] }))
  }

  getTargetFromPoint(y: number) {
    const points = this.points
    let target: IndexListPointNode | undefined
    for (let i = points.length - 1; i >= 0; i--) {
      const [a, b] = points[i].offsets
      // 1.判断是否为第一个元素且大于最大坐标点
      // 2.判断是否为最后一个元素且小于最小坐标点
      // 3.判断是否包含于某个坐标系内
      if ((i === points.length - 1 && y > b) || (i === 0 && y < a) || (y >= a && y <= b)) {
        target = points[i]
        break
      }
    }
    return target
  }

  checkActiveIndex(scrollTop: number) {
    const target = findActiveByPosition(scrollTop, this.parentOffsetTop, this.getChildNodes())
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

  scrollTo(index: number | string) {
    const child =
      typeof index === 'number'
        ? this.getChildNodes().filter((item) => item.index === index)[0]
        : this.getChildNodes().filter((item) => item.name === index)[0]
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
    this.getNavPoints()
    this.updateNavList()
  }
}

export { IndexList }

export default defineComponentHOC()(IndexList)
