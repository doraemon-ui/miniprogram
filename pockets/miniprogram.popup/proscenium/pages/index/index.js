Page({
  data: {
    visible1: false,
    visible2: false,
    visible3: false,
    visible4: false,
    visible5: false,
    visible6: false,
  },
  onLoad () {
    [1, 2, 3, 4, 5, 6].forEach((key) => {
      this[`onOpen${key}`] = () => {
        console.log(`onOpen${key}`)
        this.setData({ [`visible${key}`]: true })
      }
      this[`onClose${key}`] = () => {
        console.log(`onClose${key}`)
        this.setData({ [`visible${key}`]: false })
      }
      this[`onClosed${key}`] = () => {
        console.log(`onClosed${key}`)
      }
    })
  },
})
