Page({
  onLoad () {
    [...Array(7).keys()].forEach((key) => {
      this.setData({ [`visible${key + 1}`]: false })
      this[`onOpen${key + 1}`] = () => {
        console.log(`onOpen${key + 1}`)
        this.setData({ [`visible${key + 1}`]: true })
      }
      this[`onClose${key + 1}`] = () => {
        console.log(`onClose${key + 1}`)
        this.setData({ [`visible${key + 1}`]: false })
      }
      this[`onClosed${key + 1}`] = () => {
        console.log(`onClosed${key + 1}`)
      }
    })
  },
})
