Page({
  data: {
    current: '1',
  },
  onChange(e) {
    this.setData({
      current: e.detail.key,
    })
  },
})
