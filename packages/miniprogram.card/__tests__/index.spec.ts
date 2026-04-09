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

describe('Card', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-card', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id, {
      title: '卡片标题',
      extra: '额外内容',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-card').length).toBe(1)
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-card-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-card-custom').length).toBe(1)
  })

  test('should support action event and disabled action', async () => {
    const onAction = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-card': id,
        },
        template: `
          <dora-card
            id="dora-card"
            title="付款金额"
            extra="¥1024.00"
            actions="{{ actions }}"
            bind:action="onAction"
          >
            <view slot="body">内容</view>
          </dora-card>
        `,
        data: {
          actions: [
            { text: '微信支付', type: 'default' },
            { text: '现金支付', type: 'primary', disabled: true },
          ],
        },
        methods: {
          onAction,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const card = wrapper.querySelector('#dora-card')

    const actions = card.querySelectorAll('.dora-card__action')
    actions[0].dispatchEvent('tap')
    actions[1].dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onAction).toHaveBeenCalledTimes(1)
    expect(onAction.mock.calls[0][0].detail.index).toBe(0)
  })

  test('should update thumb extStyle when thumbStyle changes', async () => {
    const wrapper = simulate.render(id, { thumb: 'http://cdn.skyvow.cn/logo.png', thumbStyle: 'border-radius: 50%;' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.data.extStyle).toContain('border-radius')
    wrapper.setData({ thumbStyle: { borderRadius: '8px' } })
    await simulate.sleep(0)
    expect(wrapper.data.extStyle).toContain('border-radius')
  })
})
