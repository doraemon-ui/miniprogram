const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
  { label: '选项三', value: '3' },
]

Page({
  data: {
    options,
    stringOptions: options.map((option) => option.label),
    value1: ['选项一'],
    value2: ['1'],
    value3: ['2', '3'],
    value4: ['3'],
  },
  onChange(e) {
    this.setData({ value4: e.detail.value })
  },
})
