import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { getIndexesFromValues, getLabelsFromIndexes, getRealCols, getRealValues } from './utils'
import type {
  MultiPickerFieldNames,
  MultiPickerItemChangeDetail,
  MultiPickerLabelAlign,
  MultiPickerOptionRecord,
  MultiPickerOptions,
} from './types'

@Component({
  props: {
    prefixCls: { type: String, default: 'dora-picker' },
  },
})
class MultiPickerView extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof MultiPickerView
   */
  prefixCls!: string

  /**
   * picker-view 组件类名前缀
   *
   * @type {string}
   * @memberof MultiPickerView
   */
  @Prop({
    type: String,
    default: 'dora-picker-view',
  })
  pickerPrefixCls: string

  /**
   * 当前选中值
   *
   * @type {string[]}
   * @memberof MultiPickerView
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
   * @memberof MultiPickerView
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
   * @memberof MultiPickerView
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
   * @memberof MultiPickerView
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
   * @memberof MultiPickerView
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
   * @memberof MultiPickerView
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
   * @memberof MultiPickerView
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
   * @memberof MultiPickerView
   */
  @Prop({
    type: String,
    default: '',
  })
  maskClass: string

  /**
   * 标签对齐方式
   *
   * @type {MultiPickerLabelAlign}
   * @memberof MultiPickerView
   */
  @Prop({
    type: String,
    default: 'center',
  })
  labelAlign: MultiPickerLabelAlign

  /**
   * 是否加载中
   *
   * @type {boolean}
   * @memberof MultiPickerView
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  loading: boolean

  /**
   * 多列选项数据
   *
   * @type {MultiPickerOptions}
   * @memberof MultiPickerView
   */
  @Prop({
    type: Array,
    default: [],
  })
  options: MultiPickerOptions

  /**
   * 选项字段映射
   *
   * @type {MultiPickerFieldNames}
   * @memberof MultiPickerView
   */
  @Prop({
    type: Object,
    default: { label: 'label', value: 'value', disabled: 'disabled' },
  })
  defaultFieldNames: MultiPickerFieldNames

  inputValue: string[] = []
  cols: MultiPickerOptionRecord[][] = []

  getFieldNamesSafe() {
    return {
      label: this.defaultFieldNames?.label || 'label',
      value: this.defaultFieldNames?.value || 'value',
      disabled: this.defaultFieldNames?.disabled || 'disabled',
    }
  }

  @Watch('value')
  @Watch('options')
  onValueOptionsChange() {
    const names = this.getFieldNamesSafe()
    this.cols = getRealCols(this.options as any, names)
    this.setValue(this.value, true)
  }

  updated(inputValue: string[], isForce = false) {
    if (this.inputValue !== inputValue || isForce) {
      this.inputValue = [...inputValue]
    }
  }

  setValue(value: string[], isForce = false) {
    const { value: inputValue } = this.getValue(value)
    this.updated(inputValue, isForce)
  }

  getValue(value = this.inputValue, cols = this.cols) {
    const names = this.getFieldNamesSafe()
    const inputValue = getRealValues(Array.isArray(value) ? value : [], cols, names)
    const selectedValue = [...inputValue]
    const selectedIndex = getIndexesFromValues(inputValue, cols, names)
    const displayValue = getLabelsFromIndexes(selectedIndex, cols, names.label)
    return { value: inputValue, displayValue, selectedIndex, selectedValue, cols }
  }

  onChange(index: number, value: string, method: 'beforeChange' | 'valueChange' | 'scrollChange') {
    const inputValue = [...this.inputValue]
    inputValue[index] = value
    if (!this.controlled) this.updated(inputValue)
    this.$emit(method, { ...this.getValue(inputValue), index })
  }

  onBeforeChange(e: CustomEvent<MultiPickerItemChangeDetail>) {
    this.onChange(e.currentTarget.dataset.index, e.detail.value, 'beforeChange')
  }

  onValueChange(e: CustomEvent<MultiPickerItemChangeDetail>) {
    this.onChange(e.currentTarget.dataset.index, e.detail.value, 'valueChange')
  }

  onScrollChange(e: CustomEvent<MultiPickerItemChangeDetail>) {
    this.onChange(e.currentTarget.dataset.index, e.detail.value, 'scrollChange')
  }

  mounted() {
    this.onValueOptionsChange()
  }
}

export { MultiPickerView }

export default defineComponentHOC()(MultiPickerView)
