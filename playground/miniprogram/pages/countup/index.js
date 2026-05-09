import CountUp from '@doraemon-ui/miniprogram.countup'

Page({
  data: {
    c1: '',
    c2: '',
    c3: '',
  },

  onLoad() {
    this.c1 = new CountUp(
      1,
      1024,
      0,
      2,
      {
        printValue(value) {
          this.setData({
            c1: value,
          })
        },
      },
      this,
    )

    this.c2 = new CountUp(
      0,
      88.88,
      2,
      2,
      {
        printValue(value) {
          this.setData({
            c2: value,
          })
        },
      },
      this,
    )

    this.c3 = new CountUp(
      0,
      520,
      0,
      2,
      {
        printValue(value) {
          this.setData({
            c3: value,
          })
        },
      },
      this,
    )

    this.c1.start()
    this.c2.start()
  },

  start() {
    if (!this.c3) return
    this.c3.start(() => {
      wx.showToast({
        title: '已完成',
        icon: 'none',
      })
    })
  },

  reset() {
    if (this.c3) this.c3.reset()
  },

  update() {
    if (this.c3) this.c3.update(1314)
  },

  pauseResume() {
    if (this.c3) this.c3.pauseResume()
  },

  onUnload() {
    const stop = (cu) => {
      if (cu && typeof cu.cancelAnimationFrame === 'function') {
        cu.cancelAnimationFrame(cu.rAF || null)
      }
    }
    stop(this.c1)
    stop(this.c2)
    stop(this.c3)
  },
})
