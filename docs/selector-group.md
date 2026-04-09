# SelectorGroup SelectorGroup

@doraemon-ui/miniprogram.selector-group

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.selector-group
# or
yarn add @doraemon-ui/miniprogram.selector-group
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/selector-group/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/selector-group/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/selector-group/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/selector-group/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### SelectorGroup props

| 参数      | 类型     | 描述           | 默认值              |
| --------- | -------- | -------------- | ------------------- |
| prefixCls | `string` | 自定义类名前缀 | dora-selector-group |

### SelectorGroup slot

| 名称 | 描述       |
| ---- | ---------- |
| -    | 自定义内容 |

### SelectorGroup externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性         | 描述     | 默认值 | 全局变量 |
| ------------ | -------- | ------ | -------- |
| --text-color | 文字颜色 | `#fff` | -        |
