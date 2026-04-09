# Doraemon UI Component Type Refactor Prompt

你是一个 **高级工程重构 Agent**。

你的任务是 **重构 `packages` 目录下所有组件的 TypeScript 类型系统**，并统一所有组件的类型架构。

目标：

- 自动扫描组件
- 自动提取类型
- 自动生成 `types.ts`
- 自动迁移散落类型
- 自动修复 import
- 自动更新 `index.d.ts`
- 保证 TS 类型统一
- 保证编译通过

禁止向用户提问，直接执行。

---

# 一、扫描组件

扫描目录：

```sh
packages/
```

查找所有组件目录：

```sh
packages/miniprogram.\*
```

例如：

```sh
packages/miniprogram.button
packages/miniprogram.list
packages/miniprogram.dialog
```

对每一个组件执行 **类型重构流程**。

---

# 二、创建 types.ts

如果不存在：

```sh
packages/miniprogram.xxx/src/types.ts
```

必须创建。

示例：

```sh
touch packages/miniprogram.xxx/src/types.ts
```

**所有组件类型必须集中定义在此文件。**

包括：

- Props
- Expose
- Instance
- 组件子类型
- 内部辅助类型

禁止在其它文件定义组件类型。

---

# 三、扫描 src 目录类型

扫描：

```sh
packages/miniprogram.xxx/src/\*_/_.ts
```

检查是否存在：

- interface
- type
- enum
- 泛型定义

如果存在：

### 必须执行类型迁移

将这些类型 **全部迁移到**：

```sh
src/types.ts
```

然后：

- 删除原文件中的类型定义
- 修复 import

例如：

原文件：

```sh
src/index.ts
src/item.ts
src/panel.ts
```

存在：

```ts
interface XxxProps
type XxxOptions
```

必须移动到：

```sh
src/types.ts
```

---

# 三、参考组件实现规范

必须严格参考：

```sh
packages/miniprogram.list
```

保持以下一致：

- 类型写法
- 文件结构
- Props 命名
- Expose 命名
- Instance 定义

禁止：

- 发明新结构
- 改变类型架构

---

# 四、xxx.ts 组件类型融合规则

部分组件存在结构：

```sh
src/
index.ts
item.ts
panel.ts
xxx.ts
```

例如：

```sh
list/item.ts
toast/toast.ts
```

这些文件通常包含：

```ts
interface XxxProps
type XxxExpose
```

必须执行：

### 类型融合

将这些类型 **统一移动到**：

```sh
src/types.ts
```

并删除原文件中的类型。

---

# 五、修复 TypeScript 引入

迁移类型后必须修复所有 import：

例如原代码：

```ts
import type { ListItemProps } from './item'
```

必须改为：

```ts
import type { ListItemProps } from './types'
```

规则：

所有类型统一从 `types.ts` 引入

禁止跨文件类型定义

---

# 六、Props 类型生成规则

必须自动分析组件 `props` 及 `@Prop`。

转换为：

```ts
export interface XxxProps {}
```

规则：

字段名保持一致

类型自动推断

默认值保持一致

所有字段必须为可选

示例：

```ts
export interface ListProps {
  title?: string
  bordered?: boolean
}
```

**不要乱改src/.ts的prop类型定义**

规则：

若存在自定义类型如：

```ts
export type Position = 'bottom' | 'top' | 'left' | 'right' | 'center'
export interface PopupProps {
  position?: Position
  animationPrefixCls?: string
}
```

可改为：

```ts
@Prop({
  type: String,
  default: 'center',
})
position: PopupProps['position']
```

如非单独自定义`type`或`enum`类型，保持原样即可：这里不要使用**PopupProps['animationPrefixCls']**

```ts
@Prop({
  type: String,
  default: 'dora-animate',
})
animationPrefixCls: string
```

必须使用 interface 定义。

禁止使用 type。

# 七、Props 注释规则（强制）

生成 Props 类型时必须带 完整注释。

优先级：

1. 优先读取组件已有注释

例如：

```ts
/**
 * 过渡的类名
 *
 * @type {string}
 * @memberof Alert
 */
@Prop({
  type: null,
  default: 'dora-animate--fadeIn',
})
classNames: string
```

如果源码存在：

