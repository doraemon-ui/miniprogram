import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import { formatDate } from './utils'
import type { DatePickerChangeDetail, DatePickerDetail, DatePickerLang, DatePickerMode, DatePickerToolbar } from './types'

const { classNames } = Doraemon.util
const modeRecord: Record<string, string> = {
  datetime: 'yyyy-MM-dd hh:mm',
  date: 'yyyy-MM-dd',
  year: 'yyyy',
  month: 'yyyy-MM',
  time: 'hh:mm',
}
const isTillNow = (value: any) => value && (value.tillNow || value[0] === 'TILL_NOW')

@Component({
  expose: ['open', 'close'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-date-picker',
    },
  },
})
class DatePicker extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof DatePicker
   */
  prefixCls!: string

  /**
   * 多列选择器类名前缀
   *
   * @type {string}
   * @memberof DatePicker
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
   * @memberof DatePicker
   */
  @Prop({
    type: String,
    default: 'dora-picker-view',
  })
  pickerPrefixCls: string

  /**
   * 顶部工具栏配置
   *
   * @type {DatePickerToolbar}
   * @memberof DatePicker
   */
  @Prop({
    type: Object,
    default: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  })
  toolbar: DatePickerToolbar

  /**
   * 默认是否显示
   *
   * @type {boolean}
   * @memberof DatePicker
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  defaultVisible: boolean

  /**
   * 是否显示
   *
   * @type {boolean}
   * @memberof DatePicker
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof DatePicker
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
   * @memberof DatePicker
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean

  /**
   * 当前值
   *
   * @type {unknown}
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
   */
  @Prop({
    type: String,
    default: 'center',
  })
  labelAlign: string

  /**
   * 选择模式
   *
   * @type {DatePickerMode}
   * @memberof DatePicker
   */
  @Prop({
    type: String,
    default: 'datetime',
  })
  mode: DatePickerMode

  /**
   * 分钟步长
   *
   * @type {number}
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
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
   * @memberof DatePicker
   */
  @Prop({
    type: Number,
    default: 59,
  })
  maxMinute: number

  /**
   * 语言
   *
   * @type {DatePickerLang}
   * @memberof DatePicker
   */
  @Prop({
    type: String,
    default: 'zh_CN',
  })
  lang: DatePickerLang

  /**
   * 是否包含至今选项
   *
   * @type {boolean}
   * @memberof DatePicker
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  tillNow: boolean

  popupVisible: boolean = false
  inputValue: unknown = null
  mountedFlag: boolean = false

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p),
      toolbar: `${p}__toolbar`,
      inner: `${p}__inner`,
      cancel: `${p}__cancel`,
      confirm: `${p}__confirm`,
      hover: `${p}__hover`,
      title: `${p}__title`,
    }
  }

  @Watch('visible')
  onVisiblePropChange(v: boolean) {
    if (!this.mountedFlag) return
    if (this.controlled) this.setVisibleState(v)
  }

  @Watch('value')
  onValuePropChange(v: unknown) {
    if (!this.mountedFlag) return
    this.updated(v, true)
  }

  setVisibleState(v: boolean) {
    if (this.popupVisible !== v) this.popupVisible = v
  }
  fireVisibleChange(v: boolean) {
    if (this.popupVisible !== v) {
      if (!this.controlled) this.setVisibleState(v)
      this.$emit('visibleChange', { visible: v })
    }
  }

  open() {
    this.fireVisibleChange(true)
  }
  close(callback?: (values: DatePickerChangeDetail) => void) {
    if (typeof callback === 'function') callback(this.formatPickerValue(this.getPickerValue(this.inputValue)))
    this.fireVisibleChange(false)
  }
  onShow() {
    this.updated(this.value, true)
  }
  onClosed() {
    this.inputValue = this.value
  }
  onConfirm() {
    this.close((values) => {
      this.$emit('change', values)
      this.$emit('confirm', values)
    })
  }
  onCancel() {
    this.close((values) => this.$emit('cancel', values))
  }

  onValueChange(e: CustomEvent<DatePickerDetail>) {
    if (!this.mountedFlag) return
    this.updated(e.detail.value, true)
    this.$emit('valueChange', this.formatPickerValue(e.detail))
  }

  getPickerValue(value = this.inputValue): DatePickerDetail {
    const picker = (this._renderProxy as any)?.selectComponent?.('#dora-picker')
    if (picker?.getValue) return picker.getValue(value) as DatePickerDetail
    return {
      value,
      displayValue: [],
      selectedIndex: [],
      selectedValue: value,
      cols: [],
      date: Date.now(),
      tillNow: false,
    }
  }

  formatPickerValue(values: DatePickerDetail) {
    if (isTillNow(values.value)) {
      return { ...values, label: values.displayValue?.[0] || '' }
    }
    const modeFmt = modeRecord[this.mode as keyof typeof modeRecord] || modeRecord.datetime
    return { ...values, label: formatDate(values.date || Date.now(), modeFmt) }
  }

  onTriggerClick() {
    if (this.disabled) return
    this.fireVisibleChange(!this.popupVisible)
  }
  noop() {}
  updated(v: unknown, force = false) {
    if (force || this.inputValue !== v) this.inputValue = v
  }

  mounted() {
    this.mountedFlag = true
    this.setVisibleState(this.controlled ? this.visible : this.defaultVisible)
    this.updated(this.value, true)
  }
  detached() {
    this.mountedFlag = false
  }
}

export { DatePicker }

export default defineComponentHOC()(DatePicker)
