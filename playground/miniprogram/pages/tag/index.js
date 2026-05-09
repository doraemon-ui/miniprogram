Page({
  data: {
    visible: true,
  },
  onClose() {},
  onChange(e) {
    if (!e.detail?.value) {
      wx.showModal({
        title: 'Sure to delete?',
        success: (res) => {
          if (res.confirm) this.setData({ visible: e.detail.value })
        },
      })
    }
  },
  onToggle() {
    this.setData({ visible: !this.data.visible })
  },
})
