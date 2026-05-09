Page({
  data: {
    value1: true,
    value2: false,
    value3: true,
    value4: true,
    value5: false,
    value6: false,
    value7: false,
    loading: false,
  },
  onChange(field, e) {
    this.setData({ [field]: e.detail.value })
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
  onChange6(e) {
    this.onChange('value6', e)
  },
  onChange7(e) {
    this.setData({ loading: true })
    setTimeout(() => {
      this.setData({ loading: false })
      this.onChange('value7', e)
    }, 800)
  },
})
