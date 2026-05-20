import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { TouchEvent } from '@doraemon-ui/miniprogram.core-js'
import { getPointsNumber, getSystemInfoSync, getTouchPoints } from '@doraemon-ui/miniprogram.shared'
import type { FloatingPanelBounds } from './types'

const { classNames, styleToCssString } = Doraemon.util

function nearest(arr: number[], target: number) {
  return arr.reduce((prev, current) => {
    return Math.abs(prev - target) < Math.abs(current - target) ? prev : current
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max))
}

function rubberband(distance: number, dimension: number, constant: number) {
  if (dimension === 0 || Math.abs(dimension) === Infinity) {
    return Math.pow(distance, constant * 5)
  }
  return (distance * dimension * constant) / (dimension + constant * distance)
}

function rubberbandIfOutOfBounds(position: number, min: number, max: number, constant: number = 0.15) {
  if (constant === 0) return clamp(position, min, max)
  if (position < min) return -rubberband(min - position, max - min, constant) + min
  if (position > max) return rubberband(position - max, max - min, constant) + max
  return position
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-floating-panel',
    },
  },
  expose: ['setHeight'],
})
class FloatingPanel extends Doraemon {
  prefixCls!: string

  @Prop({
    type: Array,
    default: () => [],
  })
  defaultAnchors: number[]

  wrapStyle: string = ''
  possibles: number[] = []
  moving: boolean = false

  startY: number = 0
  moveY: number = 0
  endY: number = 0
  lastY: number = 0
  bounds: FloatingPanelBounds = {
    top: -1,
    bottom: -1,
  }

  get classes() {
    const prefixCls = this.prefixCls
    return {
      wrap: classNames(prefixCls),
      hd: `${prefixCls}__hd`,
      bd: `${prefixCls}__bd`,
      bar: `${prefixCls}__bar`,
      mask: `${prefixCls}__mask`,
    }
  }

  buildWrapStyle(y: number, duration?: number) {
    return styleToCssString({
      height: `${-this.bounds.top}px`,
      transform: `translate3d(0, calc(100% + ${y}px), 0)`,
      transition: duration ? `cubic-bezier(0, 0, 0.2, 1.15) ${duration}s` : 'none',
    })
  }

  setTransform(y: number, duration?: number) {
    const wrapStyle = this.buildWrapStyle(y, duration)
    if (this.wrapStyle !== wrapStyle) {
      this.wrapStyle = wrapStyle
      if (duration) {
        setTimeout(() => {
          this.wrapStyle = this.buildWrapStyle(y)
        }, duration * 1000)
      }
      this.$emit('heightChange', {
        height: -y,
        minHeight: -this.bounds.bottom,
        maxHeight: -this.bounds.top,
        animating: !!duration,
      })
    }
  }

  setHeight(height: number, options: { immediate?: boolean } = { immediate: false }) {
    this.setTransform(-height, options.immediate ? 0.3 : 0)
    this.lastY = -height
  }

  onTouchStart(e: TouchEvent) {
    if (this.moving || getPointsNumber(e) > 1) return
    this.startY = getTouchPoints(e).y
    this.moveY = 0
    this.endY = 0
    this.moving = true
  }

  onTouchMove(e: TouchEvent) {
    if (!this.moving || getPointsNumber(e) > 1) return
    this.moveY = getTouchPoints(e).y
    const deltaY = this.moveY - this.startY
    const offsetY = rubberbandIfOutOfBounds(Math.abs(this.lastY + deltaY), -this.bounds.bottom, -this.bounds.top)
    this.setTransform(-Math.round(offsetY))
  }

  onTouchEnd(e: TouchEvent) {
    if (!this.moving || getPointsNumber(e) > 1) return
    this.endY = getTouchPoints(e).y
    const deltaY = this.endY - this.startY
    const offsetY = this.lastY + deltaY
    this.lastY = nearest(this.possibles, offsetY)
    this.setTransform(Math.round(this.lastY), 0.3)
    setTimeout(() => {
      this.moving = false
    }, 300)
  }

  mounted() {
    const anchors = this.defaultAnchors.filter((x) => typeof x === 'number' && x > 0)
    const windowHeight = getSystemInfoSync(['window']).windowHeight as number
    const possibles = anchors.length === 0 ? [-windowHeight] : anchors.map((x) => -x)
    this.possibles = possibles
    this.bounds = {
      top: Math.round(possibles[possibles.length - 1]),
      bottom: Math.round(possibles[0]),
    }
    this.lastY = this.bounds.bottom
    this.setTransform(this.bounds.bottom)
  }
}

export { FloatingPanel }

export default defineComponentHOC()(FloatingPanel)
