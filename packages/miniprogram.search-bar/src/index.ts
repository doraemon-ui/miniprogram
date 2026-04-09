import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
const { classNames, styleToCssString } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-search-bar',
    },
  },
})
class SearchBar extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof SearchBar
   */
  prefixCls!: string

  /**
   * 默认值
   *
   * @type {string}
   * @memberof SearchBar
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
   * @memberof SearchBar
   */
  @Prop({
    type: String,
    default: '',
  })
  value: string

  /**
   * 占位文案
   *
   * @type {string}
   * @memberof SearchBar
   */
  @Prop({
    type: String,
    default: '搜索',
  })
  placeholder: string

  /**
   * 占位样式
   *
   * @type {(string | Partial<CSSStyleDeclaration>)}
   * @memberof SearchBar
   */
  @Prop({
    type: null,
    default: '',
  })
  placeholderStyle: string | Partial<CSSStyleDeclaration>

  /**
   * 占位类名
   *
   * @type {string}
   * @memberof SearchBar
   */
  @Prop({
    type: String,
    default: 'input-placeholder',
  })
  placeholderClass: string

  /**
   * 是否禁用
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 最大输入长度
   *
   * @type {number}
   * @memberof SearchBar
   */
  @Prop({
    type: Number,
    default: 140,
  })
  maxlength: number

  /**
   * 光标与键盘距离
   *
   * @type {number}
   * @memberof SearchBar
   */
  @Prop({
    type: Number,
    default: 11,
  })
  cursorSpacing: number

  /**
   * 是否聚焦
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  focus: boolean

  /**
   * 键盘确认键类型
   *
   * @type {string}
   * @memberof SearchBar
   */
  @Prop({
    type: String,
    default: 'search',
  })
  confirmType: string

  /**
   * 是否保持键盘不收起
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  confirmHold: boolean

  /**
   * 指定光标位置
   *
   * @type {number}
   * @memberof SearchBar
   */
  @Prop({
    type: Number,
    default: -1,
  })
  cursor: number

  /**
   * 光标起始位置
   *
   * @type {number}
   * @memberof SearchBar
   */
  @Prop({
    type: Number,
    default: -1,
  })
  selectionStart: number

  /**
   * 光标结束位置
   *
   * @type {number}
   * @memberof SearchBar
   */
  @Prop({
    type: Number,
    default: -1,
  })
  selectionEnd: number

  /**
   * 键盘弹起时是否自动上推页面
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  adjustPosition: boolean

  /**
   * 是否显示清除按钮
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  clear: boolean

  /**
   * 取消按钮文案
   *
   * @type {string}
   * @memberof SearchBar
   */
  @Prop({
    type: String,
    default: '取消',
  })
  cancelText: string

  /**
   * 是否显示取消按钮
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  showCancel: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 是否仅在聚焦时显示清除按钮
   *
   * @type {boolean}
   * @memberof SearchBar
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  onlyShowClearWhenFocus: boolean

  inputValue: string = ''
  inputFocus: boolean = false
  shouldShowClear: boolean = false
  extStyle: string = ''

  get classes() {
    const { prefixCls, disabled, inputFocus } = this
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--focus`]: inputFocus,
      [`${prefixCls}--disabled`]: disabled,
    })
    return {
      wrap,
      form: `${prefixCls}__form`,
      box: `${prefixCls}__box`,
      search: `${prefixCls}__search`,
      control: `${prefixCls}__control`,
      input: `${prefixCls}__input`,
      clear: `${prefixCls}__clear`,
      label: `${prefixCls}__label`,
      icon: `${prefixCls}__icon`,
      text: `${prefixCls}__text`,
      cancel: `${prefixCls}__cancel`,
    }
  }

  @Watch('value')
  onValueChange(v: string) {
    if (this.controlled) this.updated(v)
  }

  @Watch('placeholderStyle')
  onPlaceholderStyleChange(v: string | Partial<CSSStyleDeclaration>) {
    this.extStyle = styleToCssString(v || '')
  }

  @Watch('focus')
  onFocusPropChange(v: boolean) {
    this.inputFocus = !!v
  }

  @Watch('clear')
  onClearDepsChange() {
    this.setClear()
  }
  @Watch('disabled')
  onDisabledChange() {
    this.setClear()
  }
  @Watch('inputValue')
  onInputValueChange() {
    this.setClear()
  }
  @Watch('inputFocus')
  onInputFocusChange() {
    this.setClear()
  }
  @Watch('onlyShowClearWhenFocus')
  onOnlyShowClearWhenFocusChange() {
    this.setClear()
  }

  setClear() {
    const shouldShowClear = (() => {
      if (!this.clear || !this.inputValue || this.disabled) return false
      if (this.onlyShowClearWhenFocus) return this.inputFocus
      return true
    })()
    if (this.shouldShowClear !== shouldShowClear) {
      this.shouldShowClear = shouldShowClear
    }
  }

  updated(inputValue: string) {
    if (this.inputValue !== inputValue) this.inputValue = inputValue
  }

  onChange(e: CustomEvent<{ value: string }>) {
    if (!this.controlled) this.updated(e.detail.value)
    if (!this.inputFocus) this.inputFocus = true
    this.$emit('change', e.detail)
  }

  onFocus(e: CustomEvent) {
    this.inputFocus = true
    this.$emit('focus', e.detail)
  }

  onBlur(e: CustomEvent) {
    this.inputFocus = false
    this.$emit('blur', e.detail)
  }

  onConfirm(e: CustomEvent) {
    this.$emit('confirm', e.detail)
  }

  onClear() {
    const inputValue = this.controlled ? this.inputValue : ''
    this.inputValue = inputValue
    this.inputFocus = true
    this.$emit('clear', { value: '' })
  }

  onCancel() {
    this.$emit('cancel', { value: this.inputValue })
  }

  onClick() {
    if (this.disabled) return
    this.inputFocus = true
  }

  mounted() {
    const inputValue = this.controlled ? this.value : this.defaultValue
    this.updated(inputValue)
    this.setClear()
    this.onPlaceholderStyleChange(this.placeholderStyle)
    this.onFocusPropChange(this.focus)
  }
}

export { SearchBar }

export default defineComponentHOC()(SearchBar)
