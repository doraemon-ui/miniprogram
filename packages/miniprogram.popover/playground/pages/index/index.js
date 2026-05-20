Page({
  data: {
    visible: false,
  },

  hide() {
    this.setData({
      visible: false,
    })
  },

  onChange(e) {
    this.setData({
      visible: e.detail.visible,
    })
  },
})
