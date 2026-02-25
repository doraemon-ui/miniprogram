# List 列表

基础布局组件，布局时基于 `list` 和 `list-item` 来定义信息区块的外部框架。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.list
# or
yarn add @doraemon-ui/miniprogram.list
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/list/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/I8NS8umy7Yvk)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/list/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/list/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/list/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### List props

| 参数      | 类型                  | 描述                   | 默认值    |
| --------- | --------------------- | ---------------------- | --------- |
| prefixCls | `string`              | 自定义类名前缀         | dora-list |
| title     | `string`              | 标题                   | -         |
| label     | `string`              | 描述                   | -         |
| mode      | `'default' \| 'card'` | 支持默认和卡片两种模式 | default   |
| hasLine   | `boolean`             | 是否有底部横线         | true      |
| wrapStyle | `object`              | 自定义样式             | -         |
| bodyStyle | `object`              | 自定义 body 样式       | -         |

### List externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

### ListItem props

```ts
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

export type NativeRouteOpenType = 'navigateTo' | 'redirectTo' | 'switchTab' | 'navigateBack' | 'reLaunch'
```

| 参数                           | 类型                                                 | 描述                                                                                                                                 | 默认值         |
| ------------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| prefixCls                      | `string`                                             | 自定义类名前缀                                                                                                                       | dora-list-item |
| disabled                       | `boolean`                                            | 是否禁用                                                                                                                             | false          |
| openType                       | `NativeButtonOpenType \| NativeRouteOpenType`        | 微信开放能力或跳转方式                                                                                                               | -              |
| hoverClass                     | `string`                                             | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果                                                                         | default        |
| hoverStopPropagation           | `boolean`                                            | 指定是否阻止本节点的祖先节点出现点击态                                                                                               | false          |
| hoverStartTime                 | `number`                                             | 按住后多久出现点击态，单位毫秒                                                                                                       | 20             |
| hoverStayTime                  | `number`                                             | 手指松开后点击态保留时间，单位毫秒                                                                                                   | 70             |
| lang                           | `'zh_CN' \| 'zh_TW' \| 'en'`                         | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。                                                                    | en             |
| sessionFrom                    | `string`                                             | 会话来源                                                                                                                             | -              |
| sendMessageTitle               | `string`                                             | 会话内消息卡片标题                                                                                                                   | 当前标题       |
| sendMessagePath                | `string`                                             | 会话内消息卡片点击跳转小程序路径                                                                                                     | 当前分享路径   |
| sendMessageImg                 | `string`                                             | 会话内消息卡片图片                                                                                                                   | 截图           |
| showMessageCard                | `boolean`                                            | 显示会话内消息卡片                                                                                                                   | false          |
| phoneNumberNoQuotaToast        | `boolean`                                            | 手机号快速验证或手机号实时验证额度用尽时，是否对用户展示“申请获取你的手机号，但该功能使用次数已达当前小程序上限，暂时无法使用”的提示 | true           |
| appParameter                   | `string`                                             | 打开 APP 时，向 APP 传递的参数                                                                                                       | -              |
| thumb                          | `string`                                             | 左侧缩略图                                                                                                                           | -              |
| title                          | `string`                                             | 左侧标题                                                                                                                             | -              |
| label                          | `string`                                             | 标题下方的描述信息                                                                                                                   | -              |
| extra                          | `string`                                             | 右侧内容                                                                                                                             | -              |
| hasLine                        | `boolean`                                            | 是否有底部横线                                                                                                                       | true           |
| isLink                         | `boolean`                                            | 是否展示右侧箭头并开启尝试以 url 跳转                                                                                                | -              |
| align                          | `'flex-start' \| 'center'`                           | 对齐方式                                                                                                                             | center         |
| wrapStyle                      | `object`                                             | 自定义样式                                                                                                                           | -              |
| url                            | `string`                                             | 跳转链接                                                                                                                             | -              |
| urlParams                      | `object`                                             | 拼接到 url 路径后的参数                                                                                                              | -              |
| delta                          | `number`                                             | 当 open-type 为 'navigateBack' 时有效，表示回退的层数                                                                                | 1              |
| bind:click                     | `(event: CustomEvent) => void`                       | 点击事件                                                                                                                             | -              |
| bind:getuserinfo               | `(event: CustomEvent<ButtonGetUserInfo>) => void`    | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致                                                 | -              |
| bind:contact                   | `(event: CustomEvent<ButtonContact>) => void`        | 客服消息回调                                                                                                                         | -              |
| bind:getphonenumber            | `(event: CustomEvent<ButtonGetPhoneNumber>) => void` | 获取用户手机号回调                                                                                                                   | -              |
| bind:launchapp                 | `(event: CustomEvent<ButtonLaunchApp>) => void`      | 打开 APP 成功的回调                                                                                                                  | -              |
| bind:error                     | `(event: CustomEvent<ButtonError>) => void`          | 当使用开放能力时，发生错误的回调                                                                                                     | -              |
| bind:opensetting               | `(event: CustomEvent<ButtonOpenSetting>) => void`    | 在打开授权设置页后回调                                                                                                               | -              |
| bind:chooseavatar              | `(event: CustomEvent<ButtonChooseAvatar>) => void`   | 获取用户头像回调                                                                                                                     | -              |
| bind:createliveactivity        | `(event: CustomEvent) => void`                       | 新的一次性订阅消息下发机制回调                                                                                                       | -              |
| bind:getrealtimephonenumber    | `(event: CustomEvent) => void`                       | 手机号实时验证回调                                                                                                                   | -              |
| bind:agreeprivacyauthorization | `(event: CustomEvent) => void`                       | 用户同意隐私协议事件回调                                                                                                             | -              |

> 更多参数说明请参考微信官方的表单组件 [Button](https://developers.weixin.qq.com/miniprogram/dev/component/button.html)。

### ListItem slot

| 名称   | 描述                     |
| ------ | ------------------------ |
| -      | 自定义标题或描述         |
| header | 自定义左侧缩略图         |
| title  | 自定义左侧标题           |
| label  | 自定义标题下方的描述信息 |
| footer | 自定义右侧内容           |
| arrow  | 自定义右侧箭头图标       |

### ListItem externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性               | 描述                     | 默认值 | 全局变量 |
| ------------------ | ------------------------ | ------ | -------- |
| --font-size        | Body 内容的字体大小      | `16px` | -        |
| --header-font-size | 头部的字体大小           | `14px` | -        |
| --header-width     | 列表项 header 部分的宽度 | `auto` | -        |
| --thumb-size       | 列表项 thumb 图片的大小  | `20px` | -        |
