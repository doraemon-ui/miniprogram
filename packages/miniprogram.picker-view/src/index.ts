import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import { props } from './props'
import { getIndexFromValue, getLabelFromIndex, getRealCol, getRealValue } from './utils'
import type { PickerFieldNames, PickerLabelAlign, PickerOption, PickerOptionRecord, PickerViewItemDataset } from './types'

const { classNames, styleToCssString } = Doraemon.util

const getStyles = (value: unknown) => {
  return Array.isArray(value)
    ? value.map((n) => styleToCssString(n as Record<string, unknown>))
    : styleToCssString(value as Record<string, unknown>)
}

@Component({ props })
class PickerView extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof PickerView
   */
  prefixCls!: string

  /**
   * 默认值
   *
   * @type {string}
   * @memberof PickerView
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
   * @memberof PickerView
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
   * @memberof PickerView
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  /**
   * 每项高度
   *
   * @type {number}
   * @memberof PickerView
   */
  @Prop({
    type: Number,
    default: 34,
  })
  itemHeight: number

  /**
   * 每项样式
   *
   * @type {unknown}
   * @memberof PickerView
   */
  @Prop({
    type: null,
    default: '',
  })
  itemStyle: unknown

  /**
   * 指示器样式
   *
   * @type {unknown}
   * @memberof PickerView
   */
  @Prop({
    type: null,
    default: '',
  })
  indicatorStyle: unknown

  /**
   * 指示器类名
   *
   * @type {string}
   * @memberof PickerView
   */
  @Prop({
    type: String,
    default: '',
  })
  indicatorClass: string

  /**
   * 蒙层样式
   *
   * @type {unknown}
   * @memberof PickerView
   */
  @Prop({
    type: null,
    default: '',
  })
  maskStyle: unknown

  /**
   * 蒙层类名
   *
   * @type {string}
   * @memberof PickerView
   */
  @Prop({
    type: String,
    default: '',
  })
  maskClass: string

  /**
   * 标签对齐方式
   *
   * @type {PickerLabelAlign}
   * @memberof PickerView
   */
  @Prop({
    type: String,
    default: 'center',
  })
  labelAlign: PickerLabelAlign

  /**
   * 是否加载中
   *
   * @type {boolean}
   * @memberof PickerView
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  loading: boolean

  /**
   * 选项数据
   *
   * @type {PickerOption[]}
   * @memberof PickerView
   */
  @Prop({
    type: Array,
    default: [],
  })
  options: PickerOption[]

  /**
   * 选项字段映射
   *
   * @type {PickerFieldNames}
   * @memberof PickerView
   */
  @Prop({
    type: Object,
    default: { label: 'label', value: 'value', disabled: 'disabled' },
  })
  defaultFieldNames: PickerFieldNames

  inputValue: string = ''
  selectedIndex: number = 0
  selectedValue: string = ''
  cols: PickerOptionRecord[] = []
  extIndicatorStyle: string | string[] = ''
  extItemStyle: string | string[] = ''
  extMaskStyle: string | string[] = ''
  contentStyle: string = ''
  itemCount: number = 7
  styles: Record<string, string> = {}

  get classes() {
    const { prefixCls, labelAlign } = this
    return {
      wrap: classNames(prefixCls, {
        [`${prefixCls}--${labelAlign}`]: !!labelAlign,
      }),
      mask: `${prefixCls}__mask`,
      indicator: `${prefixCls}__indicator`,
      content: `${prefixCls}__content`,
      item: `${prefixCls}__item`,
      image: `${prefixCls}__image`,
    }
  }

  get optionsView() {
    return this.cols
  }

  @Watch('itemHeight')
  onItemHeightChange(v: number) {
    this.updatedStyles(v)
  }

  @Watch('itemStyle')
  onItemStyleChange(v: unknown) {
    this.extItemStyle = getStyles(v)
  }

  @Watch('indicatorStyle')
  onIndicatorStyleChange(v: unknown) {
    this.extIndicatorStyle = getStyles(v)
  }

  @Watch('maskStyle')
  onMaskStyleChange(v: unknown) {
    this.extMaskStyle = getStyles(v)
  }

  @Watch('value')
  @Watch('options')
  onValueOptionsChange() {
    const names = this.getFieldNamesSafe()
    this.cols = this.normalizeCols(getRealCol(this.options || [], names), names)
    if (this.controlled) this.setValue(this.value)
  }

  getFieldNamesSafe() {
    return {
      label: this.defaultFieldNames?.label || 'label',
      value: this.defaultFieldNames?.value || 'value',
      disabled: this.defaultFieldNames?.disabled || 'disabled',
    }
  }

  normalizeCols(cols: PickerOptionRecord[], names: { label: string; value: string; disabled: string }) {
    return cols.map((option) => ({
      ...option,
      label: option[names.label],
      value: option[names.value],
      disabled: !!option[names.disabled],
      labelImage: option.labelImage,
    }))
  }

  updatedStyles(itemHeight: number) {
    let num = this.itemCount
    if (num % 2 === 0) num--
    num = (num - 1) / 2
    this.styles = {
      wrap: `height: ${itemHeight * this.itemCount}px;`,
      item: `line-height: ${itemHeight}px; height: ${itemHeight}px;`,
      image: `width: ${itemHeight * 0.6}px; height: ${itemHeight * 0.6}px;`,
      content: `padding: ${itemHeight * num}px 0;`,
      indicator: `top: ${itemHeight * num}px; height: ${itemHeight}px;`,
      mask: `background-size: 100% ${itemHeight * num}px;`,
    }
  }

  updated(inputValue: string) {
    this.inputValue = inputValue
    const values = this.getValue(inputValue)
    this.selectedIndex = values.selectedIndex
    this.selectedValue = values.selectedValue
  }

  setValue(value: string) {
    this.updated((this.getValue(value).value as string) || '')
  }

  getValue(value = this.inputValue) {
    const names = { label: 'label', value: 'value', disabled: 'disabled' }
    const inputValue = getRealValue(value, this.cols, names) || ''
    const selectedIndex = getIndexFromValue(value, this.cols, names)
    const displayValue = getLabelFromIndex(selectedIndex, this.cols, names.label)
    return {
      value: inputValue,
      displayValue,
      selectedIndex,
      selectedValue: inputValue,
      cols: this.cols,
    }
  }

  getIndexedStyle(style: string | string[], index: number) {
    return Array.isArray(style) ? style[index] || '' : style || ''
  }

  fireValueChange(value: string) {
    if (!this.controlled) this.updated(value)
    this.$emit('valueChange', this.getValue(value))
  }

  onItemClick(e: WechatMiniprogram.BaseEvent<PickerViewItemDataset>) {
    const { disabled, value } = e.currentTarget.dataset
    if (!disabled) this.fireValueChange(value)
  }

  onTouchStart() {
    this.$emit('beforeChange', this.getValue())
  }
  onTouchMove() {}
  onTouchEnd() {}

  mounted() {
    const inputValue = this.controlled ? this.value : this.defaultValue
    this.updatedStyles(this.itemHeight)
    const names = this.getFieldNamesSafe()
    this.cols = this.normalizeCols(getRealCol(this.options || [], names), names)
    this.onItemStyleChange(this.itemStyle)
    this.onIndicatorStyleChange(this.indicatorStyle)
    this.onMaskStyleChange(this.maskStyle)
    this.setValue(inputValue)
  }
}

export { PickerView }

export default defineComponentHOC()(PickerView)
