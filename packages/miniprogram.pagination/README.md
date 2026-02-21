# Pagination 分页器

分隔长列表，每次只加载一个页面。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.pagination
# or
yarn add @doraemon-ui/miniprogram.pagination
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/zvv8l8mt7hQL)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Pagination props

| 参数           | 类型                                                                        | 描述                                          | 默认值          |
| -------------- | --------------------------------------------------------------------------- | --------------------------------------------- | --------------- |
| prefixCls      | `string`                                                                    | 自定义类名前缀                                | dora-pagination |
| mode           | `'button' \| 'number' \| 'pointer'`                                         | 形态                                          | button          |
| defaultCurrent | `number`                                                                    | 默认页号，当 `controlled` 为 `false` 时才生效 | 1               |
| current        | `number`                                                                    | 当前页号，当 `controlled` 为 `true` 时才生效  | 1               |
| controlled     | `boolean`                                                                   | 是否受控 [说明文档](controlled.md)            | false           |
| total          | `number`                                                                    | 总页数                                        | 0               |
| simple         | `boolean`                                                                   | 是否隐藏数值                                  | false           |
| bind:change    | `(event: CustomEvent<{ current: number; type: 'prev' \| 'next' }>) => void` | change 事件触发的回调函数                     | -               |
| bind:prev      | `(event: CustomEvent<{ current: number }>) => void`                         | 左侧按钮点击事件                              | -               |
| bind:next      | `(event: CustomEvent<{ current: number }>) => void`                         | 右侧按钮点击事件                              | -               |

### Pagination slot

| 名称 | 描述               |
| ---- | ------------------ |
| prev | 自定义左侧按钮内容 |
| next | 自定义右侧按钮内容 |

### Pagination externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |
