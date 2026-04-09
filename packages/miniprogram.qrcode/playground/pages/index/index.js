const ratio = wx.getSystemInfoSync().pixelRatio

Page({
  data: {
    value: 'https://github.com/wux-weapp/wux-weapp',
    fgColor: 'black',
    whiteSpace: 10,
    qrcodeStatus: 'expired',
  },
  onChange(e) {
    this.setData({
      value: e.detail.value,
      fgColor: this.randomColor(),
    })
  },
  onSliderChange(e) {
    const whiteSpace = e.detail.value[0]
    if (this.data.whiteSpace !== whiteSpace) {
      this.setData({ whiteSpace })
    }
  },
  qrcodeLoad() {},
  qrcodeError() {},
  onRefresh() {
    this.setData({ qrcodeStatus: 'loading' })
    setTimeout(() => {
      if (Math.random() > 0.5) {
        this.setData({
          qrcodeStatus: 'activated',
          value: 'https://www.wuxui.com',
        })
      } else {
        this.setData({ qrcodeStatus: 'expired' })
      }
    }, 1500)
  },
  async previewImage() {
    const that = this.selectComponent('#qrcode')
    const canvas = await that.getCanvasNode()
    wx.canvasToTempFilePath(
      {
        canvas,
        destWidth: 200 * ratio,
        destHeight: 200 * ratio,
        success: (res) => {
          wx.previewImage({ urls: [res.tempFilePath] })
        },
      },
      that,
    )
  },
  async downloadQRCode() {
    const that = this.selectComponent('#qrcode')
    const canvas = await that.getCanvasNode()
    wx.canvasToTempFilePath(
      {
        canvas,
        destWidth: 200 * ratio,
        destHeight: 200 * ratio,
        success: (res) => {
          wx.saveImageToPhotosAlbum({ filePath: res.tempFilePath })
        },
      },
      that,
    )
  },
  randomColor() {
    const colorStr = Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .toUpperCase()
    const prefixStr = '000000'.substring(0, 6 - colorStr.length)
    return `#${prefixStr}${colorStr}`
  },
})
