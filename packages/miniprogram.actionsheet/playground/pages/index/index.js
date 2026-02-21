Page({
  data: {
    visible1: false,
    visible2: false,
    buttons: [{ text: '选项一' }, { text: '选项二' }, { text: '选项三' }],
  },
  showIos() {
    this.setData({ visible1: true })
  },
  showWx() {
    this.setData({ visible2: true })
  },
  onCancel() {
    this.setData({ visible1: false, visible2: false })
  },
  onAction(e) {
    console.log('action', e.detail)
    this.setData({ visible1: false, visible2: false })
  },
})
