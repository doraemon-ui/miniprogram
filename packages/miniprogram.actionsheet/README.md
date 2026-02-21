# ActionSheet 动作面板

从底部弹出的操作菜单面板，提供两种主题风格（iOS / WeChat）。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.actionsheet
# or
yarn add @doraemon-ui/miniprogram.actionsheet
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

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

<!-- tabs:end -->

## API

### ActionSheet props

```ts
export type ActionSheetButton = {
  /** 按钮文本 */
  text?: string
  /** 按钮图标 */
  icon?: string
  /** 类名 */
  className?: string
  /** 是否禁用 */
  disabled?: boolean
  /** 微信开放能力 */
  openType?: string
  /** 按下时自定义样式类 */
  hoverClass?: string
}
```

| 参数             | 类型                           | 描述                                                  | 默认值           |
| ---------------- | ------------------------------ | ----------------------------------------------------- | ---------------- |
| prefixCls        | `string`                       | 自定义类名前缀                                        | dora-actionsheet |
| theme            | `'ios' \| 'wx'`                | 主题风格                                              | ios              |
| titleText        | `string`                       | 标题文本                                              | -                |
| buttons          | `ActionSheetButton[]`          | 操作按钮列表                                          | []               |
| cancelText       | `string`                       | 取消按钮文本                                          | 取消             |
| destructiveText  | `string`                       | 删除按钮文本                                          | -                |
| visible          | `boolean`                      | 是否可见                                              | false            |
| bind:action      | `(event: CustomEvent) => void` | 按钮点击事件，detail 包含 `{ method, button, index }` | -                |
| bind:cancel      | `() => void`                   | 取消按钮点击事件                                      | -                |
| bind:destructive | `() => void`                   | 删除按钮点击事件                                      | -                |
| bind:close       | `() => void`                   | 关闭事件                                              | -                |
| bind:closed      | `() => void`                   | 关闭动画完成后的事件                                  | -                |

### ActionSheet slot

| 名称 | 描述       |
| ---- | ---------- |
| -    | 自定义内容 |

### ActionSheet externalClasses

| 名称       | 描述         |
| ---------- | ------------ |
| dora-class | 根节点样式类 |

### 命令式调用

```ts
import { actionsheet } from '@doraemon-ui/miniprogram.actionsheet'

// 显示动作面板
const close = actionsheet.show({
  theme: 'ios',
  titleText: '请选择操作',
  buttons: [{ text: '选项一' }, { text: '选项二' }],
  cancelText: '取消',
  onCancel: () => {},
  onClose: () => {},
})

// 手动关闭
close()

// 关闭所有
actionsheet.clear()
```

## CSS Variables

| 属性                     | 描述                     | 默认值                     | 全局变量                                    |
| ------------------------ | ------------------------ | -------------------------- | ------------------------------------------- |
| --options-bg             | 选项组背景色（iOS 主题） | `rgba(255, 255, 255, .65)` | `--dora-actionsheet-options-bg`             |
| --options-normal-bg      | 普通选项组背景色         | `@component-background`    | `--dora-actionsheet-options-normal-bg`      |
| --options-cancel-bg      | 微信主题取消区域背景色   | `@component-background`    | `--dora-actionsheet-options-cancel-bg`      |
| --options-active-bg      | 按钮按下时背景色         | `@active-state-bg`         | `--dora-actionsheet-options-active-bg`      |
| --text-color             | 按钮文字颜色             | `#007aff`                  | `--dora-actionsheet-text-color`             |
| --border-color           | 按钮之间的分隔线颜色     | `@border-color-split`      | `--dora-actionsheet-border-color`           |
| --destructive-text-color | 删除按钮文字颜色         | `#ff3b30`                  | `--dora-actionsheet-destructive-text-color` |
| --icon-size              | 按钮图标大小             | `20px`                     | -                                           |
| --border-radius          | 选项组圆角               | `12px`                     | -                                           |
| --margin                 | 内容区域水平边距         | `10px`                     | -                                           |
