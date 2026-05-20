# Sticky 吸顶容器

@doraemon-ui/miniprogram.sticky

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.sticky
# or
yarn add @doraemon-ui/miniprogram.sticky
```

## 使用指南

### 在 page.json 中引入组件

[json](./playground/sticky/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/sticky/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/sticky/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/sticky/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Sticky props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-sticky` |
| scrollTop | `number` | 页面当前滚动距离 | `0` |

### Sticky events

| 事件名 | 描述 |
| --- | --- |
| stick | 某个 `sticky-item` 进入吸顶时触发 |
| unstick | 某个 `sticky-item` 退出吸顶时触发 |

### StickyItem props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-sticky-item` |
| title | `string` | 标题 | `''` |
| content | `string` | 内容 | `''` |

### Sticky slot

| 名称 | 描述 |
| --- | --- |
| - | `sticky-item` 列表 |

### StickyItem slot

| 名称 | 描述 |
| --- | --- |
| title | 自定义标题 |
| content | 自定义内容 |
