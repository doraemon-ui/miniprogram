---
name: generate-test
description: 为 miniprogram 组件补充或生成单元测试。适用于 `packages/$COMPONENT` 下基于 `miniprogram-simulate` 的组件测试编写、补测、回归修复和快照维护，尤其适合需要 mock 小程序运行时、校验 props/watcher、以及通过真实 DOM 事件触发交互的场景。
allowed-tools: Bash(npm *), Read, Grep, Write
---

# generate-test

## Context

- 组件入口：`packages/$COMPONENT/src/index.ts`
- 类型文件：`packages/$COMPONENT/src/types.ts`
- 目标测试：`packages/$COMPONENT/__tests__/index.spec.ts`
- 测试中的组件加载入口统一使用 `../src/*`，父子组件都不要擅自切到 `../miniprogram_dist/*`
- 普通组件参考：`references/miniprogram.button.index.spec.ts`
- 联动组件参考：`references/miniprogram.list.index.spec.ts`

## Workflow

### 1. 建立上下文

先读取这些文件：

1. `src/index.ts`
2. `src/types.ts`
3. `src/index.wxml`
4. 现有 `__tests__/index.spec.ts` 和 snapshot（如果存在）
5. 同目录或相邻组件测试，用来对齐仓库风格
6. 参考用例：
   - 普通组件优先参考 `references/miniprogram.button.index.spec.ts`
   - 联动组件优先参考 `references/miniprogram.list.index.spec.ts`

提取这些信息：

- 如何识别联动组件：
  - 只要当前包对外导出多个组件，就按联动组件处理
  - 常见形态是 `index + item`、`tabs + tab`、`accordion + panel` 这类父子组件组合
  - 一旦判定为联动组件，除父组件外，还要补读对应子组件的 `src/*.ts`、`src/*.wxml`、`src/types.ts`
- 组件 class 名、根节点选择器、可交互节点选择器
- props、默认值、watcher、副作用
- 对外事件和真实触发入口
- 是否依赖 `@doraemon-ui/miniprogram.shared` 或 canvas/ref/runtime API
- `types.ts` 中导出的 `XxxInstance`、Expose、CanvasRef 等类型

### 2. 生成测试时的硬性规则

#### 实例类型

- 必须定义并使用 `getComponentInstance(wrapper): XxxInstance`
- 如果文件里存在 `jest.mock(...)`，则 `getXxxInstance(...)` helper 必须紧跟在 `jest.mock(...)` 之后，并且放在 `mountTest(...)` 之前
- `wrapper.instance.$component` 默认使用 `../src/types` 导出的 `XxxInstance`
- 不要直接回退到 `any`
- 不要写结构化的临时类型断言去绕过实例类型，例如 `as unknown as { top: number }`
- 不要通过扩展 `XxxInstance` 的方式访问私有字段，例如 `expanded`、`innerText`、`visible`、`canvasRef`
- 不允许在测试中直接调用 Expose 暴露的方法，例如 `scrollTo`、`setActiveKey`
- `Expose` 在测试里只用于类型约束和读取稳定公开状态；不要把 Expose 方法当作交互入口
- 不允许 `jest.spyOn($component, 'getChildNodes')`、`jest.spyOn($component, 'updated')` 这类对组件实例方法的 mock / spy；优先 mock 运行时依赖、关系链输入和真实事件入口
- 不允许直接给组件实例字段赋值来“补状态”，包括 exposed 字段，例如 `item.index = 0`、`item.top = 100`、`item.height = 40`、`item.brief = 'A'`
- 优先通过这些渠道观察行为：
  - `wrapper.instance.$component`
  - DOM / class / 文本
  - 对外事件
  - 公开 props / expose 字段
- 如果某个行为依赖父子关系或运行时测量，优先通过真实 DOM 事件、`wrapper.setData(...)`、watcher、mounted 副作用或 relation mock 驱动；不要直接调用 Expose 方法来“补行为”
- 如果某个行为依赖 `useRect`、`useRectAll`、父子 relation 或 watcher，请通过 mock 这些输入结果驱动组件进入目标状态；不要改实例字段或替换实例方法
- 只有在类型文件里已经公开声明的 props / expose 字段存在时，才通过 `XxxInstance` 读取；默认不要调用其中的方法
- 不要使用 `wrapper.data` 作为断言来源

```ts
import type { RootComponent, Component } from 'miniprogram-simulate'
import type { ButtonInstance } from '../src/types'

function getComponentInstance(wrapper: RootComponent<any, any, any> | Component<any, any, any>): ButtonInstance {
  return wrapper.instance.$component as unknown as ButtonInstance
}
```

#### 事件触发

