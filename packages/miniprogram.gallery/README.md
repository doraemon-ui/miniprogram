# Gallery Gallery

@doraemon-ui/miniprogram.gallery

全屏图片预览画廊，支持 swiper 切换、说明文案、自定义操作图标，以及通过实例 `show()` / `hide()` 打开关闭。

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.gallery
# or
yarn add @doraemon-ui/miniprogram.gallery
```

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Gallery props

```ts
export interface GalleryItem {
  image: string
  remark?: string
}
```

| 参数                 | 类型                                                                                               | 描述                                                        | 默认值                     |
| -------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | -------------------------- |
| prefixCls            | `string`                                                                                           | 自定义类名前缀                                              | dora-gallery               |
| classNames           | `string`                                                                                           | 动画过渡类名                                                | dora-animate--slideInRight |
| visible              | `boolean`                                                                                          | 是否显示                                                    | false                      |
| indicatorDots        | `boolean`                                                                                          | 是否显示指示点                                              | false                      |
| indicatorColor       | `string`                                                                                           | 指示点颜色                                                  | rgba(0, 0, 0, .3)          |
| indicatorActiveColor | `string`                                                                                           | 当前指示点颜色                                              | #000000                    |
| autoplay             | `boolean`                                                                                          | 是否自动切换                                                | false                      |
| interval             | `number`                                                                                           | 自动切换时间间隔                                            | 5000                       |
| duration             | `number`                                                                                           | 动画时长                                                    | 500                        |
| circular             | `boolean`                                                                                          | 是否循环播放                                                | false                      |
| vertical             | `boolean`                                                                                          | 是否纵向滑动                                                | false                      |
| icon                 | `string`                                                                                           | 自定义操作图标地址                                          | -                          |
| showDelete           | `boolean`                                                                                          | 是否显示删除按钮                                            | true                       |
| allowScale           | `boolean`                                                                                          | 是否允许双指缩放                                            | true                       |
| current              | `number`                                                                                           | 当前索引                                                    | 0                          |
| urls                 | `Array<string \| GalleryItem>`                                                                     | 图片列表                                                    | []                         |
| bind:cancel          | `(event: CustomEvent) => void`                                                                     | 取消时触发                                                  | -                          |
| bind:click           | `(event: CustomEvent<{ current: number; urls: Array<string \| GalleryItem> }>) => boolean \| void` | 点击图片时触发，返回 current 和 urls；返回 false 可阻止关闭 | -                          |
| bind:delete          | `(event: CustomEvent<{ current: number; urls: Array<string \| GalleryItem> }>) => boolean \| void` | 点击删除时触发，返回 current 和 urls；返回 false 可阻止关闭 | -                          |
| bind:change          | `(event: CustomEvent<{ current: number; source: string }>) => void`                                | swiper 切换时触发                                           | -                          |
| bind:close           | `(event: CustomEvent) => void`                                                                     | 关闭时触发                                                  | -                          |
| bind:closed          | `(event: CustomEvent) => void`                                                                     | 完全关闭后触发                                              | -                          |

### Gallery externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性               | 描述                            | 默认值                                | 全局变量                          |
| ------------------ | ------------------------------- | ------------------------------------- | --------------------------------- |
| --z-index          | 画廊的z-index     | `var(--dora-component-z-index, 1000)` | `--dora-gallery-z-index`          |
| --background-color | 画廊的背景颜色     | `#000`                                | `--dora-gallery-background-color` |
| --icon-size        | 画廊的操作图标大小 | `24px`                                | `--dora-gallery-icon-size`        |
