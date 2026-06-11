# Miniprogram ConfigProvider 技术方案（第一阶段）

## 1. 目标

实现一个 `miniprogram.config-provider` 组件，用于给后代 Doraemon 组件提供全局化配置，首期以 `Image` 组件为示例。

第一阶段只关注：

- `ConfigProvider` 是虚拟组件，不生成实际标签。
- 支持 `value` 属性。
- 支持 `ConfigProvider` 嵌套 `ConfigProvider`。
- Provider 之间只做一级对象覆盖，不做深合并。
- Consumer 侧只需要调用 `useComponentConfig(this, 'Image')`。
- 逻辑放在 Doraemon 实例层完成。

第一阶段明确不做：

- 不修改 `packages/miniprogram.core-js`
- 不在业务包里直接使用 `setData`
- 不在业务包里直接使用 `getRelationNodes`
- 不处理 provider `value` 变更后的 consumer 动态刷新

也就是说，本阶段只保证 **首次初始化渲染** 时 consumer 能拿到正确配置。

---

## 2. 约束确认

已确认的约束如下：

- `ConfigProvider` 只依赖 `ConfigProvider` 自身表达嵌套。
- Consumer 调用形式固定为 `useComponentConfig(this, 'Image')`。
- `useComponentConfig()` 内部允许直接读取 `this.$refs.ConfigProvider`。
- 不允许修改 `core-js`。
- `class ConfigProvider extends Doraemon {}` 的实例本身作为实现主体。

---

## 3. 配置结构

建议保持为“组件名 -> 组件配置”的结构：

```ts
export interface ConfigProviderComponentValue<ClassNameKey extends string = string, StyleKey extends string = ClassNameKey> {
  classNames?: Partial<Record<ClassNameKey, string>>
  styles?: Partial<Record<StyleKey, string | Record<string, unknown>>>
}

export type ConfigProviderValue = Record<string, ConfigProviderComponentValue>
```

首期示例：

```ts
{
  Image: {
    classNames: {
      root: 'global-image-root',
    },
    styles: {
      image: 'border-radius: 12px;',
    },
  },
}
```

---

## 4. 合并规则

Provider 嵌套时只做一级覆盖：

```ts
function mergeProviderValue(parentValue: ConfigProviderValue | null, ownValue: ConfigProviderValue | null): ConfigProviderValue {
  return {
    ...(parentValue || {}),
    ...(ownValue || {}),
  }
}
```

含义：

- 父 provider 和子 provider 只在组件名这一层合并。
- 如果子 provider 提供了 `Image`，则父 provider 的整个 `Image` 配置被覆盖。
- `Image.classNames` 和 `Image.styles` 不做深合并。

示例：

```ts
outer = {
  Image: {
    classNames: { root: 'outer-root' },
  },
}

inner = {
  Image: {
    styles: { image: 'border-radius: 999px;' },
  },
}
```

最终结果：

```ts
{
  Image: {
    styles: { image: 'border-radius: 999px;' },
  },
}
```

---

## 5. 组件关系设计

### 5.1 ConfigProvider

`packages/miniprogram.config-provider/src/index.ts`

```ts
@Component({
  components: {
    ConfigProvider: () => ({
      module: '../miniprogram.config-provider/index',
      type: 'ancestor',
    }),
    Image: () => ({
      module: '../miniprogram.image/index',
      type: 'descendant',
    }),
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
})
```

说明：

- `ConfigProvider` 的嵌套关系只通过 `ConfigProvider -> ancestor ConfigProvider` 表达。
- `Image` 的 `descendant` 声明先保留，便于后续第二阶段扩展动态联动。
- 第一阶段主流程不依赖 `descendant` observer。

### 5.2 Image

`packages/miniprogram.image/src/index.ts`

```ts
@Component({
  components: {
    ConfigProvider: () => ({
      module: '../miniprogram.config-provider/index',
      type: 'ancestor',
    }),
  },
})
```

说明：

- Consumer 只声明自己依赖祖先 `ConfigProvider`。
- Consumer 不写额外 observer、订阅、解绑逻辑。

---

## 6. 虚拟组件方案

### 6.1 WXML

`packages/miniprogram.config-provider/src/index.wxml`

```wxml
<slot></slot>
```

### 6.2 `virtualHost`

`packages/miniprogram.config-provider/src/index.ts`

```ts
export default defineComponentHOC({
  options: {
    virtualHost: true,
  },
})(ConfigProvider)
```

### 6.3 前置注意

当前 `packages/miniprogram.core-js/src/miniprogram/defineComponentHOC.ts` 里没有把 `externalOptions.options` 合并进 `componentConf.options`。  
如果不修这里，`virtualHost: true` 可能不会真正生效。

这点属于现状风险，但因为你明确要求第一阶段不改 `core-js`，所以文档里先记为前置依赖/风险，不纳入本阶段实现。

---

## 7. 运行时存储

文件：`packages/miniprogram.config-provider/src/config-provider.ts`

建议把状态存进 `WeakMap<Doraemon, RuntimeState>`：

```ts
interface ConfigProviderRuntimeState {
  type: 'provider' | 'consumer'
  parentProvider: Doraemon | null
  ownValue: ConfigProviderValue | null
  mergedValue: ConfigProviderValue
  resolvedProvider: Doraemon | null
}
```

字段含义：

