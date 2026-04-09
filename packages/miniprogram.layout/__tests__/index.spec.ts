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

let rowId: string
let colId: string

function getRowId() {
  return rowId
}

function getColId() {
  return colId
}

describe('Row / Col', () => {
  jest.setTimeout(15000)

  beforeAll(() => {
    colId = simulate.load(path.resolve(__dirname, '../src/col'), 'dora-col', { less: true })
    rowId = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-row', { less: true })
  })

  mountTest(getRowId)
  mountTest(getColId)

  test('row should apply gutter styles to cols', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-row': rowId,
          'dora-col': colId,
        },
        template: `
          <dora-row id="row" gutter="{{ gutter }}">
            <dora-col id="col1" span="6">
              <view>1</view>
            </dora-col>
            <dora-col id="col2" span="6">
              <view>2</view>
            </dora-col>
          </dora-row>
        `,
        data: {
          gutter: 20,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(0)
    await simulate.sleep(0)

    const row = wrapper.querySelector('#row')
    const col1 = wrapper.querySelector('#col1')
    const col2 = wrapper.querySelector('#col2')

    expect(row.data.rowStyle).toContain('--dora-row-gutter: 20px')
    expect(row.data.rowStyle).toContain('--dora-row-gutter-half: 10px')
    expect(row.data.rowStyle).toContain('margin-left: -10px')
    expect(row.data.rowStyle).toContain('margin-right: -10px')
    expect(col1.data.colStyle).toContain('var(--dora-row-gutter-half')
    expect(col2.data.colStyle).toContain('var(--dora-row-gutter-half')

    wrapper.setData({ gutter: 12 })
    await simulate.sleep(0)
    await simulate.sleep(0)

    expect(row.data.rowStyle).toContain('--dora-row-gutter: 12px')
    expect(row.data.rowStyle).toContain('--dora-row-gutter-half: 6px')
    expect(row.data.rowStyle).toContain('margin-left: -6px')
  })
})
