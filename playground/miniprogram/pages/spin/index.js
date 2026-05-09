Page({
  data: {
    spinning: true,
  },
  onClick() {
    this.setData({
      spinning: !this.data.spinning,
    })
  },
})
