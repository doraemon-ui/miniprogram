# Avatar Avatar

@doraemon-ui/miniprogram.avatar

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.avatar
# or
yarn add @doraemon-ui/miniprogram.avatar
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

### Avatar props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-avatar |
| shape | `'circle' \| 'square'` | 头像形状 | circle |
| size | `'small' \| 'default' \| 'large'` | 头像尺寸 | default |
| src | `string` | 头像图片地址，优先级高于插槽文字 | - |
| bodyStyle | `string \| Partial<CSSStyleDeclaration>` | 自定义外层容器样式，最终会转换为内联样式 | - |
| scale | `boolean` | 当为文字头像且内容过长时，是否自动缩放文字以适应容器宽度 | false |

### Avatar slot

| 名称 | 描述       |
| ---- | ---------- |
| -    | 自定义内容 |

### Avatar externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性 | 描述 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --container-size | 默认头像尺寸 | `40px` | - |
| --container-size-sm | 小号头像尺寸 | `32px` | - |
| --container-size-lg | 大号头像尺寸 | `48px` | - |
| --font-size | 默认文字字号 | `14px` | - |
| --font-size-sm | 小号文字字号 | `12px` | - |
| --font-size-lg | 大号文字字号 | `16px` | - |
| --square-border-radius | 矩形头像圆角大小 | `var(--dora-border-radius, 8px)` | `--dora-border-radius` |
