import { toast } from '@doraemon-ui/miniprogram.toast'
import { doraProp } from '@doraemon-ui/miniprogram.demo-shared'

Page({
  show () {
    toast.show({
      text: doraProp.high(),
    }, '#dora-toast-show')
  },
  success () {
    toast.success({
      text: '成功',
    }, '#dora-toast-success')
  },
  error () {
    toast.error({
      text: '失败',
    }, '#dora-toast-error')
  },
  warning () {
    toast.warning({
      text: '警告',
    }, '#dora-toast-warning')
  },
  loading () {
    toast.loading({
      text: '加载中...',
    }, '#dora-toast-loading')
  },
  top () {
    toast.show({
      position: 'top',
      text: doraProp.high(),
    }, '#dora-toast-top')
  },
  bottom () {
    toast.show({
      position: 'bottom',
      text: doraProp.high(),
    }, '#dora-toast-bottom')
  },
  image () {
    toast.show({
      image: 'http://cdn.skyvow.cn/ilove/static/qq_mini_qrcode.jpg',
      text: 'iLove恋爱小事',
    }, '#dora-toast-image')
  },
  mask () {
    toast.show({
      maskClickable: false,
      text: '请耐心等待, 不要退出',
    }, '#dora-toast-mask')
  },
  custom () {
    toast.show({
      icon: 'alert-circle-outline',
      text: 'custom',
    }, '#dora-toast-custom')
  },
  noclear () {
    toast.show({
      position: 'top',
      duration: 0,
      text: '这条提示不会自动消失',
    }, '#dora-toast-noclear')
  },
  clear () {
    toast.clear()
  },
})
