import path from 'path'
import simulate from 'miniprogram-simulate'

function mountTest (id: string | (() => string) ,defaultProps = {}) {
  describe('mount and unmount', () => {
    it('component could be updated and unmounted without errors', () => {
      const wrapper = simulate.render(typeof id === 'function' ? id() : id, defaultProps)
      wrapper.attach(document.createElement('parent-wrapper'))
      expect(() => {
        wrapper.setData({})
        wrapper.detach()
      }).not.toThrow()
    })
  })
}

let id: string

function getId () {
  return id
}

describe('DemoPage', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-demo-page')
  })

  mountTest(getId)
  mountTest(getId, { darkmode: 'auto' })
  mountTest(getId, { darkmode: 'light' })
  mountTest(getId, { darkmode: 'dark' })
  mountTest(getId, { clickable: true })
  mountTest(getId, { spacing: true })
  mountTest(getId, { title: 'dora' })
  mountTest(getId, { desc: 'dora' })

  test('should support to trigger event', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-demo-page': id,
        },
        template: `
          <dora-demo-page darkmode="{{ darkmode }}" clickable spacing id="my-comp">
            dora-demo-page
          </dora-demo-page>
        `,
        data: {
          darkmode: 'dark',
        },
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const myComp = wrapper.querySelector('#my-comp')
    const $comp = myComp.instance.$component as any
    await simulate.sleep(0)
    expect($comp.isAuto).toBe(false)
    myComp.setData({ darkmode: 'auto' })
    await simulate.sleep(0)
    expect($comp.isAuto).toBe(true)
    // $comp.onThemeChange('dark')
    // await simulate.sleep(0)
    // expect($comp.isRegister).toBe(true)
    // expect($comp.isManual).toBe(false)
    // expect($comp.curTheme).toBe('auto')
    $comp.onIconClick()
    await simulate.sleep(0)
    expect($comp.isManual).toBe(true)
  })
})
