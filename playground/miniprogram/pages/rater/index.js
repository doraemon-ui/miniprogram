Page({
  data: {
    value: 2.5,
  },
  onChange(e) {
    this.setData({
      value: e.detail.value,
    })
  },
})
