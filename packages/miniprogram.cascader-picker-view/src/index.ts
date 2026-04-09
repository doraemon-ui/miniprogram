import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { getIndexesFromValues, getLabelsFromIndexes, getRealValues } from './utils'
import type { CascaderPickerFieldNames, CascaderPickerValueChangeDetail, TreeOption } from './types'

function arrayTreeFilter(data: TreeOption[], filterFn: (item: TreeOption, level: number) => boolean, childrenKeyName: string) {
  let children = data || []
  const result: TreeOption[] = []
  let level = 0
  do {
    const found = children.filter((item) => filterFn(item, level))[0]
    if (!found) break
    result.push(found)
    const nextChildren = found[childrenKeyName]
    children = Array.isArray(nextChildren) ? (nextChildren as TreeOption[]) : []
    level += 1
  } while (children.length > 0)
  return result
}

@Component({
  props: {
    prefixCls: { type: String, default: 'dora-picker' },
  },
})
class CascaderPickerView extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof CascaderPickerView
   */
  prefixCls!: string

  /**
   * picker-view 组件类名前缀
   *
   * @type {string}
   * @memberof CascaderPickerView
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
   * @memberof CascaderPickerView
   */
  @Prop({
    type: Array,
    default: [],
  })
  value: string[]

  /**
   * 显示列数
   *
   * @type {number}
   * @memberof CascaderPickerView
   */
  @Prop({
    type: Number,
    default: 3,
  })
  cols: number

  /**
   * 每项高度
   *
   * @type {number}
   * @memberof CascaderPickerView
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
   * @memberof CascaderPickerView
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
   * @memberof CascaderPickerView
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
   * @memberof CascaderPickerView
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
   * @memberof CascaderPickerView
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
   * @memberof CascaderPickerView
   */
  @Prop({
    type: String,
    default: '',
  })
  maskClass: string

  /**
   * 标签对齐方式
   *
   * @type {string}
   * @memberof CascaderPickerView
   */
  @Prop({
    type: String,
    default: 'center',
  })
  labelAlign: string

  /**
   * 是否加载中
   *
   * @type {boolean}
   * @memberof CascaderPickerView
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  loading: boolean

  /**
   * 级联选项数据
   *
   * @type {TreeOption[]}
   * @memberof CascaderPickerView
   */
  @Prop({
    type: Array,
    default: [],
  })
  options: TreeOption[]

  /**
   * 选项字段映射
   *
   * @type {CascaderPickerFieldNames}
   * @memberof CascaderPickerView
   */
  @Prop({
    type: Object,
    default: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' },
  })
  defaultFieldNames: CascaderPickerFieldNames

  inputValue: string[] = []
  showOptions: TreeOption[][] = []
  pickerFieldNamesData: { label: string; value: string; disabled: string } = {
    label: 'label',
    value: 'value',
    disabled: 'disabled',
  }

  getFieldNamesSafe() {
    return {
      label: this.defaultFieldNames?.label || 'label',
      value: this.defaultFieldNames?.value || 'value',
      disabled: this.defaultFieldNames?.disabled || 'disabled',
      children: this.defaultFieldNames?.children || 'children',
    }
  }

  @Watch('inputValue')
  onInputValueChange(newVal: string[]) {
    const names = this.getFieldNamesSafe()
    const showOptions = this.getShowOptions(newVal).map((option) =>
      option.map((v) => {
        const out: TreeOption = {
          [names.value]: v[names.value],
          [names.label]: v[names.label],
        }
        if (v[names.disabled] !== undefined) out[names.disabled] = !!v[names.disabled]
        if (v.labelImage !== undefined) out.labelImage = v.labelImage
        return out
      }),
    )
    this.showOptions = showOptions
  }

  @Watch('value')
  @Watch('options')
  @Watch('cols')
  onValueOptionsColsChange() {
    this.setValue(this.value, this.options, this.cols)
  }

  @Watch('defaultFieldNames')
  onFieldNamesChange() {
    const names = this.getFieldNamesSafe()
    this.pickerFieldNamesData = { label: names.label, value: names.value, disabled: names.disabled }
    this.setValue(this.value, this.options, this.cols)
  }

  updated(inputValue: string[], force = false) {
    if (force || this.inputValue.join('|') !== inputValue.join('|')) this.inputValue = [...inputValue]
  }

  setValue(value: string[], options: TreeOption[], cols: number) {
    this.updated(this.getRealValue(options, value, cols), true)
  }

  onValueChange(e: CustomEvent<CascaderPickerValueChangeDetail>) {
    const { value, index } = e.detail
    const newValue = this.getNextValue(value, index)
    const inputValue = this.getRealValue(this.options, newValue)
    const values = this.getValue(inputValue)
    this.updated(inputValue, true)
    this.$emit('valueChange', { ...values, index })
  }

  getValue(value = this.inputValue) {
    const names = this.getFieldNamesSafe()
    const cols = this.showOptions
    const inputValue = getRealValues(Array.isArray(value) ? value : [], cols, names)
    const selectedValue = [...inputValue]
    const selectedIndex = getIndexesFromValues(inputValue, cols, names)
    const displayValue = getLabelsFromIndexes(selectedIndex, cols, names.label)
    return { value: inputValue, displayValue, selectedIndex, selectedValue, cols }
  }

  getNextValue(activeValue: string[], index: number) {
    const names = this.getFieldNamesSafe()
    const children = arrayTreeFilter(
      this.options,
      (option, level) => level <= index && option[names.value] === activeValue[level],
      names.children,
    )
    let data = children[index]
    let i = index + 1
    while (i < this.cols) {
      const next = data?.[names.children]
      if (Array.isArray(next) && next.length) {
        data = next[0] as TreeOption
        activeValue[i] = String(data[names.value] ?? '')
      }
      i++
    }
    activeValue.length = i
    return activeValue
  }

  getRealValue(options: TreeOption[], activeValue: string[], cols = this.cols) {
    const names = this.getFieldNamesSafe()
    if (!activeValue || !activeValue.length || activeValue.indexOf(undefined as unknown as string) > -1 || activeValue.length !== cols) {
      const newValue: string[] = []
      let data = [...options]
      let i = 0
      while (i < cols) {
        if (data && data.length) {
          const firstValue = String(data[0][names.value] ?? '')
          newValue[i] = activeValue?.[i] || firstValue
          let idx = data.map((v) => String(v[names.value] ?? '')).indexOf(newValue[i])
          if (idx === -1) {
            idx = 0
            newValue[i] = firstValue
          }
          const next = data[idx][names.children]
          data = Array.isArray(next) ? (next as TreeOption[]) : []
        }
        i++
      }
      return newValue
    }
    return activeValue
  }

  getActiveOptions(activeValue: string[]) {
    const names = this.getFieldNamesSafe()
    return arrayTreeFilter(this.options, (option, level) => String(option[names.value] ?? '') === activeValue[level], names.children)
  }

  getShowOptions(activeValue: string[]) {
    const names = this.getFieldNamesSafe()
    const result = this.getActiveOptions(activeValue)
      .map((activeOption) => activeOption[names.children])
      .filter((activeOption) => Array.isArray(activeOption)) as TreeOption[][]
    return [this.options, ...result].filter((_, i) => i < this.cols)
  }

  mounted() {
    this.onFieldNamesChange()
    this.setValue(this.value, this.options, this.cols)
  }
}

export { CascaderPickerView }

export default defineComponentHOC()(CascaderPickerView)
