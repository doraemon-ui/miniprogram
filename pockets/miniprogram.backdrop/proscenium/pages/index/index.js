Page({
  data: {
    locks: 0,
  },
  onLoad() {
    this.$wuxBackdrop = this.selectComponent('#dora-backdrop')
  },
  retain() {
    this.$wuxBackdrop.retain()
    this.setData({
      locks: this.$wuxBackdrop.backdropHolds,
    })
  },
  release() {
    this.$wuxBackdrop.release()
    this.setData({
      locks: this.$wuxBackdrop.backdropHolds,
    })
  },
  afterShow() {
    console.log('afterShow')
  },
  afterClose() {
    console.log('afterClose')
  },
})
