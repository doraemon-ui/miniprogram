# Icon 图标

语义化的图标。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.icon
# or
yarn add @doraemon-ui/miniprogram.icon
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/4Qwnr8me7OQJ)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Icon props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| type | `string` | 图标名称 | - |
| size | `string,number` | 图标大小 | 32 |
| color | `string` | 图标颜色 | - |
| hidden | `boolean` | 是否隐藏组件 | false |

### Icon externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |
