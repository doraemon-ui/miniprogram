Page({
  data: {},

  getNotification() {
    return this.selectComponent('#dora-notification')
  },

  showNotification() {
    const notification = this.getNotification()
    if (!notification) return

    this.closeNotificationHandle = notification.show({
      image: 'http://cdn.skyvow.cn/logo.png',
      title: '宝宝',
      text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
      data: {
        message: '逗你玩的!!!',
      },
      duration: 3000,
      onClick(data) {
        console.log(data)
      },
      onClose(data) {
        console.log(data)
      },
    })
  },

  closeNotification() {
    if (this.closeNotificationHandle) {
      this.closeNotificationHandle()
    }
  },

  showNotificationReturn() {
    if (this.timeout) clearTimeout(this.timeout)

    const notification = this.getNotification()
    if (!notification) return

    const hide = notification.show({
      image: 'http://cdn.skyvow.cn/logo.png',
      title: '宝宝',
      text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
      data: {
        message: '逗你玩的!!!',
      },
      duration: 3000,
    })

    this.timeout = setTimeout(hide, 1000)
  },

  showNotificationPromise() {
    const notification = this.getNotification()
    if (!notification) return

    const hide = notification.show({
      image: 'http://cdn.skyvow.cn/logo.png',
      title: '宝宝',
      text: '嘤嘤嘤，人家拿小拳拳捶你胸口!!!',
      data: {
        message: '逗你玩的!!!',
      },
      duration: 3000,
    })

    hide.then(() => console.log('success'))
  },
})
