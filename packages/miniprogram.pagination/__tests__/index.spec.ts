import path from 'path'
import simulate from 'miniprogram-simulate'

function mountTest (id: string | (() => string), defaultProps = {}) {
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

describe('Pagination', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-pagination', { less: true })
  })
  
  mountTest(getId)
  mountTest(getId, { mode: 'button' })
  mountTest(getId, { mode: 'number' })
  mountTest(getId, { mode: 'pointer' })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-pagination').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-page' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-page').length).toBe(1)
  })

  test('should support to change simple', () => {
    const wrapper = simulate.render(id, { simple: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.simple).toBe(true)
    $comp.simple = false
    expect($comp.simple).toBe(false)
  })

  test('should support to trigger event', async () => {
    const onPrev = jest.fn()
    const onNext = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-pagination': id,
        },
        template: `
          <dora-pagination
            id="dora-pagination"
            defaultCurrent="3"
            total="5"
            simple="{{simple}}"
            bind:prev="onPrev"
            bind:next="onNext"
          >
            <view slot="prev">Prev</view>
            <view slot="next">Next</view>
          </dora-pagination>
        `,
        data: {
          simple: false,
        },
        methods: {
          onPrev,
          onNext,
        },
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const pagination = wrapper.querySelector('#dora-pagination')
    const $comp = pagination.instance.$component as any
    const prevButton = pagination.querySelector('.dora-pagination__prev >>> .dora-button')
    const nextButton = pagination.querySelector('.dora-pagination__next >>> .dora-button')

    expect($comp.activeIndex).toBe(3)
    expect(pagination.querySelectorAll('.dora-pagination__number').length).toBe(1)

    // prevButton.dispatchEvent('tap')
    // await simulate.sleep(0)
    // expect(onPrev).toHaveBeenCalled()
    // expect($comp.activeIndex).toBe(2)

    // nextButton.dispatchEvent('tap')
    // await simulate.sleep(0)
    // expect(onNext).toHaveBeenCalled()
    // expect($comp.activeIndex).toBe(3)

    wrapper.setData({ simple: true })
    await simulate.sleep(0)
    expect($comp.simple).toBe(true)
    expect(pagination.querySelectorAll('.dora-pagination__number').length).toBe(0)
  })
})
