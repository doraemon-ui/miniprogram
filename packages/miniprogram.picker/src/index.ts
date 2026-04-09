import { defineComponentHOC, Doraemon, Component, Prop, Watch } from '@doraemon-ui/miniprogram.core-js'
import type { CustomEvent } from '@doraemon-ui/miniprogram.core-js'
import type { PickerValueDetail } from './types'

const { classNames } = Doraemon.util

@Component({
  expose: ['open', 'close'],
  props: {
    prefixCls: {
      type: String,
      default: 'dora-popup-picker',
    },
  },
})
class Picker extends Doraemon {
  prefixCls!: string

  @Prop({
    type: String,
    default: 'dora-picker',
  })
  multiPickerPrefixCls: string
  @Prop({
    type: String,
    default: 'dora-picker-view',
  })
  pickerPrefixCls: string
  @Prop({
    type: Object,
    default: { title: '请选择', cancelText: '取消', confirmText: '确定' },
  })
  toolbar: { title?: string; cancelText?: string; confirmText?: string }
  @Prop({
    type: Boolean,
    default: false,
  })
  defaultVisible: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  visible: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  controlled: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  disabled: boolean
  @Prop({
    type: Boolean,
    default: false,
  })
  cascade: boolean
  @Prop({
    type: Number,
    default: 3,
  })
  cols: number
  @Prop({
    type: Array,
    default: [],
  })
  value: string[]
  @Prop({
    type: Array,
    default: [],
  })
  options: unknown[]
  @Prop({
    type: Boolean,
    default: false,
  })
  loading: boolean
  @Prop({
    type: Number,
    default: 34,
  })
  itemHeight: number
  @Prop({
    type: null,
    default: '',
  })
  itemStyle: unknown
  @Prop({
    type: null,
    default: '',
  })
  indicatorStyle: unknown
  @Prop({
    type: String,
    default: '',
  })
  indicatorClass: string
  @Prop({
    type: null,
    default: '',
  })
  maskStyle: unknown
  @Prop({
    type: String,
    default: '',
  })
  maskClass: string
  @Prop({
    type: String,
    default: 'center',
  })
  labelAlign: string
  @Prop({
    type: Object,
    default: { label: 'label', value: 'value', disabled: 'disabled', children: 'children' },
  })
  defaultFieldNames: { label?: string; value?: string; disabled?: string; children?: string }

  popupVisible: boolean = false
  inputValue: string[] = []
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
      disabled: `${p}__disabled`,
      title: `${p}__title`,
    }
  }

  @Watch('visible')
  onVisiblePropChange(v: boolean) {
    if (!this.mountedFlag) return
    if (this.controlled) this.setVisibleState(v)
  }

  @Watch('value')
  onValuePropChange(v: string[]) {
    if (!this.mountedFlag) return
    this.updated(v, true)
  }

  setVisibleState(popupVisible: boolean) {
    if (this.popupVisible !== popupVisible) this.popupVisible = popupVisible
  }

  fireVisibleChange(popupVisible: boolean) {
    if (this.popupVisible !== popupVisible) {
      if (!this.controlled) this.setVisibleState(popupVisible)
      this.$emit('visibleChange', { visible: popupVisible })
    }
  }

  open() {
    this.fireVisibleChange(true)
  }

  close(callback?: (values: PickerValueDetail & { label: string }) => void) {
    if (typeof callback === 'function') callback(this.formatPickerValue(this.getPickerValue(this.inputValue)))
    this.fireVisibleChange(false)
  }

  onShow() {
    this.updated(this.value || [], true)
  }

  onClosed() {
    this.inputValue = [...(this.value || [])]
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

  onValueChange(e: CustomEvent<PickerValueDetail>) {
    if (!this.mountedFlag) return
    this.updated(e.detail.value || [], true)
    this.$emit('valueChange', this.formatPickerValue(e.detail))
  }

  getPickerValue(value: string[] = this.inputValue): PickerValueDetail {
    const id = this.cascade ? '#dora-picker-cascader' : '#dora-picker-multi'
    const picker = (this._renderProxy as any)?.selectComponent?.(id)
    if (picker?.getValue) {
      return picker.getValue(value) as PickerValueDetail
    }
    return {
      value,
      displayValue: value,
      selectedIndex: [],
      selectedValue: value,
      cols: [],
    }
  }

  formatPickerValue(values: PickerValueDetail) {
    const displayValue = Array.isArray(values.displayValue) ? values.displayValue : []
    return {
      ...values,
      label: displayValue.join(','),
    }
  }

  onTriggerClick() {
    if (this.disabled) return
    this.fireVisibleChange(!this.popupVisible)
  }

  noop() {}

  updated(inputValue: string[] = [], force = false) {
    if (force || this.inputValue.join('|') !== inputValue.join('|')) {
      this.inputValue = [...inputValue]
    }
  }

  mounted() {
    this.mountedFlag = true
    this.setVisibleState(this.controlled ? this.visible : this.defaultVisible)
    this.updated(this.value || [], true)
  }

  detached() {
    this.mountedFlag = false
  }
}

export { Picker }

export default defineComponentHOC()(Picker)
