const options = [
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
    children: [{ value: '330100', label: '杭州市', children: [{ value: '330106', label: '西湖区' }] }],
  },
]

const seasons = [
  ['王', '马', '蔡'],
  ['撕葱', '粑粑', '🏀'],
]

Page({
  data: {
    value1: ['320000', '320800', '320831'],
    value2: [],
    value3: [],
    options,
    seasons,
    visible: false,
    displayValue1: '请选择',
    displayValue2: '请选择',
    displayValue3: '请选择',
  },
  setValue(values, key) {
    this.setData({
      [`value${key}`]: values.value,
      [`displayValue${key}`]: values.label,
    })
  },
  onConfirm(e) {
    this.setValue(e.detail, e.currentTarget.dataset.index)
  },
  onValueChange() {},
  onVisibleChange(e) {
    this.setData({ visible: e.detail.visible })
  },
  onClick() {
    this.setData({ visible: true })
  },
})
