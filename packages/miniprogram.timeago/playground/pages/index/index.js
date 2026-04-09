Page({
  data: {
    to: null,
    lang: 'zh_CN',
    langs: ['zh_CN', 'zh_TW', 'en'],
  },

  onLoad() {
    this.setData({
      to: new Date().getTime(),
    })
  },

  onChange(e) {
    const { key, values } = e.detail || {}
    const lang = values?.[key] || 'zh_CN'
    this.setData({ lang })
  },
})
