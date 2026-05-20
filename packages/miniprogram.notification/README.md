# Notification Notification

@doraemon-ui/miniprogram.notification

顶部通知组件，支持声明式和函数式两种用法。

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.notification
# or
yarn add @doraemon-ui/miniprogram.notification
```

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

#### WXML

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### JAVASCRIPT

[js](./playground/pages/index/index.js ':include :type=code')

## API

### Notification props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-notification` |
| visible | `boolean` | 是否显示 | `false` |
| classNames | `string` | 进出场动画类名 | `dora-animate--slideInDown` |
| image | `string` | 左侧图片 | `''` |
| title | `string` | 标题 | `''` |
| text | `string` | 文案 | `''` |
| duration | `number` | 自动关闭时间，毫秒 | `3000` |
| data | `Record<string, unknown> \| null` | 事件透传数据 | `null` |

### Notification expose

| 方法 | 描述 |
| --- | --- |
| show(options) | 显示通知并返回关闭句柄 |
| hide() | 关闭通知 |

### notification.show(options)

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| classNames | `string` | 进出场动画类名 |
| image | `string` | 左侧图片 |
| title | `string` | 标题 |
| text | `string` | 文案 |
| duration | `number` | 自动关闭时间，毫秒 |
| data | `Record<string, unknown> \| null` | 事件透传数据 |
| onClick | `(data) => void` | 点击时回调 |
| onClose | `(data) => void` | 关闭时回调 |

### Notification events

| 事件名 | 描述 |
| --- | --- |
| click | 点击通知时触发 |
| close | 关闭通知时触发 |
| closed | 动画关闭完成时触发 |

### Notification externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |
