---
name: generate-test
description: 自动生成 miniprogram 组件测试文件。适用于需要编写基于 miniprogram 组件测试的开发者，特别是小程序组件的单元测试。
allowed-tools: Bash(npm *), Read, Grep
---

# 生成 miniprogram 组件测试文件

## Context

- 组件路径: `packages/$COMPONENT/src/index.ts`
- 目标测试文件: `packages/$COMPONENT/__tests__/index.spec.ts`

## Instructions

### 1. 环境探测

1. 根据 `$COMPONENT` 定位组件目录：
   - `packages/$COMPONENT/src/index.ts`
2. 确认组件名称: `$COMPONENT`
3. 确认测试文件路径：
   - `packages/$COMPONENT/__tests__/index.spec.ts`

### 2. 分析目标代码

读取目标文件，提取：

- 导出的函数/组件名，即`Xxx`
- Props/参数类型定义
- 内部状态和副作用
- 事件处理函数
- 依赖的外部模块（用于 mock）

### 3. 生成策略

#### 加载组件 & 生成 mount 测试

- 使用 `simulate.load()` 加载指定组件文件。
- 自动生成多个 `mountTest`，测试组件是否能正确挂载和卸载，支持对多个 props 配置进行测试。
- 生成快照测试` mount correctly`，确保组件渲染的一致性。

```typescript
import path from 'path'
import simulate from 'miniprogram-simulate'
import type { RootComponent, Component } from 'miniprogram-simulate'
import type { ButtonInstance } from '../src/types'

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

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): ButtonInstance {
  return wrapper.instance.$component as unknown as ButtonInstance
}

describe('组件名称Xxx', () => {
  beforeAll(() => {
    id = simulate.load(path.resolve(__dirname, '../src/index'), 'dora-button', { less: true })
  })

  mountTest(getId)
  mountTest(getId, { size: 'small' })
  mountTest(getId, { size: 'default' })
  mountTest(getId, { size: 'large' })
  mountTest(getId, { shap: 'rounded' })
  mountTest(getId, { shap: 'rectangular' })
  mountTest(getId, { fill: 'solid' })
  mountTest(getId, { fill: 'outline' })
  mountTest(getId, { fill: 'clear' })
  mountTest(getId, { expand: 'block' })
  mountTest(getId, { expand: 'full' })
  mountTest(getId, { color: '' })
  mountTest(getId, { color: 'stable' })

  test('mount correctly', () => {
    const wrapper = simulate.render(id)
    wrapper.attach(document.createElement('parent-wrapper'))
    expect(wrapper.querySelectorAll('.dora-button').length).toBe(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
```

#### 生成 props 测试

- 根据提供的 props 和默认值，自动生成属性更新测试，验证属性更新是否生效。
- 如果存在 className 变化，验证对应的 class 是否正确添加或移除。
- 生成多个testcase，覆盖不同的 props 组合和边界值。
- 不需要处理 props 属性为 prefixCls, defaultXxx, controlled 的情况。

```typescript
test('should support to change [prop]', () => {
  const wrapper = simulate.render(id, { loading: true })
  wrapper.attach(document.createElement('parent-wrapper'))
  const $comp = getComponentInstance(wrapper)
  expect($comp.$props.loading).toBe(true)
  wrapper.setData({ loading: false })
  expect($comp.$props.loading).toBe(false)
})

test('should support to change [prop]', () => {
  const wrapper = simulate.render(id, { strong: true })
  wrapper.attach(document.createElement('parent-wrapper'))
  const $comp = getComponentInstance(wrapper)
  expect($comp.$props.strong).toBe(true)
  expect(wrapper.querySelectorAll('.dora-button--strong').length).toBe(1)
  wrapper.setData({ strong: false })
  expect($comp.$props.strong).toBe(false)
  expect(wrapper.querySelectorAll('.dora-button--strong').length).toBe(0)
})
```

#### 生成 事件 测试

- 根据提供的事件（如 `tap`、`submit` 等），自动生成对应的事件触发测试，验证事件是否被正确触发。

```typescript
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
            formType="{{formType}}"
            openType="{{openType}}"
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
    }),
  )
  wrapper.attach(document.createElement('parent-wrapper'))
  const button = wrapper.querySelector('#dora-button')
  const $comp = button.instance.$component as unknown as ButtonInstance
  const nativeButton = button.querySelector('.dora-button')

  nativeButton.dispatchEvent('tap')
  await simulate.sleep(0)
  expect(onClick).toHaveBeenCalled()

  wrapper.setData({ openType: 'getUserInfo' })
  nativeButton.dispatchEvent('getuserinfo')
  await simulate.sleep(0)
  expect($comp.$props.openType).toBe('getUserInfo')
  expect(onGetUserInfo).toHaveBeenCalled()
  ... // 其他事件测试同理
})
```
