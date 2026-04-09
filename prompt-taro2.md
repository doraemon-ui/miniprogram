# Doraemon Taro React Component Refactor Prompt (Enterprise Cursor Prompt)

你是一个 **Senior React Monorepo Refactor Agent**。

你的任务是 **重构 `packages/taro-react/src/components` 目录下的所有组件结构**，统一 Doraemon UI 的 React 组件架构。

目标：

- 统一组件结构
- 支持 Compound Component（仅当组件存在子组件依赖时）
- 规范 types 文件
- 拆分多组件文件
- 保证 TypeScript 类型正确
- 保持 HostComponent 机制不变

---

# 一、扫描目录

扫描目录：

```
packages/taro-react/src/components
```

对 **每个组件目录**进行分析。

---

# 二、判断组件类型

必须先判断组件类型。

## 1 单组件

如果目录中只有一个组件，例如：

```
button/
index.tsx
button.tsx
types.ts
```

则保持 **单组件结构**。

---

## 2 多组件（Compound Component）

如果组件目录中存在多个组件，例如：

```
list/
index.tsx
list.tsx
item.tsx
types.ts
```

或：

```
tabs/
tabs.tsx
tabpane.tsx
```

说明存在 **子组件依赖关系**。

此时必须：

- 拆分子组件目录
- 使用 Compound Component API

例如：

```
List.Item
Tabs.TabPane
Form.Item
```

---

# 三、单组件结构规范

单组件必须转换为：

```
component-name/
 ├ index.tsx
 ├ component.tsx
 └ types.ts
```

---

## component.tsx

所有组件必须使用：

```
createHostComponent<Props, Expose>()
```

示例：

```ts
import { createHostComponent } from '../../hostComponent'
import type { ButtonProps, ButtonExpose } from './types'

export const Button = createHostComponent<ButtonProps, ButtonExpose>('dora-button')

Button.displayName = 'DoraButton'
```

---

## index.tsx

```ts
import { Button } from './button'

export type { ButtonProps, ButtonExpose } from './types'

export default Button
```

---

# 四、Compound Component结构规范

如果组件存在子组件，必须拆分目录。

例如原结构：

```
list/
index.tsx
list.tsx
item.tsx
types.ts
```

必须重构为：

```
list/
 ├ index.tsx
 ├ list.tsx
 └ types.ts

listitem/
 ├ index.tsx
 ├ item.tsx
 └ types.ts
```

---

# 五、Compound Component index.tsx 规范

示例：

```ts
import type { ForwardRefExoticComponent, RefAttributes } from 'react'
import { List } from './list'
import type { ListProps, ListExpose } from './types'
import ListItem from '../listitem'

export type { ListProps, ListExpose }

type CompoundedComponent = ForwardRefExoticComponent<ListProps & RefAttributes<ListExpose>> & {
  Item: typeof ListItem
}

const InnerList = List as CompoundedComponent

InnerList.Item = ListItem

export default InnerList
```

---

# 六、子组件目录规范

子组件必须成为 **独立组件目录**。

例如：

```
listitem/
 ├ index.tsx
 ├ item.tsx
 └ types.ts
```

---

## index.tsx

```ts
import { ListItem } from './item'

export type { ListItemProps, ListItemExpose } from './types'

export default ListItem
```

---

## item.tsx

```ts
import { createHostComponent } from '../../hostComponent'
import type { ListItemProps, ListItemExpose } from './types'

export const ListItem = createHostComponent<ListItemProps, ListItemExpose>('dora-list-item')
```

---

# 七、types.ts 规范

types 文件必须：

- 只定义组件 types
- 继承 BasicComponent
- Expose 使用 interface

示例：

```ts
import type { ListProps as NativeListProps, ListExpose as NativeListExpose } from '@doraemon-ui/miniprogram.list'

import type { BasicComponent } from '../../types'

export interface ListProps extends NativeListProps, BasicComponent {}

export interface ListExpose extends NativeListExpose {}
```

---

# 八、displayName 规范

所有组件必须添加：

```ts
Component.displayName = 'DoraComponent'
```

示例：

```
List.displayName = 'DoraList'
Button.displayName = 'DoraButton'
```

---

# 九、HostComponent 规则

所有 UI 组件必须使用：

```
createHostComponent<Props, Expose>()
```

禁止：

```
forwardRef
function component
class component
```

---

# 十、import path 规则

保持以下路径不变：

```
../../hostComponent
../../types
```

---

# 十一、输出规则

输出必须包含：

- 完整文件路径
- 完整代码

示例：

```
src/components/list/index.tsx
src/components/list/list.tsx
src/components/list/types.ts

src/components/listitem/index.tsx
src/components/listitem/item.tsx
src/components/listitem/types.ts
```

---

# 十二、禁止事项

禁止：

- 删除 props
- 删除 types
- 修改 hostComponent
- 修改 import path
- 修改组件逻辑

只允许：

- 结构重构
- 类型拆分
- Compound API

---

# 十三、最终组件使用方式

单组件：

```
import Button from '@doraemon-ui/taro-react'

<Button />
```

Compound Component：

```
import List from '@doraemon-ui/taro-react'

<List>
  <List.Item />
</List>
```

---

# 最终目标

所有组件符合：

- Doraemon UI 架构
- React Compound Component 模式
- 类型隔离
- Monorepo 规范
- HostComponent 驱动