- `parentProvider`：当前 provider 最近祖先 provider。
- `ownValue`：当前 provider 自己的 `value`。
- `mergedValue`：当前 provider 的最终配置。
- `resolvedProvider`：consumer 首次读取时命中的最近 provider。

---

## 8. 初始化流程

### 8.1 ConfigProvider 初始化

`ConfigProvider` 在第一阶段只做初始化计算：

1. `beforeCreate`
   - 注册当前 Doraemon 实例的 runtime state。
2. `created`
   - 记录 `ownValue`。
3. `mounted`
   - 通过 `this.$refs.ConfigProvider` 获取最近祖先 provider。
   - 计算 `mergedValue = merge(parent.mergedValue, ownValue)`。
4. `unmounted`
   - 清理 runtime state。

注意：

- 第一阶段不要求处理 `value` 后续变化。
- `@Watch('value')` 可暂不实现，或只作为后续扩展占位。

### 8.2 Consumer 首次读取

consumer 不做额外生命周期逻辑。  
在 computed 中调用：

```ts
useComponentConfig(this, 'Image')
```

`useComponentConfig()` 内部流程：

1. 读取 `componentInstance.$refs.ConfigProvider`
2. 取最近祖先 provider 实例
3. 从 provider runtime state 上读取 `mergedValue['Image']`
4. 返回该配置

第一阶段只保证这个读取在首次初始化场景下成立。

---

## 9. `useComponentConfig()` 设计

签名固定为：

```ts
export function useComponentConfig<T extends ConfigProviderComponentValue = ConfigProviderComponentValue>(
  componentInstance: Doraemon,
  propName: string,
): T | undefined
```

这里：

- 第一个参数必须是 Doraemon 实例
- 第二个参数是组件名，如 `Image`

内部逻辑建议：

```ts
export function useComponentConfig(componentInstance: Doraemon, propName: string) {
  const providerRef = componentInstance.$refs.ConfigProvider
  const providerInstance = Array.isArray(providerRef) ? providerRef[0] : providerRef
  if (!providerInstance) return undefined

  const providerState = getRuntimeState(providerInstance as Doraemon)
  return providerState.mergedValue[propName]
}
```

说明：

- 第一阶段 `useComponentConfig()` 只负责读，不负责订阅，不负责刷新。
- 允许直接依赖 `this.$refs.ConfigProvider`。
- 不直接使用 `getRelationNodes`。

---

## 10. Image 接入方式

文件：`packages/miniprogram.image/src/index.ts`

第一阶段 consumer 只需要在 computed 中读取 provider 配置：

```ts
get mergedClassNames() {
  const imageConfig = useComponentConfig<ConfigProviderComponentValue<SemanticName>>(this, 'Image')
  return {
    ...(imageConfig?.classNames || {}),
    ...(this.classNames || {}),
  }
}

get mergedStyles() {
  const imageConfig = useComponentConfig<ConfigProviderComponentValue<SemanticName>>(this, 'Image')
  return {
    ...(imageConfig?.styles || {}),
    ...(this.styles || {}),
  }
}
```

说明：

- provider 侧不深合并。
- consumer 侧仍可再和实例自己的 `classNames` / `styles` 做一次浅合并。
- 这样局部传值可以覆盖 provider 给的默认值。

模板中把：

- `classNames.root`
- `classNames.image`
- `styles.root`
- `styles.image`

替换成：

- `mergedClassNames.root`
- `mergedClassNames.image`
- `mergedStyles.root`
- `mergedStyles.image`

---

## 11. 首阶段能力边界

第一阶段能保证：

1. 单层 provider + image，首次渲染拿到配置
2. 嵌套 provider + image，首次渲染拿到最近 provider 合并后的配置
3. image 自己传入的 `classNames` / `styles` 可覆盖 provider 默认值

第一阶段不保证：

1. provider `value` 变化后 image 自动更新
2. 条件渲染切换后的重新订阅
3. provider 销毁后的 consumer 配置迁移
4. 多 consumer 的动态联动刷新

这些都留到第二阶段。

---

## 12. 文件改动范围

第一阶段预计改动：

- `packages/miniprogram.config-provider/src/index.ts`
- `packages/miniprogram.config-provider/src/config-provider.ts`
- `packages/miniprogram.config-provider/src/types.ts`
- `packages/miniprogram.image/src/index.ts`
- `packages/miniprogram.image/src/index.wxml`

不改：

- `packages/miniprogram.core-js/*`

---

## 13. 风险与待后续处理项

### 13.1 `virtualHost` 风险

如果 `defineComponentHOC` 不透传 `options.virtualHost`，则 `ConfigProvider` 可能仍然有宿主节点。

### 13.2 初始化时机风险

第一阶段依赖：

- provider 在 consumer 首次执行 `useComponentConfig()` 前，已经完成 `mergedValue` 初始化

如果实际生命周期顺序不满足，需要再补一轮初始化时机确认。

### 13.3 第二阶段扩展点

后续如果要支持动态刷新，再补：

- provider -> consumer 的依赖登记
- provider `value` 变化后的 consumer 失效通知
- 条件渲染切换后的重新解析

---

## 14. 建议落地顺序

1. 先实现 `ConfigProvider` runtime state 和 `mergedValue` 初始化
2. 实现 `useComponentConfig(this, 'Image')`
3. 改 `Image` 读取 `mergedClassNames` / `mergedStyles`
4. 只验证首次初始化场景
5. 等这条链路跑通后，再设计第二阶段动态更新
