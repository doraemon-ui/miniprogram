# Filterbar 筛选栏

筛选栏组件用于承载排序、单选、多选和侧边筛选等常见商品列表筛选场景，交互参考 `wux-weapp/filterbar`，并对齐 Doraemon UI 的组件结构与命名体系。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.filterbar
# or
yarn add @doraemon-ui/miniprogram.filterbar
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/filterbar/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/filterbar/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/filterbar/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/filterbar/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Filterbar props

```ts
type FilterbarChoiceItem = {
  label: string
  value: string | number
}

type FilterbarItem =
  | {
      label: string
      type: 'text'
      value?: string | number
      groups?: string[]
    }
  | {
      label: string
      type: 'sort'
      sort?: 1 | -1
      groups?: string[]
    }
  | {
      label: string
      type: 'radio' | 'checkbox'
      groups?: string[]
      children: FilterbarChoiceItem[]
    }
  | {
      label: string
      type: 'filter'
      groups?: string[]
      children: Array<{
        label: string
        type: 'radio' | 'checkbox'
        children: FilterbarChoiceItem[]
      }>
    }
```

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-filterbar` |
| items | `FilterbarItem[]` | 筛选项配置 | `[]` |
| cancelText | `string` | 多选/筛选面板的重置按钮文案 | `重置` |
| confirmText | `string` | 多选/筛选面板的确认按钮文案 | `确定` |
| bind:change | `(event: CustomEvent) => void` | 选项确认或排序切换时触发 | - |
| bind:open | `(event: CustomEvent) => void` | 下拉面板或侧边筛选展开时触发 | - |
| bind:close | `(event: CustomEvent) => void` | 下拉面板或侧边筛选收起时触发 | - |
| bind:scroll | `(event: CustomEvent) => void` | 筛选内容区域滚动时触发 | - |

### Filterbar change detail

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| checkedItems | `FilterbarItem[]` | 当前已选中的筛选项 |
| items | `FilterbarItem[]` | 带展示态数据的完整筛选项列表 |
| checkedValues | `Array<string \| number \| Array<string \| number>>` | 当前各项的选中值 |

### Filterbar externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性 | 描述 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --z-index | 筛选栏层级 | `var(--dora-filterbar-z-index, 1000)` | `--dora-filterbar-z-index` |
