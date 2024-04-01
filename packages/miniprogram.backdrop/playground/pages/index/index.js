Page({
  data: {
    wrapStyle: {
      '--background-color': 'rgba(219, 10, 10, 0.5)'
    },
    locks: 0,
  },
  onLoad() {
    [...Array(4).keys()].forEach((key) => {
      this.setData({ [`visible${key + 1}`]: false })
      this[`setVisible${key + 1}`] = () => {
        console.log(`setVisible${key + 1}`)
        this.setData({ [`visible${key + 1}`]: true })
      }
      this[`onMaskClick${key + 1}`] = () => {
        console.log(`onMaskClick${key + 1}`)
        this.setData({ [`visible${key + 1}`]: false })
      }
      this[`onShowed${key + 1}`] = () => {
        console.log(`onShowed${key + 1}`)
      }
      this[`onClosed${key + 1}`] = () => {
        console.log(`onClosed${key + 1}`)
      }
    })
  
    this.backdrop = this.selectComponent('#dora-backdrop')
  },
  retain() {
    this.backdrop.retain()
    this.setData({
      zIndex: 1010,
      locks: this.backdrop.backdropHolds,
    })
  },
  release() {
    this.backdrop.release()
    this.setData({
      zIndex: this.backdrop.backdropHolds ? 1010 : 'unset',
      locks: this.backdrop.backdropHolds,
    })
  },
})
