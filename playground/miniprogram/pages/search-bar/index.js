Page({
  data: {
    value: '',
  },
  onChange(e) {
    this.setData({ value: e.detail.value })
  },
  onFocus() {},
  onBlur() {},
  onConfirm() {},
  onClear() {
    this.setData({ value: '' })
  },
  onCancel() {},
})
