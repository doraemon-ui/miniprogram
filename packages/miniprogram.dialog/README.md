# Dialog 对话框

模态对话框，在浮层中显示，引导用户进行相关操作。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.dialog
# or
yarn add @doraemon-ui/miniprogram.dialog
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/VeRO57mC7FzF)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Dialog props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-dialog |
| bodyStyle | `object` | 弹窗对应的自定义样式 | - |
| image | `string` | 图片 | - |
| title | `string` | 提示标题 | - |
| content | `string` | 提示文本 | - |
| buttonClosable | `boolean` | 点击操作按钮后后是否关闭 | false |
| verticalButtons | `boolean` | 是否显示垂直按钮布局 | false |
| closable | `boolean` | 是否显示关闭按钮 | false |
| mask | `boolean` | 是否显示蒙层 | true |
| maskClosable | `boolean` | 点击蒙层是否允许关闭 | true |
| visible | `boolean` | 是否可见 | false |
| zIndex | `number` | 设置蒙层的 z-index | 1000 |
| buttons | `array` | 操作按钮列表，更多参数见下 `Button props` | [] |
| bind:close | `function` | 点击关闭按钮或蒙层的回调函数 | - |
| bind:closed | `function` | 关闭后的回调函数 | - |

#### Button props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| text | `string` | 按钮的文本 | - |
| type | `string` | 按钮的类型，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | dark |
| bold | `boolean` | 是否加粗按钮的文字 | - |
| disabled | `boolean` | 是否禁用 | false |
| openType | `string` | 微信开放能力，可选值为 contact、share、getUserInfo、getPhoneNumber、launchApp、openSetting、feedback | - |
| hoverClass | `string` | 指定按下去的样式类。当 hover-class="none" 时，没有点击态效果 | default |
| hoverStopPropagation | `boolean` | 指定是否阻止本节点的祖先节点出现点击态 | false |
| hoverStartTime | `number` | 按住后多久出现点击态，单位毫秒 | 20 |
| hoverStayTime | `number` | 手指松开后点击态保留时间，单位毫秒 | 70 |
| lang | `string` | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。 | en |
| sessionFrom | `string` | 会话来源 | - |
| sendMessageTitle | `string` | 会话内消息卡片标题 | 当前标题 |
| sendMessagePath | `string` | 会话内消息卡片点击跳转小程序路径 | 当前分享路径 |
| sendMessageImg | `string` | 会话内消息卡片图片 | 截图 |
| showMessageCard | `boolean` | 显示会话内消息卡片 | false |
| appParameter | `string` | 打开 APP 时，向 APP 传递的参数 | - |
| onClick | `function` | 按钮的点击事件 | - |
| onGetUserInfo | `function` | 用户点击该按钮时，会返回获取到的用户信息，回调的detail数据与wx.getUserInfo返回的一致 | - 
| onContact | `function` | 客服消息回调 | - |
| onGotPhoneNumber | `function` | 获取用户手机号回调 | - |
| onLaunchApp | `function` | 打开 APP 成功的回调 | - |
| onError | `function` | 当使用开放能力时，发生错误的回调 | - |
| onOpenSetting | `function` | 在打开授权设置页后回调 | - |

### Dialog slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |

### Dialog externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |

### Dialog.show

可以通过调用 `Dialog` 上的 `show` 方法直接打开对话框，其中 `props` 参数的类型同上表，但不支持传入 `visible` 属性。

当对话框被关闭后，组件实例会自动销毁。

此外，它还额外支持以下属性：

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| onClose | `function` | 点击关闭按钮或蒙层的回调函数 | - |
| onClosed | `function` | 关闭后的回调函数 | - |

> `show` 方法的调用后，会返回一个引用，可以通过该引用手动关闭对话框

```
const hideDialog = Dialog.show()
hideDialog()
```

### Dialog.alert

`alert` 接受的参数同 `show`，但不支持 `buttonClosable` `buttons` 属性，它的返回值不是一个控制器对象，而是 `Promise<void>`。

此外，它还额外支持以下属性：

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| confirmText | `string` | 确定按钮的文字 | 确定 |
| confirmType | `string` | 确定按钮的类型，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | balanced |
| onConfirm | `function` | 确定按钮的点击事件 | - |

### Dialog.confirm

`confirm` 接受的参数同 `show`，但不支持 `buttonClosable` `buttons` 属性，它的返回值不是一个控制器对象，而是 `Promise<boolean>`。

此外，它还额外支持以下属性：

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| confirmText | `string` | 确定按钮的文字 | 确定 |
| confirmType | `string` | 确定按钮的类型，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | balanced |
| onConfirm | `function` | 确定按钮的点击事件 | - |
| cancelText | `string` | 取消按钮的文字 | 取消 |
| cancelType | `string` | 取消按钮的类型，可选值为 light、stable、positive、calm、assertive、balanced、energized、royal、dark | dark |
| onCancel | `function` | 取消按钮的点击事件 | - |

## CSS Variables

| 属性 | 描述 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --font-size | 文字字号 | `17px` | `--dora-dialog-font-size` |
| --title-font-size | 标题的字号 | `18px` | `--dora-dialog-title-font-size` |
| --button-text-color | 按钮的文字颜色 | `#222428` | `--dora-color-dark` |
