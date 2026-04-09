import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { useRect } from '@doraemon-ui/miniprogram.shared'
import { nativeTextareaProps } from './props'

const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    ...nativeTextareaProps,
    prefixCls: { type: String, default: 'dora-textarea' },
  },
})
class Textarea extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Textarea
   */
  prefixCls!: string

  /**
   * 标签
   *
   * @type {string}
   * @memberof Textarea
   */
  @Prop({
    type: String,
    default: '',
  })
  label: string

  /**
   * 额外文案
   *
   * @type {string}
   * @memberof Textarea
   */
  @Prop({
    type: String,
    default: '',
  })
  extra: string

  /**
   * 默认值
   *
   * @type {string}
   * @memberof Textarea
   */
  @Prop({
    type: String,
    default: '',
  })
  defaultValue: string

  /**
   * 当前值
   *
   * @type {string}
   * @memberof Textarea
   */
  @Prop({
    type: String,
    default: '',
  })
  value: string

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof Textarea
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
   * @memberof Textarea
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 是否只读
   *
   * @type {boolean}
   * @memberof Textarea
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  readOnly: boolean

  /**
   * 行数
   *
   * @type {number}
   * @memberof Textarea
   */
  @Prop({
    type: Number,
    default: 1,
  })
  rows: number

  /**
   * 是否显示字数统计
   *
   * @type {boolean}
   * @memberof Textarea
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  hasCount: boolean

  /**
   * 是否显示清空按钮
   *
   * @type {boolean}
   * @memberof Textarea
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  clear: boolean

  /**
   * 是否错误态
   *
   * @type {boolean}
   * @memberof Textarea
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  error: boolean

  /**
   * 占位样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof Textarea
   */
  @Prop({
    type: null,
    default: '',
  })
  placeholderStyle: string | Partial<CSSStyleDeclaration>

  inputValue: string = ''
  inputFocus: boolean = false
  inputRows: number = 1
  inputHeight: number | '' = ''
  internalPlaceholderStyle: string = ''
  private timeout: ReturnType<typeof setTimeout> | null = null

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p, {
        [`${p}--focus`]: this.inputFocus,
        [`${p}--disabled`]: this.disabled,
        [`${p}--readonly`]: this.readOnly,
        [`${p}--error`]: this.error,
        [`${p}--has-count`]: this.hasCount,
      }),
      label: `${p}__label`,
      control: `${p}__control`,
      item: `${p}__item`,
      clear: `${p}__clear`,
      error: `${p}__error`,
      extra: `${p}__extra`,
      count: `${p}__count`,
      current: `${p}__current`,
      keyboardAccessory: `${p}__keyboard-accessory`,
    }
  }

  @Watch('value')
  onValueChange(v: string) {
    if (this.controlled) this.updated(v)
  }

  @Watch('rows')
  onRowsChange(v: number) {
    void this.updateHeight(v)
  }

  @Watch('placeholderStyle')
  onPlaceholderStyleChange(v: string | Partial<CSSStyleDeclaration>) {
    this.setInternalPlaceholderStyle(v)
  }

  setInternalPlaceholderStyle(placeholderStyle: string | Partial<CSSStyleDeclaration>) {
    const s = styleToCssString(placeholderStyle as any)
    if (this.internalPlaceholderStyle !== s) this.internalPlaceholderStyle = s
  }

  async updateHeight(val = this.rows) {
    const rows = Math.max(1, parseInt(String(val), 10) || 1)
    if (this.inputRows !== rows) {
      const rect = await useRect(`.${this.prefixCls}__item`, this._renderProxy as any)
      if (rect) {
        const lineHeight = this.inputRows > 1 ? rect.height / this.inputRows : rect.height
        this.inputRows = rows
        this.inputHeight = lineHeight * rows
      }
    }
  }

  updated(inputValue: string) {
    if (this.inputValue !== inputValue) this.inputValue = inputValue
  }

  onChange(e: CustomEvent<{ value: string }>) {
    const { value } = e.detail
    if (!this.controlled) this.updated(value)
    this.$emit('change', e.detail)
  }

  onFocus(e: CustomEvent<{ value?: string }>) {
    this.clearTimer()
    this.inputFocus = true
    this.$emit('focus', e.detail)
  }

  onBlur(e: CustomEvent<{ value?: string }>) {
    this.setTimer()
    this.$emit('blur', e.detail)
  }

  onConfirm(e: CustomEvent) {
    this.$emit('confirm', e.detail)
  }

  onKeyboardHeightChange(e: CustomEvent) {
    this.$emit('keyboardheightchange', e.detail)
  }

  onClear() {
    const params = { value: '' }
    if (!this.controlled) this.updated(params.value)
    this.$emit('change', params)
    this.$emit('clear', params)
  }

  onError() {
    this.$emit('error', { value: this.inputValue })
  }

  onLineChange(e: CustomEvent) {
    this.$emit('linechange', e.detail)
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
    this.setInternalPlaceholderStyle(this.placeholderStyle)
    void this.updateHeight(this.rows)
  }
}

export { Textarea }

export default defineComponentHOC()(Textarea)
