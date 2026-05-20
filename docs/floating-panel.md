# FloatingPanel 浮动面板

浮动面板组件用于承载可拖拽、可吸附到多个高度锚点的底部内容区域，交互参考 `wux-weapp/floating-panel`，并对齐 Doraemon UI 的组件结构与命名体系。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.floating-panel
# or
yarn add @doraemon-ui/miniprogram.floating-panel
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./playground/floating-panel/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/floating-panel/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/floating-panel/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/floating-panel/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### FloatingPanel props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-floating-panel` |
| defaultAnchors | `number[]` | 默认吸附高度数组，单位 px | `[]` |
| bind:heightChange | `(event: CustomEvent) => void` | 面板高度变化时触发 | - |

### FloatingPanel expose

| 方法 | 类型 | 描述 |
| --- | --- | --- |
| setHeight | `(height: number, options?: { immediate?: boolean }) => void` | 设置面板高度 |

### FloatingPanel heightChange detail

| 字段 | 类型 | 描述 |
| --- | --- | --- |
| height | `number` | 当前面板高度 |
| minHeight | `number` | 最小锚点高度 |
| maxHeight | `number` | 最大锚点高度 |
| animating | `boolean` | 当前是否处于吸附动画中 |

### FloatingPanel slot

| 名称 | 描述 |
| --- | --- |
| - | 面板内容区域 |

### FloatingPanel externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |

## CSS Variables

| 属性 | 描述 | 默认值 | 全局变量 |
| --- | --- | --- | --- |
| --z-index | 浮动面板层级 | `var(--dora-floating-panel-z-index, 1020)` | `--dora-floating-panel-z-index` |
