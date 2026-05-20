# Form

@doraemon-ui/miniprogram.form

## 安装

```bash
npm install --save @doraemon-ui/miniprogram.form
# or
yarn add @doraemon-ui/miniprogram.form
```

## 使用指南

### 在 `page.json` 中引入组件

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

### Form props

| 参数 | 类型 | 描述 | 默认值 |
| --- | --- | --- | --- |
| prefixCls | `string` | 自定义类名前缀 | `dora-form` |
| cellGroupPrefixCls | `string` | 内部列表组件类名前缀 | `dora-list` |
| title | `string` | 列表标题 | `''` |
| label | `string` | 列表描述 | `''` |
| mode | `'default' \| 'card'` | 列表模式 | `default` |
| bodyStyle | `Partial<CSSStyleDeclaration>` | 列表 body 样式 | `null` |
| layout | `'horizontal' \| 'vertical' \| 'none'` | 表单布局 | `none` |
| validateMessages | `Record<string, string> \| null` | 校验文案透传上下文 | `null` |
| requiredMarkStyle | `'asterisk' \| 'text-required' \| 'text-optional'` | 必填标记样式 | `asterisk` |
| asteriskText | `string` | 星号文案 | `*` |
| requiredText | `string` | 必填文案 | `必填` |
| optionalText | `string` | 选填文案 | `选填` |
| disabled | `boolean` | 是否禁用整个表单上下文 | `false` |
| readOnly | `boolean` | 是否只读整个表单上下文 | `false` |

### Form slots

| 名称 | 描述 |
| --- | --- |
| - | 表单内容 |
| footer | 表单底部区域 |

### Form expose

| 名称 | 描述 |
| --- | --- |
| getFieldsValue / getFieldValue | 获取字段值 |
| getFieldsError / getFieldError | 获取字段错误 |
| setFieldsValue / setFields | 设置字段状态或值 |
| resetFields | 重置字段 |
| validateFields | 执行字段校验 |

### Field

`Field` 作为 `Form` 包内子组件提供，页面中可通过 `@doraemon-ui/miniprogram.form/field` 引入并继续使用 `dora-field` 标签。

### Form externalClasses

| 名称 | 描述 |
| --- | --- |
| dora-class | 根节点样式类 |
