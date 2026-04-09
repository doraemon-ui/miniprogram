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

describe('Selectable', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-selectable', { less: true })
  })

  mountTest(getId)

  test('should toggle when uncontrolled and emit change', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-selectable': id,
        },
        template: `
          <dora-selectable
            id="sel"
            value="1"
            defaultChecked="{{ true }}"
            bind:change="onChange"
          />
        `,
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const sel = wrapper.querySelector('#sel')
    expect(sel.data.inputChecked).toBe(true)
    const root = sel.querySelector('.dora-selectable')
    root.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onChange).toHaveBeenCalled()
    expect(sel.data.inputChecked).toBe(false)
  })

  test('should not update checked when controlled', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-selectable': id,
        },
        template: `
          <dora-selectable
            id="sel"
            value="1"
            controlled
            checked="{{ false }}"
            bind:change="onChange"
          />
        `,
        methods: {
          onChange,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const sel = wrapper.querySelector('#sel')
    const root = sel.querySelector('.dora-selectable')
    root.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onChange).toHaveBeenCalled()
    expect(onChange.mock.calls[0][0].detail.checked).toBe(true)
    expect(sel.data.inputChecked).toBe(false)
  })

  test('should update icon defaults by type', async () => {
    const wrapper = simulate.render(id, { type: 'radio' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.data.innerIconSize).toBe(16)
    wrapper.setData({ type: 'checkbox' })
    await simulate.sleep(0)
    expect(wrapper.data.innerIconSize).toBe(23)
  })
})
