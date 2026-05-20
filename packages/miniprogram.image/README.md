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

### Props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-image` |
| src | `string` | 图片地址 | `''` |
| mode | `ImageMode` | 图片裁剪、缩放模式 | `scaleToFill` |
| webp | `boolean` | 默认解析 webp 格式 | `false` |
| lazyLoad | `boolean` | 图片懒加载 | `false` |
| showMenuByLongpress | `boolean` | 开启长按图片显示识别小程序码菜单 | `false` |
| shape | `ImageShape` | 图片形状 | `normal` |
| width | `string \| number` | 宽度 | `300` |
| height | `string \| number` | 高度 | `225` |
| unmountOnEmpty | `boolean` | 空地址时是否直接卸载 | `false` |
| unmountOnError | `boolean` | 加载失败时是否直接卸载 | `false` |
| empty | `string` | 空状态文案 | `''` |
| loading | `string` | 加载中文案 | `''` |
| error | `string` | 失败文案 | `''` |

### Events

| 事件名 | 描述 | 回调参数 |
| --- | --- | --- |
| change | 状态变化时触发 | `(event) => void`，`event.detail.status` 为当前状态 |
| load | 图片加载成功时触发 | `(event) => void`，附带 `status: 'loaded'` |
| error | 图片加载失败时触发 | `(event) => void`，附带 `status: 'error' \| 'unmounted'` |
| click | 点击图片时触发 | `(event) => void`，附带当前 `status` |

### Slots

| 名称 | 描述 |
| --- | --- |
| - | 图片上层自定义内容 |
| empty | 自定义空状态内容 |
| loading | 自定义加载中内容 |
| error | 自定义错误态内容 |

### External Classes

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |
