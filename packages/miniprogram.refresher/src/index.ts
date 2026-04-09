import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import { getSystemInfoSync, useRect } from '@doraemon-ui/miniprogram.shared'
import type { TouchPoint } from './types'

const { classNames } = Doraemon.util
const defaultStyle = 'transition: transform .4s; transform: translate3d(0px, 0px, 0px) scale(1);'

@Component({
  expose: ['triggerRefresh', 'finishPullToRefresh', 'finishLoadmore'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-refresher',
    },
  },
})
class Refresher extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Refresher
   */
  prefixCls!: string

  /**
   * 下拉图标
   *
   * @type {string}
   * @memberof Refresher
   */
  @Prop({
    type: String,
    default: '',
  })
  pullingIcon: string

  /**
   * 下拉文案
   *
   * @type {string}
   * @memberof Refresher
   */
  @Prop({
    type: String,
    default: '下拉刷新',
  })
  pullingText: string

  /**
   * 刷新图标
   *
   * @type {string}
   * @memberof Refresher
   */
  @Prop({
    type: String,
    default: '',
  })
  refreshingIcon: string

  /**
   * 刷新文案
   *
   * @type {string}
   * @memberof Refresher
   */
  @Prop({
    type: String,
    default: '正在刷新',
  })
  refreshingText: string

  /**
   * 是否禁用下拉旋转动画
   *
   * @type {boolean}
   * @memberof Refresher
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disablePullingRotation: boolean

  /**
   * 触发刷新距离
   *
   * @type {number}
   * @memberof Refresher
   */
  @Prop({
    type: Number,
    default: 30,
  })
  distance: number

  /**
   * 加载区类名前缀
   *
   * @type {string}
   * @memberof Refresher
   */
  @Prop({
    type: String,
    default: 'dora-loader',
  })
  prefixLCls: string

  /**
   * 是否显示加载文案
   *
   * @type {boolean}
   * @memberof Refresher
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  isShowLoadingText: boolean

  /**
   * 加载中文案
   *
   * @type {string}
   * @memberof Refresher
   */
  @Prop({
    type: String,
    default: '正在加载',
  })
  loadingText: string

  /**
   * 无更多数据文案
   *
   * @type {string}
   * @memberof Refresher
   */
  @Prop({
    type: String,
    default: '没有更多数据',
  })
  loadNoDataText: string

  /**
   * 当前滚动位置
   *
   * @type {number}
   * @memberof Refresher
   */
  @Prop({
    type: Number,
    default: 0,
  })
  scrollTop: number

  style: string = defaultStyle
  visible: boolean = false
  active: boolean = false
  refreshing: boolean = false
  tail: boolean = false
  lVisible: boolean = false
  noData: boolean = false
  windowHeight: number = 0
  newContentHeight: number = 0
  oldContentHeight: number = 0
  loading: boolean = false

  lastTime = 0
  activated = false
  start: TouchPoint | false = false
  move: TouchPoint | false = false
  diffX = 0
  diffY = 0
  isMoved = false
  direction = ''

  get classes() {
    const {
      prefixCls,
      pullingText,
      refreshingText,
      disablePullingRotation,
      visible,
      active,
      refreshing,
      tail,
      prefixLCls,
      loading,
      noData,
    } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--hidden`]: !visible,
      [`${prefixCls}--visible`]: visible,
      [`${prefixCls}--active`]: active,
      [`${prefixCls}--refreshing`]: refreshing,
      [`${prefixCls}--refreshing-tail`]: tail,
    })
    const content = classNames(`${prefixCls}__content`, {
      [`${prefixCls}__content--text`]: !!(pullingText || refreshingText),
    })
    const iconPulling = classNames(`${prefixCls}__icon-pulling`, {
      [`${prefixCls}__icon-pulling--disabled`]: disablePullingRotation,
    })
    const pIcon = this.pullingIcon || `${prefixCls}__icon--arrow-down`
    const rIcon = this.refreshingIcon || `${prefixCls}__icon--refresher`
    const lWrap = classNames(prefixLCls, {
      [`${prefixLCls}--hidden`]: !loading,
      [`${prefixLCls}--visible`]: loading,
      [`${prefixLCls}--end`]: noData,
    })
    return {
      wrap,
      content,
      iconPulling,
      textPulling: `${prefixCls}__text-pulling`,
      iconRefreshing: `${prefixCls}__icon-refreshing`,
      textRefreshing: `${prefixCls}__text-refreshing`,
      pIcon,
      rIcon,
      lWrap,
      lContent: `${prefixLCls}__content`,
      loadingText: `${prefixLCls}__text-loading`,
    }
  }

  @Watch('scrollTop')
  onScrollPropChange(n: number) {
    this.onScroll(n)
  }

  activate() {
    this.style = defaultStyle
    this.visible = true
  }
  deactivate() {
    this.activated = false
    this.style = defaultStyle
    this.visible = false
    this.active = false
    this.refreshing = false
    this.tail = false
  }
  doRefreshing() {
    this.style = 'transition: transform .4s; transform: translate3d(0, 50px, 0) scale(1);'
    this.visible = true
    this.active = true
    this.refreshing = true
    this.loading = false
    this.noData = false
    this.newContentHeight = 0
    this.oldContentHeight = 0
    this.lVisible = false
  }
  doTail() {
    this.visible = true
    this.active = true
    this.refreshing = true
    this.tail = true
  }
  hide() {
    this.lVisible = false
  }
  translate(diffY: number) {
    this.style = `transition-duration: 0s; transform: translate3d(0, ${diffY}px, 0) scale(1);`
    if (diffY < this.distance) {
      this.visible = true
      this.active = false
    } else {
      this.visible = true
      this.active = true
    }
  }
  isRefreshing() {
    return this.refreshing
  }
  isLoading() {
    return this.loading
  }
  getTouchPoints(e: TouchEvent, index = 0) {
    const p = e.touches[index] || e.changedTouches[index]
    return { x: p.pageX, y: p.pageY }
  }
  getSwipeDirection(x1: number, x2: number, y1: number, y2: number) {
    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : y1 - y2 > 0 ? 'Up' : 'Down'
  }
  requestAnimationFrame(callback: () => void) {
    const currTime = new Date().getTime()
    const timeToCall = Math.max(0, 16 - (currTime - this.lastTime))
    const timeout = setTimeout(() => callback.bind(this)(), timeToCall)
    this.lastTime = currTime + timeToCall
    return timeout
  }
  finishPullToRefresh() {
    setTimeout(() => {
      this.requestAnimationFrame(this.doTail)
      setTimeout(() => this.deactivate(), 200)
    }, 200)
  }
  finishLoadmore(isEnd?: boolean) {
    if (isEnd === true) {
      setTimeout(() => {
        this.noData = true
        this.loading = false
      }, 200)
    } else {
      setTimeout(() => {
        this.noData = false
        this.loading = false
        this.requestAnimationFrame(this.hide)
        setTimeout(() => this.deactivate(), 200)
      }, 200)
    }
  }
  onTouchStart(e: TouchEvent) {
    if (this.isRefreshing() || this.isLoading()) return
    this.start = this.getTouchPoints(e)
    this.diffX = this.diffY = 0
    this.isMoved = false
    this.direction = ''
    this.activate()
  }
  onTouchMove(e: TouchEvent) {
    if (!this.start || this.isRefreshing() || this.isLoading()) return
    if (!this.isMoved) this.isMoved = true
    this.move = this.getTouchPoints(e)
    this.diffX = this.move.x - this.start.x
    this.diffY = this.move.y - this.start.y
    this.direction = this.getSwipeDirection(this.start.x, this.move.x, this.start.y, this.move.y)
    if (this.diffY < 0 || this.direction !== 'Down') return
    this.diffY = Math.pow(this.diffY, 0.8)
    this.triggerPull(this.diffY)
  }
  onTouchEnd() {
    if (!this.isMoved) return
    this.start = false
    this.isMoved = false
    if (this.diffY <= 0 || this.direction !== 'Down' || this.isRefreshing() || this.isLoading()) return
    this.triggerRefresh(this.diffY)
  }
  triggerPull(diffY: number) {
    if (!this.activated && diffY > this.distance) {
      this.activated = true
      this.$emit('pulling')
    } else if (this.activated && diffY < this.distance) {
      this.activated = false
    }
    this.translate(diffY)
  }
  triggerRefresh(diffY = this.distance) {
    this.triggerPull(diffY)
    this.deactivate()
    if (Math.abs(diffY) >= this.distance) {
      this.doRefreshing()
      this.$emit('refresh')
    }
  }
  onScroll(n: number) {
    if (this.isMoved) return
    useRect('.dora-refresher__container', this._renderProxy).then((res) => {
      if (!res) return
      const newContentHeight = res.height
      if (this.newContentHeight !== newContentHeight) this.newContentHeight = newContentHeight
      if (this.windowHeight && !this.isRefreshing()) {
        if (
          n > newContentHeight - this.windowHeight - this.distance * 1.5 &&
          this.loading === false &&
          this.noData === false &&
          newContentHeight !== this.oldContentHeight
        ) {
          this.loading = true
          this.refreshing = false
          this.oldContentHeight = newContentHeight
          this.$emit('loadmore')
        } else if (this.loading === false && this.noData === false) {
          this.hide()
        } else if (this.loading === true) {
          this.oldContentHeight = newContentHeight
        }
        this.deactivate()
      }
    })
  }
  noop() {}

  mounted() {
    this.windowHeight = getSystemInfoSync().windowHeight
  }
}

export { Refresher }

export const $startWuxRefresher = (
  selector = '#dora-refresher',
  context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>,
) => {
  const page =
    context ||
    (getCurrentPages()[getCurrentPages().length - 1] as WechatMiniprogram.Page.Instance<
      WechatMiniprogram.IAnyObject,
      WechatMiniprogram.IAnyObject
    >)
  const comp = page?.selectComponent?.(selector) as { triggerRefresh?: () => void } | undefined
  comp?.triggerRefresh?.()
}

export const $stopWuxRefresher = (
  selector = '#dora-refresher',
  context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>,
) => {
  const page =
    context ||
    (getCurrentPages()[getCurrentPages().length - 1] as WechatMiniprogram.Page.Instance<
      WechatMiniprogram.IAnyObject,
      WechatMiniprogram.IAnyObject
    >)
  const comp = page?.selectComponent?.(selector) as { finishPullToRefresh?: () => void } | undefined
  comp?.finishPullToRefresh?.()
}

export const $stopWuxLoader = (
  selector = '#dora-refresher',
  context?: WechatMiniprogram.Page.Instance<WechatMiniprogram.IAnyObject, WechatMiniprogram.IAnyObject>,
  isEnd?: boolean,
) => {
  const page =
    context ||
    (getCurrentPages()[getCurrentPages().length - 1] as WechatMiniprogram.Page.Instance<
      WechatMiniprogram.IAnyObject,
      WechatMiniprogram.IAnyObject
    >)
  const comp = page?.selectComponent?.(selector) as { finishLoadmore?: (isEnd?: boolean) => void } | undefined
  comp?.finishLoadmore?.(isEnd)
}

export default defineComponentHOC()(Refresher)
