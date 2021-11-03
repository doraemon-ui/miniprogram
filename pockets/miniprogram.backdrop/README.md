# Backdrop 背景幕

在组件中设置显示蒙层。

## 使用指南

### 在 page.json 中引入组件

[json](./proscenium/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/Nhg5JxmQ75ub)

<!-- tabs:start -->

#### **WXML**

[wxml](./proscenium/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./proscenium/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./proscenium/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-backdrop |
| classNames | `any` | 过渡的类名，更多内置过渡效果请参考 [AnimationGroup](animation-group.md) | dora-animate--fadeIn |
| transparent | `boolean` | 是否显示透明蒙层 | false |
| zIndex | `number` | 设置蒙层的 z-index | 1000 |
| bind:click | `function` | 点击事件 | - |
| bind:afterShow | `function` | 完全显示后触发 | - |
| bind:afterClose | `function` | 完全关闭后触发 | - |

### Backdrop.method

- Backdrop.retain
- Backdrop.release
