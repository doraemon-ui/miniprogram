import { $wuxLoading } from '@doraemon-ui/miniprogram.loading/index'

Page({
  showLoading() {
    this.$wuxLoading = $wuxLoading()
    this.$wuxLoading.show({
      text: '数据加载中',
    })
    setTimeout(() => {
      this.$wuxLoading.hide()
    }, 1500)
  },
})
