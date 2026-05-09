const options = [
  ['王', '马', '蔡'],
  ['撕葱', '粑粑', '🏀'],
]

const fieldNamesOptions = [
  [
    { labelT: '选项一', valueT: '1' },
    { labelT: '选项二', valueT: '2' },
    { labelT: '选项三', valueT: '3', disabledT: true },
  ],
  [
    { labelT: '选项A', valueT: 'A' },
    { labelT: '选项B', valueT: 'B' },
    { labelT: '选项C', valueT: 'C', disabledT: true },
  ],
]

const imageOptions = [
  ['周一', '周二', '周三', '周四', '周五'],
  [
    {
      label: '白天',
      labelImage: 'https://raw.githubusercontent.com/wux-weapp/wux-weapp/master/example/assets/images/daytime.png',
      value: 'daytime',
    },
    {
      label: '夜晚',
      labelImage: 'https://raw.githubusercontent.com/wux-weapp/wux-weapp/master/example/assets/images/night.png',
      value: 'night',
    },
  ],
]

Page({
  data: {
    value: ['蔡', '🏀'],
    options,
    fieldNames: {
      label: 'labelT',
      value: 'valueT',
      disabled: 'disabledT',
    },
    fieldNamesOptions,
    imageOptions,
  },
  onValueChange(e) {
    this.setData({ value: e.detail.value })
  },
})
