import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { useColorCls } from '@doraemon-ui/miniprogram.shared'
import type { PresetColor } from '@doraemon-ui/miniprogram.shared'
import type { CalculationType, InputNumberShape } from './types'
import NP from './utils'

const { classNames } = Doraemon.util
const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1

const toNumberWhenUserInput = (num: string) => {
  if (/\.\d*0$/.test(num) || num.length > 16) return num
  if (Number.isNaN(Number(num))) return num
  return Number(num)
}

const getValidValue = (value: number | string, min: number, max: number) => {
  let val = Number.parseFloat(String(value))
  if (Number.isNaN(val)) return value
  if (val < min) val = min
  if (val > max) val = max
  return val
}

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-input-number',
    },
  },
})
class InputNumber extends Doraemon {
  prefixCls!: string

  /**
   * 外观形状
   *
   * @type {InputNumberShape}
   * @memberof InputNumber
   */
  @Prop({
    type: String,
    default: 'square',
  })
  shape: InputNumberShape

  /**
   * 最小值
   *
   * @type {number}
   * @memberof InputNumber
   */
  @Prop({
    type: Number,
    default: -MAX_SAFE_INTEGER,
  })
  min: number

  /**
   * 最大值
   *
   * @type {number}
   * @memberof InputNumber
   */
  @Prop({
    type: Number,
    default: MAX_SAFE_INTEGER,
  })
  max: number

  /**
   * 步进值
   *
   * @type {number}
   * @memberof InputNumber
   */
  @Prop({
    type: Number,
    default: 1,
  })
  step: number

  /**
   * 默认值（非受控）
   *
   * @type {number}
   * @memberof InputNumber
   */
  @Prop({
    type: Number,
    default: 0,
  })
  defaultValue: number

  /**
   * 当前值（受控）
   *
   * @type {number}
   * @memberof InputNumber
   */
  @Prop({
    type: Number,
    default: 0,
  })
  value: number

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof InputNumber
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  disabled: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   * @memberof InputNumber
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly: boolean

  /**
   * 是否支持长按连续触发
   *
   * @type {boolean}
   * @memberof InputNumber
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  longpress: boolean

  /**
   * 主题色
   *
   * @type {PresetColor}
   * @memberof InputNumber
   */
  @Prop({
    type: String,
    default: 'positive',
  })
  color: PresetColor

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof InputNumber
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 小数位数，-1 表示不限制
   *
   * @type {number}
   * @memberof InputNumber
   */
  @Prop({
    type: Number,
    default: -1,
  })
  digits: number

  inputValue: number | string = 0
  disabledMin: boolean = false
  disabledMax: boolean = false

  _timeout: ReturnType<typeof setTimeout> | null = null
  _inputTime: ReturnType<typeof setTimeout> | null = null

  get classes() {
    const { prefixCls, shape, color, disabled, readOnly, disabledMin, disabledMax } = this
    return {
      wrap: classNames(prefixCls, useColorCls(color), {
        [`${prefixCls}--${shape}`]: shape,
      }),
      sub: classNames(`${prefixCls}__selector`, {
        [`${prefixCls}__selector--sub`]: true,
        [`${prefixCls}__selector--disabled`]: disabledMin,
      }),
      add: classNames(`${prefixCls}__selector`, {
        [`${prefixCls}__selector--add`]: true,
        [`${prefixCls}__selector--disabled`]: disabledMax,
      }),
      icon: `${prefixCls}__icon`,
      control: `${prefixCls}__control`,
      input: classNames(`${prefixCls}__input`, {
        [`${prefixCls}__input--disabled`]: disabled,
        [`${prefixCls}__input--readonly`]: readOnly,
      }),
    }
  }

  @Watch('value')
  onValueChange(newVal: number) {
    if (this.controlled) {
      this.setValue(newVal, false)
    }
  }

  @Watch('inputValue')
  @Watch('min')
  @Watch('max')
  onRangeChange() {
    const numeric = Number(this.inputValue)
    this.disabledMin = !Number.isNaN(numeric) && numeric <= this.min
    this.disabledMax = !Number.isNaN(numeric) && numeric >= this.max
  }

  updated(inputValue: number | string) {
    if (this.inputValue !== inputValue) {
      this.inputValue = inputValue
    }
  }

  setValue(value: number | string, runCallbacks = true) {
    const valid = getValidValue(value, this.min, this.max)
    let inputValue = typeof valid === 'number' ? NP.strip(valid) : valid
    if (typeof inputValue === 'number' && this.digits !== -1) {
      inputValue = NP.round(inputValue, this.digits)
    }
    this.updated(inputValue)
    if (runCallbacks) {
      this.$emit('change', { value: inputValue })
    }
  }

  calculation(type: CalculationType, isLoop: boolean) {
    const current = Number(this.inputValue)
    const value = Number.isNaN(current) ? 0 : current
    if (type === 'add') {
      if (this.disabledMax) return
      this.setValue(NP.plus(value, this.step))
    }
    if (type === 'sub') {
      if (this.disabledMin) return
      this.setValue(NP.minus(value, this.step))
    }
    if (this.longpress && isLoop) {
      this._timeout = setTimeout(() => this.calculation(type, isLoop), 100)
    }
  }

  onInput(e: CustomEvent<{ value: string }>) {
    this.clearInputTimer()
    this._inputTime = setTimeout(() => {
      const value = toNumberWhenUserInput(e.detail.value)
      this.setValue(value)
    }, 300)
  }

  onFocus(e: CustomEvent) {
    this.$emit('focus', e.detail)
  }

  onBlur(e: CustomEvent) {
    this.$emit('blur', e.detail)
  }

  onLongpress(e: CustomEvent<{}, {}, { type: CalculationType }>) {
    const type = e.currentTarget.dataset.type || 'add'
    if (this.longpress) this.calculation(type, true)
  }

  onTap(e: CustomEvent<{}, {}, { type: CalculationType }>) {
    const type = e.currentTarget.dataset.type || 'add'
    if (!this.longpress || (this.longpress && !this._timeout)) {
      this.calculation(type, false)
    }
  }

  onTouchEnd() {
    this.clearTimer()
  }

  onTouchCancel() {
    this.clearTimer()
  }

  clearTimer() {
    if (this._timeout) {
      clearTimeout(this._timeout)
      this._timeout = null
    }
  }

  clearInputTimer() {
    if (this._inputTime) {
      clearTimeout(this._inputTime)
      this._inputTime = null
    }
  }

  mounted() {
    const inputValue = this.controlled ? this.value : this.defaultValue
    this.setValue(inputValue, false)
  }

  destroyed() {
    this.clearTimer()
    this.clearInputTimer()
  }
}

export { InputNumber }

export default defineComponentHOC({
  externalClasses: ['dora-sub-class', 'dora-control-class', 'dora-input-class', 'dora-add-class'],
})(InputNumber)
