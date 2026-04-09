import { $startWuxRefresher, $stopWuxRefresher, $stopWuxLoader } from '@doraemon-ui/miniprogram.refresher/index'

const getList = (count = 10, step = 0) => [...new Array(count)].map((_, i) => ({ title: `Pull down ${i + step}`, content: 'Doraemon UI' }))

Page({
  data: {
    items: [],
    count: 0,
    scrollTop: 0,
  },
  onLoad() {
    $startWuxRefresher()
  },
  onPageScroll(e) {
    this.setData({ scrollTop: e.scrollTop })
  },
  onPulling() {
    console.log('onPulling')
  },
  onRefresh() {
    this.setData({ count: 10 })
    setTimeout(() => {
      this.setData({ items: getList() })
      $stopWuxRefresher()
    }, 800)
  },
  onLoadmore() {
    setTimeout(() => {
      this.setData({
        items: [...this.data.items, ...getList(10, this.data.count)],
        count: this.data.count + 10,
      })
      if (this.data.items.length < 30) {
        $stopWuxLoader()
      } else {
        $stopWuxLoader('#dora-refresher', this, true)
      }
    }, 800)
  },
})
