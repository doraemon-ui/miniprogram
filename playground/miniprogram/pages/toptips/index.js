Page({
  getToptips() {
    return this.selectComponent('#dora-toptips')
  },

  showToptips1() {
    this.getToptips()?.show({
      icon: 'cancel',
      hidden: false,
      text: 'Toptips Title',
      duration: 3000,
    })
  },

  showToptips2() {
    this.getToptips()?.success({
      hidden: false,
      text: 'Toptips Title',
      duration: 3000,
    })
  },

  showToptips3() {
    this.getToptips()?.info({
      hidden: false,
      text: 'Toptips Title',
      duration: 3000,
    })
  },

  showToptips4() {
    this.getToptips()?.warn({
      hidden: false,
      text: 'Toptips Title',
      duration: 3000,
    })
  },

  showToptips5() {
    this.getToptips()?.error({
      hidden: false,
      text: 'Toptips Title',
      duration: 3000,
    })
  },

  showToptips6() {
    if (this.timeout) clearTimeout(this.timeout)
    const hide = this.getToptips()?.show({
      icon: 'cancel',
      hidden: false,
      text: 'Toptips Title',
      duration: 3000,
    })
    this.timeout = setTimeout(() => hide && hide(), 1000)
  },
})
