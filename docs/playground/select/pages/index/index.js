const options1 = ['法官', '医生', '猎人', '学生', '记者', '其他']
const options2 = [
  { title: 'iPhone 3GS', value: '001' },
  { title: 'iPhone 5', value: '002' },
  { title: 'iPhone 5S', value: '003' },
  { title: 'iPhone 6', value: '004' },
  { title: 'iPhone 7', value: '009' },
]

Page({
  data: {
    value1: '',
    value2: [],
    displayValue1: '请选择',
    displayValue2: '请选择',
  },
  onClick1() {
    this.select1 = this.select1 || this.selectComponent('#dora-select1')
    this.select1?.open({
      value: this.data.value1,
      options: options1,
      onConfirm: (value, index, options) => {
        if (typeof index === 'number' && index !== -1) {
          this.setData({ value1: value, displayValue1: options[index].title })
        }
      },
    })
  },
  onClick2() {
    this.select2 = this.select2 || this.selectComponent('#dora-select2')
    this.select2?.open({
      value: this.data.value2,
      multiple: true,
      options: options2,
      onConfirm: (value, index, options) => {
        if (Array.isArray(index) && index.length) {
          this.setData({
            value2: value,
            displayValue2: index.map((n) => options[n].title).join(','),
          })
        }
      },
    })
  },
})
