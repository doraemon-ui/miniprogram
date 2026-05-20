import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent, TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import type { ClassNames } from '@doraemon-ui/miniprogram.animation-group'
import { getPointsDistance, getPointsNumber, getTouchPoints } from '@doraemon-ui/miniprogram.shared'

import type { GalleryImage, GalleryItem } from './types'

const { classNames } = Doraemon.util

const MIN_RATIO = 1
const MAX_RATIO = 1.2

const defaultTouchOptions: {
  scale: number
  offset: [number, number]
} = {
  scale: 1,
  offset: [0.5, 3] as [number, number],
}

const getImages = (urls: Array<string | GalleryItem> = []): GalleryImage[] => {
  return urls.map((item) => {
    if (typeof item !== 'object') {
      return {
        image: item,
        remark: '',
        touch: { ...defaultTouchOptions },
      }
    }

    return {
      image: item.image,
      remark: item.remark || '',
      touch: { ...defaultTouchOptions },
    }
  })
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-gallery',
    },
  },
})
class Gallery extends Doraemon {
  prefixCls!: string

  @Prop({
    type: null,
    default: 'dora-animate--slideInRight',
  })
  classNames: ClassNames

  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  indicatorDots: boolean

  @Prop({
    type: String,
    default: 'rgba(0, 0, 0, .3)',
  })
  indicatorColor: string

  @Prop({
    type: String,
    default: '#000000',
  })
  indicatorActiveColor: string

  @Prop({
    type: Boolean,
    default: false,
  })
  autoplay: boolean

  @Prop({
    type: Number,
    default: 5000,
  })
  interval: number

  @Prop({
    type: Number,
    default: 500,
  })
  duration: number

  @Prop({
    type: Boolean,
    default: false,
  })
  circular: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  vertical: boolean

  @Prop({
    type: String,
    default: '',
  })
  icon: string

  @Prop({
    type: Boolean,
    default: true,
  })
  showDelete: boolean

  @Prop({
    type: Boolean,
    default: true,
  })
  allowScale: boolean

  @Prop({
    type: Number,
    default: 0,
  })
  current: number

  @Prop({
    type: Array,
    default: [],
  })
  urls: Array<string | GalleryItem>

  galleryVisible = false
  images: GalleryImage[] = []
  transition = ''

  _allowItemClick = true
  _touching = false
  _isRendered = false
  _prevDistance = 0

  get classes() {
    const { prefixCls } = this
    return {
      wrap: classNames(prefixCls),
      swiper: `${prefixCls}__swiper`,
      item: `${prefixCls}__item`,
      img: `${prefixCls}__img`,
      remark: `${prefixCls}__remark`,
      opr: `${prefixCls}__opr`,
      del: `${prefixCls}__del`,
      icon: classNames(`${prefixCls}__icon`, {
        [`${prefixCls}__icon--img`]: this.icon,
      }),
    }
  }

  @Watch('visible')
  @Watch('indicatorDots')
  @Watch('indicatorColor')
  @Watch('indicatorActiveColor')
  @Watch('autoplay')
  @Watch('interval')
  @Watch('duration')
  @Watch('circular')
  @Watch('vertical')
  @Watch('icon')
  @Watch('showDelete')
  @Watch('allowScale')
  @Watch('current')
  @Watch('urls')
  onPropsChange() {
    this.syncFromProps()
  }

  syncFromProps() {
    this.galleryVisible = this.visible
    this.images = getImages(this.urls)
  }

  hide() {
    this.galleryVisible = false
    this.onCancel()
    this.onClose()
  }

  /** May be rewritten */
  onCancel() {
    this.$emit('cancel')
  }

  /** May be rewritten */
  onClose() {
    this.$emit('close')
  }

  /** May be rewritten */
  onClosed() {
    this.$emit('closed')
  }

  onItemClick(e: CustomEvent<{}, {}, { index: number }>) {
    if (!this._allowItemClick) return
    const { index } = e.currentTarget.dataset
    const res = this.onClick(index, this.urls)
    if (res !== false) {
      this.hide()
    }
  }

  /** May be rewritten */
  onClick(current: number, urls: Array<string | GalleryItem>): boolean | void {
    this.$emit('click', {
      current,
      urls,
    })
  }

  onTouchStart(e: TouchEvent) {
    this._allowItemClick = true

    if (!this.allowScale || getPointsNumber(e) === 1 || this._touching) {
      return
    }

    const p1 = getTouchPoints(e)
    const p2 = getTouchPoints(e, 1)
    const distance = getPointsDistance(p1, p2)

    this._touching = false
    this._prevDistance = distance
    this.transition = 'none'
  }

  onTouchMove(e: TouchEvent<{}, {}, { index: number; touch: GalleryImage['touch'] }>) {
    if (!this.allowScale || getPointsNumber(e) === 1 || this._isRendered) {
      return
    }

    const p1 = getTouchPoints(e)
    const p2 = getTouchPoints(e, 1)
    const distance = getPointsDistance(p1, p2)
    const { touch, index } = e.currentTarget.dataset
    const distanceDiff = distance - this._prevDistance
    let scale = touch.scale + 0.005 * distanceDiff

    if (index !== this.current) {
      return
    }

    if (scale <= touch.offset[0] * MIN_RATIO) {
      scale = touch.offset[0] * MIN_RATIO
    } else if (scale >= touch.offset[1] * MAX_RATIO) {
      scale = touch.offset[1] * MAX_RATIO
    }

    const nextImages = [...this.images]
    nextImages[index] = {
      ...nextImages[index],
      touch: {
        ...nextImages[index].touch,
        scale,
      },
    }

    if (!this._touching) {
      this._touching = true
    }

    this._prevDistance = distance
    this._allowItemClick = false
    this._isRendered = true
    this.images = nextImages
    this.$nextTick(() => {
      this._isRendered = false
    })
  }

  onTouchEnd(e: TouchEvent<{}, {}, { index: number; touch: GalleryImage['touch'] }>) {
    if (!this.allowScale || !this._touching) {
      return
    }

    const { touch, index } = e.currentTarget.dataset
    let scale = touch.scale

    if (scale <= 1) {
      scale = 1
    } else if (scale >= touch.offset[1] * MAX_RATIO) {
      scale = touch.offset[1]
    }

    const nextImages = [...this.images]
    nextImages[index] = {
      ...nextImages[index],
      touch: {
        ...nextImages[index].touch,
        scale,
      },
    }

    this._touching = false
    this.images = nextImages
    this.transition = 'transform .3s'
    setTimeout(() => {
      this._allowItemClick = true
    }, 400)
  }

  onItemDelete() {
    const res = this.onDelete(this.current, this.urls)
    if (res !== false) {
      this.hide()
    }
  }

  /** May be rewritten */
  onDelete(current: number, urls: Array<string | GalleryItem>): boolean | void {
    this.$emit('delete', {
      current,
      urls,
    })
  }

  onSwiperChange(e: CustomEvent<{ current: number; source: string }>) {
    this.current = e.detail.current
    this.onChange(e.detail)
  }

  /** May be rewritten */
  onChange(detail: { current: number; source: string }) {
    this.$emit('change', detail)
  }

  mounted() {
    this.syncFromProps()
  }
}

export { Gallery }

export default defineComponentHOC()(Gallery)

export * as gallery from './gallery'
