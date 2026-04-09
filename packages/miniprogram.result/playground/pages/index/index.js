Page({
  data: {
    buttons: [
      { type: 'balanced', block: true, text: '确定' },
      { type: 'light', block: true, text: '返回' },
    ],
    errorIcon: {
      type: 'warn',
      color: '#ef473a',
    },
  },
  onSuccess() {
    wx.showToast({ title: 'Success 示例' })
  },
  onError() {
    wx.showToast({ title: 'Error 示例' })
  },
  onInfo() {
    wx.showToast({ title: 'Custom Icon 示例' })
  },
  onClick(e) {
    const { index } = e.detail
    if (index === 0) {
      wx.showModal({ title: 'Thank you for your support!', showCancel: false })
    }
    if (index === 1) {
      wx.showToast({ title: '返回示例', icon: 'none' })
    }
  },
})
