import path from 'path'
import simulate from 'miniprogram-simulate'
import type { Component, RootComponent } from 'miniprogram-simulate'
import type { FilterbarInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): FilterbarInstance {
  return wrapper.instance.$component as unknown as FilterbarInstance
}

type FilterbarMethods = {
  onClick: (e: { currentTarget: { dataset: { index: number } } }) => void
  onSelectChange: (e: { detail: { value: string[] | string }; currentTarget: { dataset: { index: number; type: string } } }) => void
  onPopupSelectChange: (e: {
    detail: { value: string[] | string }
    currentTarget: { dataset: { index: number; parentIndex: number } }
  }) => void
  onSelectConfirm: (e: { currentTarget: { dataset: { index: number } } }) => void
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

const items = [
  {
    label: '排序',
    type: 'sort',
  },
  {
    label: '单选',
    type: 'radio',
    children: [
      { label: '综合', value: 'all' },
      { label: '销量', value: 'sale' },
    ],
  },
  {
    label: '筛选',
    type: 'filter',
    children: [
      {
        label: '品牌',
        type: 'checkbox',
        children: [
          { label: 'A', value: 'a' },
          { label: 'B', value: 'b' },
        ],
      },
    ],
  },
] as const

describe('Filterbar', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-filterbar', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { items })

  test('mount correctly', () => {
    const wrapper = simulate.render(id, { items })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-filterbar').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-filterbar-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-filterbar-custom').length).toBe(1)
  })

  test('should sync items into component props', () => {
    const wrapper = simulate.render(id, { items })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = getComponentInstance(wrapper)

    expect($comp.$props.items).toHaveLength(3)
    expect(JSON.stringify(wrapper.toJSON())).toContain('排序')
    expect(JSON.stringify(wrapper.toJSON())).toContain('单选')
    expect(JSON.stringify(wrapper.toJSON())).toContain('筛选')
  })

  test('should toggle sort and emit change', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-filterbar': id,
        },
        template: `<dora-filterbar id="filterbar" items="{{items}}" bind:change="onChange" />`,
        data: { items },
        methods: { onChange },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const filterbar = wrapper.querySelector('#filterbar')
    const comp = getComponentInstance(filterbar) as unknown as FilterbarMethods
    comp.onClick({
      currentTarget: { dataset: { index: 0 } },
    })
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          checkedValues: [1, '', [[]]],
        }),
      }),
    )
  })

  test('should open radio panel and confirm on change', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-filterbar': id,
        },
        template: `<dora-filterbar id="filterbar" items="{{items}}" bind:change="onChange" />`,
        data: { items },
        methods: { onChange },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const filterbar = wrapper.querySelector('#filterbar')
    const comp = getComponentInstance(filterbar) as unknown as FilterbarMethods
    comp.onClick({
      currentTarget: { dataset: { index: 1 } },
    })
    await simulate.sleep(0)

    comp.onSelectChange({
      detail: { value: 'sale' },
      currentTarget: { dataset: { index: 1, type: 'radio' } },
    })
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          checkedValues: ['', 'sale', [[]]],
        }),
      }),
    )
    expect(JSON.stringify(wrapper.toJSON())).not.toContain('dora-filterbar__item--visible')
  })

  test('should open filter panel and confirm checkbox selection', async () => {
    const onChange = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-filterbar': id,
        },
        template: `<dora-filterbar id="filterbar" items="{{items}}" bind:change="onChange" />`,
        data: { items },
        methods: { onChange },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const filterbar = wrapper.querySelector('#filterbar')
    const comp = getComponentInstance(filterbar) as unknown as FilterbarMethods
    comp.onClick({
      currentTarget: { dataset: { index: 2 } },
    })
    await simulate.sleep(0)

    expect(JSON.stringify(wrapper.toJSON())).toContain('dora-filterbar__pop')

    comp.onPopupSelectChange({
      detail: { value: ['a', 'b'] },
      currentTarget: { dataset: { index: 0, parentIndex: 2 } },
    })
    comp.onSelectConfirm({
      currentTarget: { dataset: { index: 2 } },
    })
    await simulate.sleep(0)

    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          checkedValues: ['', '', [['a', 'b']]],
        }),
      }),
    )
  })
})
