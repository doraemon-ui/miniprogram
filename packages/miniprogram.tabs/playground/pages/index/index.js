Page({
  data: {
    current: 'tab1',
  },
  onChange(e) {
    this.setData({
      current: e.detail.key,
    })
  },
  onTabClick(e) {
    const { key } = e.detail
    // 通过 click 来驱动 controlled 的 current
    this.setData({ current: key })
  },
})