- 优先通过 `dispatchEvent(...)` 触发事件
- 不要直接调用 `comp.onClick()`、`comp.submit()`、`comp.clear()`、`comp.onTouchEnd()` 这类实例方法来代替用户交互
- 即使该方法属于 Expose，也不要把 `comp.scrollTo()`、`comp.setActiveKey()`、`comp.emitStick()`、`comp.changeCurrent()` 这类调用当成事件测试
- 不要为了凑事件链而手动 `dispatchEvent('change')`、`dispatchEvent('stick')`、`dispatchEvent('unstick')`、`triggerEvent(...)` 去伪造组件内部本应自行触发或暴露给外部使用的事件；优先从更上游的真实交互、滚动/触摸/点击入口、props 变化或 runtime mock 结果驱动
- `stick`、`unstick`、`change`、`open`、`close`、`load` 这类组件对外 custom event 默认都不能作为测试触发入口；只有模板中真实绑定了同名原生/内置组件事件时，才能从该真实节点触发，并且必须能解释事件来源
- 如果组件事件完全依赖 relation / runtime 联动，且 `simulate` 下无法稳定建立这条链路，可以退一步校验“父组件对外 custom event 面”是否正确接入；此时优先对组件 wrapper 使用 `dispatchEvent(...)`，仍然不要调用实例方法、Expose 方法或改实例字段
- 先从模板找到真实事件入口，再查询对应节点
- 只有在“没有任何可触达的真实事件入口”时，才考虑直接调用内部方法，并在测试里写明原因

```ts
const button = wrapper.querySelector('.dora-button')
button.dispatchEvent('click')
await simulate.sleep(0)
expect(onClick).toHaveBeenCalled()
```

#### props / watcher

- 用 `wrapper.setData(...)` 验证 props 变更
- props 测试中的 `wrapper.setData(...)` 应逐项更新；默认不要一次性把多个不相关 props 放进同一个 `setData`
- 每次 `setData(...)` 后都应紧跟 `await simulate.sleep(0)`，并只断言这一次变更直接对应的 `$props` / class / style / 文本变化
- 对每一次 props 变更，`$props` 断言是必需项，例如 `expect($comp.$props.mode).toBe('card')`
- 如果该 props 变更会稳定映射到 className，还必须同时补充对应的 class 断言，例如 `expect(list.querySelectorAll('.dora-list--card').length).toBe(1)`
- 也可以结合“初始 props + 宿主组件 + expose 方法 + 真实事件”覆盖行为
- 优先断言：
  - `$props` 是否更新
  - class / style / data 是否更新
  - 对外事件是否触发
  - 稳定可观察的副作用是否发生
- 不要为了覆盖率去断言不稳定的实现细节
- `prefixCls` 单独测 className 即可
- 默认不专门生成 `defaultXxx`、受控/非受控内部细枝末节测试，除非组件本身逻辑高度依赖它们

#### canvas / runtime mock

- 若组件依赖 `useRef`、`getCanvasRef`、`getSystemInfoSync`、`toDataURL`、`getTouchPoints` 等运行时 API，需要显式 mock
- 对 canvas 组件，优先 mock 出最小可用上下文：`getContext`、`scale`、`fillRect`、`clearRect`、`lineTo`、`stroke` 等
- 如果组件把 ref / canvas context 缓存在实例字段里并以 Promise-like 方式消费，mock 时优先返回 thenable/Promise-compatible 对象，避免 simulate 代理层干扰
- 如果触摸事件 payload 在 simulate 中不稳定，仍然要通过 `dispatchEvent('touchmove')` 触发，但允许单独 mock 坐标解析工具（如 `getTouchPoints`）
- 即使存在 runtime mock，也不要为了断言结果去扩展实例私有字段；优先从公开实例、DOM 或事件结果验证

### 3. 优先生成的测试类型

#### mount / snapshot

- 保留统一的 `mountTest`
- 即使是联动组件、且后续主测试通过 `renderInline(...)` 做联合挂载，也仍然要保留 `mountTest`
- 联动组件的 `mountTest` 可以对“宿主组件 id / render 工厂函数”执行，核心要求是不省略 mount/unmount 回归
- 只为“有行为差异的 props”增加额外挂载用例
- 生成一个且只生成一个名为 `mount correctly` 的快照测试
- `mount correctly` 必须使用 `wrapper.toJSON()` 做快照断言
- 除 `mount correctly` 外，其它测试不允许使用 `wrapper.toJSON()`、`JSON.stringify(wrapper.toJSON())` 或任何等价的快照/字符串化断言
- 不要擅自改成 `mount correctly with ...`、`renders correctly` 等其它名字

```ts
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
```

#### props 变更

- 只生成与组件逻辑直接相关的 props 测试
- 对布尔类 props 优先断言 class / slot / 分支渲染
- 对数值/字符串 props 优先断言 `$props`、style、文本或行为变化

