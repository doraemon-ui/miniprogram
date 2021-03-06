# Popup 弹出框

用于显示弹出框。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.popup
# or
yarn add @doraemon-ui/miniprogram.popup
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./proscenium/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/ey5yRUmH7buy)

<!-- tabs:start -->

#### **WXML**

[wxml](./proscenium/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./proscenium/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./proscenium/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Popup props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-popup |
| animationPrefixCls | `string` | 自定义 animation 类名前缀 | dora-animate |
| position | `string` | 弹出层位置信息，可选值为 center、top、right、bottom、left | center |
| bodyStyle | `object` | 自定义 body 样式 | - |
| mask | `boolean` | 是否显示蒙层 | true |
| maskClosable | `boolean` | 点击蒙层是否允许关闭 | true |
| maskTransparent | `boolean` | 是否显示透明蒙层 | false |
| maskStyle | `object` | 蒙层的样式 | - |
| visible | `boolean` | 是否可见 | false |
| zIndex | `number` | 设置蒙层的 z-index | 1000 |
| mountOnEnter | `boolean` | 首次进入过渡时是否懒挂载组件 | true |
| unmountOnExit | `boolean` | 离开过渡完成时是否卸载组件 | true |
| bind:close | `function` | 点击关闭按钮或蒙层的回调函数 | - |
| bind:closed | `function` | 关闭后的回调函数 | - |

### Popup externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |
