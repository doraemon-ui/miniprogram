const seasons = [
  ['王', '马', '蔡'],
  ['撕葱', '粑粑', '🏀'],
]

const fieldNamesOptions = [
  { labelT: '选项一', valueT: '1' },
  { labelT: '选项二', valueT: '2' },
  { labelT: '选项三', valueT: '3', disabledT: true },
]

const imageOptions = [
  { label: '白天', labelImage: '../../assets/images/daytime.png', value: 'daytime' },
  { label: '夜晚', labelImage: '../../assets/images/night.png', value: 'night' },
]

Page({
  data: {
    value: '🏀',
    options: seasons,
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
