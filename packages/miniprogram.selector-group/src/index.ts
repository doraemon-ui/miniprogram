import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import type { SelectorFieldNames } from './types'
const { classNames } = Doraemon.util

@Component({
  props: {
    prefixCls: {
      type: String,
      default: 'dora-selector-group',
    },
  },
})
class SelectorGroup extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof SelectorGroup
   */
  prefixCls!: string

  /**
   * 主题
   *
   * @type {string}
   * @memberof SelectorGroup
   */
  @Prop({
    type: String,
    default: 'balanced',
  })
  theme: string

  /**
   * 形状
   *
   * @type {string}
   * @memberof SelectorGroup
   */
  @Prop({
    type: String,
    default: 'default',
  })
  shape: string

  /**
   * 列数
   *
   * @type {number}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Number,
    default: 3,
  })
  columns: number

  /**
   * 间距
   *
   * @type {number}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Number,
    default: 8,
  })
  gap: number

  /**
   * 选项列表
   *
   * @type {(string | Record<string, unknown>)[]}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Array,
    default: [],
  })
  options: (string | Record<string, unknown>)[]

  /**
   * 默认值
   *
   * @type {string[]}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Array,
    default: [],
  })
  defaultValue: string[]

  /**
   * 当前值
   *
   * @type {string[]}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Array,
    default: [],
  })
  value: string[]

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 是否多选
   *
   * @type {boolean}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  multiple: boolean

  /**
   * 是否展示勾选图标
   *
   * @type {boolean}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Boolean,
    default: true,
  })
  showCheckMark: boolean

  /**
   * 字段映射
   *
   * @type {SelectorFieldNames}
   * @memberof SelectorGroup
   */
  @Prop({
    type: Object,
    default: { label: 'label', value: 'value', disabled: 'disabled' },
  })
  defaultFieldNames: SelectorFieldNames

  extStyle: string = ''
  inputValue: string[] = []

  get classes() {
    const { prefixCls, theme, shape } = this
    const finalShape = ['rounded', 'rectangular'].includes(shape) ? shape : ''
    const wrap = classNames(prefixCls, {
      [`${prefixCls}--${theme}`]: !!theme,
    })
    return {
      wrap,
      grid: `${prefixCls}__grid`,
      gridItem: classNames(`${prefixCls}__grid-item`, {
        [`${prefixCls}__grid-item--${finalShape}`]: !!finalShape,
      }),
      desc: `${prefixCls}__desc`,
      checkMark: `${prefixCls}__check-mark`,
      checkMarkIcon: `${prefixCls}__check-mark-icon`,
      selectable: `${prefixCls}__selectable`,
    }
  }

  get optionsView() {
    const names = (this.defaultFieldNames || {}) as { label?: string; value?: string; disabled?: string }
    const label = names.label || 'label'
    const value = names.value || 'value'
    const disabled = names.disabled || 'disabled'
    return (this.options || []).map((item) => {
      if (typeof item === 'string') {
        return { label: item, value: item, disabled: false, desc: '', checked: this.inputValue.includes(item) }
      }
      const v = String(item[value] ?? item[label] ?? '')
      const l = String(item[label] ?? v)
      return {
        label: l,
        value: v,
        disabled: !!item[disabled],
        desc: String(item.desc ?? ''),
        checked: this.inputValue.includes(v),
      }
    })
  }

  @Watch('value')
  onValueChange(v: string[]) {
    if (this.controlled) this.updated(v || [])
  }

  @Watch('columns')
  @Watch('gap')
  onStyleDepsChange() {
    this.updateStyle(this.columns, this.gap)
  }

  updated(inputValue: string[]) {
    if (this.inputValue !== inputValue) this.inputValue = inputValue
  }

  updateStyle(columns: number, gap: number) {
    this.extStyle = `--selector-group-columns:${columns};--selector-group-column-gap:${gap * 2}rpx;`
  }

  getValue(value: string[] = this.inputValue) {
    const cols = this.optionsView
    const checkedValues = value.reduce<Array<{ label: string; value: string }>>((acc, val) => {
      return [...acc, ...cols.filter((option) => option.value === val).map((option) => ({ label: option.label, value: option.value }))]
    }, [])
    const displayValue = checkedValues.map((option) => option.label)
    const allValues = cols.map((option) => option.value)
    const selectedIndex = value.map((n) => allValues.indexOf(n))
    return {
      value,
      displayValue,
      selectedIndex,
      selectedValue: value,
      cols,
    }
  }

  onCheckboxChange(e: CustomEvent<{ value: string; checked: boolean }>) {
    const { value, checked } = e.detail
    const checkedValues = this.multiple
      ? this.inputValue.includes(value)
        ? this.inputValue.filter((n) => n !== value)
        : [...this.inputValue, value]
      : checked
        ? [value]
        : []
    if (!this.controlled) this.updated(checkedValues)
    this.$emit('change', this.getValue(checkedValues))
  }

  mounted() {
    const inputValue = this.controlled ? this.value : this.defaultValue
    this.updated(inputValue || [])
    this.updateStyle(this.columns, this.gap)
  }
}

export { SelectorGroup }

export default defineComponentHOC()(SelectorGroup)
