Page({
  data: {
    fileList: [
      { uid: 0, status: 'uploading', url: 'http://cdn.skyvow.cn/qrcode.jpg' },
      { uid: 1, status: 'done', url: 'http://cdn.skyvow.cn/qrcode.jpg' },
      { uid: 2, status: 'error', url: 'http://cdn.skyvow.cn/qrcode.jpg' },
    ],
    progress: 0,
    imageUrl: '',
  },

  onChange(e) {
    const { file, fileList } = e.detail || {}
    if (file?.status === 'uploading') {
      this.setData({ progress: 0 })
    } else if (file?.status === 'done') {
      this.setData({ imageUrl: file.url || '' })
    }
    this.setData({ fileList: fileList || [] })
  },

  onSuccess() {},
  onFail() {},
  onComplete() {},

  onProgress(e) {
    this.setData({
      progress: e.detail?.file?.progress || 0,
    })
  },

  onPreview(e) {
    const { file, fileList } = e.detail || {}
    wx.previewImage({
      current: file?.url || '',
      urls: (fileList || []).map((n) => n.url),
    })
  },
})
