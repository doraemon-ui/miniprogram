Page({
  data: {
    value1: [],
    displayValue1: '请选择',
    value2: [],
    displayValue2: '请选择',
    value3: [],
    displayValue3: '请选择',
    value4: [],
    displayValue4: '请选择',
  },
  getCalendar() {
    return this.selectComponent('#dora-calendar')
  },
  openCalendar1() {
    this.getCalendar().open({
      value: this.data.value1,
      onChange: (_values, displayValues) => {
        this.setData({
          value1: displayValues,
          displayValue1: displayValues.join(','),
        })
      },
    })
  },
  openCalendar2() {
    this.getCalendar().open({
      value: this.data.value2,
      multiple: true,
      onChange: (_values, displayValues) => {
        this.setData({
          value2: displayValues,
          displayValue2: displayValues.join(','),
        })
      },
    })
  },
  openCalendar3() {
    this.getCalendar().open({
      value: this.data.value3,
      direction: 'vertical',
      onChange: (_values, displayValues) => {
        this.setData({
          value3: displayValues,
          displayValue3: displayValues.join(','),
        })
      },
    })
  },
  openCalendar4() {
    const now = new Date()
    const minDate = now.getTime()
    const maxDate = now.setDate(now.getDate() + 7)

    this.getCalendar().open({
      value: this.data.value4,
      minDate,
      maxDate,
      onChange: (_values, displayValues) => {
        this.setData({
          value4: displayValues,
          displayValue4: displayValues.join(','),
        })
      },
    })
  },
})
