function getDateString(date = new Date()) {
  return {
    year: `${date.getFullYear()}`,
    month: `${date.getMonth()}`,
    day: `${date.getDate()}`,
    hour: `${date.getHours()}`,
    minute: `${date.getMinutes()}`,
  }
}

const { year, month, day, hour, minute } = getDateString()

Page({
  data: {
    value1: [year, month, day, hour, minute],
    value2: [year, month, day],
    value5: [hour, minute],
    value10: ['2029', '0', '1', '0', '0'],
    displayValue1: '请选择',
    displayValue2: '请选择',
    displayValue5: '请选择',
    displayValue10: '请选择',
    lang: 'zh_CN',
    visible: false,
  },
  onChange(e) {
    const { key, values } = e.detail
    this.setData({ lang: values[key] })
  },
  setValue(values, key) {
    this.setData({
      [`value${key}`]: !values.tillNow ? values.value : { tillNow: true },
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm(e) {
    this.setValue(e.detail, e.currentTarget.dataset.index)
  },
  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },
  onClick() {
    this.setData({ visible: true })
  },
})
