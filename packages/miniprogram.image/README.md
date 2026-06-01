# Image 图片

@doraemon-ui/miniprogram.image

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.image
# or
yarn add @doraemon-ui/miniprogram.image
```

## 使用指南

### 在 `page.json` 中引入组件

```json
{
  "usingComponents": {
    "dora-image": "@doraemon-ui/miniprogram.image/index"
  }
}
```

### 示例代码

```wxml
<dora-image
  src="https://picsum.photos/750/750/?random=1"
  shape="rounded"
/>
```

更多示例见 [playground/pages/index](/Users/skyvow/xxoo/doraemon-ui/miniprogram/packages/miniprogram.image/playground/pages/index/index.wxml)。

## API

### Image props

```ts
export type ImageShape = 'normal' | 'rounded' | 'circle' | 'thumbnail'

export type ImageMode =
  | 'scaleToFill'
  | 'aspectFit'
  | 'aspectFill'
  | 'widthFix'
  | 'heightFix'
  | 'top'
  | 'bottom'
  | 'center'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
```

| 参数                  | 类型                       | 描述                             | 默认值      |
| --------------------- | -------------------------- | -------------------------------- | ----------- |
| prefixCls             | `string`                   | 自定义类名前缀                   | dora-image  |
| src                   | `string`                   | 图片地址                         | -           |
| mode                  | `ImageMode`                | 图片裁剪、缩放模式               | scaleToFill |
| webp                  | `boolean`                  | 默认解析 webp 格式               | false       |
| lazyLoad              | `boolean`                  | 图片懒加载                       | false       |
| showMenuByLongpress   | `boolean`                  | 开启长按图片显示识别小程序码菜单 | false       |
| forceHttps            | `boolean`                  | 是否强制将图片地址转换为 HTTPS   | false       |
| shape                 | `ImageShape`               | 图片形状                         | normal      |
| width                 | `string \| number`         | 宽度                             | 300         |
| height                | `string \| number`         | 高度                             | 225         |
| unmountOnEmpty        | `boolean`                  | 空地址时是否直接卸载             | false       |
| unmountOnError        | `boolean`                  | 加载失败时是否直接卸载           | false       |
| empty                 | `string`                   | 空状态文案                       | -           |
| loading               | `string`                   | 加载中文案                       | -           |
| error                 | `string`                   | 失败文案                         | -           |
| bind:change           | `(event: CustomEvent) => void` | 图片状态变化时触发           | -           |
| bind:load             | `(event: CustomEvent) => void` | 图片加载成功时触发           | -           |
| bind:error            | `(event: CustomEvent) => void` | 图片加载失败时触发           | -           |
| bind:click            | `(event: CustomEvent) => void` | 点击图片时触发               | -           |

### Image Semantic DOM

| 参数  | 描述                       | 示例                                                                                                                |
| ----- | -------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| root  | 根元素，设置容器样式和布局 | info[wxml]>`<dora-image classNames="{{ { root: 'my-classname' } }}" styles="{{ { root: { color: 'red' } } }}" />`  |
| image | 图片元素，设置图片样式     | info[wxml]>`<dora-image classNames="{{ { image: 'my-classname' } }}" styles="{{ { image: { color: 'red' } } }}" />` |

### Image slot

| 名称    | 描述             |
| ------- | ---------------- |
| -       | 图片上层自定义内容 |
| empty   | 自定义空状态内容 |
| loading | 自定义加载中内容 |
| error   | 自定义错误态内容 |

### Image externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性                         | 描述           | 默认值                                        | 全局变量                            |
| ---------------------------- | -------------- | --------------------------------------------- | ----------------------------------- |
| --text-color                 | 罩层文字颜色   | `rgba(var(--dora-text-color-rgb, 0, 0, 0), 0.45)` | `--image-text-color`                |
| --rounded-border-radius      | 圆角图片圆角大小 | `var(--dora-border-radius, 8px)`            | `--image-rounded-border-radius`     |
| --thumbnail-background-color | 缩略图背景颜色 | `var(--dora-component-background-color, #fff)` | `--image-thumbnail-background-color` |
| --thumbnail-margin           | 缩略图边距     | `4px`                                         | `--image-thumbnail-margin`          |
