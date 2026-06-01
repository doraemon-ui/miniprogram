# Tag Tag

@doraemon-ui/miniprogram.tag

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.tag
# or
yarn add @doraemon-ui/miniprogram.tag
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Tag props

```ts
export type PresetColor = 'light' | 'stable' | 'positive' | 'calm' | 'balanced' | 'energized' | 'assertive' | 'royal' | 'dark'
```

| 参数           | 类型                             | 描述                 | 默认值   |
| -------------- | -------------------------------- | -------------------- | -------- |
| prefixCls      | `string`                         | 自定义类名前缀       | dora-tag |
| hoverClass     | `string`                         | 点击态类名           | default  |
| color          | `PresetColor \| string`          | 标签颜色             | -        |
| fill           | `'fill' \| 'solid' \| 'outline'` | 填充类型             | fill     |
| closable       | `boolean`                        | 是否可关闭           | false    |
| defaultVisible | `boolean`                        | 默认是否可见         | true     |
| visible        | `boolean`                        | 是否可见             | true     |
| controlled     | `boolean`                        | 是否受控             | false    |
| bind:change    | `(event: CustomEvent) => void`   | 标签显示状态变化时触发 | -      |
| bind:click     | `(event: CustomEvent) => void`   | 点击标签时触发       | -        |
| bind:close     | `(event: CustomEvent) => void`   | 关闭按钮点击时触发   | -        |

### Tag Semantic DOM

| 参数  | 描述                         | 示例                                                                                                              |
| ----- | ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| root  | 根元素，设置容器样式和布局   | info[wxml]>`<dora-tag classNames="{{ { root: 'my-classname' } }}" styles="{{ { root: { color: 'red' } } }}" />`  |
| icon  | 图标元素，设置图标样式       | info[wxml]>`<dora-tag classNames="{{ { icon: 'my-classname' } }}" styles="{{ { icon: { color: 'red' } } }}" />`  |
| hover | 按压元素，按钮按下去的样式类 | info[wxml]>`<dora-tag classNames="{{ { hover: 'my-classname' } }}" styles="{{ { hover: { color: 'red' } } }}" />` |

### Tag slot

| 名称 | 描述       |
| ---- | ---------- |
| -    | 自定义内容 |

### Tag externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性               | 描述     | 默认值        | 全局变量 |
| ------------------ | -------- | ------------- | -------- |
| --text-color       | 文字颜色 | `#fff`        | -        |
| --background-color | 背景颜色 | `#f5f5f5`     | -        |
| --border-color     | 边框颜色 | `transparent` | -        |
