import { a } from '@doraemon-ui/miniprogram.accordion'

import components from './components'

Page({
  data: {
    components,
  },
  onShareAppMessage() {
    return {
      title: '1一套组件化、可复用、易扩展的微信小程序 UI 组件库',
    }
  },
  onLoad() {
    console.log('====', a)
  },
})
