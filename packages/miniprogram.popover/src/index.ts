import type { BackdropInstance } from '@doraemon-ui/miniprogram.backdrop'
import { Component, defineComponentHOC, Doraemon, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect, MiniprogramScrollOffset } from '@doraemon-ui/miniprogram.shared'
import { findComponentNode, useRect, useScrollOffset } from '@doraemon-ui/miniprogram.shared'

import type { PopoverColor, PopoverPlacement, PopoverTrigger } from './types'

const { classNames, styleToCssString } = Doraemon.util

function getPlacements(
  rects: [MiniprogramDOMRect, MiniprogramScrollOffset, MiniprogramDOMRect, MiniprogramDOMRect | null],
  placement: PopoverPlacement = 'top',
) {
  const [a, s, b, r] = rects

  switch (placement) {
    case 'topLeft':
      return {
        top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top,
        left: !r ? s.scrollLeft + a.left : a.left,
      }
    case 'top':
      return {
        top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top,
        left: !r ? s.scrollLeft + a.left + (a.width - b.width) / 2 : a.left + (a.width - b.width) / 2,
      }
    case 'topRight':
      return {
        top: !r ? s.scrollTop + a.top - b.height - 4 : a.top - b.height - r.top,
        left: !r ? s.scrollLeft + a.left + a.width - b.width : a.left + a.width - b.width,
      }
    case 'rightTop':
      return {
        top: !r ? s.scrollTop + a.top : a.top - r.top,
        left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width,
      }
    case 'right':
      return {
        top: !r ? s.scrollTop + a.top + (a.height - b.height) / 2 : a.top + (a.height - b.height) / 2 - r.top,
        left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width,
      }
    case 'rightBottom':
      return {
        top: !r ? s.scrollTop + a.top + a.height - b.height : a.top + a.height - b.height - r.top,
        left: !r ? s.scrollLeft + a.left + a.width + 4 : a.left + a.width,
      }
    case 'bottomRight':
      return {
        top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top,
        left: !r ? s.scrollLeft + a.left + a.width - b.width : a.left + a.width - b.width,
      }
    case 'bottom':
      return {
        top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top,
        left: !r ? s.scrollLeft + a.left + (a.width - b.width) / 2 : a.left + (a.width - b.width) / 2,
      }
    case 'bottomLeft':
      return {
        top: !r ? s.scrollTop + a.top + a.height + 4 : a.top + a.height - r.top,
        left: !r ? s.scrollLeft + a.left : a.left,
      }
    case 'leftBottom':
      return {
        top: !r ? s.scrollTop + a.top + a.height - b.height : a.top + a.height - b.height - r.top,
        left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width,
      }
    case 'left':
      return {
        top: !r ? s.scrollTop + a.top + (a.height - b.height) / 2 : a.top + (a.height - b.height) / 2 - r.top,
        left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width,
      }
    case 'leftTop':
      return {
        top: !r ? s.scrollTop + a.top : a.top - r.top,
        left: !r ? s.scrollLeft + a.left - b.width - 4 : a.left - b.width,
      }
    default:
      return {
        left: 0,
        top: 0,
      }
  }
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-popover',
    },
  },
})
class Popover extends Doraemon {
  prefixCls!: string

  @Prop({
    type: null,
    default: 'dora-animate--fadeIn',
  })
  classNames: string

  @Prop({
    type: String,
    default: 'light',
  })
  color: PopoverColor

  @Prop({
    type: String,
    default: '',
  })
  title: string

  @Prop({
    type: String,
    default: '',
  })
  content: string

  @Prop({
    type: String,
    default: 'top',
  })
  placement: PopoverPlacement

  @Prop({
    type: String,
    default: 'click',
  })
  trigger: PopoverTrigger

  @Prop({
    type: [String, Object],
    default: '',
  })
  bodyStyle: string | Partial<CSSStyleDeclaration>

  @Prop({
    type: Boolean,
    default: false,
  })
  defaultVisible: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  @Prop({
    type: Boolean,
    default: false,
  })
  mask: boolean

  @Prop({
    type: Boolean,
    default: true,
  })
  maskClosable: boolean

  @Prop({
    type: Boolean,
    default: true,
  })
  useSlot: boolean

  @Prop({
    type: Object,
    default: null,
  })
  slotRect: MiniprogramDOMRect | null

  @Prop({
    type: Object,
    default: null,
  })
  relativeRect: MiniprogramDOMRect | null

  extStyle = ''
  popoverStyle = ''
  popoverVisible = false
  _backdrop?: BackdropInstance

  get classes() {
    const { prefixCls, color, placement } = this
    return {
      wrap: classNames(prefixCls, {
        [`${prefixCls}--color-${color}`]: color,
        [`${prefixCls}--placement-${placement}`]: placement,
      }),
      content: `${prefixCls}__content`,
      arrow: `${prefixCls}__arrow`,
      inner: `${prefixCls}__inner`,
      title: `${prefixCls}__title`,
      innerContent: `${prefixCls}__inner-content`,
      element: `${prefixCls}__element`,
    }
  }

  @Watch('bodyStyle')
  onBodyStyleChange(newVal: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(newVal as Record<string, unknown>)
  }

  @Watch('visible')
  onVisibleChange(newVal: boolean) {
    if (this.controlled) {
      this.updated(newVal)
    }
  }

  updated(popoverVisible: boolean) {
    if (this.popoverVisible !== popoverVisible) {
      this.popoverVisible = popoverVisible
      this.setBackdropVisible(popoverVisible)
    }
  }

  getPopoverStyle() {
    const { prefixCls, placement, slotRect, relativeRect } = this
    const promises: Array<Promise<any>> = []

    if (this.useSlot) {
      promises.push(useRect(`.${prefixCls}__element`, this._renderProxy))
    }
    promises.push(useScrollOffset(this._renderProxy))
    promises.push(useRect(`.${prefixCls}`, this._renderProxy))

    Promise.all(promises).then((rects) => {
      if (rects.filter((n) => !n).length) return
      const res = rects.length === 3 ? [...rects, relativeRect] : [slotRect, ...rects, relativeRect]
      const placements = getPlacements(
        res as [MiniprogramDOMRect, MiniprogramScrollOffset, MiniprogramDOMRect, MiniprogramDOMRect | null],
        placement,
      )
      this.popoverStyle = styleToCssString(placements)
    })
  }

  onEnter() {
    this.getPopoverStyle()
  }

  onChange() {
    const nextVisible = !this.popoverVisible

    if (!this.controlled) {
      this.updated(nextVisible)
    }

    this.$emit('change', { visible: nextVisible })
  }

  onClick() {
    if (this.trigger === 'click') {
      this.onChange()
    }
  }

  setBackdropVisible(visible: boolean) {
    if (this.mask && this._backdrop) {
      if (visible) {
        this._backdrop.retain?.()
      } else {
        this._backdrop.release?.()
      }
    }
  }

  onMaskClick() {
    if (this.maskClosable && this.popoverVisible) {
      this.onChange()
    }
  }

  created() {
    if (this.mask) {
      this._backdrop = findComponentNode('#dora-backdrop', this._renderProxy)
    }
  }

  mounted() {
    this.onBodyStyleChange(this.bodyStyle)
    this.updated(this.controlled ? this.visible : this.defaultVisible)
  }
}

export { Popover }

export default defineComponentHOC()(Popover)
