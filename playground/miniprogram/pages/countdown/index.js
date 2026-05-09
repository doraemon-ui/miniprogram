import CountDown from '@doraemon-ui/miniprogram.countdown'

Page({
  data: {
    c1: '',
    c2: '',
    c3: '',
  },

  onLoad() {
    this.c1 = new CountDown(
      {
        date: 'June 7, 2087 15:03:25',
        render(date) {
          const years = this.leadingZeros(date.years, 4) + ' 年 '
          const days = this.leadingZeros(date.days, 3) + ' 天 '
          const hours = this.leadingZeros(date.hours, 2) + ' 时 '
          const min = this.leadingZeros(date.min, 2) + ' 分 '
          const sec = this.leadingZeros(date.sec, 2) + ' 秒 '

          this.setData({
            c1: years + days + hours + min + sec,
          })
        },
      },
      this,
    )

    this.c3 = new CountDown(
      {
        date: Date.now() + 60000 * 20,
        render(date) {
          const min = this.leadingZeros(date.min, 2) + ' 分 '
          const sec = this.leadingZeros(date.sec, 2) + ' 秒 '

          this.setData({
            c3: min + sec,
          })
        },
      },
      this,
    )
  },

  vcode() {
    if (this.c2 && this.c2.interval) return false
    this.c2 = new CountDown(
      {
        date: Date.now() + 60000,
        onEnd() {
          this.setData({
            c2: '重新获取验证码',
          })
        },
        render(date) {
          const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
          if (date.sec !== 0) {
            this.setData({
              c2: sec,
            })
          }
        },
      },
      this,
    )
    return true
  },

  stop() {
    if (this.c3) this.c3.stop()
  },

  start() {
    if (this.c3) this.c3.start()
  },

  update() {
    if (this.c3) this.c3.update(Date.now() + 60000 * 30)
  },

  onUnload() {
    if (this.c1) this.c1.stop()
    if (this.c2) this.c2.stop()
    if (this.c3) this.c3.stop()
  },
})
