import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { getPointsNumber, getTouchPoints, useRect } from '@doraemon-ui/miniprogram.shared'
import type { SliderShowValue } from './types'
const { classNames, styleToCssString } = Doraemon.util

const getPrecision = (step: number) => {
  const stepString = String(step)
  return stepString.indexOf('.') >= 0 ? stepString.length - stepString.indexOf('.') - 1 : 0
}

const checkValuePrecision = (val: number, step: number, min: number) => {
  const safeStep = step || 1
  const closestStep = Math.round((val - min) / safeStep) * safeStep + min
  const precision = getPrecision(safeStep)
  return parseFloat(closestStep.toFixed(precision))
}

const getStyles = (value: unknown): string | string[] => {
  return Array.isArray(value)
    ? value.map((n) => styleToCssString(n as Record<string, unknown>))
    : styleToCssString(value as Record<string, unknown>)
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-slider',
    },
  },
})
class Slider extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Slider
   */
  prefixCls!: string

  /**
   * 最小值
   *
   * @type {number}
   * @memberof Slider
   */
  @Prop({
    type: Number,
    default: 0,
  })
  min: number

  /**
   * 最大值
   *
   * @type {number}
   * @memberof Slider
   */
  @Prop({
    type: Number,
    default: 100,
  })
  max: number

  /**
   * 步长
   *
   * @type {number}
   * @memberof Slider
   */
  @Prop({
    type: Number,
    default: 1,
  })
  step: number

  /**
   * 默认值
   *
   * @type {number[]}
   * @memberof Slider
   */
  @Prop({
    type: Array,
    default: [0],
  })
  defaultValue: number[]

  /**
   * 当前值
   *
   * @type {number[]}
   * @memberof Slider
   */
  @Prop({
    type: Array,
    default: [0],
  })
  value: number[]

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Slider
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof Slider
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否显示刻度
   *
   * @type {boolean}
   * @memberof Slider
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  showMark: boolean

  /**
   * 是否显示数值
   *
   * @type {SliderShowValue}
   * @memberof Slider
   */
  @Prop({
    type: null,
    default: false,
  })
  showValue: SliderShowValue

  /**
   * 提示格式
   *
   * @type {string}
   * @memberof Slider
   */
  @Prop({
    type: String,
    default: '{d}',
  })
  tipFormatter: string

  /**
   * 刻度样式
   *
   * @type {unknown}
   * @memberof Slider
   */
  @Prop({
    type: null,
    default: '',
  })
  markStyle: unknown

  /**
   * 手柄样式
   *
   * @type {unknown}
   * @memberof Slider
   */
  @Prop({
    type: null,
    default: '',
  })
  handleStyle: unknown

  /**
   * 轨道样式
   *
   * @type {unknown}
   * @memberof Slider
   */
  @Prop({
    type: null,
    default: '',
  })
  trackStyle: unknown

  /**
   * 底轨样式
   *
   * @type {unknown}
   * @memberof Slider
   */
  @Prop({
    type: null,
    default: '',
  })
  railStyle: unknown

  /**
   * 外层样式
   *
   * @type {unknown}
   * @memberof Slider
   */
  @Prop({
    type: null,
    default: '',
  })
  wrapStyle: unknown

  offsets: number[] = []
  inputValue: number[] = []
  extMarkStyle: string | string[] = ''
  extHandleStyle: string | string[] = ''
  extTrackStyle: string | string[] = ''
  extRailStyle: string = ''
  extWrapStyle: string = ''
  marks: number[] = []
  isTouched: boolean = false
  isMoved: boolean = false
  last: number = 0

  private startX: number = 0
  private moveX: number = 0
  private startPos: number = 0
  private movedLocal: boolean = false

  get classes() {
    const { prefixCls, disabled, tipFormatter } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--disabled`]: disabled,
      [`${prefixCls}--has-tip`]: !!tipFormatter,
    })
    return {
      wrap,
      min: `${prefixCls}__min`,
      railWrap: `${prefixCls}__rail-wrap`,
      rail: `${prefixCls}__rail`,
      mark: `${prefixCls}__mark`,
      track: `${prefixCls}__track`,
      handle: `${prefixCls}__handle`,
      max: `${prefixCls}__max`,
    }
  }

  get showMin() {
    if (typeof this.showValue === 'object' && this.showValue) return !!this.showValue.min
    return !!this.showValue
  }

  get showMax() {
    if (typeof this.showValue === 'object' && this.showValue) return !!this.showValue.max
    return !!this.showValue
  }

  @Watch('value')
  onValuePropChange(v: number[]) {
    if (this.controlled) this.updated(v)
  }

  @Watch('markStyle')
  onMarkStyleChange(v: unknown) {
    this.extMarkStyle = getStyles(v)
  }

  @Watch('handleStyle')
  onHandleStyleChange(v: unknown) {
    this.extHandleStyle = getStyles(v)
  }

  @Watch('trackStyle')
  onTrackStyleChange(v: unknown) {
    this.extTrackStyle = getStyles(v)
  }

  @Watch('railStyle')
  onRailStyleChange(v: unknown) {
    this.extRailStyle = styleToCssString(v as Record<string, unknown>)
  }

  @Watch('wrapStyle')
  onWrapStyleChange(v: unknown) {
    this.extWrapStyle = styleToCssString(v as Record<string, unknown>)
  }

  @Watch('min')
  @Watch('max')
  @Watch('step')
  onMarkDepsChange() {
    this.getMarks()
    this.offsets = this.inputValue.map((n) => this.calcOffset(this.checkValue(n)))
  }

  updated(inputValue: number[] = []) {
    this.inputValue = [...inputValue]
    this.offsets = this.inputValue.map((n) => this.calcOffset(this.checkValue(n)))
  }

  onTouchStart(e: any) {
    if (this.disabled || getPointsNumber(e) > 1) return
    const { index } = e.currentTarget.dataset
    this.movedLocal = false
    this.startX = getTouchPoints(e).x
    this.moveX = 0
    this.startPos = this.offsets[index] || 0
    this.last = index
    this.isTouched = true
    this.isMoved = false
  }

  onTouchMove(e: any) {
    if (this.disabled || getPointsNumber(e) > 1) return
    const { index } = e.currentTarget.dataset
    this.movedLocal = true
    this.isMoved = true
    this.moveX = getTouchPoints(e).x

    useRect(`.${this.prefixCls}__rail`, this._renderProxy).then((rect: any) => {
      if (!rect || !this.movedLocal) return
      const diffX = ((this.moveX - this.startX) / rect.width) * 100
      const nextOffsets = [...this.offsets]
      const offset = this.checkValue(this.startPos + diffX, 0, 100)
      const currentValue = this.calcValue(offset)
      const prevValue = this.inputValue[index - 1]
      const nextValue = this.inputValue[index + 1]

      nextOffsets[index] = this.calcOffset(currentValue)
      if (index > 0 && prevValue > currentValue) nextOffsets[index] = this.calcOffset(prevValue)
      if (index < this.inputValue.length - 1 && nextValue < currentValue) nextOffsets[index] = this.calcOffset(nextValue)

      if (this.inputValue[index] !== currentValue) {
        const value = this.getValue(nextOffsets)
        if (!this.controlled) this.updated(value)
        this.$emit('change', { offsets: nextOffsets, value })
      }
    })
  }

  onTouchEnd(e: any) {
    if (this.disabled || getPointsNumber(e) > 1 || !this.movedLocal) return
    this.movedLocal = false
    this.isTouched = false
    this.isMoved = false
    const value = this.getValue(this.offsets)
    this.$emit('afterChange', { offsets: this.offsets, value })
  }

  calcValue(ratio: number) {
    return this.trimValue((ratio * (this.max - this.min)) / 100 + this.min)
  }

  calcOffset(value: number) {
    const ratio = (value - this.min) / (this.max - this.min || 1)
    return ratio * 100
  }

  checkValue(val: number, min = this.min, max = this.max) {
    if (val <= min) return min
    if (val >= max) return max
    return val
  }

  trimValue(val: number) {
    return checkValuePrecision(this.checkValue(val), this.step, this.min)
  }

  getValue(offsets = this.offsets) {
    return offsets.map((offset) => this.calcValue(offset))
  }

  getMarks() {
    if (!this.showMark) {
      this.marks = []
      return
    }
    const count = (this.max - this.min) / (this.step || 1)
    const marks: number[] = []
    const offset = (100 * (this.step || 1)) / (this.max - this.min || 1)
    for (let i = 1; i < count; i++) marks.push(i * offset)
    this.marks = marks
  }

  formatTip(value: number) {
    return (this.tipFormatter || '').replace(/\{d\}/g, `${value}`)
  }

  getTrackStyle(index: number) {
    if (this.inputValue.length <= 1) return `width: ${this.offsets[index] || 0}%`
    return `left: ${this.offsets[index] || 0}%; width: ${(this.offsets[index + 1] || 0) - (this.offsets[index] || 0)}%`
  }

  getIndexedStyle(style: string | string[], index: number) {
    return Array.isArray(style) ? style[index] || '' : style || ''
  }

  getMarkStyle(index: number) {
    return this.getIndexedStyle(this.extMarkStyle, index)
  }
  getTrackItemStyle(index: number) {
    return this.getIndexedStyle(this.extTrackStyle, index)
  }
  getHandleStyle(index: number) {
    return this.getIndexedStyle(this.extHandleStyle, index)
  }

  getValueByPosition(position: number) {
    const newPosition = position < this.min ? this.min : position > this.max ? this.max : position
    const lengthPerStep = 100 / ((this.max - this.min) / (this.step || 1))
    const steps = Math.round(newPosition / lengthPerStep)
    return steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min
  }

  onRailClick(e: any) {
    if (this.disabled || getPointsNumber(e) > 1) return
    useRect(`.${this.prefixCls}__rail-wrap`, this._renderProxy).then((rect: any) => {
      const position = ((getTouchPoints(e).x - rect.left) / Math.ceil(rect.width)) * (this.max - this.min) + this.min
      const targetValue = this.getValueByPosition(position)
      const indexLength = this.inputValue.length - 1
      const range = indexLength > 0
      const nextOffsets = [...this.offsets]
      let nextSliderValue = [...this.inputValue]
      let currentIndex = 0

      if (range) {
        let prevIndex = 0
        let nextIndex: number | null = null
        for (let i = indexLength; i >= 0; i--) {
          if (this.inputValue[i] <= targetValue) {
            prevIndex = i
            break
          }
        }
        if (prevIndex === indexLength) {
          nextIndex = prevIndex
          prevIndex = nextIndex - 1
        } else {
          nextIndex = prevIndex + 1
        }

        if (Math.abs(targetValue - this.inputValue[prevIndex]) > Math.abs(targetValue - this.inputValue[nextIndex])) {
          currentIndex = nextIndex
          nextSliderValue[nextIndex] = targetValue
        } else {
          currentIndex = prevIndex
          nextSliderValue[prevIndex] = targetValue
        }
      } else {
        nextSliderValue = [targetValue]
      }

      nextOffsets[currentIndex] = this.calcOffset(targetValue)
      if (this.inputValue[currentIndex] !== targetValue) {
        if (!this.controlled) this.updated(nextSliderValue)
        this.$emit('change', { offsets: nextOffsets, value: nextSliderValue })
        this.$emit('afterChange', { offsets: nextOffsets, value: nextSliderValue })
      }
    })
  }

  noop() {}

  mounted() {
    const inputValue = this.controlled ? this.value : this.defaultValue
    this.getMarks()
    this.updated(inputValue)
    this.onMarkStyleChange(this.markStyle)
    this.onHandleStyleChange(this.handleStyle)
    this.onTrackStyleChange(this.trackStyle)
    this.onRailStyleChange(this.railStyle)
    this.onWrapStyleChange(this.wrapStyle)
  }
}

export { Slider }

export default defineComponentHOC()(Slider)
