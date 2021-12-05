# Toast 轻提示

一种轻量级反馈/提示，可以用来显示不会打断用户操作的内容，适合用于页面转场、数据交互的等场景中。

## 安装

我们推荐使用 [npm](https://www.npmjs.com) 或 [yarn](https://yarnpkg.com) 的方式进行开发，不仅可在开发环境轻松调试，也可放心地在生产环境打包部署使用，享受整个生态圈和工具链带来的诸多好处。

```bash
npm install --save @doraemon-ui/miniprogram.toast
# or
yarn add @doraemon-ui/miniprogram.toast
```

如果你的网络环境不佳，推荐使用 [cnpm](https://cnpmjs.org)。

## 使用指南

### 在 page.json 中引入组件

[json](./proscenium/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/viXGtjmv7jvh)

<!-- tabs:start -->

#### **WXML**

[wxml](./proscenium/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./proscenium/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./proscenium/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

!> `Toast` 只支持指令式调用。

### Toast.show

`show` 方法支持传入一个 `props` 对象，它包含了以下这些属性：

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | dora-toast |
| image | `string` | 自定义图片，image 的优先级高于 icon | - |
| icon | `string` | 图标，可选值为 success、error、warn | - |
| iconColor | `string` | 图标的颜色 | - |
| text | `string` | 提示文本 | - |
| position | `string` | 垂直方向显示位置，可选值为 top、bottom、center | - |
| mask | `boolean` | 是否显示蒙层 | true |
| maskClickable | `boolean` | 是否允许背景点击 | true |
| zIndex | `number` | 设置蒙层的 z-index | 1000 |
| duration | `number` | 提示的延迟时间，若小于等于 0 则不会自动关闭 | 1500 |
| onClose | `function` | 点击关闭按钮或蒙层的回调函数 | - |
| onClosed | `function` | 关闭后的回调函数 | - |

!> 同一时间只允许弹出一个轻提示，新出现的 `Toast` 会将之前正在显示中的 `Toast` 挤掉。

当然，也支持手动关闭一个轻提示。

```
const hideToast = Toast.show()
hideToast()
```

你也可以直接传入一个字符串，`Toast.show` 会自动把它作为 `text`。

### Toast.success

`success` 接受的参数同 `show`，但不支持 `image` `icon` `iconColor` 属性，它的返回值不是一个控制器对象，而是 `Promise<void>`。

此外，还有如下更多的方法：

- Toast.warn
- Toast.error
- Toast.info

### Toast.clear

关闭所有显示中的 `Toast`。