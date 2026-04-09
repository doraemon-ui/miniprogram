import path from 'path'
import simulate from 'miniprogram-simulate'

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

let radioId: string
let groupId: string

function getRadioId() {
  return radioId
}

function getGroupId() {
  return groupId
}

describe('Radio / RadioGroup', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    radioId = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-radio', { less: true })
    groupId = simulate.load(path.resolve(__dirname, '../src/group'), 'dora-radio-group', { less: true })
  })

  mountTest(getRadioId, { title: 'Java', value: '1' })
  mountTest(getGroupId, { value: '1', options: [{ title: 'Java', value: '1' }] })

  test('radio should sync checked prop to inputChecked', async () => {
    const wrapper = simulate.render(radioId, { title: 'Java', value: '1', checked: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.data.inputChecked).toBe(false)
    wrapper.setData({ checked: true })
    await simulate.sleep(0)
    expect(wrapper.data.inputChecked).toBe(true)
  })

  test('radio should emit change when setChecked called (no group)', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-radio': radioId,
        },
        template: `
          <dora-radio
            id="dora-radio"
            title="Java"
            value="1"
            bind:change="onChange"
          />
        `,
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const radio = wrapper.querySelector('#dora-radio')
    radio.instance.setChecked(true)
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail.value).toBe('1')
    expect(onChange.mock.calls[0][0].detail.checked).toBe(true)
  })

  test('radio-group should normalize options (options mode)', async () => {
    const wrapper = simulate.render(groupId, {
      value: '1',
      withListComponent: false,
      options: [
        { title: 'Java', value: '1' },
        { title: 'PHP', value: '2' },
      ],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    expect(wrapper.data.showOptions.length).toBe(2)
    wrapper.setData({ value: '2' })
    await simulate.sleep(0)
    expect(wrapper.data.inputValue).toBe('2')
  })

  test('radio-group should work with slot children (slot mode)', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-radio-group': groupId,
          'dora-radio': radioId,
        },
        template: `
          <dora-radio-group
            id="dora-radio-group"
            value="{{ value }}"
            bind:change="onChange"
          >
            <dora-radio id="radio1" title="Java" value="1" />
            <dora-radio id="radio2" title="PHP" value="2" />
          </dora-radio-group>
        `,
        data: {
          value: '1',
        },
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const radio2 = wrapper.querySelector('#radio2')
    radio2.instance.setChecked(true)
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalled()
  })
})
