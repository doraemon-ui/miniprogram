# Accordion 手风琴

可以折叠/展开的内容区域。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.accordion
# or
yarn add @doraemon-ui/miniprogram.accordion
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/O5Vlo7mN7NQB)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Accordion props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-accordion |
| defaultCurrent | `string[]` | 默认激活 tab 面板的 key，当 `controlled` 为 `false` 时才生效 | - |
| current | `string[]` | 用于手动激活 tab 面板的 key，当 `controlled` 为 `true` 时才生效 | - |
| controlled | `boolean` | 是否受控 [说明文档](controlled.md) | false |
| accordion | `boolean` | 是否手风琴模式 | false |
| title | `string` | 标题 | - |
| label | `string` | 描述 | - |
| bind:change | `(event: CustomEvent<{ key: string \| string[]; keys: Panel[] }>) => void` | 切换面板的回调函数 | - |

### AccordionPanel props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-accordion-panel |
| key | `string` | 当前激活 tab 索引 | - |
| thumb | `string` | 左侧缩略图 | - |
| title | `string` | 左侧标题 | - |
| content | `string` | 面板内容 | - |
| disabled | `boolean` | 是否禁用 | false |
| showArrow | `boolean` | 是否显示箭头图标 | true |

### AccordionPanel slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |
| header | 自定义左侧标题 |

### AccordionPanel externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |
