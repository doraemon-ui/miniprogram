import type { Component, RootComponent } from 'miniprogram-simulate'
import simulate from 'miniprogram-simulate'
import path from 'path'

import type { RadioGroupInstance, RadioInstance } from '../src/types'

function getRadioInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): RadioInstance {
  return wrapper.instance.$component as unknown as RadioInstance
}

function getRadioGroupInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): RadioGroupInstance {
  return wrapper.instance.$component as unknown as RadioGroupInstance
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

let radioID: string
let radioGroupID: string

function getRadioID() {
  return radioID
}

function getRadioGroupID() {
  return radioGroupID
}

function renderInline(methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-radio': radioID,
        'dora-radio-group': radioGroupID,
      },
      template: `
        <dora-radio-group
          id="radio-group"
          value="{{ value }}"
          disabled="{{ disabled }}"
          hasLine="{{ hasLine }}"
          bind:change="onChange"
        >
          <dora-radio id="radio-1" title="Java" value="1" />
          <dora-radio id="radio-2" title="PHP" value="2" />
        </dora-radio-group>
      `,
      data: {
        value: '1',
        disabled: false,
        hasLine: true,
        ...data,
      },
      methods: {
        onChange: jest.fn(),
        ...methods,
      },
    }),
  )
}

describe('Radio / RadioGroup', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    radioID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-radio', { less: true, shareCache: true } as object)
    radioGroupID = simulate.load(path.resolve(__dirname, '../src/group'), 'dora-radio-group', {
      less: true,
      shareCache: true,
    } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  mountTest(getRadioID, { title: 'Java', value: '1' })
  mountTest(getRadioGroupID, { value: '1', options: [{ title: 'Java', value: '1' }] })

  test('mount correctly', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    expect(wrapper.querySelectorAll('#radio-group >>> .dora-list').length).toBe(1)
    expect(wrapper.querySelectorAll('#radio-1 >>> .dora-list-item').length).toBe(1)
    expect(wrapper.querySelectorAll('#radio-2 >>> .dora-list-item').length).toBe(1)
    expect(wrapper.querySelectorAll('#radio-1 >>> .dora-list-item--has-line').length).toBe(1)
    expect(wrapper.querySelectorAll('#radio-2 >>> .dora-list-item--has-line').length).toBe(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onChange = jest.fn()
    const wrapper = renderInline({ onChange }, { value: '1' })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    const selectable = wrapper.querySelector('#radio-2 >>> .dora-selectable')
    selectable.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail).toEqual(
      expect.objectContaining({
        value: '2',
        checked: true,
        selectedValue: '2',
        selectedIndex: 1,
      }),
    )
  })

  test('should support to change props', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    const radio2 = wrapper.querySelector('#radio-2')
    const radioGroup = wrapper.querySelector('#radio-group')
    const $radioGroup = getRadioGroupInstance(radioGroup)
    const $radio2 = getRadioInstance(radio2)
    expect($radio2.$props.value).toBe('2')

    wrapper.setData({ value: '2' })
    await simulate.sleep(30)
    expect($radioGroup.$props.value).toBe('2')

    wrapper.setData({ disabled: true })
    await simulate.sleep(30)
    expect($radioGroup.$props.disabled).toBe(true)

    wrapper.setData({ hasLine: false })
    await simulate.sleep(30)
    expect($radioGroup.$props.hasLine).toBe(false)
  })
})
