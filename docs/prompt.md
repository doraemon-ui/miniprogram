# Prompt 提示页

@doraemon-ui/miniprogram.prompt

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.prompt
# or
yarn add @doraemon-ui/miniprogram.prompt
```

## 使用指南

### 在 page.json 中引入组件

[json](./playground/prompt/pages/index/index.json ':include :type=code')

### 示例代码

[在开发者工具中预览效果](https://developers.weixin.qq.com/s/DoraemonUI)

<!-- tabs:start -->

#### **WXML**

[wxml](./playground/prompt/pages/index/index.wxml ':include :type=code')

#### **JAVASCRIPT**

[js](./playground/prompt/pages/index/index.js ':include :type=code')

#### **WXSS**

[wxss](./playground/prompt/pages/index/index.wxss ':include :type=code')

<!-- tabs:end -->

## API

### Prompt props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-prompt` |
| classNames | `ClassNames` | 进出场动画类名 | `dora-animate--fadeIn` |
| icon | `string` | 图标地址 | 内置空状态图标 |
| title | `string` | 标题 | `''` |
| text | `string` | 描述文案 | `''` |
| buttons | `PromptButton[]` | 底部按钮列表 | `[]` |
| visible | `boolean` | 是否显示 | `false` |
| wrapStyle | `string \| Partial<CSSStyleDeclaration>` | 外层样式 | `''` |

### Prompt events

| 事件名 | 描述 |
| --- | --- |
| click | 点击普通按钮时触发 |
| getuserinfo | `open-type="getUserInfo"` 回调 |
| contact | `open-type="contact"` 回调 |
| getphonenumber | `open-type="getPhoneNumber"` 回调 |
| opensetting | `open-type="openSetting"` 回调 |
| launchapp | `open-type="launchApp"` 回调 |
| chooseavatar | `open-type="chooseAvatar"` 回调 |
| error | 开放能力错误回调 |
