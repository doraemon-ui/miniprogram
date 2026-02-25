# SafeArea 安全区

@doraemon-ui/miniprogram.safe-area

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.safe-area
# or
yarn add @doraemon-ui/miniprogram.safe-area
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/safe-area/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/5xwvg8m379Qi)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/safe-area/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/safe-area/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/safe-area/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### SafeArea props

```ts
export type SafeAreaConfig = {
  top: boolean
  bottom: boolean
}

export type SafeAreaProp = boolean | 'top' | 'bottom' | SafeAreaConfig

export type SafeAreaStyle = 'default' | 'navBar' | 'statusBar'
```

| 参数          | 类型            | 描述                                                                              | 默认值         |
| ------------- | --------------- | --------------------------------------------------------------------------------- | -------------- |
| prefixCls     | `string`        | 自定义类名前缀                                                                    | dora-safe-area |
| safeArea      | `SafeAreaProp`  | 是否开启安全区适配                                                                | false          |
| safeAreaStyle | `SafeAreaStyle` | 安全区的范围，当其值为 default 或 navBar，顶部计算的安全区包含 StatusBar & NavBar | default        |
| forceRender   | `boolean`       | 当其值为 false 时，组件内部会判断是否刘海屏，进而计算出安全区的距离               | false          |
| supports      | `boolean`       | 使用 css 的 @supports 属性适配安全区                                              | false          |
| wrapStyle     | `object`        | 自定义样式                                                                        | -              |

### SafeArea slot

| 名称 | 描述       |
| ---- | ---------- |
| -    | 自定义内容 |

### SafeArea externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性           | 描述                       | 默认值 | 全局变量                        |
| -------------- | -------------------------- | ------ | ------------------------------- |
| --inset-top    | 安全区域距离顶部边界的距离 | `44PX` | `--dora-safe-area-inset-top`    |
| --inset-bottom | 安全区域距离底部边界的距离 | `34PX` | `--dora-safe-area-inset-bottom` |
| --multiple     | 显示的倍数                 | `1`    | `--dora-safe-area-multiple`     |
