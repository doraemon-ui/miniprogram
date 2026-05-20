import { gallery } from '@doraemon-ui/miniprogram.gallery'

Page({
  data: {
    urls: [
      'https://tempim-1256796114.cos.ap-shanghai.myqcloud.com/375x667',
      'https://tempim-1256796114.cos.ap-shanghai.myqcloud.com/375x667',
      'https://tempim-1256796114.cos.ap-shanghai.myqcloud.com/375x667',
      'https://tempim-1256796114.cos.ap-shanghai.myqcloud.com/375x667',
    ],
  },
  previewImage(e) {
    const { current } = e.currentTarget.dataset
    const { urls } = this.data
    wx.previewImage({
      current,
      urls,
    })
  },
  show() {
    const galleryInstance = gallery.show(
      {
        current: 0,
        urls: this.data.urls,
        onDelete: (index, currentUrls) => {
          currentUrls.splice(index, 1)
          this.setData({
            urls: currentUrls,
          })
          return true
        },
        onCancel() {
          console.log('Close gallery')
        },
        onClick(index, currentUrls) {
          console.log('onClick:', index, currentUrls)
          return false
        },
        onChange(detail) {
          console.log('onChange:', detail)
        },
      },
      '#dora-gallery-show',
    )
  },
  onLoad() {
    ;[...Array(6).keys()].forEach((key) => {
      this.setData({ [`visible${key + 1}`]: false })
      this[`onShow${key + 1}`] = () => {
        console.log(`onShow${key + 1}`)
        this.setData({ [`visible${key + 1}`]: true })
      }
      this[`onClose${key + 1}`] = () => {
        console.log(`onClose${key + 1}`)
        this.setData({ [`visible${key + 1}`]: false })
      }
      this[`onClosed${key + 1}`] = () => {
        console.log(`onClosed${key + 1}`)
      }
    })
  },
})
