import path from 'path'
import simulate from 'miniprogram-simulate'

let listID: string
let listItemID: string

describe('List', () => {
  beforeAll(() => {
    listID = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-list')
    listItemID = simulate.load(path.resolve(__dirname, '../src/item'), 'dora-list-item')
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
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const list = wrapper.querySelector('#dora-list')
    const listItem = wrapper.querySelector('#dora-list-item')
    expect(list.querySelectorAll('.dora-list').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item--access').length).toBe(0)
    expect(listItem.querySelectorAll('.dora-list-item--disabled').length).toBe(0)
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
              open-type="{{openType}}"
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
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const cell = wrapper.querySelector('#dora-list-item').querySelector('.dora-list-item')
    cell.dispatchEvent('tap')
    await simulate.sleep(0)
    expect(onClick).toHaveBeenCalledTimes(1)

    wrapper.setData({ openType: 'getUserInfo' })
    cell.dispatchEvent('getuserinfo')
    await simulate.sleep(0)
    expect(onGetUserInfo).toHaveBeenCalled()
    
    wrapper.setData({ openType: 'getPhoneNumber' })
    cell.dispatchEvent('getphonenumber')
    await simulate.sleep(0)
    expect(onGetPhoneNumber).toHaveBeenCalled()

    wrapper.setData({ openType: 'openSetting' })
    cell.dispatchEvent('opensetting')
    await simulate.sleep(0)
    expect(onGetPhoneNumber).toHaveBeenCalled()

    wrapper.setData({ openType: 'contact' })
    cell.dispatchEvent('contact')
    await simulate.sleep(0)
    expect(onContact).toHaveBeenCalled()
  })

  test('should support to change props', () => {
    const wrapper = simulate.render(
      simulate.load({
        usingComponents: {
          'dora-list': listID,
          'dora-list-item': listItemID,
        },
        template: `
          <dora-list id="dora-list" prefix-cls="dora-list" title="带说明的列表项" label="底部说明文字">
            <dora-list-item
              id="dora-list-item"
              is-link
              thumb="http://cdn.skyvow.cn/logo.png"
              title="标题文字"
              label="附加描述"
              extra="说明文字"
              disabled
            />
          </dora-list>
        `,
      })
    )
    wrapper.attach(document.createElement('parent-wrapper'))
    const list = wrapper.querySelector('#dora-list')
    const listItem = wrapper.querySelector('#dora-list-item')
    expect(list.querySelectorAll('.dora-list').length).toBe(1)
    expect(list.querySelectorAll('.dora-list__ft').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item--access').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item--disabled').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item__thumb').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item__desc').length).toBe(1)
    expect(listItem.querySelectorAll('.dora-list-item__ft').length).toBe(1)
  })
})
