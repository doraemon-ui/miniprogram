import { dialog } from '@doraemon-ui/miniprogram.dialog'
import { doraProp, doraQuote, dogShit } from '@doraemon-ui/miniprogram.demo-shared'

Page({
  data: {
    content5: dogShit('哆啦A梦生气了', 300, 3).split('\n'),
  },
  open () {
    dialog.open({
      title: '哆啦A梦常用道具',
      content: doraProp.medium(),
      buttonClosable: true,
      buttons: [{
        text: '哇嘎哒',
      }],
      onClose () {
        console.log('onClose')
      },
      onClosed () {
        console.log('onClosed')
      },
    }, '#dora-dialog-open')
  },
  alert () {
    dialog.alert({
      title: '哆啦A梦经典语录',
      content: doraQuote(),
    }, '#dora-dialog-alert')
  },
  confirm () {
    dialog.confirm({
      title: '任意门',
      content: '任意门经常会在使用时机正好坏掉/送修/摧毁吗？',
      closable: true,
      onConfirm (button, index) {
        console.log('onConfirm', button, index)
      },
      onCancel (button, index) {
        console.log('onCancel', button, index)
      },
    }, '#dora-dialog-confirm')
  },
  custom () {
    const hide = dialog.open({
      title: '四次元口袋',
      content: '机器人专用四次元空间内藏秘密道具收藏口袋',
      buttons: [{
        text: '哇嘎哒',
        onClick: () => {
          if (Math.random() > 0.5) {
            hide()
          } else {
            wx.showToast({ title: '再试一下', icon: 'none' })
          }
        },
      }],
    }, '#dora-dialog-custom')
  },
  getUserInfo () {
    const hide = dialog.open({
      title: '微信开放能力',
      content: '获取用户信息',
      buttons: [{
        text: '允许',
        openType: 'getUserInfo',
        onGetUserInfo (button, index, detail) {
          if (detail.errMsg === 'getUserInfo:ok') {
            hide()
            wx.showToast({ title: detail.errMsg, icon: 'none' })
          }
          console.log('onGetUserInfo', button, index, detail)
        },
      }],
    }, '#dora-dialog-getUserInfo')
  },
  getPhoneNumber () {
    const hide = dialog.open({
      title: '微信开放能力',
      content: '获取用户手机号',
      buttons: [{
        text: '允许',
        openType: 'getPhoneNumber',
        onGetPhoneNumber (button, index, detail) {
          if (detail.errMsg === 'getPhoneNumber:ok') {
            hide()
            wx.showToast({ title: detail.errMsg, icon: 'none' })
          }
          console.log('onGetPhoneNumber', button, index, detail)
        },
      }],
    }, '#dora-dialog-getPhoneNumber')
  },
  contact () {
    const hide = dialog.open({
      title: '微信开放能力',
      content: '打开客服会话',
      buttons: [{
        text: '允许',
        openType: 'contact',
        onContact (button, index, detail) {
          if (detail.errMsg === 'enterContact:ok') {
            hide()
            wx.showToast({ title: detail.errMsg, icon: 'none' })
          }
          console.log('contact', button, index, detail)
        },
      }],
    }, '#dora-dialog-contact')
  },
  openSetting () {
    const hide = dialog.open({
      title: '微信开放能力',
      content: '打开授权设置页',
      buttons: [{
        text: '允许',
        openType: 'openSetting',
        onOpenSetting (button, index, detail) {
          if (detail.errMsg === 'openSetting:ok') {
            hide()
            wx.showToast({ title: detail.errMsg, icon: 'none' })
          }
          console.log('onOpenSetting', button, index, detail)
        },
      }],
    }, '#dora-dialog-openSetting')
  },
  launchApp () {
    const hide = dialog.open({
      title: '微信开放能力',
      content: '打开 APP',
      buttons: [{
        text: '允许',
        openType: 'launchApp',
        appParameter: 'wechat',
        onLaunchApp (button, index, detail) {
          if (detail.errMsg === 'launchApp:ok') {
            hide()
            wx.showToast({ title: detail.errMsg, icon: 'none' })
          }
          console.log('onLaunchApp', button, index, detail)
        },
        onError (button, index, detail) {
          if (detail.errMsg) {
            wx.showToast({ title: detail.errMsg, icon: 'none' })
          }
          console.log('onError', button, index, detail)
        },
      }],
    }, '#dora-dialog-launchApp')
  },
  onLoad () {
    [...Array(6).keys()].forEach((key) => {
      this.setData({ [`visible${key + 1}`]: false })
      this[`onOpen${key + 1}`] = () => {
        console.log(`onOpen${key + 1}`)
        this.setData({ [`visible${key + 1}`]: true })
      }
      this[`onClose${key + 1}`] = () => {
        console.log(`onClose${key + 1}`)
        this.setData({ [`visible${key + 1}`]: false })
      }
      this[`onClosed${key + 1}`] = () => {
        console.log(`onClosed${key + 1}`)
      }
    })
  },
})
