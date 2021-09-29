# Pagination 分页器

分隔长列表，每次只加载一个页面。

## 使用指南

### 在 page.json 中引入组件

[json](./proscenium/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/IneTVAmw7JtI)

<!-- tabs:start -->

#### **WXML**

[wxml](./proscenium/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./proscenium/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./proscenium/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Pagination props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-pagination |
| mode | `string` | 形态，可选值为 button、number、pointer | button |
| defaultCurrent | `number` | 默认页号，当 `controlled` 为 `false` 时才生效 | 1 |
| current | `number` | 当前页号，当 `controlled` 为 `true` 时才生效 | 1 |
| controlled | `boolean` | 是否受控 [说明文档](controlled.md) | false |
| total | `number` | 总页数 | 0 |
| simple | `boolean` | 是否隐藏数值 | false |
| bind:change | `function` | change 事件触发的回调函数 | - |
| bind:prev | `function` | 左侧按钮点击事件 | - |
| bind:next | `function` | 右侧按钮点击事件 | - |

### Pagination slot

| 名称 | 描述 |
| --- | --- |
| prev | 自定义左侧按钮内容 |
| next | 自定义右侧按钮内容 |

### Pagination externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |
