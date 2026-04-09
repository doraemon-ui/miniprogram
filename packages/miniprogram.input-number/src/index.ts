import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { InputNumberChangeDetail, InputNumberColor, InputNumberShape } from './types'
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
    prefixCls: { type: String, default: 'dora-input-number' },
    shape: { type: String, default: 'square' },
    min: { type: Number, default: -MAX_SAFE_INTEGER },
    max: { type: Number, default: MAX_SAFE_INTEGER },
    step: { type: Number, default: 1 },
    defaultValue: { type: Number, default: 0 },
    value: { type: Number, default: 0 },
    disabled: { type: Boolean, default: true },
    readOnly: { type: Boolean, default: false },
    longpress: { type: Boolean, default: false },
    color: { type: String, default: 'balanced' },
    controlled: { type: Boolean, default: false },
    digits: { type: Number, default: -1 },
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
   * @type {InputNumberColor}
   * @memberof InputNumber
   */
  @Prop({
    type: String,
    default: 'balanced',
  })
  color: InputNumberColor

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
  timeout: ReturnType<typeof setTimeout> | null = null
  inputTime: ReturnType<typeof setTimeout> | null = null

  get classes() {
    const { prefixCls, shape, color, disabled, readOnly, disabledMin, disabledMax } = this
    return {
      wrap: classNames(prefixCls, {
        [`${prefixCls}--${shape}`]: shape,
      }),
      sub: classNames(`${prefixCls}__selector`, {
        [`${prefixCls}__selector--sub`]: true,
        [`${prefixCls}__selector--${color}`]: true,
        [`${prefixCls}__selector--disabled`]: disabled || readOnly || disabledMin,
      }),
      add: classNames(`${prefixCls}__selector`, {
        [`${prefixCls}__selector--add`]: true,
        [`${prefixCls}__selector--${color}`]: true,
        [`${prefixCls}__selector--disabled`]: disabled || readOnly || disabledMax,
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

  calculation(type: 'add' | 'sub', isLoop: boolean) {
    if (this.disabled || this.readOnly) return
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
      this.timeout = setTimeout(() => this.calculation(type, isLoop), 100)
    }
  }

  onInput(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
    this.clearInputTimer()
    this.inputTime = setTimeout(() => {
      const value = toNumberWhenUserInput(e.detail.value)
      this.setValue(value)
    }, 300)
  }

  onFocus(e: WechatMiniprogram.CustomEvent<Record<string, unknown>>) {
    this.$emit('focus', e.detail)
  }

  onBlur(e: WechatMiniprogram.CustomEvent<Record<string, unknown>>) {
    this.inputValue = this.inputValue
    this.$emit('blur', e.detail)
  }

  onLongpress(e: WechatMiniprogram.BaseEvent<{ type?: 'add' | 'sub' }>) {
    const type = (e.currentTarget?.dataset?.type || 'add') as 'add' | 'sub'
    if (this.longpress) this.calculation(type, true)
  }

  onTap(e: WechatMiniprogram.BaseEvent<{ type?: 'add' | 'sub' }>) {
    const type = (e.currentTarget?.dataset?.type || 'add') as 'add' | 'sub'
    if (!this.longpress || (this.longpress && !this.timeout)) {
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
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  clearInputTimer() {
    if (this.inputTime) {
      clearTimeout(this.inputTime)
      this.inputTime = null
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
