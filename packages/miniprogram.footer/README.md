# Footer

@doraemon-ui/miniprogram.footer

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.footer
# or
yarn add @doraemon-ui/miniprogram.footer
```

## 使用指南

### 在 `page.json` 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

<!-- tabs:end -->

## API

### Footer props

| 参数      | 类型                  | 描述           | 默认值          |
| --------- | --------------------- | -------------- | --------------- |
| prefixCls | `string`              | 自定义类名前缀 | `dora-footer`   |
| color     | `PresetColor`         | 主题色         | `positive`      |
| label     | `string`              | 顶部分割线文案 | `''`            |
| content   | `string`              | 中间文案       | `''`            |
| links     | `FooterLinkItem[]`    | 链接列表       | `[]`            |
| chips     | `FooterChipItem[]`    | 标签列表       | `[]`            |

### FooterLinkItem

| 参数      | 类型                    | 描述               | 默认值 |
| --------- | ----------------------- | ------------------ | ------ |
| text      | `string`                | 文案               | -      |
| url       | `string`                | 小程序页面路径     | -      |
| urlParams | `Record<string, any>`   | 路由参数           | -      |
| openType  | `NativeRouteOpenType`   | 跳转方式           | -      |
| delta     | `number`                | 返回页面层级       | -      |

### FooterChipItem

| 参数 | 类型                  | 描述           | 默认值      |
| ---- | --------------------- | -------------- | ----------- |
| text | `string`              | 文案           | -           |
| type | `'default' \| 'link'` | 是否可点击标签 | `default`   |

### Footer events

| 事件名     | 描述           | 回调参数                                  |
| ---------- | -------------- | ----------------------------------------- |
| linkClick  | 点击链接时触发 | `{ item: FooterLinkItem, index: number }` |
| chipClick  | 点击链接标签时触发 | `{ item: FooterChipItem, index: number }` |

### Footer externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |
