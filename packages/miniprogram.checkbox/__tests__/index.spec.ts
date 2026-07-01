import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import type { CheckboxGroupInstance, CheckboxInstance } from '../src/types'

function getCheckboxInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): CheckboxInstance {
  return wrapper.instance.$component as unknown as CheckboxInstance
}

function getCheckboxGroupInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): CheckboxGroupInstance {
  return wrapper.instance.$component as unknown as CheckboxGroupInstance
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

let checkboxID: string
let checkboxGroupID: string

function getCheckboxID() {
  return checkboxID
}

function getCheckboxGroupID() {
  return checkboxGroupID
}

function renderInline(methods: Record<string, (...args: any[]) => void> = {}, data: Record<string, unknown> = {}) {
  return simulate.render(
    simulate.load({
      usingComponents: {
        'dora-checkbox': checkboxID,
        'dora-checkbox-group': checkboxGroupID,
      },
      template: `
        <dora-checkbox-group
          id="checkbox-group"
          value="{{ value }}"
          disabled="{{ disabled }}"
          hasLine="{{ hasLine }}"
          bind:change="onChange"
        >
          <dora-checkbox id="checkbox-1" title="Java" value="1" />
          <dora-checkbox id="checkbox-2" title="PHP" value="2" />
        </dora-checkbox-group>
      `,
      data: {
        value: ['1'],
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

describe('Checkbox / CheckboxGroup', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    checkboxID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-checkbox', { less: true, shareCache: true } as object)
    checkboxGroupID = simulate.load(path.resolve(__dirname, '../src/group'), 'dora-checkbox-group', {
      less: true,
      shareCache: true,
    } as object)
  })

  afterAll(() => {
    global.simulatePatch.restore()
  })

  mountTest(getCheckboxID, { title: 'Java', value: '1' })
  mountTest(getCheckboxGroupID, { value: ['1'], options: [{ title: 'Java', value: '1' }] })

  test('mount correctly', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    expect(wrapper.querySelectorAll('#checkbox-group >>> .dora-list').length).toBe(1)
    expect(wrapper.querySelectorAll('#checkbox-1 >>> .dora-list-item').length).toBe(1)
    expect(wrapper.querySelectorAll('#checkbox-2 >>> .dora-list-item').length).toBe(1)
    expect(wrapper.querySelectorAll('#checkbox-1 >>> .dora-list-item--has-line').length).toBe(1)
    expect(wrapper.querySelectorAll('#checkbox-2 >>> .dora-list-item--has-line').length).toBe(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onChange = jest.fn()
    const wrapper = renderInline({ onChange })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    const selectable = wrapper.querySelector('#checkbox-2 >>> .dora-selectable')
    selectable.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail).toEqual(
      expect.objectContaining({
        value: '2',
        checked: true,
        selectedValue: ['1', '2'],
        selectedIndex: [0, 1],
      }),
    )
  })

  test('should support to change props', async () => {
    const wrapper = renderInline()
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(30)

    const checkbox2 = wrapper.querySelector('#checkbox-2')
    const checkboxGroup = wrapper.querySelector('#checkbox-group')
    const $checkboxGroup = getCheckboxGroupInstance(checkboxGroup)
    const $checkbox2 = getCheckboxInstance(checkbox2)
    expect($checkbox2.$props.value).toBe('2')

    wrapper.setData({ disabled: true })
    await simulate.sleep(30)
    expect($checkboxGroup.$props.disabled).toBe(true)

    wrapper.setData({ hasLine: false })
    await simulate.sleep(30)
    expect($checkboxGroup.$props.hasLine).toBe(false)
  })
})