```ts
test('should support to change disabled', () => {
  const wrapper = simulate.render(id, { disabled: true })
  wrapper.attach(document.createElement('parent-wrapper'))
  const $comp = getComponentInstance(wrapper)

  expect($comp.$props.disabled).toBe(true)
  expect(wrapper.querySelectorAll('.dora-button--disabled').length).toBe(1)
})
```

#### 事件测试

- 用宿主组件承接事件回调
- 用真实节点 `dispatchEvent(...)` 触发
- 事件触发后统一 `await simulate.sleep(0)`
- 如果事件依赖前置 data，先 `wrapper.setData(...)` 再触发
- 断言事件回调时禁止只写 `expect(onChange).toHaveBeenCalled()`；必须使用明确次数，例如 `expect(onChange).toHaveBeenCalledTimes(1)`
- 对带 `detail` 的事件，在断言调用次数后必须同步断言 payload，例如 `expect(onChange.mock.calls[0][0].detail).toEqual(expect.objectContaining({ key: 'key2' }))`
- 对连续触发/禁用后不再触发的场景，每次关键交互后都要同时断言调用次数；首次触发还要断言 `detail`，后续“不再触发”至少断言次数保持不变

#### 父子组件联动

- 像 `sticky/sticky-item` 这种强耦合父子组件，必须放在同一个测试文件里一起测，不要拆成两个彼此独立的 spec
- 同一个行为优先走“父组件驱动子组件”的真实链路，避免分别给父子组件写重复的孤立测试
- 如果用户明确要求“联动组件必须联合测试”，则不要保留父组件、子组件各自分散的独立行为测试；要通过宿主组件和 `renderInline(...)` 统一组织
- 断言顺序优先选择：
  - 父组件 expose / 真实事件
  - 子组件 DOM class / 文本变化
  - 宿主组件收到的对外事件

```ts
test('should support to trigger event', async () => {
  const onClick = jest.fn()
  const wrapper = simulate.render(
    simulate.load({
      usingComponents: {
        'dora-button': id,
      },
      template: `<dora-button id="dora-button" bind:tap="onClick">ok</dora-button>`,
      methods: {
        onClick,
      },
    }),
  )
  wrapper.attach(document.createElement('parent-wrapper'))

  const button = wrapper.querySelector('#dora-button')
  const nativeButton = button.querySelector('.dora-button')
  nativeButton.dispatchEvent('tap')
  await simulate.sleep(0)

  expect(onClick).toHaveBeenCalled()
})
```

### 4. 快照处理

- 如果 `mount correctly` 因真实渲染变化失败，可以更新 snapshot
- 更新前先确认：
  - 是组件真实输出变化
  - 不是测试 mock 写错
  - 不是选择器或依赖版本引入的偶发差异
- 不要无脑 `-u`

### 5. 执行与验证

- 优先在包目录执行单测，不要默认在 monorepo 根目录跑 `pnpm test -- ...`
- 推荐命令：

```bash
cd packages/$COMPONENT
pnpm test -- --runInBand __tests__/index.spec.ts
```

- 如果组件没有独立包脚本，再根据仓库结构选择最小范围命令
- 除了测试通过，也要检查生成代码是否符合现有测试风格和类型约束

## Special formatting constraints

- 顶部变量命名必须语义化，禁止使用过于泛化的 `id`、`itemId`、`getId()`、`getItemId()` 这类命名；应改为组件语义命名，例如 `listID`、`listItemID`、`getListID()`、`getListItemID()`
- 普通组件默认参考 `references/miniprogram.button.index.spec.ts` 的 helper、`mountTest`、实例类型和 props/事件测试节奏
- 联动组件默认参考 `references/miniprogram.list.index.spec.ts` 的 `renderInline(...)`、联合挂载和固定三段式测试结构
- 联动组件即使参考 `references/miniprogram.list.index.spec.ts` 的结构，也必须补上 `mountTest`；不要因为采用联合测试结构就省略 mount/unmount 用例
- 如果用户明确要求“参考某个已有 spec 的格式”，必须先读取该 spec，并尽量复用它的整体结构、helper 排布和测试命名
- 如果用户明确要求“必须实现 renderInline 函数”，即使组件本身也可直接 `simulate.render(id)`，仍然要提供 `renderInline(template, methods?, data?)`
- 如果用户明确要求“固定 3 个 test”，则仅保留这 3 个命名测试：
  - `mount correctly`
  - `should support to trigger event`
  - `should support to change props`
- 当上述“固定 3 个 test”生效时，不再额外保留其它行为测试；如需覆盖更多行为，应合并进这 3 个测试中

## Output requirements

- 优先补充行为测试，不要只增加快照
- 优先复用仓库已有 helper 风格
- 保持测试文件可读，避免过度抽象
- mock 只覆盖当前组件真实依赖
- 新增测试必须能解释“它保护了什么行为”
