# AnimationGroup 动画组

将自定义的组件包裹在 `animation-group` 组件内，可以实现过渡/动画效果，预设 9 种过渡效果 `fadeIn`, `fadeInDown`, `fadeInLeft`, `fadeInRight`, `fadeInUp`, `slideInUp`, `slideInDown`, `slideInLeft`, `slideInRight`, `zoom`, `punch` 可选用。

在进入/离开的过渡中，会有 6 个 class 切换：

- `-enter`: 进入过渡的开始状态，在过渡过程完成之后移除
- `-enter-active`: 进入过渡的结束状态，在过渡过程完成之后移除
- `-enter-done`: 进入过渡的完成状态
- `-exit`: 离开过渡的开始状态，在过渡过程完成之后移除
- `-exit-active`: 离开过渡的结束状态，在过渡过程完成之后移除
- `-exit-done`: 离开过渡的完成状态

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.animation-group
# or
yarn add @doraemon-ui/miniprogram.animation-group
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/f9BXtpmV7auh)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### AnimationGroup props

```ts
enum AnimateStatus {
  /** 进场动画的开始状态 */
  ENTER = 'enter',
  /** 进场动画的结束状态 */
  ENTERING = 'entering',
  /** 进场动画的完成状态 */
  ENTERED = 'entered',
  /** 离场动画的开始状态 */
  EXIT = 'exit',
  /** 离场动画的结束状态 */
  EXITING = 'exiting',
  /** 离场动画的完成状态 */
  EXITED = 'exited',
  /** 组件已卸载 */
  UNMOUNTED = 'unmounted',
}

enum AnimateType {
  /** 过渡效果 */
  TRANSITION = 'transition',
  /** 动画效果 */
  ANIMATION = 'animation',
}

type ClassNames = string | {
  /** 进场动画的开始状态，在动画完成之后移除 */
  enter?: string
  /** 进场动画的结束状态，在动画完成之后移除 */
  enterActive?: string
  /** 进场动画的完成状态 */
  enterDone?: string
  /** 离场动画的开始状态，在动画完成之后移除 */
  exit?: string
  /** 离场动画的结束状态，在动画完成之后移除 */
  exitActive?: string
  /** 离场动画的完成状态 */
  exitDone?: string
}

type Duration = number | {
  enter?: number
  exit?: number
}
```

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| in | `boolean` | 触发组件进入或离开过渡的状态 | false |
| classNames | `ClassNames` | 过渡的类名 | - |
| duration | `Duration` | 过渡持续时间 | - |
| type | `AnimateType` | 过渡动效的类型 | transition |
| appear | `boolean` | 首次挂载时是否触发进入过渡 | false |
| enter | `boolean` | 是否启用进入过渡 | true |
| exit | `boolean` | 是否启用离开过渡 | true |
| mountOnEnter | `boolean` | 首次进入过渡时是否懒挂载组件 | true |
| unmountOnExit | `boolean` | 离开过渡完成时是否卸载组件 | true |
| wrapCls | `string` | 自定义类名 | - |
| wrapStyle | `object` | 自定义样式 | - |
| disableScroll | `boolean` | 阻止移动触摸 | false |
| bind:click | `() => void` | 点击组件时触发的回调函数 | - |
| bind:enter | `(event: CustomEvent<{ isAppearing: boolean }>) => void` | 进入过渡的开始状态时触发的回调函数 | - |
| bind:entering | `(event: CustomEvent<{ isAppearing: boolean }>) => void` | 进入过渡的结束状态时触发的回调函数 | - |
| bind:entered | `(event: CustomEvent<{ isAppearing: boolean }>) => void` | 进入过渡的完成状态时触发的回调函数 | - |
| bind:exit | `() => void` | 离开过渡的开始状态时触发的回调函数 | - |
| bind:exiting | `() => void` | 离开过渡的结束状态时触发的回调函数 | - |
| bind:exited | `() => void` | 离开过渡的完成状态时触发的回调函数 | - |
| bind:change | `(event: CustomEvent<{ animateStatus: AnimateStatus }>) => void` | 监听状态变化的回调函数 | - |

### AnimationGroup slot

| 名称 | 描述 |
| --- | --- |
| - | 自定义内容 |

### AnimationGroup externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |