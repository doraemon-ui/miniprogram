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

const cityOptions = [
  {
    value: '320000',
    label: '江苏省',
    children: [
      {
        value: '320800',
        label: '淮安市',
        children: [
          { value: '320831', label: '金湖县' },
          { value: '320830', label: '盱眙县' },
        ],
      },
    ],
  },
  {
    value: '330000',
    label: '浙江省',
    children: [
      {
        value: '330100',
        label: '杭州市',
        children: [{ value: '330106', label: '西湖区' }],
      },
    ],
  },
]

Page({
  data: {
    checkbox: ['1'],
    radio: '1',
    switch: true,
    picker: [],
    datePicker: [],
    popupSelect: '',
    options1: cityOptions,
    options2: ['顺丰速运', '中通快递', '圆通快递', '申通快递', '韵达快递', '京东物流'],
    layout: 'horizontal',
    validateMessages: {
      required: '%s 字段为必填',
    },
    confirmDirty: false,
    checkEmail: false,
  },

  getForm() {
    return this.selectComponent('#dora-form')
  },

  onSegmentedControlChange(e) {
    const { key, values } = e.detail
    this.setData({
      layout: values[key],
    })
  },

  onCheckboxChange(e) {
    this.setData({ checkbox: e.detail.value })
  },

  onRadioChange(e) {
    this.setData({ radio: e.detail.value })
  },

  onSwitchChange(e) {
    this.setData({ switch: e.detail.value })
  },

  onPickerChange(e) {
    this.setData({ picker: e.detail.value, pickerLabel: e.detail.label })
  },

  onDatePickerChange(e) {
    this.setData({ datePicker: e.detail.value, datePickerLabel: e.detail.label })
  },

  onArrowClick() {
    const form = this.getForm()
    if (form) {
      form.setFieldsValue({ datePicker: [] })
    }
    this.setValues({ datePicker: [] }, true)
  },

  onPopupSelectChange(e) {
    this.setData({ popupSelect: e.detail.value, popupSelectLabel: e.detail.label })
  },

  onSelectableChange(e) {
    this.setData({ checkEmail: e.detail.checked }, () => {
      const form = this.getForm()
      if (form) {
        form.validateFields(['email'], { force: true })
      }
    })
  },

  onSubmit() {
    const form = this.getForm()
    if (!form) return
    form.validateFields().then((values) => {
      wx.showModal({
        content: JSON.stringify(values, null, 2),
        showCancel: false,
      })
    }).catch(() => {})
  },

  onValuesChange(e) {
    const { changedValues } = e.detail
    this.setValues(changedValues)
  },

  onFieldsChange(e) {
    console.log('onFieldsChange', e.detail)
  },

  onReset() {
    const form = this.getForm()
    if (!form) return
    form.resetFields()
    const values = form.getFieldsValue()
    this.setValues({ ...(values || {}), checkEmail: false }, true)
  },

  onFill() {
    const form = this.getForm()
    if (form) {
      form.setFieldsValue({
        code: this.data.codeMSG || '1234',
      })
    }
  },

  setValues(changedValues, clearLabel = false) {
    Object.keys(changedValues).forEach((field) => {
      this.setData(
        clearLabel
          ? {
            [field]: changedValues[field],
            [`${field}Label`]: null,
          }
          : {
            [field]: changedValues[field],
          },
      )
    })
  },

  onSendCode() {
    const numberString = '0123456789'
    const randomNum = (min, max) => Math.floor(Math.random() * (max - min) + min)
    const codeMSG = [...new Array(4)].map(() => numberString[randomNum(0, numberString.length)]).join('')

    this.setData({ codeMSG })
    wx.showModal({
      content: `【Doraemon UI】验证码：${codeMSG}，有效期10分钟，请勿泄露。`,
      showCancel: false,
    })
  },

  checkCode(_rule, value) {
    if (!value) {
      return Promise.reject(new Error('验证码不能为空!'))
    }
    if (this.data.codeMSG && value === this.data.codeMSG) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('验证码输入错误!'))
  },

  validateToNextPassword(_rule, value, callback) {
    if (value && this.data.confirmDirty) {
      const form = this.getForm()
      if (form) {
        form.validateFields(['confirm'], { force: true })
      }
    }
    callback()
  },

  compareToFirstPassword(_rule, value, callback) {
    const form = this.getForm()
    if (value && form && value !== form.getFieldValue('password')) {
      callback('您输入的两个密码不一致！')
    } else {
      callback()
    }
  },

  handleConfirmBlur(e) {
    const { value } = e.detail
    this.setData({ confirmDirty: this.data.confirmDirty || !!value })
  },
})
