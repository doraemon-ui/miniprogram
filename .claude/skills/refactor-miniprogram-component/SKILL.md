---
name: refactor-miniprogram-component
description: 根据组件实际定义重构小程序组件，严格按照优先级处理 @Prop/@Component.props、_renderProxy、theme 字段及 LESS 样式
allowed-tools: Bash(npm *), Read, Grep, Write
---

# MiniProgram Component Refactor Skill

## TS 文件处理规则（严格遵守优先级）

### 优先级顺序

一、 **class 对应 prop 优先**

- 扫描 class 内所有使用 `@Prop` 的属性
- 对应的 @Component.props 中的字段删除
- 保留 class 的 @Prop 定义（class 优先于 @Component.props）

二、 **同步 @Component.props**

- 对于 class 中没有 @Prop 定义的字段，如果 @Component.props 中存在，则：
  - 删除 class 内对应的 @Prop
  - 保留 @Component.props 定义
  - 补充 `对应字段!: 字段类型` 明确赋值断言

三、 **禁止使用 this.\_renderProxy**

不要使用any类型的 this.\_renderProxy 来访问组件实例的关系节点，改为直接使用 this.$children 和 this.$parent：补齐类型断言，确保访问的子组件和父组件类型正确。

- 所有 `this._renderProxy.getRelationNodes` 替换为：

  ```ts
  children = this.$children as XxxInstance[]
  ```

- 所有 `this._renderProxy.getParentNode` 替换为：

  ```ts
  parent = this.$parent as XxxInstance | undefined
  ```

- 禁止使用any类型

四、 theme 字段处理

- 扫描 class 内所有 theme: string 字段
- 改为 color: PresetColor, 默认值default改为'positive'（引入类型：import type { PresetColor } from '@doraemon-ui/miniprogram.shared';）
- package.json 中添加 @doraemon-ui/miniprogram.shared 依赖
- class 内所有对 theme 的引用自动替换为 color,并且补齐类型断言 PresetColor
- 修改原始 classes 构造逻辑，补充`['dora-color']: color, [dora-color--${color}]: color`

LESS 文件处理规则

五、 对应组件的 LESS 文件要修改

- 可以参考 button 或 tab 组件的 LESS 文件，但要注意：
- 不是直接套示例里的 .tab-style → .tab-color
- 每个组件的 LESS 都要根据自己实际的类名和颜色变量改成 CSS 变量
- 自定义minxin，生成对应的 CSS 变量，供组件使用，放在文件底部
- 组件默认颜色“同上默认值default改为'positive'”改成调用.tab-color(#get-color(默认颜色)[]);

示例：

```less
tab-style(@theme, @color) {
  &--@{theme} &-bar {
    background: @color;
  }
  &--@{theme}&--current {
    color: @color;
  }
}
改成 .tab-color( @bg-color, ) {
  --activated-text-color: @bg-color;
  --background-color: @bg-color;
}
// Tab Colors
&.@{dora-prefix}-color {
  .tab-color(#current-color(base)[]);
}
```

CSS 变量命名和注释

- 顶部统一添加你给的标准注释，注意位置和格式，不要乱加
- 变量命名参考你的注释，但每个组件可能使用不同字段，所以要自动映射组件实际颜色字段

示例：

```less
// Tab styles
// @prop --activated-text-color: Text color of the tab when pressed
// @prop --background-color: Background color of the tab
// -----------------------------
.@{xxx-prefix-cls} {
}
```
