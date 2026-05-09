Page({
  data: {
    value1: '1',
    value2: '1',
    value3: '1',
    value4: '1',
    value5: '1',
    value6: '1',
    thumb: 'http://cdn.skyvow.cn/logo.png',
    options: [
      { title: 'Java', value: '1' },
      { title: 'PHP', value: '2' },
    ],
  },
  onChange(field, e) {
    this.setData({
      [field]: e.detail.value,
    })
    console.log('radio change', field, e.detail)
  },
  onChange1(e) {
    this.onChange('value1', e)
  },
  onChange2(e) {
    this.onChange('value2', e)
  },
  onChange3(e) {
    this.onChange('value3', e)
  },
  onChange4(e) {
    this.onChange('value4', e)
  },
  onChange5(e) {
    this.onChange('value5', e)
  },
  onItemClick(e) {
    const { value } = e.currentTarget.dataset
    if (this.data.value6 !== value) {
      this.setData({
        value6: value,
      })
    }
  },
  formSubmit(e) {
    console.log('form submit', e.detail.value)
  },
})
