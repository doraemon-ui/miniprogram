import path from 'path'
import simulate from 'miniprogram-simulate'

let listID: string
let listItemID: string

describe('List', () => {
  beforeAll(() => {
    listID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-list', { less: true })
    listItemID = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-list-item', { less: true })
  })

  test('mount correctly', () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-list': listID,
          'dora-list-item': listItemID,
        },
        template: `
          <dora-list id="dora-list" title="带说明的列表项">
            <dora-list-item
              id="dora-list-item"
              title="标题文字"
            />
          </dora-list>
        `,
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const list = wrapper.querySelector('#dora-list')
    const listItem = wrapper.querySelector('#dora-list-item')
    expect(list.querySelectorAll('.dora-list').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item--access').length).toBe(0)
    expect(listItem.querySelectorAll('.dora-list-item--disabled').length).toBe(0)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  test('should support to trigger event', async () => {
    const onClick = jest.fn()
    const onGetUserInfo = jest.fn()
    const onOpenSetting = jest.fn()
    const onGetPhoneNumber = jest.fn()
    const onContact = jest.fn()
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-list': listID,
          'dora-list-item': listItemID,
        },
        template: `
          <dora-list id="dora-list" title="带说明的列表项">
            <dora-list-item
              id="dora-list-item"
              title="标题文字"
              openType="{{openType}}"
              bind:getuserinfo="onGetUserInfo"
              bind:getphonenumber="onGetPhoneNumber"
              bind:opensetting="onOpenSetting"
              bind:contact="onContact"
              bind:tap="onClick"
            />
          </dora-list>
        `,
        data: {
          openType: '',
        },
        methods: {
          onContact,
          onOpenSetting,
          onGetPhoneNumber,
          onGetUserInfo,
          onClick,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const list = wrapper.querySelector('#dora-list-item')
    const $comp = list.instance.$component as any
    const listItem = list.querySelector('.dora-list-item')

    listItem.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalledTimes(1)

    wrapper.setData({ openType: 'getUserInfo' })
    listItem.dispatchEvent('getuserinfo')
    await simulate.sleep(0)
    expect($comp.$props.openType).toBe('getUserInfo')
    expect(onGetUserInfo).toHaveBeenCalled()

    wrapper.setData({ openType: 'getPhoneNumber' })
    listItem.dispatchEvent('getphonenumber')
    await simulate.sleep(0)
    expect($comp.$props.openType).toBe('getPhoneNumber')
    expect(onGetPhoneNumber).toHaveBeenCalled()

    wrapper.setData({ openType: 'openSetting' })
    listItem.dispatchEvent('opensetting')
    await simulate.sleep(0)
    expect($comp.$props.openType).toBe('openSetting')
    expect(onGetPhoneNumber).toHaveBeenCalled()

    wrapper.setData({ openType: 'contact' })
    listItem.dispatchEvent('contact')
    await simulate.sleep(0)
    expect($comp.$props.openType).toBe('contact')
    expect(onContact).toHaveBeenCalled()
  })

  test('should support to change props', async () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-list': listID,
          'dora-list-item': listItemID,
        },
        template: `
          <dora-list
            id="dora-list"
            prefixCls="{{prefixCls}}"
            mode="{{mode}}"
            hasLine="{{hasLine}}"
            wrapStyle="{{wrapStyle}}"
            bodyStyle="{{bodyStyle}}"
            title="带说明的列表项"
            label="底部说明文字"
          >
            <dora-list-item
              id="dora-list-item"
              isLink
              thumb="http://cdn.skyvow.cn/logo.png"
              title="标题文字"
              label="附加描述"
              extra="说明文字"
              disabled
            />
          </dora-list>
        `,
        data: {
          prefixCls: 'dora-list',
          mode: 'default',
          hasLine: true,
          wrapStyle: null,
          bodyStyle: null,
        },
      }),
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const list = wrapper.querySelector('#dora-list')
    const $comp = list.instance.$component as any
    const listItem = wrapper.querySelector('#dora-list-item')
    expect(list.querySelectorAll('.dora-list').length).toBe(1)
    expect(list.querySelectorAll('.dora-list__ft').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item--access').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item--disabled').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item__thumb').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item__description').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item__ft').length).toBe(1)

    wrapper.setData({ mode: 'card' })
    await simulate.sleep(0)
    expect($comp.$props.mode).toBe('card')
    expect(list.querySelectorAll('.dora-list--card').length).toBe(1)

    wrapper.setData({ hasLine: false })
    await simulate.sleep(0)
    expect($comp.$props.hasLine).toBe(false)
    expect(list.querySelectorAll('.dora-list--has-line').length).toBe(0)

    wrapper.setData({ wrapStyle: { color: 'red' } })
    await simulate.sleep(0)
    expect($comp.$props.wrapStyle).toEqual({ color: 'red' })
    expect(list.querySelector('.dora-list').dom.style.color).toBe('red')

    wrapper.setData({ bodyStyle: { color: 'red' } })
    await simulate.sleep(0)
    expect($comp.$props.bodyStyle).toEqual({ color: 'red' })
    expect(list.querySelector('.dora-list__bd').dom.style.color).toBe('red')

    wrapper.setData({ prefixCls: 'dora-cells' })
    await simulate.sleep(0)
    expect($comp.$props.prefixCls).toBe('dora-cells')
    expect(list.querySelectorAll('.dora-cells').length).toBe(1)
  })
})
