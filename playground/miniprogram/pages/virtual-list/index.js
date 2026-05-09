let itemCount = 100
let items = [...new Array(itemCount)].map((_v, i) => i)

Page({
  data: {
    disableScroll: false,
    height: 300,
    itemHeight: 50,
    itemBuffer: 30,
    scrollToIndex: 0,
    scrollWithAnimation: false,
    virtual: { items: [] },
  },
  onLoad() {
    this.refresh()
  },
  refresh() {
    this.virtualList = this.virtualList || this.selectComponent('#dora-virtual-list')
    this.virtualList?.render(items)
  },
  onChange(e) {
    this.setData({ virtual: e.detail.virtual || { items: [] } })
  },
  onScrollToLower() {
    if (itemCount >= 300 || this.data.disableScroll) return
    this.setData({ disableScroll: true })
    setTimeout(() => {
      itemCount += 100
      items = [...new Array(itemCount)].map((_v, i) => i)
      this.refresh()
      this.setData({ disableScroll: false })
    }, 300)
  },
})
