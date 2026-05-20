Page({
  data: {
    scrollTop: 0,
  },

  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop,
    })
  },

  onStick(e) {
    console.log('onStick', e.detail)
  },

  onUnStick(e) {
    console.log('onUnStick', e.detail)
  },
})
