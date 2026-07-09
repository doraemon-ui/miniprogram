import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { PopoverInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): PopoverInstance {
  return wrapper.instance.$component as unknown as PopoverInstance
}

function mountTest(id: string | (() => string), defaultProps: Record<string, unknown> = {}) {
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

describe('Popover', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-popover', { less: true })
  })

  mountTest(getId)

  test('mount correctly', async () => {
    const wrapper = simulate.render(id, {
      title: 'Title',
      content: 'Content',
      defaultVisible: true,
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should toggle visible state in uncontrolled mode', async () => {
    const wrapper = simulate.render(id, {
      title: 'Title',
      content: 'Content',
    })
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper.querySelector('.dora-popover__element').dispatchEvent('tap')
    await simulate.sleep(10)
    expect((getComponentInstance(wrapper) as unknown as { popoverVisible: boolean }).popoverVisible).toBe(true)
  })

  test('should emit change event in controlled mode', async () => {
    const change = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-popover': id,
        },
        template: `
          <dora-popover
            id="popover"
            controlled
            title="Title"
            content="Content"
            bind:change="onChange"
          >
            <view>trigger</view>
          </dora-popover>
        `,
        methods: {
          onChange: change,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    wrapper.querySelector('#popover').querySelector('.dora-popover__element').dispatchEvent('tap')
    await simulate.sleep(10)

    expect(change).toHaveBeenCalled()
    expect(change.mock.calls[0][0].detail.visible).toBe(true)
  })

  test('should close when clicking mask', async () => {
    const wrapper = simulate.render(id, {
      mask: true,
      defaultVisible: true,
      title: 'Title',
      content: 'Content',
    })
    wrapper.attach(document.createElement('parent-wrapper'))

    const instance = getComponentInstance(wrapper) as unknown as { popoverVisible: boolean; onMaskClick: () => void }
    instance.onMaskClick()
    await simulate.sleep(10)

    expect(instance.popoverVisible).toBe(false)
  })
})
