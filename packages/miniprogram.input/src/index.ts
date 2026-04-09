import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { InputType, PlaceholderStyle } from './types'

const { classNames, styleToCssString } = Doraemon.util

const bound = (value: number, min?: number, max?: number) => {
  let n = value
  if (typeof min === 'number') n = Math.max(n, min)
  if (typeof max === 'number') n = Math.min(n, max)
  return n
}

@Component({
  props: {
    prefixCls: { type: String, default: 'dora-input' },
    type: { type: String, default: 'text' },
    password: { type: Boolean, default: false },
    placeholder: { type: String, default: '' },
    placeholderStyle: { type: null, default: '' },
    placeholderClass: { type: String, default: 'input-placeholder' },
    maxlength: { type: Number, default: 140 },
    cursorSpacing: { type: Number, default: 11 },
    focus: { type: Boolean, default: false },
    confirmType: { type: String, default: 'done' },
    alwaysEmbed: { type: Boolean, default: false },
    confirmHold: { type: Boolean, default: false },
    cursor: { type: Number, default: -1 },
    selectionStart: { type: Number, default: -1 },
    selectionEnd: { type: Number, default: -1 },
    adjustPosition: { type: Boolean, default: true },
    holdKeyboard: { type: Boolean, default: false },
    safePasswordCertPath: { type: String, default: null },
    safePasswordLength: { type: Number, default: null },
    safePasswordTimeStamp: { type: Number, default: null },
    safePasswordNonce: { type: String, default: null },
    safePasswordSalt: { type: String, default: null },
    safePasswordCustomHash: { type: String, default: null },

    label: { type: String, default: '' },
    extra: { type: String, default: '' },
    defaultValue: { type: String, default: '' },
    value: { type: String, default: '' },
    controlled: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    clear: { type: Boolean, default: false },
    error: { type: Boolean, default: false },
    labelWrap: { type: Boolean, default: false },
    requiredMark: { type: Boolean, default: false },
    onlyShowClearWhenFocus: { type: Boolean, default: true },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    visibilityToggle: { type: Boolean, default: false },
  },
})
class Input extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: 'text',
  })
  type: InputType
  @Prop({
    type: Boolean,
    default: false,
  })
  password: boolean
  @Prop({
    type: String,
    default: '',
  })
  placeholder: string
  @Prop({
    type: null,
    default: '',
  })
  placeholderStyle: PlaceholderStyle
  @Prop({
    type: String,
    default: 'input-placeholder',
  })
  placeholderClass: string
  @Prop({
    type: Number,
    default: 140,
  })
  maxlength: number
  @Prop({
    type: Number,
    default: 11,
  })
  cursorSpacing: number
  @Prop({
    type: Boolean,
    default: false,
  })
  focus: boolean
  @Prop({
    type: String,
    default: 'done',
  })
  confirmType: string
  @Prop({
    type: Boolean,
    default: false,
  })
  alwaysEmbed: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  confirmHold: boolean
  @Prop({
    type: Number,
    default: -1,
  })
  cursor: number
  @Prop({
    type: Number,
    default: -1,
  })
  selectionStart: number
  @Prop({
    type: Number,
    default: -1,
  })
  selectionEnd: number
  @Prop({
    type: Boolean,
    default: true,
  })
  adjustPosition: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  holdKeyboard: boolean
  @Prop({
    type: String,
    default: null,
  })
  safePasswordCertPath: string | null
  @Prop({
    type: Number,
    default: null,
  })
  safePasswordLength: number | null
  @Prop({
    type: Number,
    default: null,
  })
  safePasswordTimeStamp: number | null
  @Prop({
    type: String,
    default: null,
  })
  safePasswordNonce: string | null
  @Prop({
    type: String,
    default: null,
  })
  safePasswordSalt: string | null
  @Prop({
    type: String,
    default: null,
  })
  safePasswordCustomHash: string | null
  @Prop({
    type: String,
    default: '',
  })
  label: string
  @Prop({
    type: String,
    default: '',
  })
  extra: string
  @Prop({
    type: String,
    default: '',
  })
  defaultValue: string
  @Prop({
    type: String,
    default: '',
  })
  value: string
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  clear: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  error: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  labelWrap: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  requiredMark: boolean
  @Prop({
    type: Boolean,
    default: true,
  })
  onlyShowClearWhenFocus: boolean
  @Prop({
    type: Number,
    default: null,
  })
  min: number | null
  @Prop({
    type: Number,
    default: null,
  })
  max: number | null
  @Prop({
    type: Boolean,
    default: false,
  })
  visibilityToggle: boolean

  inputValue: string = ''
  inputFocus: boolean = false
  shouldShowClear: boolean = false
  internalPlaceholderStyle: string = ''
  internalVisible: boolean = false
  timeout: ReturnType<typeof setTimeout> | null = null

  get classes() {
    const { prefixCls, disabled, readOnly, inputFocus, error, labelWrap, requiredMark, internalVisible } = this
    return {
      wrap: classNames(prefixCls, {
        [`${prefixCls}--focus`]: inputFocus,
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--readonly`]: readOnly,
        [`${prefixCls}--error`]: error,
      }),
      label: classNames(`${prefixCls}__label`, {
        [`${prefixCls}__label--wrap`]: labelWrap,
        [`${prefixCls}__label--required`]: requiredMark,
      }),
      control: `${prefixCls}__control`,
      item: `${prefixCls}__item`,
      clear: `${prefixCls}__clear`,
      eye: classNames(`${prefixCls}__eye`, {
        [`${prefixCls}__eye--invisible`]: !internalVisible,
      }),
      error: `${prefixCls}__error`,
      extra: `${prefixCls}__extra`,
      keyboardAccessory: `${prefixCls}__keyboardAccessory`,
    }
  }

  @Watch('value')
  onValueChange(newVal: string) {
    if (this.controlled) {
      this.updated(newVal)
    }
  }

  @Watch('placeholderStyle')
  onPlaceholderStyleChange(val: PlaceholderStyle) {
    this.setInternalPlaceholderStyle(val)
  }

  @Watch('clear')
  @Watch('disabled')
  @Watch('readOnly')
  @Watch('inputValue')
  @Watch('inputFocus')
  @Watch('onlyShowClearWhenFocus')
  onClearPropsChange() {
    this.setClear()
  }

  onInternalVisibleChange() {
    if (this.disabled) return
    this.internalVisible = !this.internalVisible
  }

  setInternalPlaceholderStyle(placeholderStyle: PlaceholderStyle) {
    const style = typeof placeholderStyle === 'string' ? placeholderStyle : styleToCssString(placeholderStyle || {})
    if (this.internalPlaceholderStyle !== style) {
      this.internalPlaceholderStyle = style
    }
  }

  setClear() {
    const shouldShowClear =
      !!this.clear && !!this.inputValue && !this.disabled && !this.readOnly && (this.onlyShowClearWhenFocus ? this.inputFocus : true)
    if (this.shouldShowClear !== shouldShowClear) {
      this.shouldShowClear = shouldShowClear
    }
  }

  checkValue() {
    const value = this.inputValue
    let nextValue = value
    if (this.type === 'number' || this.type === 'digit') {
      if (nextValue !== '') {
        const n = Number.parseFloat(nextValue)
        if (!Number.isNaN(n)) {
          nextValue = bound(n, this.min ?? undefined, this.max ?? undefined).toString()
        }
      }
    }
    if (nextValue !== value) {
      if (!this.controlled) {
        this.updated(nextValue)
      }
      this.$emit('change', { value: nextValue })
    }
  }

  updated(inputValue: string) {
    if (this.inputValue !== inputValue) {
      this.inputValue = inputValue
    }
  }

  onChange(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
    const value = e.detail.value
    if (!this.controlled) {
      this.updated(value)
    }
    this.$emit('change', e.detail)
  }

  onFocus(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
    this.clearTimer()
    this.inputFocus = true
    this.$emit('focus', e.detail)
  }

  onBlur(e: WechatMiniprogram.CustomEvent<{ value: string }>) {
    this.setTimer()
    this.checkValue()
    this.$emit('blur', e.detail)
  }

  onConfirm(e: WechatMiniprogram.CustomEvent<Record<string, unknown>>) {
    this.$emit('confirm', e.detail)
  }

  onKeyboardHeightChange(e: WechatMiniprogram.CustomEvent<Record<string, unknown>>) {
    this.$emit('keyboardheightchange', e.detail)
  }

  onNicknameReview(e: WechatMiniprogram.CustomEvent<Record<string, unknown>>) {
    this.$emit('nicknamereview', e.detail)
  }

  onClear() {
    const params = { value: '' }
    if (!this.controlled) {
      this.updated(params.value)
    }
    this.$emit('change', params)
    this.$emit('clear', params)
  }

  onError() {
    this.$emit('error', { value: this.inputValue })
  }

  setTimer() {
    this.clearTimer()
    this.timeout = setTimeout(() => {
      this.inputFocus = false
    }, 200)
  }

  clearTimer() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  }

  mounted() {
    const inputValue = this.controlled ? this.value : this.defaultValue
    this.updated(inputValue)
    this.setClear()
    this.setInternalPlaceholderStyle(this.placeholderStyle)
  }
}

export { Input }

export default defineComponentHOC()(Input)
