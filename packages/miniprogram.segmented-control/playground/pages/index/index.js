Page({
  data: {
    current: 1,
  },
  onLoad() {
    this.key = Math.floor(Math.random() * 3)
  },
  onChange(e) {
    if (e.detail.key === this.key) {
      wx.showModal({
        title: 'No switching is allowed',
        showCancel: false,
      })
      return
    }
    this.setData({ current: e.detail.key })
  },
})
