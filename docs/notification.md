# Notification Notification

@doraemon-ui/miniprogram.notification

顶部通知条组件，支持图片、标题、文案、自动关闭、点击回调，以及 `show()` 返回可手动关闭并可 `then()` 的句柄。

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.notification
# or
yarn add @doraemon-ui/miniprogram.notification
```

## 使用指南

### 在 page.json 中引入组件

[json](./playground/notification/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

#### WXML

[wxml](./playground/notification/pages/index/index.wxml ':include :type=code')

#### JAVASCRIPT

[js](./playground/notification/pages/index/index.js ':include :type=code')

## API

### Notification props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-notification` |

### Notification expose

| 方法 | 描述 |
| --- | --- |
| show(options) | 显示通知并返回关闭句柄 |
| hide() | 关闭通知 |

### show(options)

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| image | `string` | 左侧图片 |
| title | `string` | 标题 |
| text | `string` | 文案 |
| data | `Record<string, unknown> \| null` | 点击和关闭时透传的数据 |
| duration | `number` | 自动关闭时间，毫秒 |
| onClick | `(data) => void` | 点击时回调 |
| onClose | `(data) => void` | 关闭时回调 |

### Notification events

| 事件名 | 描述 |
| --- | --- |
| click | 点击通知时触发 |
| close | 关闭通知时触发 |