```ts
/**
 * 过渡的类名
 *
 * @type {string}
 */
```

必须复制到 Props。

2. 如果 `src/.ts` 文件中 `@Prop` 缺失注释必须从 `packages/miniprogram.xxx/README.md` 文件中读取自动补充jsdoc注释

首先 `src/.ts` 文件的组件必须补充：

```ts
/**
 * title 属性
 *
 * @type {string}
 * @memberof Xxx
 */
title?: string
```

规则：

- 必须包含 @type
- 必须包含 @memberof
- 必须包含中文描述
- 注释结构必须统一

其次 `src/types` 文件 prop 定义补充注释

```ts
/**
 * 过渡的类名
 *
 * @type {string}
 */
classNames?: string
```

规则：

- 两边的prop注释中文描述必须一致
- 两边的prop注释@type必须一致
- 两边的prop注释结构必须统一

# 八、Expose 类型生成规则

如果组件存在：

`expose` 对应为 `class method` 同名函数

必须自动转换为：

```ts
export interface XxxExpose {}
```

示例：

```ts
@Component({
  expose: ['open', 'close'],
})

export interface DialogExpose {
  open(): void
  close(): void
}
```

规则：

expose 名保持一致

参数类型 `class method` 一致，自动推断

返回值与 `class method` 一致，自动推断

# 九、Expose 注释规则（强制

每一个方法必须有注释。

优先级：

1. 优先读取 methods 原注释

2. 如果没有必须自动生成

示例：

```ts
/**
 * 获取组件尺寸
 *
 * @return {Promise<MiniprogramDOMRect>}
 */
getBoundingClientRect(): Promise<MiniprogramDOMRect>
```

# 十、Instance 类型生成规则

必须生成：

```ts
import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
```

然后定义：

```ts
export type XxxInstance = ComponentPublicInstance<Xxx, XxxProps, XxxExpose>
```

# 十一、组件类导出规则

如果组件文件：

```sh
src/index.ts
src/item.ts
src/panel.ts
```

存在组件类但没有具名导出：

必须补充：

```ts
export { Xxx }
```

并保持默认导出：

```ts
export default defineComponentHOC()(Xxx)
```

# 十二、跨组件类型引用

如果组件依赖其它组件：

例如：

```sh
List
ListItem
```

必须自动导入：

```ts
import type { ListItem } from './item'
```

规则：

必须使用 import type

禁止普通 import

# 十三、示例结构

示例：

```ts
import type { ComponentPublicInstance } from '@doraemon-ui/miniprogram.core-js'
import type { MiniprogramDOMRect } from '@doraemon-ui/miniprogram.shared'

import type { List } from './index'
import type { ListItem } from './item'

export interface ListItemProps {
  title?: string
  label?: string
}

export interface ListItemExpose {
  updateIsLast(isLast: boolean): void
}

export type ListItemInstance = ComponentPublicInstance<ListItem, ListItemProps, ListItemExpose>

export interface ListProps {
  title?: string
}

export interface ListExpose {
  getBoundingClientRect(): Promise<MiniprogramDOMRect>
}

export type ListInstance = ComponentPublicInstance<List, ListProps, ListExpose>
```

# 十四、index.d.ts 导出规则（必须）

每个组件目录：

```sh
packages/miniprogram.xxx/index.d.ts
```

必须包含：

```ts
export * from './src'

export type * from './src/types'
```

如果文件不存在必须创建。

如果缺少类型导出必须补充。

禁止删除已有导出。

# 十五、代码质量规则（强制）

生成代码必须满足：

TypeScript 无报错

ESLint 无报错

Jest 测试通过

项目可以正常编译

禁止输出：

TODO

FIXME

占位符

未完成代码

# 十六、执行顺序

必须 串行逐个组件执行：

```sh
packages/miniprogram.button
packages/miniprogram.avatar
packages/miniprogram.list
packages/miniprogram.popup
```

...

每个组件必须完整完成后再处理下一个。

禁止并行。

# 十七、输出规则

每完成一个组件输出：

✔ Component: xxx

如果组件已经完成：

✔ Skip: xxx already exists

禁止输出其它解释内容。

# 十八、执行开始

立即扫描 packages 目录。

开始逐个组件执行 类型重构流程。
