import { $wuxKeyBoard } from '@doraemon-ui/miniprogram.keyboard/index'

Page({
  onLoad() {
    this.timeout = null
  },
  onUnload() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  },
  open() {
    $wuxKeyBoard().show({
      callback(value) {
        console.log(`输入的密码是：${value}`)
        return true
      },
    })
  },
  openWitdhDisorder() {
    $wuxKeyBoard().show({
      disorder: true,
      callback(value) {
        console.log(`输入的密码是：${value}`)
        return false
      },
    })
  },
  openWithPromiseCallback() {
    $wuxKeyBoard().show({
      callback(value) {
        console.log(`输入的密码是：${value}`)
        wx.showLoading({ title: '验证支付密码' })
        return new Promise((resolve) => {
          setTimeout(() => {
            wx.hideLoading()
            wx.showToast({
              title: '模拟服务端验证成功',
              duration: 1500,
            })
            resolve(true)
          }, 1000)
        })
      },
    })
  },
  openPlain() {
    const fn = (title) => {
      wx.hideLoading()
      wx.showToast({
        title,
        duration: 2000,
      })
    }

    $wuxKeyBoard().show({
      className: 'className',
      titleText: '安全键盘',
      cancelText: '取消',
      inputText: '输入数字密码',
      showCancel: true,
      disorder: false,
      maxlength: 4,
      closeOnReject: false,
      callback(value) {
        console.log(`输入的密码是：${value}`)
        wx.showLoading({ title: '验证支付密码' })
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.ceil(Math.random() * 10) >= 6) {
              resolve(fn('密码正确'))
            } else {
              reject(fn('密码错误'))
            }
          }, 1000)
        })
      },
    })
  },
  openTimed() {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }
    const hide = $wuxKeyBoard().show({
      password: false,
      maxlength: -1,
      onChange(value) {
        console.log(`输入的内容是：${value}`)
      },
      onClose() {
        return false
      },
    })

    this.timeout = setTimeout(hide, 3000)
  },
})
