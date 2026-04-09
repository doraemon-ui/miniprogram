import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import type { PopupSelectNotFoundContent, PopupSelectToolbar, SelectOption } from './types'

const { classNames } = Doraemon.util

const notFoundContent = {
  icon: '',
  title: '',
  text: '暂无数据',
}

const getNotFoundContent = (newVal: unknown) => {
  if (newVal !== null && typeof newVal === 'object') {
    return Object.assign({}, notFoundContent, newVal as Record<string, unknown>)
  } else if (typeof newVal === 'string') {
    return Object.assign({}, notFoundContent, { text: newVal })
  } else if (newVal === null || newVal === false) {
    return null
  }
  return notFoundContent
}

const flattenOptions = (options: Array<string | Record<string, unknown>>) => {
  const list: SelectOption[] = []
  options.forEach((item) => {
    if (typeof item === 'string') {
      list.push({ title: item, value: item })
      return
    }
    const title = String(item.title ?? item.label ?? item.value ?? '')
    const value = String(item.value ?? item.key ?? title)
    if (Array.isArray(item.options)) {
      list.push({ title, value, isGroup: true })
      item.options.forEach((child) => {
        if (typeof child === 'string') {
          list.push({ title: child, value: child, isGroupOption: true })
        } else {
          list.push({
            title: String(child.title ?? child.label ?? child.value ?? ''),
            value: String(child.value ?? child.key ?? child.title ?? ''),
            disabled: !!child.disabled,
            isGroupOption: true,
          })
        }
      })
      return
    }
    list.push({ title, value, disabled: !!item.disabled })
  })
  return list
}

@Component({
  expose: ['open', 'close'],
  props: {
    prefixCls: { type: String, default: 'dora-popup-select' },
  },
})
class PopupSelect extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof PopupSelect
   */
  prefixCls!: string

  /**
   * 过渡的类名
   *
   * @type {string}
   * @memberof PopupSelect
   */
  @Prop({
    type: null,
    default: 'dora-animate--fadeIn',
  })
  classNames: string

  /**
   * 是否虚拟列表
   *
   * @type {boolean}
   * @memberof PopupSelect
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  virtualized: boolean

  /**
   * 空状态文案
   *
   * @type {unknown}
   * @memberof PopupSelect
   */
  @Prop({
    type: null,
    default: { ...notFoundContent },
  })
  notFoundContent: unknown

  /**
   * 当前值
   *
   * @type {string | string[]}
   * @memberof PopupSelect
   */
  @Prop({
    type: [String, Array],
    default: '',
  })
  value: string | string[]

  /**
   * 选项数据
   *
   * @type {Array<string | Record<string, unknown>>}
   * @memberof PopupSelect
   */
  @Prop({
    type: Array,
    default: [],
  })
  options: Array<string | Record<string, unknown>>

  /**
   * 图标位置
   *
   * @type {string}
   * @memberof PopupSelect
   */
  @Prop({
    type: String,
    default: '',
  })
  iconPosition: string

  /**
   * 是否多选
   *
   * @type {boolean}
   * @memberof PopupSelect
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  multiple: boolean

  /**
   * 最大可选数
   *
   * @type {number}
   * @memberof PopupSelect
   */
  @Prop({
    type: Number,
    default: -1,
  })
  max: number

  /**
   * 工具栏配置
   *
   * @type {PopupSelectToolbar}
   * @memberof PopupSelect
   */
  @Prop({
    type: Object,
    default: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  })
  toolbar: PopupSelectToolbar

  /**
   * 是否可见
   *
   * @type {boolean}
   * @memberof PopupSelect
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean

  /**
   * 默认是否可见
   *
   * @type {boolean}
   * @memberof PopupSelect
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  defaultVisible: boolean

  /**
   * 是否受控
   *
   * @type {boolean}
   * @memberof PopupSelect
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean

  mergedOptions: SelectOption[] = []
  mergedNotFoundContent: null | PopupSelectNotFoundContent = { ...notFoundContent }
  inputValue: string | string[] = ''
  popupVisible: boolean = false

  get classes() {
    const p = this.prefixCls
    return {
      wrap: classNames(p),
      toolbar: `${p}__toolbar`,
      inner: `${p}__toolbar-inner`,
      cancel: `${p}__cancel`,
      title: `${p}__title`,
      confirm: `${p}__confirm`,
      hover: `${p}__hover`,
      list: `${p}__list`,
      option: `${p}__option`,
      optionDisabled: `${p}__option--disabled`,
      optionSelected: `${p}__option--selected`,
      group: `${p}__group`,
      prompt: `${p}__prompt`,
    }
  }

  @Watch('options')
  onOptionsChange(options: Array<string | Record<string, unknown>>) {
    this.mergedOptions = flattenOptions(options || [])
  }

  @Watch('notFoundContent')
  onNotFoundContentChange(v: unknown) {
    this.mergedNotFoundContent = getNotFoundContent(v)
  }

  @Watch('visible')
  onVisibleChange(v: boolean) {
    if (this.controlled) this.updated(v)
  }

  updated(v: boolean) {
    if (this.popupVisible !== v) this.popupVisible = v
  }

  open() {
    if (!this.controlled) this.updated(true)
    this.$emit('change', { visible: true })
  }

  close() {
    if (!this.controlled) this.updated(false)
    this.$emit('change', { visible: false })
  }

  onTrigger() {
    this.open()
  }

  onShow() {
    this.inputValue = this.value
  }

  onClosed() {
    this.$emit('closed')
  }

  onCancel() {
    this.close()
    this.$emit('cancel')
  }

  formatPickerValue(value: string | string[]) {
    const values = Array.isArray(value) ? value : [value]
    const selectedOptions = this.mergedOptions.filter((o) => values.includes(o.value))
    return { value, options: selectedOptions }
  }

  onConfirm() {
    this.$emit('valueChange', this.formatPickerValue(this.inputValue))
    this.$emit('confirm', this.formatPickerValue(this.inputValue))
    this.close()
  }

  noop() {}

  onOptionTap(e: CustomEvent<{ value: string }>) {
    const { value } = e.currentTarget.dataset
    const option = this.mergedOptions.find((n) => n.value === value)
    if (!option || option.disabled || option.isGroup) return
    if (this.multiple) {
      const set = new Set(Array.isArray(this.inputValue) ? this.inputValue : [])
      if (set.has(value)) {
        set.delete(value)
      } else if (this.max <= 0 || set.size < this.max) {
        set.add(value)
      }
      this.inputValue = Array.from(set)
    } else {
      this.inputValue = value
    }
  }

  isSelected(v: string) {
    return this.multiple ? Array.isArray(this.inputValue) && this.inputValue.includes(v) : this.inputValue === v
  }

  mounted() {
    this.onOptionsChange(this.options)
    this.onNotFoundContentChange(this.notFoundContent)
    this.updated(this.controlled ? this.visible : this.defaultVisible)
  }
}

export { PopupSelect }

export default defineComponentHOC()(PopupSelect)
