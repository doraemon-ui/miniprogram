import { defineComponentHOC, Doraemon, Component, Prop } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import type { FlattenOption, OpenOptions, PopupOption, SelectToolbar } from './types'

const notFoundContent = {
  icon: '',
  title: '',
  text: '暂无数据',
}

const getNotFoundContent = (v: unknown) => {
  if (v !== null && typeof v === 'object') return Object.assign({}, notFoundContent, v as Record<string, unknown>)
  if (typeof v === 'string') return Object.assign({}, notFoundContent, { text: v })
  if (v === null || v === false) return null
  return notFoundContent
}

const flattenOptions = (options: PopupOption[]) => {
  const list: Array<{ title: string; value: string; isGroup?: boolean }> = []
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
          list.push({ title: child, value: child })
        } else {
          list.push({
            title: String(child.title ?? child.label ?? child.value ?? ''),
            value: String(child.value ?? child.key ?? child.title ?? ''),
          })
        }
      })
      return
    }
    list.push({ title, value })
  })
  return list
}

const getSelectIndex = (options: Array<{ value: string; isGroup?: boolean }>, value: string | string[], multiple: boolean) => {
  if (multiple) {
    const values = Array.isArray(value) ? value : []
    return options
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !item.isGroup && values.includes(item.value))
      .map(({ index }) => index)
  }
  const target = Array.isArray(value) ? value[0] : value
  return options.findIndex((item) => !item.isGroup && item.value === target)
}

@Component({
  expose: ['open', 'close'],
  props: {
    prefixCls: { type: String, default: 'dora-select' },
  },
})
class Select extends Doraemon {
  /**
   * 自定义类名前缀
   *
   * @type {string}
   * @memberof Select
   */
  prefixCls!: string

  /**
   * 当前值
   *
   * @type {(string | string[])}
   * @memberof Select
   */
  @Prop({
    type: [String, Array],
    default: '',
  })
  value: string | string[]

  /**
   * 选项数据
   *
   * @type {PopupOption[]}
   * @memberof Select
   */
  @Prop({
    type: Array,
    default: [],
  })
  options: PopupOption[]

  /**
   * 是否多选
   *
   * @type {boolean}
   * @memberof Select
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
   * @memberof Select
   */
  @Prop({
    type: Number,
    default: -1,
  })
  max: number

  /**
   * 空状态文案
   *
   * @type {unknown}
   * @memberof Select
   */
  @Prop({
    type: null,
    default: { ...notFoundContent },
  })
  notFoundContent: unknown

  /**
   * 是否虚拟列表
   *
   * @type {boolean}
   * @memberof Select
   */
  @Prop({
    type: Boolean,
    default: false,
  })
  virtualized: boolean

  /**
   * 工具栏配置
   *
   * @type {SelectToolbar}
   * @memberof Select
   */
  @Prop({
    type: Object,
    default: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  })
  toolbar: SelectToolbar

  visible: boolean = false
  selectValue: string | string[] = ''
  selectOptions: PopupOption[] = []
  selectMultiple: boolean = false
  selectMax: number = -1
  selectNotFoundContent: unknown = { ...notFoundContent }
  selectVirtualized: boolean = false
  selectToolbar: SelectToolbar = {
    title: '请选择',
    cancelText: '取消',
    confirmText: '确定',
  }
  fns: Partial<Pick<OpenOptions, 'onChange' | 'onConfirm' | 'onCancel'>> = {}

  open(opts: OpenOptions = {}) {
    this.fns = {
      onChange: opts.onChange,
      onConfirm: opts.onConfirm,
      onCancel: opts.onCancel,
    }
    this.selectValue = opts.value ?? this.value
    this.selectOptions = opts.options ?? this.options
    this.selectMultiple = opts.multiple ?? this.multiple
    this.selectMax = opts.max !== undefined ? parseInt(String(opts.max), 10) : this.max
    this.selectNotFoundContent = getNotFoundContent(opts.notFoundContent ?? this.notFoundContent)
    this.selectVirtualized = opts.virtualized ?? this.virtualized
    this.selectToolbar = opts.toolbar ?? this.toolbar
    this.visible = true
  }

  close(callback?: () => void) {
    this.visible = false
    if (typeof callback === 'function') callback()
  }

  runCallbacks(method: 'onChange' | 'onConfirm' | 'onCancel', detail: { value: string | string[] }) {
    const mergedOptions = flattenOptions(this.selectOptions)
    const index = getSelectIndex(mergedOptions, detail.value, this.selectMultiple)
    const fn = this.fns[method]
    if (typeof fn === 'function') fn.call(this, detail.value, index, mergedOptions as FlattenOption[])
  }

  onConfirm(e: CustomEvent<{ value: string | string[] }>) {
    this.runCallbacks('onConfirm', e.detail)
  }

  onCancel(e: CustomEvent<{ value: string | string[] }>) {
    this.runCallbacks('onCancel', e.detail)
  }

  onValueChange(e: CustomEvent<{ value: string | string[] }>) {
    this.runCallbacks('onChange', e.detail)
  }

  onVisibleChange(e: CustomEvent<{ visible: boolean }>) {
    this.visible = !!e.detail.visible
  }

  mounted() {
    this.selectValue = this.value
    this.selectOptions = this.options
    this.selectMultiple = this.multiple
    this.selectMax = this.max
    this.selectNotFoundContent = getNotFoundContent(this.notFoundContent)
    this.selectVirtualized = this.virtualized
    this.selectToolbar = this.toolbar
  }
}

export { Select }

export default defineComponentHOC()(Select)
