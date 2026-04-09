const isTel = (value) => !/^1[34578]\d{9}$/.test(value)

Page({
  data: {
    value: '',
    error: true,
  },
  onChange(e) {
    const value = e.detail.value || ''
    this.setData({
      error: isTel(value),
      value,
    })
  },
  onFocus(e) {
    this.setData({
      error: isTel(e.detail.value || ''),
    })
  },
  onBlur(e) {
    this.setData({
      error: isTel(e.detail.value || ''),
    })
  },
  onConfirm(e) {
    console.log('onConfirm', e)
  },
  onClear() {
    this.setData({
      error: true,
      value: '',
    })
  },
  onError() {
    wx.showModal({
      title: 'Please enter 11 digits',
      showCancel: false,
    })
  },
})
