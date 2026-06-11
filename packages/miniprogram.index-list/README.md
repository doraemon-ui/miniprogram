# IndexList 索引列表

`@doraemon-ui/miniprogram.index-list`

索引列表常用于通讯录、城市选择等需要按首字母快速定位的长列表场景。组件包同时提供 `dora-index-list` 和 `dora-index-list-item` 两个组件，分别负责索引容器和分组内容。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.index-list
# or
yarn add @doraemon-ui/miniprogram.index-list
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

```ts
export type IndexListIndicatorPosition = 'left' | 'center' | 'right'
```

### IndexList props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-index-list |
| height | `string \| number` | 组件高度 | 300 |
| showIndicator | `boolean` | 是否显示提示指示器 | true |
| indicatorPosition | `IndexListIndicatorPosition` | 提示指示器位置 | center |
| parentOffsetTop | `number` | 父容器顶部偏移 | 0 |
| bind:change | `(event: CustomEvent<{ index: number; name: string; brief: string }>) => void` | 当前激活索引切换时触发 | - |

### IndexList slot

| 名称 | 描述 |
| --- | --- |
| - | `dora-index-list-item` 列表 |

### IndexList externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |

### IndexListItem props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-index-list-item |
| name | `string` | 分组名称 | - |

### IndexListItem slot

| 名称 | 描述 |
| --- | --- |
| - | 分组下的自定义内容 |

### IndexListItem externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性 | 描述 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --dora-index-list-nav-size | 索引导航单项尺寸 | `20px` | - |
| --dora-index-list-nav-font-size | 索引导航字体大小 | `12px` | - |
| --dora-index-list-nav-padding-vertical | 索引导航垂直内边距 | `4px` | - |
| --dora-index-list-nav-padding-horizontal | 索引导航水平内边距 | `6px` | - |
| --dora-index-list-nav-activated-text-color | 当前索引文字颜色 | `rgba(255, 255, 255, 1)` | - |
| --dora-index-list-nav-activated-background-color | 当前索引背景色 | `#3880ff` | - |
| --dora-index-list-nav-activated-border-radius | 当前索引圆角 | `50%` | - |
| --dora-index-list-indicator-size | 提示指示器尺寸 | `48px` | - |
| --dora-index-list-indicator-background-color | 提示指示器背景色 | `rgba(0, 0, 0, 0.7)` | - |
| --dora-index-list-indicator-color | 提示指示器文字颜色 | `rgba(255, 255, 255, 1)` | - |
| --dora-index-list-indicator-font-size | 提示指示器字体大小 | `20px` | - |
| --dora-index-list-indicator-border-radius | 提示指示器圆角 | `var(--dora-border-radius, 8px)` | - |
| --dora-index-list-item-background-color | 分组标题背景色 | `var(--dora-color-step-15, #d9d9d9)` | - |
| --dora-index-list-item-size | 分组标题高度 | `28px` | - |
| --dora-index-list-item-padding-vertical | 分组标题垂直内边距 | `0` | - |
| --dora-index-list-item-padding-horizontal | 分组标题水平内边距 | `16px` | - |
