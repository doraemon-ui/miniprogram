Page({
  data: {
    value1: ['1'],
    value2: ['1'],
    value3: ['1'],
    value4: ['1'],
    value5: ['1'],
    options: [
      { title: 'Java', value: '1' },
      { title: 'PHP', value: '2' },
    ],
    iconPosition: 'left',
  },

  toggleIconPosition() {
    this.setData({ iconPosition: this.data.iconPosition === 'left' ? 'right' : 'left' })
  },

  onChange(field, e) {
    const { value } = e.detail
    const data = this.data[field]
    const index = data.indexOf(value)
    const current = index === -1 ? [...data, value] : data.filter((n) => n !== value)

    this.setData({
      [field]: current,
    })
  },

  onChange1(e) {
    this.onChange('value1', e)
  },
  onChange2(e) {
    this.onChange('value2', e)
  },
  onChange3(e) {
    this.onChange('value3', e)
  },
  onChange4(e) {
    this.onChange('value4', e)
  },
  onChange5(e) {
    this.onChange('value5', e)
  },

  onItemClick(e) {
    const { checkboxRef } = e.currentTarget.dataset
    const ref = this.selectComponent(`#${checkboxRef}`)
    ref.toggle()
  },

  formSubmit(e) {
    // eslint-disable-next-line no-console
    console.log('form submit', e.detail.value)
  },
})
