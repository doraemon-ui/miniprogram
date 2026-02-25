# Button 按钮

按钮组件用于响应用户点击行为，触发相应的业务逻辑，预设 9 种颜色 `light`, `stable`, `positive`, `calm`, `assertive`, `balanced`, `energized`, `royal`, `dark` 可选用。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.button
# or
yarn add @doraemon-ui/miniprogram.button
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/button/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/FLuL88mL79Q8)

!> 目前，设置了 form-type 的 button 只会对当前组件中的 form 有效。因而，将 button 封装在自定义组件中，而 form 在自定义组件外，将会使这个 button 的 form-type 失效。

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/button/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/button/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/button/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Button props

```ts
export type PresetColor = 'light' | 'stable' | 'positive' | 'calm' | 'balanced' | 'energized' | 'assertive' | 'royal' | 'dark'

export type NativeButtonOpenType =
  | 'contact'
  | 'liveActivity'
  | 'share'
  | 'getPhoneNumber'
  | 'getRealtimePhoneNumber'
  | 'getUserInfo'
  | 'launchApp'
  | 'openSetting'
  | 'feedback'
  | 'chooseAvatar'
  | 'agreePrivacyAuthorization'
```

| 参数                           | 类型                                                 | 描述                                                                                                                                 | 默认值       |
| ------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| prefixCls                      | `string`                                             | 自定义类名前缀                                                                                                                       | dora-button  |
| color                          | `PresetColor`                                        | 按钮颜色                                                                                                                             | positive     |
| fill                           | `'solid' \| 'outline' \| 'clear'`                    | 填充模式                                                                                                                             | solid        |
| expand                         | `'block' \| 'full'`                                  | 扩展模式                                                                                                                             | -            |
| size                           | `'small' \| 'default' \| 'large'`                    | 按钮的大小                                                                                                                           | default      |
| shape                          | `'rounded' \| 'rectangular'`                         | 按钮的形状                                                                                                                           | -            |
| strong                         | `boolean`                                            | 是否粗体字体                                                                                                                         | false        |
| disabled                       | `boolean`                                            | 是否禁用                                                                                                                             | false        |
| loading                        | `boolean`                                            | 名称前是否带 loading 图标                                                                                                            | false        |
| formType                       | `string`                                             | ~~用于 `<form/>` 组件，点击分别会触发 `<form/>` 组件的 submit/reset 事件~~                                                           | -            |
| openType                       | `NativeButtonOpenType`                               | 微信开放能力                                                                                                                         | -            |
| hoverClass                     | `string`                                             | 指定按钮按下去的样式类。当 hover-class="none" 时，没有点击态效果                                                                     | default      |
| hoverStopPropagation           | `boolean`                                            | 指定是否阻止本节点的祖先节点出现点击态                                                                                               | false        |
| hoverStartTime                 | `number`                                             | 按住后多久出现点击态，单位毫秒                                                                                                       | 20           |
| hoverStayTime                  | `number`                                             | 手指松开后点击态保留时间，单位毫秒                                                                                                   | 70           |
| lang                           | `'zh_CN' \| 'zh_TW' \| 'en'`                         | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。                                                                    | en           |
| sessionFrom                    | `string`                                             | 会话来源                                                                                                                             | -            |
| sendMessageTitle               | `string`                                             | 会话内消息卡片标题                                                                                                                   | 当前标题     |
| sendMessagePath                | `string`                                             | 会话内消息卡片点击跳转小程序路径                                                                                                     | 当前分享路径 |
| sendMessageImg                 | `string`                                             | 会话内消息卡片图片                                                                                                                   | 截图         |
| showMessageCard                | `boolean`                                            | 显示会话内消息卡片                                                                                                                   | false        |
| phoneNumberNoQuotaToast        | `boolean`                                            | 手机号快速验证或手机号实时验证额度用尽时，是否对用户展示“申请获取你的手机号，但该功能使用次数已达当前小程序上限，暂时无法使用”的提示 | true         |
| appParameter                   | `string`                                             | 打开 APP 时，向 APP 传递的参数                                                                                                       | -            |
| bind:click                     | `(event: CustomEvent) => void`                       | 点击事件                                                                                                                             | -            |
| bind:getuserinfo               | `(event: CustomEvent<ButtonGetUserInfo>) => void`    | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致                                                 | -            |
| bind:contact                   | `(event: CustomEvent<ButtonContact>) => void`        | 客服消息回调                                                                                                                         | -            |
| bind:getphonenumber            | `(event: CustomEvent<ButtonGetPhoneNumber>) => void` | 获取用户手机号回调                                                                                                                   | -            |
| bind:launchapp                 | `(event: CustomEvent<ButtonLaunchApp>) => void`      | 打开 APP 成功的回调                                                                                                                  | -            |
| bind:error                     | `(event: CustomEvent<ButtonError>) => void`          | 当使用开放能力时，发生错误的回调                                                                                                     | -            |
| bind:opensetting               | `(event: CustomEvent<ButtonOpenSetting>) => void`    | 在打开授权设置页后回调                                                                                                               | -            |
| bind:chooseavatar              | `(event: CustomEvent<ButtonChooseAvatar>) => void`   | 获取用户头像回调                                                                                                                     | -            |
| bind:createliveactivity        | `(event: CustomEvent) => void`                       | 新的一次性订阅消息下发机制回调                                                                                                       | -            |
| bind:getrealtimephonenumber    | `(event: CustomEvent) => void`                       | 手机号实时验证回调                                                                                                                   | -            |
| bind:agreeprivacyauthorization | `(event: CustomEvent) => void`                       | 用户同意隐私协议事件回调                                                                                                             | -            |

