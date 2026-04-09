import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import locales from './locales'
import { props } from './props'
import type { DatePickerViewLang, DatePickerViewMode, DatePickerViewValueChangeDetail, PickerOption } from './types'
import {
  DATETIME,
  DATE,
  TIME,
  MONTH,
  YEAR,
  ONE_DAY,
  TILL_NOW,
  fomartArray,
  getDaysInMonth,
  pad,
  cloneDate,
  setMonth,
  isTillNow,
  convertStringArrayToDate,
  convertDateToStringArray,
  getRealValues,
  getIndexesFromValues,
  getLabelsFromIndexes,
} from './utils'

@Component({ props })
class DatePickerView extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof DatePickerView
   */
  prefixCls!: string

  /**
   * 多列选择器类名前缀
   *
   * @type {string}
   * @memberof DatePickerView
   */
  @Prop({
    type: String,
    default: 'dora-picker',
  })
  multiPickerPrefixCls: string

  /**
   * 选择器视图类名前缀
   *
   * @type {string}
   * @memberof DatePickerView
   */
  @Prop({
    type: String,
    default: 'dora-picker-view',
  })
  pickerPrefixCls: string

  /**
   * 当前值
   *
   * @type {unknown}
   * @memberof DatePickerView
   */
  @Prop({
    type: null,
    default: null,
  })
  value: unknown

  /**
   * 每项高度
   *
   * @type {number}
   * @memberof DatePickerView
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
   * @memberof DatePickerView
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
   * @memberof DatePickerView
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
   * @memberof DatePickerView
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
   * @memberof DatePickerView
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
   * @memberof DatePickerView
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
   * @memberof DatePickerView
   */
  @Prop({
    type: String,
    default: 'center',
  })
  labelAlign: string

  /**
   * 选择模式
   *
   * @type {DatePickerViewMode}
   * @memberof DatePickerView
   */
  @Prop({
    type: String,
    default: DATETIME,
  })
  mode: DatePickerViewMode

  /**
   * 分钟步长
   *
   * @type {number}
   * @memberof DatePickerView
   */
  @Prop({
    type: Number,
    default: 1,
  })
  minuteStep: number

  /**
   * 是否使用 12 小时制
   *
   * @type {boolean}
   * @memberof DatePickerView
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  use12Hours: boolean

  /**
   * 最小日期
   *
   * @type {unknown}
   * @memberof DatePickerView
   */
  @Prop({
    type: null,
    default: null,
  })
  minDate: unknown

  /**
   * 最大日期
   *
   * @type {unknown}
   * @memberof DatePickerView
   */
  @Prop({
    type: null,
    default: null,
  })
  maxDate: unknown

  /**
   * 最小小时
   *
   * @type {number}
   * @memberof DatePickerView
   */
  @Prop({
    type: Number,
    default: 0,
  })
  minHour: number

  /**
   * 最大小时
   *
   * @type {number}
   * @memberof DatePickerView
   */
  @Prop({
    type: Number,
    default: 23,
  })
  maxHour: number

  /**
   * 最小分钟
   *
   * @type {number}
   * @memberof DatePickerView
   */
  @Prop({
    type: Number,
    default: 0,
  })
  minMinute: number

  /**
   * 最大分钟
   *
   * @type {number}
   * @memberof DatePickerView
   */
  @Prop({
    type: Number,
    default: 59,
  })
  maxMinute: number

  /**
   * 语言
   *
   * @type {DatePickerViewLang}
   * @memberof DatePickerView
   */
  @Prop({
    type: String,
    default: 'zh_CN',
  })
  lang: DatePickerViewLang

  /**
   * 是否包含至今选项
   *
   * @type {boolean}
   * @memberof DatePickerView
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  tillNow: boolean

  inputValue: string[] = []
  cols: PickerOption[][] = []
  private defaultMinDate?: Date
  private defaultMaxDate?: Date

  @Watch('inputValue')
  onInputValue() {
    this.updatedCols(this.inputValue)
  }
  @Watch('value')
  @Watch('mode')
  @Watch('minuteStep')
  @Watch('use12Hours')
  @Watch('minDate')
  @Watch('maxDate')
  @Watch('minHour')
  @Watch('maxHour')
  @Watch('minMinute')
  @Watch('maxMinute')
  @Watch('lang')
  onDepsChange() {
    this.setValue(this.value)
  }

  getDefaultMinDate() {
    if (!this.defaultMinDate) this.defaultMinDate = new Date(2000, 1, 1, 0, 0, 0)
    return this.defaultMinDate
  }
  getDefaultMaxDate() {
    if (!this.defaultMaxDate) this.defaultMaxDate = new Date(2030, 1, 1, 23, 59, 59)
    return this.defaultMaxDate
  }
  getMinDate() {
    return this.minDate ? convertStringArrayToDate(this.minDate, this) : this.getDefaultMinDate()
  }
  getMaxDate() {
    return this.maxDate ? convertStringArrayToDate(this.maxDate, this) : this.getDefaultMaxDate()
  }
  getDateMember(type: 'min' | 'max', member: 'year' | 'month' | 'day' | 'hour' | 'minute') {
    const d = type === 'min' ? this.getMinDate() : this.getMaxDate()
    if (member === 'year') return d.getFullYear()
    if (member === 'month') return d.getMonth()
    if (member === 'day') return d.getDate()
    if (member === 'hour') return d.getHours()
    return d.getMinutes()
  }

  getDisplayHour(rawHour: number) {
    if (this.use12Hours) {
      if (rawHour === 0) rawHour = 12
      if (rawHour > 12) rawHour -= 12
    }
    return rawHour
  }
  setHours(date: Date, hour: number) {
    if (!this.use12Hours) return date.setHours(hour)
    const dh = date.getHours()
    let nhour = dh >= 12 ? hour + 12 : hour
    nhour = nhour >= 24 ? 0 : nhour
    date.setHours(nhour)
  }
  setAmPm(date: Date, index: number) {
    date.setTime(+date + (index === 0 ? -ONE_DAY / 2 : ONE_DAY / 2))
  }

  clipDate(date: Date) {
    const minDate = this.getMinDate()
    const maxDate = this.getMaxDate()
    if (this.mode === DATETIME) {
      if (date < minDate) return cloneDate(minDate)
      if (date > maxDate) return cloneDate(maxDate)
    } else if (this.mode === DATE || this.mode === YEAR || this.mode === MONTH) {
      if (+date + ONE_DAY <= +minDate) return cloneDate(minDate)
      if (+date >= +maxDate + ONE_DAY) return cloneDate(maxDate)
    } else if (this.mode === TIME) {
      const hour = date.getHours()
      const minute = date.getMinutes()
      if (hour < minDate.getHours() || (hour === minDate.getHours() && minute < minDate.getMinutes())) return cloneDate(minDate)
      if (hour > maxDate.getHours() || (hour === maxDate.getHours() && minute > maxDate.getMinutes())) return cloneDate(maxDate)
    }
    return date
  }

  getDate(d?: unknown) {
    const date = d !== undefined ? d : this.value
    const parsed = isTillNow(date) ? new Date() : convertStringArrayToDate(date, this)
    return this.clipDate(parsed)
  }

  getDateData(date: Date) {
    const locale = locales[this.lang]
    const selYear = date.getFullYear()
    const selMonth = date.getMonth()
    const years = fomartArray(this.getDateMember('min', 'year'), this.getDateMember('max', 'year')).map((i) => ({
      value: `${i}`,
      label: `${i}${locale.year}`,
    }))
    if (this.mode === YEAR) return [years]
    const minMonth = this.getDateMember('min', 'year') === selYear ? this.getDateMember('min', 'month') : 0
    const maxMonth = this.getDateMember('max', 'year') === selYear ? this.getDateMember('max', 'month') : 11
    const months = fomartArray(minMonth, maxMonth).map((i) => ({ value: `${i}`, label: `${i + 1}${locale.month}` }))
    if (this.mode === MONTH) return [years, months]
    const minDay =
      this.getDateMember('min', 'year') === selYear && this.getDateMember('min', 'month') === selMonth
        ? this.getDateMember('min', 'day')
        : 1
    const maxDay =
      this.getDateMember('max', 'year') === selYear && this.getDateMember('max', 'month') === selMonth
        ? this.getDateMember('max', 'day')
        : getDaysInMonth(date)
    const days = fomartArray(minDay, maxDay).map((i) => ({ value: `${i}`, label: `${i}${locale.day}` }))
    return [years, months, days]
  }

  getTimeData(date: Date) {
    let minHour = this.minHour
    let maxHour = this.maxHour
    let minMinute = this.minMinute
    let maxMinute = this.maxMinute
    const locale = locales[this.lang]
    const hour = date.getHours()
    if (this.mode === DATETIME) {
      const y = date.getFullYear()
      const m = date.getMonth()
      const d = date.getDate()
      if (this.getDateMember('min', 'year') === y && this.getDateMember('min', 'month') === m && this.getDateMember('min', 'day') === d) {
        minHour = this.getDateMember('min', 'hour')
        if (minHour === hour) minMinute = this.getDateMember('min', 'minute')
      }
      if (this.getDateMember('max', 'year') === y && this.getDateMember('max', 'month') === m && this.getDateMember('max', 'day') === d) {
        maxHour = this.getDateMember('max', 'hour')
        if (maxHour === hour) maxMinute = this.getDateMember('max', 'minute')
      }
    }
    const hours = fomartArray(this.getDisplayHour(minHour), this.getDisplayHour(maxHour)).map((i) => ({
      value: `${i}`,
      label: locale.hour ? `${i}${locale.hour}` : pad(i),
    }))
    const minutes: PickerOption[] = []
    const selMinute = date.getMinutes()
    for (let i = minMinute; i <= maxMinute; i += this.minuteStep) {
      minutes.push({ value: `${i}`, label: locale.minute ? `${i}${locale.minute}` : pad(i) })
      if (selMinute > i && selMinute < i + this.minuteStep) {
        minutes.push({ value: `${selMinute}`, label: locale.minute ? `${selMinute}${locale.minute}` : pad(selMinute) })
      }
    }
    const ampm = [
      { value: '0', label: locale.am },
      { value: '1', label: locale.pm },
    ]
    return [hours, minutes].concat(this.use12Hours ? [ampm] : [])
  }

  generateDatePickerColumns(selected?: string[], d?: unknown) {
    const locale = locales[this.lang]
    const date = this.getDate(d)
    let cols: PickerOption[][] = []
    if (this.mode === YEAR || this.mode === MONTH || this.mode === DATETIME || this.mode === DATE) cols = this.getDateData(date)
    if (this.mode === DATETIME || this.mode === TIME) cols = cols.concat(this.getTimeData(date))
    if (this.tillNow) {
      cols[0].push({ label: locale.tillNow, value: TILL_NOW })
      if (selected && selected[0] === TILL_NOW) cols = cols.map((c, i) => (i === 0 ? c : []))
    }
    return cols
  }

  getNewDate(values: string[], index: number) {
    const value = parseInt(values[index], 10)
    const newDate = cloneDate(this.getDate())
    if (this.mode === DATETIME || this.mode === DATE || this.mode === YEAR || this.mode === MONTH) {
      if (index === 0) newDate.setFullYear(value)
      if (index === 1) setMonth(newDate, value)
      if (index === 2) newDate.setDate(value)
      if (index === 3) this.setHours(newDate, value)
      if (index === 4) newDate.setMinutes(value)
      if (index === 5) this.setAmPm(newDate, value)
    } else if (this.mode === TIME) {
      if (index === 0) this.setHours(newDate, value)
      if (index === 1) newDate.setMinutes(value)
      if (index === 2) this.setAmPm(newDate, value)
    }
    return this.clipDate(newDate)
  }

  onValueChange(e: CustomEvent<DatePickerViewValueChangeDetail>) {
    const tillNow = e.detail.value[0] === TILL_NOW
    const newDate = tillNow ? this.getDate(new Date()) : this.getNewDate(e.detail.value, e.detail.index)
    const newCols = this.generateDatePickerColumns(e.detail.value, newDate)
    const values = this.getValue(e.detail.value, newCols)
    this.$emit('valueChange', { ...e.detail, ...values, date: +newDate, tillNow })
  }

  updatedCols(inputValue: string[]) {
    this.cols = this.generateDatePickerColumns(inputValue)
  }
  updated(inputValue: string[]) {
    if (this.inputValue.join('|') !== inputValue.join('|')) this.inputValue = [...inputValue]
  }
  setValue(v: unknown) {
    this.updated(this.fixValue(v))
  }
  fixValue(v: any) {
    if (isTillNow(v)) {
      let inputValue = [TILL_NOW, '', '', '', '', '']
      if (this.mode === YEAR) inputValue = inputValue.slice(0, 1)
      else if (this.mode === MONTH) inputValue = inputValue.slice(0, 2)
      else if (this.mode === DATE) inputValue = inputValue.slice(0, 3)
      else if (this.mode === TIME) inputValue = inputValue.slice(0, !this.use12Hours ? 2 : 3)
      else if (this.mode === DATETIME) inputValue = inputValue.slice(0, !this.use12Hours ? 5 : 6)
      return inputValue
    }
    return convertDateToStringArray(this.getDate(v), this)
  }
  getValue(value = this.inputValue, cols = this.cols) {
    const newValue = this.fixValue(value)
    const names = { label: 'label', value: 'value', disabled: 'disabled' }
    const selectedValue = getRealValues(newValue, cols as any, names)
    const selectedIndex = getIndexesFromValues(selectedValue, cols as any, names)
    const displayValue = getLabelsFromIndexes(selectedIndex, cols as any, names.label) as string[]
    return {
      value: selectedValue,
      displayValue,
      selectedIndex,
      selectedValue,
      cols,
      date: +this.getDate(),
      tillNow: selectedValue[0] === TILL_NOW,
    }
  }

  mounted() {
    this.setValue(this.value)
  }
}

export { DatePickerView }

export default defineComponentHOC()(DatePickerView)
