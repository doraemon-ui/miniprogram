const fieldNamesOptions = [
  {
    labelT: '选项一',
    valueT: '1',
    childrenT: [{ labelT: '选项A', valueT: 'A', childrenT: [{ labelT: '选项B', valueT: 'B' }] }],
  },
  { labelT: '选项二', valueT: '2' },
  { labelT: '选项三', valueT: '3', disabledT: true },
]

const imageOptions = [
  {
    label: '周一',
    value: '周一',
    children: [
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
  },
  { label: '周二', value: '周二' },
  { label: '周三', value: '周三' },
]

const options = [
  {
    label: '浙江省',
    value: 'zhejiang',
    children: [
      {
        label: '杭州市',
        value: 'hangzhou',
        children: [
          { label: '西湖区', value: 'xihu' },
          { label: '滨江区', value: 'binjiang' },
        ],
      },
      {
        label: '宁波市',
        value: 'ningbo',
        children: [{ label: '海曙区', value: 'haishu' }],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [{ label: '玄武区', value: 'xuanwu' }],
      },
    ],
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
    imageOptions,
    value1: [],
    value2: [],
    value3: [],
    options: [],
    province: [],
    loading: true,
  },
  onLoad() {
    this.setData({ options })
    setTimeout(() => {
      this.setData({
        province: options.map((v, i) => ({ ...v, disabled: i > 0, children: null })),
        loading: false,
      })
    }, 1500)
  },
  onValueChange1(e) {
    this.setData({ value1: e.detail.value })
  },
  onValueChange2(e) {
    this.setData({ value2: e.detail.value })
  },
  onValueChange3(e) {
    this.setData({ value3: e.detail.value })
  },
})
