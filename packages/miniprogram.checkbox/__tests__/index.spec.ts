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

let id: string

function getId() {
  return id
}

let groupId: string

function getGroupId() {
  return groupId
}

describe('Checkbox / CheckboxGroup', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-checkbox', { less: true })
    groupId = simulate.load(path.resolve(__dirname, '../src/group'), 'dora-checkbox-group', { less: true })
  })

  mountTest(getId, { title: 'Java', value: '1' })
  mountTest(getGroupId, { value: ['1'], options: [{ title: 'Java', value: '1' }] })

  test('checkbox should sync checked prop to inputChecked', async () => {
    const wrapper = simulate.render(id, { title: 'Java', value: '1', checked: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.data.inputChecked).toBe(false)
    wrapper.setData({ checked: true })
    await simulate.sleep(0)
    expect(wrapper.data.inputChecked).toBe(true)
  })

  test('checkbox should emit change when setChecked called (no group)', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-checkbox': id,
        },
        template: `
          <dora-checkbox
            id="dora-checkbox"
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

    const checkbox = wrapper.querySelector('#dora-checkbox')
    checkbox.instance.setChecked(true)
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange.mock.calls[0][0].detail.value).toBe('1')
    expect(onChange.mock.calls[0][0].detail.checked).toBe(true)
  })

  test('checkbox-group should normalize options and update checked state', async () => {
    const wrapper = simulate.render(groupId, {
      value: ['1'],
      withListComponent: false,
      options: [
        { title: 'Java', value: '1' },
        { title: 'PHP', value: '2' },
      ],
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    expect(wrapper.data.showOptions.length).toBe(2)
    expect(wrapper.data.showOptions[0].__checked).toBe(true)
    expect(wrapper.data.showOptions[1].__checked).toBe(false)

    wrapper.setData({ value: ['2'] })
    await simulate.sleep(0)
    expect(wrapper.data.inputValue).toEqual(['2'])
    expect(wrapper.data.showOptions[0].__checked).toBe(false)
    expect(wrapper.data.showOptions[1].__checked).toBe(true)
  })

  test('checkbox-group should work with slot children (slot mode)', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-checkbox-group': groupId,
          'dora-checkbox': id,
        },
        template: `
          <dora-checkbox-group
            id="dora-checkbox-group"
            value="{{ value }}"
            bind:change="onChange"
          >
            <dora-checkbox id="checkbox1" title="Java" value="1" />
            <dora-checkbox id="checkbox2" title="PHP" value="2" />
          </dora-checkbox-group>
        `,
        data: {
          value: ['1'],
        },
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)

    const checkbox2 = wrapper.querySelector('#checkbox2')
    checkbox2.instance.setChecked(true)
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].detail.value).toBe('2')
    expect(onChange.mock.calls[0][0].detail.selectedValue).toEqual(['1', '2'])
  })
})
