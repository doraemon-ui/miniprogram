Page({
  data: {
    value: 'a',
    values: ['a'],
    options: [
      { title: '选项 A', value: 'a' },
      { title: '选项 B', value: 'b' },
      { title: '选项 C', value: 'c' },
    ],
  },
  onValueChange(e) {
    this.setData({ value: e.detail.value })
  },
  onValuesChange(e) {
    this.setData({ values: e.detail.value })
  },
})
