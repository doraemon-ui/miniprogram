Page({
  data: {
    wrapStyle: {
      '--font-size': '17px',
      '--header-font-size': '15px',
      '--header-width': 'auto',
      '--thumb-size': '25px',
    },
  },
  onContact(e) {
    console.log('onContact', e)
  },
  onGetUserInfo(e) {
    console.log('onGetUserInfo', e)
  },
  onGotPhoneNumber(e) {
    console.log('onGotPhoneNumber', e)
  },
  onGetRealtimePhoneNumber(e) {
    console.log('onGetRealtimePhoneNumber', e)
  },
  onChooseAvatar(e) {
    console.log('onChooseAvatar', e)
  },
  onAgreePrivacyAuthorization(e) {
    console.log('onAgreePrivacyAuthorization', e)
  },
  onLaunchApp(e) {
    console.log('onLaunchApp', e)
  },
  onOpenSetting(e) {
    console.log('onOpenSetting', e)
  },
  onError(e) {
    console.log('onError', e)
  },
})
