import path from 'path'
import simulate from 'miniprogram-simulate'

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

describe('Button', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-button')
  })

  mountTest(getId)
  mountTest(getId, { size: 'large' })
  mountTest(getId, { size: 'small' })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-button').length).toBe(1)
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(id, { prefixCls: 'dora-btn' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-btn').length).toBe(1)
  })

  test('should support to change bordered', () => {
    const wrapper = simulate.render(id, { bordered: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-button--bordered').length).toBe(0)
  })

  test('should support to change border radius', () => {
    const wrapper = simulate.render(id, { borderRadius: false })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-button--border-radius').length).toBe(0)
  })

  test('should support to change loading', () => {
    const wrapper = simulate.render(id, { loading: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect($comp.loading).toBe(true)
    $comp.loading = false
    expect($comp.loading).toBe(false)
  })

  test('should support to change disabled', () => {
    const wrapper = simulate.render(id, { disabled: true })
    wrapper.attach(document.createElement('parent-wrapper'))
    const $comp = wrapper.instance.$component as any
    expect(wrapper.querySelectorAll('.dora-button--disabled').length).toBe(1)
    $comp.disabled = false
    expect(wrapper.querySelectorAll('.dora-button--disabled').length).toBe(0)
  })

  test('should support to trigger event', async () => {
    const onClick = jest.fn()
    const onGetUserInfo = jest.fn()
    const onOpenSetting = jest.fn()
    const onGetPhoneNumber = jest.fn()
    const onContact = jest.fn()
    const onSubmit = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-button': id,
        },
        template: `
          <form bindsubmit="onSubmit">
            <dora-button
              id="dora-button"
              form-type="{{formType}}"
              open-type="{{openType}}"
              bind:getuserinfo="onGetUserInfo"
              bind:getphonenumber="onGetPhoneNumber"
              bind:opensetting="onOpenSetting"
              bind:contact="onContact"
              bind:tap="onClick"
            >
              dora-button
            </dora-button>
          </form>
        `,
        data: {
          formType: '',
          openType: '',
        },
        methods: {
          onSubmit,
          onContact,
          onOpenSetting,
          onGetPhoneNumber,
          onGetUserInfo,
          onClick,
        },
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const btn = wrapper.querySelector('#dora-button').querySelector('.dora-button')
    btn.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalledTimes(1)

    wrapper.setData({ openType: 'getUserInfo' })
    btn.dispatchEvent('getuserinfo')
    await simulate.sleep(0)
    expect(onGetUserInfo).toHaveBeenCalled()
    
    wrapper.setData({ openType: 'getPhoneNumber' })
    btn.dispatchEvent('getphonenumber')
    await simulate.sleep(0)
    expect(onGetPhoneNumber).toHaveBeenCalled()

    wrapper.setData({ openType: 'openSetting' })
    btn.dispatchEvent('opensetting')
    await simulate.sleep(0)
    expect(onGetPhoneNumber).toHaveBeenCalled()

    wrapper.setData({ openType: 'contact' })
    btn.dispatchEvent('contact')
    await simulate.sleep(0)
    expect(onContact).toHaveBeenCalled()

    wrapper.setData({ formType: 'submit' })
    btn.dispatchEvent('submit')
    await simulate.sleep(0)
    expect(onSubmit).toHaveBeenCalled()
  })
})
