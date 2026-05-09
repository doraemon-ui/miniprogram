const fieldNamesOptions = [
  {
    labelT: '选项一',
    valueT: '1',
    childrenT: [
      {
        labelT: '选项一(1)',
        valueT: '11',
      },
    ],
  },
  {
    labelT: '选项二',
    valueT: '2',
    childrenT: [
      {
        labelT: '选项二(2)',
        valueT: '22',
      },
    ],
  },
  {
    labelT: '选项三',
    valueT: '3',
    disabledT: true,
  },
]

const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{ value: 'xihu', label: 'West Lake' }],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{ value: 'nanjing', label: 'Nanjing' }],
  },
]

Page({
  data: {
    fieldNames: {
      label: 'labelT',
      value: 'valueT',
      disabled: 'disabledT',
      children: 'childrenT',
    },
    fieldNamesOptions,

    visible1: false,
    options1: options,
    value1: ['zhejiang', 'hangzhou', 'xihu'],
    title1: '请选择',

    visible2: false,
    options2: [
      { value: 'beijing', label: '北京', isLeaf: false },
      { value: 'hangzhou', label: '杭州', isLeaf: false },
    ],
    value2: [],
    title2: '请选择',

    visible3: false,
    options3: options,
    value3: [],
    title3: '请选择',

    visible4: false,
    value4: [],
    title4: '请选择',
  },

  onOpen1() {
    this.setData({ visible1: true })
  },
  onClose1() {
    this.setData({ visible1: false })
  },
  onChange1(e) {
    // eslint-disable-next-line no-console
    console.log('onChange1', e.detail)
  },
  onConfirm1(e) {
    this.setData({ title1: (e.detail.options || []).map((n) => n.label).join('/') || '请选择' })
  },

  onOpen2() {
    this.setData({ visible2: true })
  },
  onClose2() {
    this.setData({ visible2: false })
  },
  onChange2(e) {
    const { value, options, done } = e.detail
    this.setData({ value2: value, title2: done ? (options || []).map((n) => n.label).join('/') : '请选择' })
  },
  onLoadOptions(e) {
    const { value } = e.detail
    const options2 = [...this.data.options2]

    wx.showLoading({ mask: true })

    setTimeout(() => {
      if (value[value.length - 1] === 'beijing') {
        options2.forEach((n) => {
          if (n.value === 'beijing') {
            n.children = [
              { value: 'baidu', label: '百度' },
              { value: 'sina', label: '新浪' },
            ]
          }
        })
      } else if (value[value.length - 1] === 'hangzhou') {
        options2.forEach((n) => {
          if (n.value === 'hangzhou') {
            n.children = [
              { value: 'ali', label: '阿里巴巴' },
              { value: '163', label: '网易' },
            ]
          }
        })
      }

      wx.hideLoading()
      this.setData({ value2: value, options2 })
    }, 800)
  },

  onOpen3() {
    this.setData({ visible3: true })
  },
  onClose3() {
    this.setData({ visible3: false })
  },
  onChange3(e) {
    // eslint-disable-next-line no-console
    console.log('onChange3', e.detail)
  },
  onConfirm3(e) {
    this.setData({ value3: e.detail.value, title3: (e.detail.options || []).map((n) => n.label).join('/') || '请选择' })
  },
  onTabsChange3(e) {
    // eslint-disable-next-line no-console
    console.log('onTabsChange3', e.detail)
  },

  onOpen4() {
    this.setData({ visible4: true })
  },
  onClose4() {
    this.setData({ visible4: false })
  },
  onChange4(e) {
    // eslint-disable-next-line no-console
    console.log('onChange4', e.detail)
  },
  onConfirm4(e) {
    this.setData({ title4: (e.detail.options || []).map((n) => n.labelT).join('/') || '请选择' })
  },
})
