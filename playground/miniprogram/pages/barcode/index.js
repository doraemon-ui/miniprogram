Page({
  data: {
    number: '9787115335524',
    options: {
      // number: true,
      // prefix: true,
      // color: 'black',
      // debug: false,
    },
  },
  onChange(e) {
    this.setData({
      number: e.detail.value,
    })
  },
  onValid() {
    console.log('onValid')
  },
  onInvalid() {
    console.log('onInvalid')
  },
  onSuccess(e) {
    console.log('onSuccess', e)
  },
  onError() {
    console.log('onError')
  },
  onLoad(e) {
    console.log('onLoad', e)
  },
})
