Page({
  data: {
    locks: 0,
  },
  onLoad() {
    this.backdrop = this.selectComponent('#dora-backdrop')
  },
  retain() {
    this.backdrop.retain()
    this.setData({
      locks: this.backdrop.backdropHolds,
    })
  },
  release() {
    this.backdrop.release()
    this.setData({
      locks: this.backdrop.backdropHolds,
    })
  },
  showed() {
    console.log('showed')
  },
  closed() {
    console.log('closed')
  },
})
