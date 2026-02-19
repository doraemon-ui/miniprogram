import path from 'path'
import simulate from 'miniprogram-simulate'
import { useRect } from '@doraemon-ui/miniprogram.shared'

jest.mock('@doraemon-ui/miniprogram.shared', () => ({
  useRect: jest.fn(),
}))

function mountTest (id: string | (() => string) ,defaultProps = {}) {
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

function getId () {
  return id
}

describe('Avatar', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-avatar', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-avatar').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-avatar-custom' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-avatar-custom').length).toBe(1)
  })

  test('should call setScale when scale is true and without src', async () => {
    const mockedUseRect = useRect as jest.Mock
    mockedUseRect.mockResolvedValueOnce([
      { width: 40 },
      { width: 80 },
    ])

    const compId = simulate.load({
      usingComponents: {
        'dora-avatar': id,
      },
      template: `
        <dora-avatar
          id="avatar"
          scale="{{scale}}"
        >Doraemon UI</dora-avatar>
      `,
      data: {
        scale: true,
      },
    })

    const wrapper = simulate.render(compId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const avatar = wrapper.querySelector('#avatar')
    const $comp = avatar.instance.$component as any

    expect(avatar.querySelectorAll('.dora-avatar').length).toBe(1)

    await simulate.sleep(0)

    expect(mockedUseRect).toHaveBeenCalled()
    expect($comp.childrenStyle).not.toBe('')
  })

  function createAvatarWrapper () {
    const compId = simulate.load({
      usingComponents: {
        'dora-avatar': id,
      },
      template: `
        <dora-avatar
          id="avatar"
          prefixCls="{{prefixCls}}"
          shape="{{shape}}"
          size="{{size}}"
          src="{{src}}"
          bodyStyle="{{bodyStyle}}"
          scale="{{scale}}"
        >DA</dora-avatar>
      `,
      data: {
        prefixCls: 'dora-avatar',
        shape: 'circle',
        size: 'default',
        src: '',
        bodyStyle: null,
        scale: false,
      },
    })
    const wrapper = simulate.render(compId)
    wrapper.attach(document.createElement('parent-wrapper'))
    const avatar = wrapper.querySelector('#avatar')
    const $comp = avatar.instance.$component as any
    return { wrapper, avatar, $comp }
  }

  test('should support shape, size and src', async () => {
    const { wrapper, avatar, $comp } = createAvatarWrapper()

    wrapper.setData({
      shape: 'square',
      size: 'large',
      src: 'https://cdn.skyvow.cn/logo.png',
    })
    await simulate.sleep(0)
    expect($comp.$props.shape).toBe('square')
    expect($comp.$props.size).toBe('large')
    expect($comp.$props.src).toBe('https://cdn.skyvow.cn/logo.png')
    expect(avatar.querySelectorAll('.dora-avatar--square').length).toBe(1)
    expect(avatar.querySelectorAll('.dora-avatar--large').length).toBe(1)
    expect(avatar.querySelectorAll('.dora-avatar--thumb').length).toBe(1)
  })

  test('should support bodyStyle', async () => {
    const { wrapper, avatar, $comp } = createAvatarWrapper()

    wrapper.setData({ bodyStyle: { color: 'red' } })
    await simulate.sleep(0)
    expect($comp.$props.bodyStyle).toEqual({ color: 'red' })
    expect(avatar.querySelector('.dora-avatar').dom.style.color).toBe('red')
  })

  test('should support scale', async () => {
    const { wrapper, $comp } = createAvatarWrapper()

    wrapper.setData({ src: '', scale: true })
    await simulate.sleep(0)
    expect($comp.$props.scale).toBe(true)
  })

  test('should support to change prefixCls', async () => {
    const { wrapper, avatar, $comp } = createAvatarWrapper()

    wrapper.setData({ prefixCls: 'dora-avatar-custom' })
    await simulate.sleep(0)
    expect($comp.$props.prefixCls).toBe('dora-avatar-custom')
    expect(avatar.querySelectorAll('.dora-avatar-custom').length).toBe(1)
  })
})
