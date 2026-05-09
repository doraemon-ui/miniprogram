const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({
  data: {
    value: '',
    error: true,
  },

  onChange(e) {
    const value = e.detail?.value || ''
    this.setData({
      value,
      error: isTel(value),
    })
  },

  onFocus(e) {
    const value = e.detail?.value || this.data.value
    this.setData({ error: isTel(value) })
  },

  onBlur(e) {
    const value = e.detail?.value || this.data.value
    this.setData({ error: isTel(value) })
  },

  onConfirm() {},

  onClear() {
    this.setData({
      value: '',
      error: true,
    })
  },

  onError() {
    wx.showModal({
      title: 'Please enter 11 digits',
      showCancel: false,
    })
  },
})
