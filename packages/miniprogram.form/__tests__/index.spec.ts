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

let formId: string
let fieldId: string

function getId() {
  return formId
}

describe('Form', () => {
  beforeAll(() => {
    formId = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-form', { less: true })
    fieldId = simulate.load(path.resolve(__dirname, '../src/field'), 'dora-field', { less: true })
  })

  mountTest(getId)

  test('mount correctly', () => {
    const wrapper = simulate.render(formId, {
      title: 'Profile',
      label: 'Complete the fields below',
      layout: 'horizontal',
    })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(JSON.stringify(wrapper.toJSON())).toContain('dora-list')
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to change className', () => {
    const wrapper = simulate.render(formId, { prefixCls: 'dora-form-custom', layout: 'horizontal' })
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(JSON.stringify(wrapper.toJSON())).toContain('dora-form-custom')
  })

  test('should render slot directly when layout is none', () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-form': formId,
        },
        template: `<dora-form id="form" layout="none"><view class="custom-content">content</view></dora-form>`,
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(JSON.stringify(wrapper.toJSON())).toContain('custom-content')
    expect(JSON.stringify(wrapper.toJSON())).not.toContain('dora-list')
  })

  test('should render field and footer content inside list layout', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-form': formId,
          'dora-field': fieldId,
        },
        template: `
          <dora-form id="form" layout="horizontal">
            <dora-field label="Username" required>
              <view>skyvow</view>
            </dora-field>
            <view slot="footer">Footer actions</view>
          </dora-form>
        `,
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)

    const json = JSON.stringify(wrapper.toJSON())
    expect(json).toContain('Username')
    expect(json).toContain('Footer actions')
  })

  test('should set field value through form api', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-form': formId,
          'dora-field': fieldId,
        },
        template: `
          <dora-form id="form" layout="horizontal">
            <dora-field id="username-field" name="username" label="Username"></dora-field>
          </dora-form>
        `,
      }),
    )

    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)

    const form = wrapper.querySelector('#form').instance as {
      setFieldsValue: (values: Record<string, unknown>) => void
      getFieldValue: (name: string) => unknown
      getInternalHooks: (key: string) => { registerField: (name: string, field: unknown) => () => void }
    }
    const field = wrapper.querySelector('#username-field').instance
    form.getInternalHooks('FORM_HOOK_MARK').registerField('username', field)

    form.setFieldsValue({ username: 'skyvow' })
    await simulate.sleep(10)

    expect(form.getFieldValue('username')).toBe('skyvow')
  })

  test('should validate required field and reset value', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-form': formId,
          'dora-field': fieldId,
        },
        template: `
          <dora-form id="form" layout="horizontal">
            <dora-field
              id="username-field"
              name="username"
              label="Username"
              rules="{{ [{ required: true, message: 'Username is required' }] }}"
            ></dora-field>
          </dora-form>
        `,
      }),
    )

    wrapper.attach(document.createElement('parent-wrapper'))
    await simulate.sleep(10)

    const form = wrapper.querySelector('#form').instance as {
      validateFields: () => Promise<Record<string, unknown>>
      setFieldsValue: (values: Record<string, unknown>) => void
      resetFields: (names?: string[] | string) => void
      getFieldError: (name: string) => string[] | undefined
      getFieldValue: (name: string) => unknown
      getInternalHooks: (key: string) => { registerField: (name: string, field: unknown) => () => void }
    }
    const field = wrapper.querySelector('#username-field').instance
    form.getInternalHooks('FORM_HOOK_MARK').registerField('username', field)

    await expect(form.validateFields()).rejects.toMatchObject({
      errors: {
        username: {
          errors: [{ message: 'Username is required' }],
        },
      },
    })

    await simulate.sleep(10)
    expect(form.getFieldError('username')).toEqual(['Username is required'])

    form.setFieldsValue({ username: 'ok' })
    await simulate.sleep(10)
    await expect(form.validateFields()).resolves.toEqual({ username: 'ok' })

    form.resetFields('username')
    await simulate.sleep(10)
    expect(form.getFieldValue('username')).toBeNull()
  })
})
