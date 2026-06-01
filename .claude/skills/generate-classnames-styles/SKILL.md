---
name: generate-classnames-styles
description: 为 Doraemon UI 小程序组件补充 rootClassName/rootStyle 与语义化 classNames/styles 自定义能力。适用于需要扫描 packages 组件，并同步更新 index.ts、types.ts 与 WXML 模板的任务，让组件暴露根节点快捷 props 和 classNames/styles props，根据 classes key 推导 SemanticName，并接入 useCSSVarCls、useSemanticClassNames、useSemanticStylesString。
allowed-tools: Bash(npm *), Read, Grep, Write
---

# Generate Classnames Styles

## 概述

使用这个 skill 为 Doraemon UI 小程序组件补齐语义化 class 和 style 扩展点。按组件逐个处理 `packages` 下的代码，并尽量沿用当前组件已有的结构、命名和实现习惯。

语义化能力同时包含两层入口：

- `rootClassName` / `rootStyle`：根节点快捷自定义入口，兼容常用根元素扩展。
- `classNames` / `styles`：按 `SemanticName` 暴露的多语义节点自定义入口。

## 工作流程

1. 扫描 `packages` 中包含 `index.ts`、`types.ts` 和 WXML 文件的组件目录。
2. 修改前先阅读当前组件的 `classes` getter、已有样式 getter 和模板绑定方式。
3. 从 `classes` 返回对象的 key 推导 `SemanticName`：
   - 排除 `hover`。
   - 将 `wrap` 改名为 `root`。
   - 其他语义 key 保持原名，例如 `icon`。
4. 同步更新 `index.ts`、`types.ts` 和 WXML，确保运行时 props、TypeScript 类型、计算类名/样式和模板绑定一致。
5. 根据项目已有脚本运行格式化、类型检查、构建或定向测试。

## index.ts props

在 `@Component({ props: { ... } })` 的 `prefixCls` 后面补充：

```ts
rootClassName: {
  type: String,
  default: '',
},
rootStyle: {
  type: null,
  default: null,
},
classNames: {
  type: Object,
  default: () => ({}),
},
styles: {
  type: Object,
  default: () => ({}),
},
```

如果组件已经存在 `rootClassName`、`rootStyle`、`classNames` 或 `styles`，保留当前行为，只补齐缺失部分或做必要的规范化。

## index.ts 类字段

在组件类的 `prefixCls` 字段后面补充：

```ts
rootClassName!: string
rootStyle!: string | Partial<CSSStylePropertiesWithVars>
classNames!: Partial<Record<SemanticName, string>>
styles!: Partial<Record<SemanticName, CSSStylePropertiesWithVars | string>>
```

确保存在类型依赖：

```ts
import type { CSSStylePropertiesWithVars } from '@doraemon-ui/miniprogram.core-js'
```

如果 `index.ts` 已经从本地 `types.ts` 引入组件 props/types，也从同一处引入 `SemanticName`。遵循文件当前的 import 风格，避免重复 import。

## types.ts

新增或更新语义名称联合类型：

```ts
export type SemanticName = 'root' | 'icon'
```

实际值必须来自当前组件的 `classes` getter。不要包含 `hover`；如果原 key 是 `wrap`，在类型中使用 `root`。

在组件 props interface 的 `prefixCls` 后面补充：

```ts
rootClassName?: string
rootStyle?: string | Partial<CSSStylePropertiesWithVars>
classNames?: Partial<Record<SemanticName, string>>
styles?: Partial<Record<SemanticName, CSSStylePropertiesWithVars | string>>
```

确保 `types.ts` 存在类型依赖：

```ts
import type { CSSStylePropertiesWithVars } from '@doraemon-ui/miniprogram.core-js'
```

保留已有 JSDoc 和 prop 顺序。如果 `prefixCls` 带注释块，就把新属性插在该属性后面。

## 运行时 class 接入

确保 `index.ts` 引入：

```ts
import { useCSSVarCls, useSemanticClassNames, useSemanticStylesString } from '@doraemon-ui/miniprogram.shared'
```

所有类名变化都收敛到 `classes` getter 中。`root` 语义类必须包含 `useCSSVarCls(prefixCls)`。

`rootClassName` 是根节点快捷类名，必须合并进 `internalClassNames.root`，并与组件内部类名一起交给 `useSemanticClassNames`。参考 `button` 的优先结构：组件内部 root 类、`rootClassName`、CSS 变量类、颜色类和状态 modifier 都先组成 `internalClassNames.root`，最后再通过 `this.classNames` 叠加语义类名。

参考模式：

```ts
get classes() {
  const { prefixCls, rootClassName } = this
  const internalClassNames = {
    root: classNames(prefixCls, rootClassName, useCSSVarCls(prefixCls)),
    icon: `${prefixCls}__icon`,
  }
  return useSemanticClassNames(undefined, internalClassNames, this.classNames)
}
```

组件自身的逻辑，例如预设颜色类、active/disabled modifier、hover class 计算，都保留在 `internalClassNames` 中。如果存在 `hover`，继续让模板读取 `classes.hover`，但不要把它加入 `SemanticName`。

## 运行时 style 接入

将语义化样式输出收敛到返回 `useSemanticStylesString(...)` 的 getter 中。优先保留组件已有 getter 名称；没有时使用 `mergedStyles`。

`rootStyle` 是根节点快捷样式，必须放进 `internalStyles.root`，并与组件内部动态 style 一起作为 `useSemanticStylesString` 的第一个参数；`this.styles` 作为第二个参数叠加语义样式。`rootStyle` 允许传字符串或对象，类型参考 `button`。

参考模式：

```ts
get mergedStyles() {
  const { rootStyle } = this
  return useSemanticStylesString(
    {
      root: rootStyle || {},
    },
    this.styles,
  )
}
```

所有动态 inline style 都放在这个 getter 内处理。第一个参数只放 WXML 中真实存在、并且属于 `SemanticName` 的语义 key。

## WXML

把模板绑定改为读取语义化 class 和 style：

```xml
<view class="dora-class {{ classes.root }}" style="{{ mergedStyles.root }}">
  <view class="{{ classes.icon }}" style="{{ mergedStyles.icon }}"></view>
</view>
```

保留已有指令和事件绑定，例如 `wx:if`、`bindtap`、`catchtap`。如果模板使用 `hover-class`，并且内部仍有 hover 类名，则继续绑定到：

```xml
hover-class="{{ classes.hover }}"
```

## 检查清单

- `prefixCls`、`rootClassName`、`rootStyle`、`classNames`、`styles` 同时存在于运行时 props 和 TypeScript props。
- `SemanticName` 与模板语义 key 一致，排除 `hover`，并把 `wrap` 映射为 `root`。
- `root` 包含 `rootClassName` 和 `useCSSVarCls(prefixCls)`。
- `classes` 返回 `useSemanticClassNames(undefined, internalClassNames, this.classNames)`。
- 样式 getter 返回 `useSemanticStylesString(internalStyles, this.styles)`，且 `internalStyles.root` 包含 `rootStyle`。
- WXML 统一使用 `classes.<semantic>` 和 `mergedStyles.<semantic>`。
- 类型 import 使用 type-only，且没有引入重复 import。