> 更多参数说明请参考微信官方的表单组件 [Button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)。

### Button slot

| 名称 | 描述       |
| ---- | ---------- |
| -    | 自定义内容 |

### Button externalClasses

| 名称             | 描述               |
| ---------------- | ------------------ |
| dora-class       | 根节点样式类       |
| dora-hover-class | 按钮按下去的样式类 |

## CSS Variables

| 属性                         | 描述                     | 默认值                            | 全局变量                                |
| ---------------------------- | ------------------------ | --------------------------------- | --------------------------------------- |
| --text-color                 | 文字颜色                 | `#fff`                            | `--dora-color-positive-contrast`        |
| --background-color           | 背景颜色                 | `#3880ff`                         | `--dora-color-positive`                 |
| --activated-background-color | 激活态的背景颜色         | `#055fff`                         | `--dora-color-positive-active`          |
| --border-radius              | 圆角大小                 | `var(--dora-border-radius, 8px)`  | `--dora-button-border-radius`           |
| --border-width               | 边框宽度                 | `var(--dora-border-width, 1PX)`   | `--dora-button-border-width`            |
| --border-style               | 边框样式                 | `var(--dora-border-style, solid)` | `--dora-button-border-style`            |
| --border-color               | 边框颜色                 | `#3880ff`                         | `--dora-color-positive`                 |
| --activated-border-color     | 激活态的边框颜色         | `#055fff`                         | `--dora-color-positive-active`          |
| --padding-start              | 左内边距                 | `12px`                            | -                                       |
| --padding-end                | 右内边距                 | `12px`                            | -                                       |
| --height                     | 按钮高度                 | `48px`                            | -                                       |
| --font-size                  | 字体大小                 | `16px`                            | -                                       |
| --block-margin-top           | 全宽时的上外边距         | `9px`                             | -                                       |
| --block-margin-bottom        | 全宽时的下外边距         | `9px`                             | -                                       |
| --activated-opacity          | 激活时按钮背景的不透明度 | `0.4`                             | `--dora-button-clear-activated-opacity` |
| --disabled-opacity           | 禁用时按钮背景的不透明度 | `0.5`                             | `--dora-button-disabled-opacity`        |
