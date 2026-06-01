import { notification } from '@doraemon-ui/miniprogram.notification'

Page({
  data: {
    declarativeData: {
      message: '逗你玩的!!!',
    },
  },
  showNotification() {
    this.closeNotificationHandle = notification.show(
      {
        image: 'http://cdn.skyvow.cn/logo.png',
        title: '这是一个标题',
        text: '这是一条简单的通知消息',
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
      },
      '#dora-notification',
      this,
    )
  },
  closeNotification() {
    this.closeNotificationHandle?.()
  },
  showNotificationReturn() {
    if (this.timeout) clearTimeout(this.timeout)

    const hide = notification.show(
      {
        image: 'http://cdn.skyvow.cn/logo.png',
        title: '这是一个标题',
        text: '这是一条简单的通知消息',
        data: {
          message: '逗你玩的!!!',
        },
        duration: 3000,
      },
      '#dora-notification',
      this,
    )

    this.timeout = setTimeout(hide, 1000)
  },
  showNotificationPromise() {
    const hide = notification.show(
      {
        image: 'http://cdn.skyvow.cn/logo.png',
        title: '这是一个标题',
        text: '这是一条简单的通知消息',
        data: {
          message: '逗你玩的!!!',
        },
        duration: 3000,
      },
      '#dora-notification',
      this,
    )

    hide.then(() => console.log('success'))
  },
  onLoad() {
    ;[...Array(6).keys()].forEach((key) => {
      this.setData({ [`visible${key + 1}`]: false })
      this[`onShow${key + 1}`] = () => {
        console.log(`onShow${key + 1}`)
        this.setData({ [`visible${key + 1}`]: true })
      }
      this[`onClose${key + 1}`] = () => {
        console.log(`onClose${key + 1}`)
        this.setData({ [`visible${key + 1}`]: false })
      }
      this[`onClosed${key + 1}`] = () => {
        console.log(`onClosed${key + 1}`)
      }
      this[`onNotificationClick${key + 1}`] = () => {
        console.log(`onNotificationClick${key + 1}`)
      }
    })
  },
})
