import components from './components'

Page({
  data: {
    components,
  },
  onShareAppMessage() {
    return {
      title: '一套组件化、可复用、易扩展的微信小程序 UI 组件库',
    }
  },
})
