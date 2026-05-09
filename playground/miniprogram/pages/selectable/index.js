Page({
  data: {
    checked: false,
  },
  onCheckboxChange(e) {
    this.setData({
      checked: e.detail.checked,
    })
  },
})
