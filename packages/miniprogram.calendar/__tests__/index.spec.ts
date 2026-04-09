import path from 'path'
import simulate from 'miniprogram-simulate'

jest.mock('@doraemon-ui/miniprogram.shared', () => {
  return {
    useRect: jest.fn(async () => ({ width: 300, height: 300 })),
  }
})

function mountTest(id: string | (() => string), defaultProps = {}) {
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

function getId() {
  return id
}

describe('Calendar', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-calendar', { less: true })
  })

  mountTest(getId)

  test('should mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-calendar').length).toBe(1)
  })

  test('should support open/close', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper.instance.open({
      value: [new Date(2026, 1, 1).getTime()],
      weekHeader: true,
      toolbar: true,
    })
    await simulate.sleep(0)
    expect(wrapper.data.visible).toBe(true)
    expect(wrapper.data.weeks.length).toBe(7)
    expect(wrapper.data.months.length).toBe(3)

    wrapper.instance.close()
    await simulate.sleep(0)
    expect(wrapper.data.visible).toBe(false)
  })

  test('should support month navigation', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper.instance.open({
      value: [new Date(2026, 1, 1).getTime()],
      animate: false,
    })
    await simulate.sleep(0)

    wrapper.instance.nextMonth()
    await simulate.sleep(0)
    expect(wrapper.data.months.length).toBe(3)

    wrapper.instance.prevMonth()
    await simulate.sleep(0)
    expect(wrapper.data.monthsTranslate.length).toBe(3)
  })

  test('should support multiple selection and formatDate', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper.instance.open({
      multiple: true,
      closeOnSelect: false,
      dateFormat: 'yyyy-mm-dd',
      value: [],
    })
    await simulate.sleep(0)

    wrapper.instance.addValue(new Date(2026, 1, 1).getTime())
    wrapper.instance.addValue(new Date(2026, 1, 2).getTime())
    await simulate.sleep(0)

    expect(wrapper.data.value.length).toBe(2)
    expect(wrapper.instance.formatDate(new Date(2026, 1, 1).getTime())).toBe('2026-02-01')
  })

  test('should support touch move workflow', async () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper.instance.open({
      value: [new Date(2026, 1, 1).getTime()],
      touchMove: true,
      animate: false,
    })
    await simulate.sleep(0)

    const touchStart = {
      touches: [{ pageX: 100, pageY: 100 }],
      changedTouches: [{ pageX: 100, pageY: 100 }],
    }
    const touchMove = {
      touches: [{ pageX: 80, pageY: 100 }],
      changedTouches: [{ pageX: 80, pageY: 100 }],
    }

    wrapper.instance.onTouchStart(touchStart as any)
    await wrapper.instance.onTouchMove(touchMove as any)
    wrapper.instance.onTouchEnd()
    await simulate.sleep(0)

    expect(typeof wrapper.data.wrapperTranslate).toBe('string')
  })
})
