# @doraemon-ui/taro-react

> Taro React 组件库 —— 为 doraemon-ui 原生微信小程序组件提供类型安全的 React 封装。

## 安装

```bash
pnpm add @doraemon-ui/taro-react
```

## 配置

### 1. 注册 Taro 插件

在 `config/index.ts` 中添加插件，自动处理原生组件的复制和注册：

```ts
export default defineConfig({
  plugins: ['@doraemon-ui/taro-react/plugin/taro-react-plugin'],
})
```

### 2. 手动注册（可选）

如果不使用插件，也可以在 `app.config.ts` 中手动声明：

```ts
export default defineAppConfig({
  usingComponents: {
    'dora-list': 'miniprogram_npm/@doraemon-ui/miniprogram/list/index',
    'dora-list-item': 'miniprogram_npm/@doraemon-ui/miniprogram/list/item',
  },
})
```

## 使用

```tsx
import { List, ListItem } from '@doraemon-ui/taro-react'

export default function Index() {
  return (
    <List title="设置" hasLine>
      <ListItem title="账户管理" isLink />
      <ListItem title="通知" extra="已开启" isLink />
    </List>
  )
}
```
