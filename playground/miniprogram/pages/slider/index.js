Page({
  data: {
    value: [0],
  },
  onChange(e) {
    this.setData({ value: e.detail.value })
  },
  afterChange(e) {
    this.setData({ value: e.detail.value })
  },
})
