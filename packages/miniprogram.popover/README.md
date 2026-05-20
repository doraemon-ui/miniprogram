# Popover 气泡框

@doraemon-ui/miniprogram.popover

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.popover
# or
yarn add @doraemon-ui/miniprogram.popover
```

## 使用指南

### 在 `page.json` 中引入组件

```json
{
  "usingComponents": {
    "dora-popover": "@doraemon-ui/miniprogram.popover/index"
  }
}
```

### 示例代码

WXML:

```wxml
<dora-popover placement="top" title="Title" content="Content">
  <button size="mini">top</button>
</dora-popover>
```

JS:

```js
Page({
  data: {
    visible: false,
  },

  hide() {
    this.setData({
      visible: false,
    })
  },

  onChange(e) {
    this.setData({
      visible: e.detail.visible,
    })
  },
})
```

更多示例见 [playground/pages/index](/Users/skyvow/xxoo/doraemon-ui/miniprogram/packages/miniprogram.popover/playground/pages/index/index.wxml)。

## API

### Props

| 参数           | 类型                                     | 描述                         | 默认值                 |
| -------------- | ---------------------------------------- | ---------------------------- | ---------------------- |
| prefixCls      | `string`                                 | 自定义类名前缀               | `dora-popover`         |
| classNames     | `string`                                 | 动画类名                     | `dora-animate--fadeIn` |
| color          | `'light' \| 'dark'`                      | 主题                         | `light`                |
| title          | `string`                                 | 标题                         | `''`                   |
| content        | `string`                                 | 内容                         | `''`                   |
| placement      | `PopoverPlacement`                       | 位置                         | `top`                  |
| trigger        | `'click'`                                | 触发方式                     | `click`                |
| bodyStyle      | `string \| Partial<CSSStyleDeclaration>` | 自定义气泡内容样式           | `''`                   |
| defaultVisible | `boolean`                                | 非受控模式下默认显隐         | `false`                |
| visible        | `boolean`                                | 是否显示                     | `false`                |
| controlled     | `boolean`                                | 是否受控                     | `false`                |
| mask           | `boolean`                                | 是否显示遮罩                 | `false`                |
| maskClosable   | `boolean`                                | 点击遮罩是否关闭             | `true`                 |
| useSlot        | `boolean`                                | 是否使用默认插槽作为触发元素 | `true`                 |
| slotRect       | `MiniprogramDOMRect \| null`             | 外部传入的触发元素尺寸       | `null`                 |
| relativeRect   | `MiniprogramDOMRect \| null`             | 外部传入的相对容器尺寸       | `null`                 |

### Events

| 事件名 | 描述               | 回调参数                                               |
| ------ | ------------------ | ------------------------------------------------------ |
| change | 显隐状态变化时触发 | `(event) => void`，`event.detail.visible` 表示当前状态 |

### Slots

| 名称    | 描述       |
| ------- | ---------- |
| -       | 触发元素   |
| title   | 自定义标题 |
| content | 自定义内容 |

### External Classes

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |
