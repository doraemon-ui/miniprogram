# Backdrop 背景幕

在组件中设置显示蒙层。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.backdrop
# or
yarn add @doraemon-ui/miniprogram.backdrop
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/NxxAf8mt74Q8)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-backdrop |
| classNames | `any` | 过渡的类名，更多内置过渡效果请参考 [AnimationGroup](animation-group.md) | dora-animate--fadeIn |
| transparent | `boolean` | 是否显示透明蒙层 | false |
| disableScroll | `boolean` | 阻止移动触摸 | true |
| visible | `boolean` | 是否可见 | false |
| wrapStyle | `object` | 蒙层的样式 | - |
| zIndex | `number` | 设置蒙层的 z-index。优先级高于 css 设置的 var(--z-index)。 | - |
| mountOnEnter | `boolean` | 首次进入过渡时是否懒挂载组件 | true |
| unmountOnExit | `boolean` | 离开过渡完成时是否卸载组件 | true |
| bind:click | `() => void` | 点击事件 | - |
| bind:show | `() => void` | 开始展示前触发 | - |
| bind:showed | `() => void` | 完全展示后触发 | - |
| bind:close | `() => void` | 开始关闭前触发 | - |
| bind:closed | `() => void` | 完全关闭后触 | - |

### Imperative

可以通过指令式的方式使用 `Backdrop`：

- Backdrop.retain
- Backdrop.release

> 组件提供了 retain & release 方法，你可以通过它来指令式地控制 backdropHolds 属性值的增减，即锁定次数，当 backdropHolds > 0 时组件可见，否则隐藏组件。

```ts
const backdrop = this.selectComponent('#dora-backdrop')

backdrop.retain()
backdrop.backdropHolds === 1
backdrop.retain()
backdrop.backdropHolds === 2
backdrop.release()
backdrop.release()
backdrop.backdropHolds === 0
```

## CSS Variables

| 属性 | 描述 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --z-index | 蒙层的 `z-index` | `var(--dora-component-z-index, 1000)` | `--dora-backdrop-z-index` |
| --background-color | 蒙层的背景颜色 | `rgba(0, 0, 0, 0.4)` | `--dora-backdrop-background-color` |