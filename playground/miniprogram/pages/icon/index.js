import { icons } from './icons'

const iconSize = icons.reduce((acc, cur) => (acc += cur.icons.length), 0)

Page({
  data: {
    icons,
    iconSize,
  },
  onIconClick(e) {
    const { font, icon } = e.currentTarget.dataset
    const data = `<dora-icon prefixCls="${font}" type="${icon}" />`
    console.log('code: ', data)
    wx.setClipboardData({
      data,
      success() {
        wx.showToast({
          title: '已复制到剪切板',
          icon: 'none',
        })
      },
    })
  },
  onSearchInput(e) {
    const { value } = e.detail
    const keyword = value.trim().toLowerCase()

    if (!keyword) {
      this.setData({
        icons,
      })
      return
    }

    const filteredIcons = icons
      .map((group) => ({
        ...group,
        icons: group.icons.filter((icon) => icon.toLowerCase().includes(keyword)),
      }))
      .filter((group) => group.icons.length > 0)

    this.setData({
      icons: filteredIcons,
    })
  },
})
