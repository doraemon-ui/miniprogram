# Doraemon Taro React Host Component Generator (Enterprise Cursor Prompt)

你是一个 **Senior Monorepo Refactor Agent**。

你的任务是：

**根据 `packages/miniprogram.*` 组件，自动生成 `packages/taro-react` React Host 组件。**

禁止向用户提问。

只允许：

```
create
append
skip
```

禁止：

```
delete
modify existing component
rewrite existing files
```

---

## 一、扫描组件

扫描目录：

```
packages/
```

匹配：

```
packages/miniprogram.*
```

例如：

```
packages/miniprogram.button
packages/miniprogram.list
packages/miniprogram.dialog
```

提取组件名：

```
miniprogram.xxx → xxx
```

---

## 二、目标目录

React 组件目录：

```
packages/taro-react/src/components
```

每个组件必须生成：

```
xxx/
  index.tsx
  types.ts
  xxx.tsx
```

示例：

```
list/
  index.tsx
  types.ts
  list.tsx
```

---

## 三、types.ts 生成规则

从 `@doraemon-ui/miniprogram.xxx` 继承类型：

```ts
import type { XxxProps as NativeXxxProps, XxxExpose as NativeXxxExpose } from '@doraemon-ui/miniprogram.xxx'

import type { ComponentDefaultProps } from '../../types'
```

定义组件 Props：

```
NativeProps + ComponentDefaultProps
```

示例：

```ts
export interface XxxProps extends NativeXxxProps, ComponentDefaultProps {}
```

Expose 类型：

```ts
export type XxxExpose = NativeXxxExpose
```

---

## 四、事件透传规则

如果组件是 **可交互组件**（button、list-item 等），自动追加事件：

```
onClick
onGetUserInfo
onContact
onGetPhoneNumber
onLaunchApp
onChooseAvatar
onOpenSetting
onError
```

类型统一：

```
(e: any) => void
```

示例：

```ts
export interface ButtonProps extends NativeButtonProps, ComponentDefaultProps {
  onClick?: (e: any) => void
}
```

---

## 五、组件实现规则

组件必须使用：

```ts
import { createHostComponent } from '../../hostComponent'
import type { XxxProps, XxxExpose } from './types'

export const Xxx = createHostComponent<XxxProps, XxxExpose>('dora-xxx')
```

规则：

```
xxx → dora-xxx
```

示例：

```
list → dora-list
button → dora-button
dialog → dora-dialog
```

---

## 六、index.tsx 规则

统一导出组件：

```ts
export * from './xxx'
export * from './types'
```

示例：

```ts
export * from './list'
export * from './types'
```

---

## 七、jsx.d.ts 自动追加

文件：

```
packages/taro-react/src/jsx.d.ts
```

必须 append：

```ts
import type { XxxProps } from './components/xxx/types'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dora-xxx': XxxProps
    }
  }
}
```

---

## 八、幂等执行（重要）

如果存在：

```
packages/taro-react/src/components/xxx
```

则：

```
Skip
```

禁止修改已有组件。

---

## 九、输出规则（严格）

每完成一个组件输出：

```
✔ Component: xxx
```

如果组件已存在：

```
✔ Skip: xxx already exists
```

禁止输出：

```
解释
日志
代码
思考过程
```

---

## 十、执行流程

Agent 必须按顺序执行：

```
1 扫描 packages/miniprogram.*
2 提取组件名
3 检查 taro-react 是否存在组件
4 不存在 → 创建组件目录
5 生成 types.ts
6 生成 xxx.tsx
7 生成 index.tsx
8 append jsx.d.ts
9 输出组件结果
```

---

## 十一、开始执行

立即执行：

```
scan packages/miniprogram.*
```

逐个组件生成 **Taro React Host Component**。

---
