Page({
  onChange(e) {
    // eslint-disable-next-line no-console
    console.log(`验证码：${e.detail?.value || ''}`)
  },
  onClick() {
    const canvas = this.selectComponent('#custom-canvas')
    if (canvas && typeof canvas.draw === 'function') canvas.draw()
  },
})
