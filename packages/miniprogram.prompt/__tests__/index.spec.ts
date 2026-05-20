import path from 'path'
import simulate from 'miniprogram-simulate'

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

describe('Prompt', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-prompt', { less: true })
  })

  mountTest(getId)

  test('mount correctly', async () => {
    const wrapper = simulate.render(id, {
      visible: true,
      title: '空空如也',
      text: '暂时没有相关数据',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should emit click event when tapping enabled button', async () => {
    const onClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-prompt': id,
        },
        template: `
          <dora-prompt
            id="prompt"
            visible
            buttons="{{ buttons }}"
            bind:click="onClick"
          />
        `,
        data: {
          buttons: [{ text: '随便逛逛' }],
        },
        methods: {
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const prompt = wrapper.querySelector('#prompt')
    prompt.querySelector('#prompt-button-0')?.dispatchEvent('click')
    await simulate.sleep(0)

    expect(onClick).toHaveBeenCalled()
    expect(onClick.mock.calls[0][0].detail.index).toBe(0)
  })

  test('should not emit click event when button is disabled', async () => {
    const onClick = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-prompt': id,
        },
        template: `
          <dora-prompt
            id="prompt"
            visible
            buttons="{{ buttons }}"
            bind:click="onClick"
          />
        `,
        data: {
          buttons: [{ text: '随便逛逛', disabled: true }],
        },
        methods: {
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const prompt = wrapper.querySelector('#prompt')
    prompt.querySelector('#prompt-button-0')?.dispatchEvent('tap')
    await simulate.sleep(0)

    expect(onClick).not.toHaveBeenCalled()
  })

  test('should forward open type event with detail and dataset', async () => {
    const onGetUserInfo = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-prompt': id,
        },
        template: `
          <dora-prompt
            id="prompt"
            visible
            buttons="{{ buttons }}"
            bind:getuserinfo="onGetUserInfo"
          />
        `,
        data: {
          buttons: [{ text: '重新授权', openType: 'getUserInfo' }],
        },
        methods: {
          onGetUserInfo,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))

    const prompt = wrapper.querySelector('#prompt')
    prompt.querySelector('#prompt-button-0')?.dispatchEvent('getuserinfo', {
      detail: {
        userInfo: {
          nickName: 'Doraemon',
        },
      },
    })
    await simulate.sleep(0)

    expect(onGetUserInfo).toHaveBeenCalled()
    expect(onGetUserInfo.mock.calls[0][0].detail.index).toBe(0)
  })
})
