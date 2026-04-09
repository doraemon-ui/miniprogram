import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { getTouchPoints, getPointsNumber, getSwipeDirection, useRect } from '@doraemon-ui/miniprogram.shared'
import type { ActionItem } from './types'

const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-swipe',
    },
  },
})
class SwipeAction extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof SwipeAction
   */
  prefixCls!: string

  /**
   * 点击后是否自动关闭
   *
   * @type {boolean}
   * @memberof SwipeAction
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  autoClose: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof SwipeAction
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 左侧操作项
   *
   * @type {ActionItem[]}
   * @memberof SwipeAction
   */
  @Prop({
    type: Array,
    default: [],
  })
  left: ActionItem[]

  /**
   * 右侧操作项
   *
   * @type {ActionItem[]}
   * @memberof SwipeAction
   */
  @Prop({
    type: Array,
    default: [],
  })
  right: ActionItem[]

  /**
   * 是否使用插槽渲染操作区
   *
   * @type {boolean}
   * @memberof SwipeAction
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  useSlots: boolean

  /**
   * 附加数据
   *
   * @type {unknown}
   * @memberof SwipeAction
   */
  @Prop({
    type: null,
    default: null,
  })
  data: unknown

  index: number = 0
  swiping: boolean = false
  showCover: boolean = false
  offsetStyle: string = ''

  btnsLeftWidth: number = 0
  btnsRightWidth: number = 0
  openedLeft: boolean = false
  openedRight: boolean = false
  needShowLeft: boolean = false
  needShowRight: boolean = false

  start: { x: number; y: number } = { x: 0, y: 0 }
  move: { x: number; y: number } = { x: 0, y: 0 }
  end: { x: number; y: number } = { x: 0, y: 0 }

  get classes() {
    const p = this.prefixCls
    const wrap = classNames(p, {
      [`${p}--swiping`]: this.swiping,
    })
    return {
      wrap,
      cover: `${p}__cover`,
      left: classNames(`${p}__actions`, {
        [`${p}__actions--left`]: true,
      }),
      right: classNames(`${p}__actions`, {
        [`${p}__actions--right`]: true,
      }),
      action: `${p}__action`,
      text: `${p}__text`,
      content: `${p}__content`,
    }
  }

  updated(index: number) {
    if (this.index !== index) this.index = index
  }

  getContentEasing(value: number, limit: number) {
    const delta = Math.abs(value) - Math.abs(limit)
    const isOverflow = delta > 0
    const factor = limit > 0 ? 1 : -1
    if (isOverflow) {
      value = limit + Math.pow(delta, 0.85) * factor
      return Math.abs(value) > Math.abs(limit) ? limit : value
    }
    return value
  }

  setStyle(value: number) {
    const limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth
    const left = this.getContentEasing(value, limit)
    this.offsetStyle = `left: ${left}px`
    this.showCover = Math.abs(value) > 0
  }

  updateBtns() {
    const p = this.prefixCls
    useRect([`.${p}__actions--left`, `.${p}__actions--right`], this._renderProxy as any).then((rects: any) => {
      const [leftRect, rightRect] = rects || []
      this.btnsLeftWidth = leftRect?.width || 0
      this.btnsRightWidth = rightRect?.width || 0
    })
  }

  onTap(e: CustomEvent<{ type: 'left' | 'right'; index: number; value: ActionItem }>) {
    const { type } = e.currentTarget.dataset as any
    const params = {
      ...e.currentTarget.dataset,
      buttons: (this as any)[type] || [],
      data: this.data,
    }
    if (this.autoClose) this.onClose()
    this.$emit('click', params)
  }

  onAcitons() {
    if (this.autoClose) this.onClose()
  }

  onOpen(value: number, openedLeft: boolean, openedRight: boolean) {
    if (!this.openedLeft && !this.openedRight) this.$emit('open')
    this.openedLeft = openedLeft
    this.openedRight = openedRight
    this.setStyle(value)
  }

  onClose() {
    if (this.openedLeft || this.openedRight) this.$emit('close')
    this.openedLeft = false
    this.openedRight = false
    this.setStyle(0)
  }

  onOpenLeft() {
    this.onOpen(this.btnsLeftWidth, true, false)
  }

  onOpenRight() {
    this.onOpen(-this.btnsRightWidth, false, true)
  }

  onTouchStart(e: any) {
    if (this.disabled || getPointsNumber(e) > 1) return
    this.start = getTouchPoints(e)
  }

  onTouchMove(e: any) {
    if (this.disabled || getPointsNumber(e) > 1) return
    this.move = getTouchPoints(e)
    const deltaX = this.move.x - this.start.x
    const direction = getSwipeDirection(this.start.x, this.move.x, this.start.y, this.move.y)
    const isLeft = direction === 'Left'
    const isRight = direction === 'Right'
    if (!isLeft && !isRight) return
    this.needShowRight = isLeft && (this.useSlots || this.right.length > 0)
    this.needShowLeft = isRight && (this.useSlots || this.left.length > 0)
    if (this.needShowLeft || this.needShowRight) {
      this.swiping = true
      this.setStyle(deltaX)
    }
  }

  onTouchEnd(e: any) {
    if (this.disabled || getPointsNumber(e) > 1 || !this.swiping) return
    this.end = getTouchPoints(e)
    const deltaX = this.end.x - this.start.x
    const needOpenRight = this.needShowRight && Math.abs(deltaX) > this.btnsRightWidth / 2
    const needOpenLeft = this.needShowLeft && Math.abs(deltaX) > this.btnsLeftWidth / 2
    if (needOpenRight) this.onOpenRight()
    else if (needOpenLeft) this.onOpenLeft()
    else this.onClose()
    this.swiping = false
    this.needShowLeft = false
    this.needShowRight = false
  }

  noop() {}

  mounted() {
    this.updateBtns()
  }
}

export { SwipeAction }

export default defineComponentHOC()(SwipeAction)
