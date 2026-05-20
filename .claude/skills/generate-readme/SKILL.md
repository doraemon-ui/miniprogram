---
name: generate-readme
description: 自动生成 miniprogram 组件的 README.md，包括 ## API（Props、Slot、ExternalClasses）和 ## CSS Variables 章节
allowed-tools: Bash(npm *), Read, Grep, Write
---

# generate-readme

为 miniprogram 组件生成 README.md 中的 `## API` 和 `## CSS Variables` 章节。

## Context

参考实现：`packages/miniprogram.button/README.md`
组件源文件路径模式：`packages/miniprogram.$NAME/src/index.ts`、`src/index.wxml`、`assets/*.less`

## Workflow

### Step 1: 确定目标组件

用户指定组件路径（如 `packages/miniprogram.button`）。从目录名提取组件名：
- `packages/miniprogram.button` → `Button`
- `packages/miniprogram.checkbox` → `Checkbox`
- 规则：去掉 `packages/miniprogram.` 前缀，剩余部分转为 PascalCase

### Step 2: 读取源文件

并行读取以下文件：
1. `{组件路径}/src/index.ts` — props、事件
2. `{组件路径}/src/index.wxml` — slots、externalClasses
3. `{组件路径}/assets/` 下所有 `.less` 文件 — CSS variables

### Step 3: 提取 Props（→ `### Xxx props`）

#### 3a. 提取 @Component 装饰器中的 props

在 index.ts 中找到 `@Component({` ... `})` 块内的 `props: { ... }` 对象。
每个 prop 的结构为：
```ts
propName: {
  type: String,    // String | Boolean | Number | Object | Array
  default: 'xxx',  // 默认值
}
```

提取规则：
- `name`: prop 的 key
- `type`: `String` → `string`，`Boolean` → `boolean`，`Number` → `number`，`Object` → `object`，`Array` → `array`
- `default`: 原始默认值

**重要：@Component props 的描述和精确类型来自类字段重声明**

`@Component` 中定义的 props 通常会在类体中用 `!` 断言重声明，并附带 JSDoc 注释和更精确的类型：

```ts
// @Component 中：
formType: { type: String, default: '' }

// 类体中（更精确的类型 + 描述）：
/**
 * 用于 form 组件，点击后触发的表单事件类型  ← 从这里取描述
 */
formType!: 'submit' | 'reset' | ''  ← 用这个更精确的类型覆盖 String→string
```

处理规则：
1. 对 `@Component.props` 中的每个 prop，在类体中搜索同名的 `propName!: ...` 重声明字段
2. 如果找到了对应的类字段，用类字段的 TypeScript 类型注解**覆盖** `@Component` 中的类型（类字段类型更精确）
3. 如果类字段上有 JSDoc 注释，从中提取描述（优先级：JSDoc 第一行 > `@description` 标签 > 无描述）
4. 如果没有对应的类字段，保持 @Component 中提取的类型和空描述

#### 3b. 提取 @Prop 装饰器

找到类字段上的 `@Prop({...})` 装饰器：
```ts
/**
 * 描述文本
 * @type {('solid' | 'outline' | 'clear')}
 */
@Prop({
  type: String,
  default: 'solid',
})
fill: 'solid' | 'outline' | 'clear'
```

提取规则：
- `name`: 字段名
- `type`: 优先使用字段的 TypeScript 类型注解（如 `'solid' | 'outline' | 'clear'`），其次用装饰器内的 `type` 构造函数映射
- `default`: 装饰器内的 `default` 值

#### 3c. 提取事件

事件有两种定义方式，两种都要扫描：

**方式一：@Emit 装饰器**

```ts
@Event()
@Emit('getuserinfo')
onGetUserInfo(e: CustomEvent) { ... }
```

**方式二：this.$emit() 调用（无装饰器）**

```ts
/**
 * @fires click
 */
onClick() {
  if (!this.disabled && !this.loading) {
    this.$emit('click')
  }
}
```

扫描方法体内的 `this.$emit('xxx')` 调用，提取事件名。

提取规则（两种方式通用）：
- `name`: `bind:` + 事件名（如 `bind:getuserinfo`、`bind:click`）
- `type`: 优先取方法参数的 TypeScript 类型注解推导的完整签名（如 `(event: CustomEvent<ButtonGetUserInfo>) => void`），其次用 `(event: CustomEvent) => void`
- `default`: `-`
- `描述`: 取 JSDoc 的第一行文本，或 `@fires` 标签所在方法的 JSDoc 描述

注意：事件名统一用小写（如 `@Emit('getUserInfo')` → `bind:getuserinfo`），因为微信小程序事件系统对大小写不敏感。

#### 3d. 提取描述

对每个 prop/事件，从 JSDoc 注释中提取描述：
- 取 JSDoc 的第一行文本（不含 `@` 标签的行）作为描述
- 忽略 `@type`、`@default`、`@memberof`、`@see` 等标签行

示例：
```ts
/**
 * 按钮颜色
 *
 * @type {PresetColor}
 * @memberof Button
 */
```
→ 描述为 "按钮颜色"

#### 3e. 提取类型定义

如果 props 中引用了自定义类型（如 `PresetColor`、`NativeButtonOpenType`），在 props 表格前插入类型定义代码块。
- 检查 index.ts 顶部的 import 语句，找到从外部包导入的类型
- 在源文件中搜索对应的 `type` / `enum` 定义（可能在 `@doraemon-ui/miniprogram.shared` 等包中）
- 如果找不到定义，检查 `src/types.ts` 或 `node_modules/` 中的声明文件

#### 3f. Props 表格排序

Props 按以下顺序排列：
1. 自定义属性（带 `@Prop` 装饰器的）
2. 原生属性（`@Component.props` 中定义的）
3. 事件（`bind:xxx` 行）

#### 3g. 格式化默认值

| 原始默认值 | 表格显示 |
|-----------|---------|
| `''` (空字符串) | `-` |
| `false` | `false` |
| `true` | `true` |
| 数字 | 数字原样 |
| 非空字符串 | 去掉引号 |

### Step 4: 提取 Slots（→ `### Xxx slot`）

扫描 index.wxml 中的 `<slot>` 元素：
```html
<slot></slot>              → 默认 slot，名称 `-`
<slot name="header"></slot> → 命名 slot，名称 `header`
```

生成 2 列表格：`| 名称 | 描述 |`

描述规则：
- 默认 slot（名称 `-`）→ 描述为 "自定义内容"
- 命名 slot → 描述为占位文本，提示用户手动填写

### Step 5: 提取 ExternalClasses（→ `### Xxx externalClasses`）

扫描 index.wxml 中所有 `dora-` 前缀的 CSS class 属性：

```html
class="dora-class {{ classes.wrap }}"
hover-class="dora-hover-class {{ ... }}"
```

提取每个 `dora-*-class` 标识符（在 `{{ }}` 之前的部分）。

生成 2 列表格：`| 名称 | 描述 |`

### Step 6: 提取 CSS Variables（→ `## CSS Variables`）

#### 6a. 扫描 @prop 注释

在 `assets/` 下所有 `.less` 文件中搜索 `// @prop` 注释：
```less
// @prop --text-color: Text color of the button
// @prop --background-color: Background color of the button
```

提取 `--var-name` 和后面的描述文本。**注意：@prop 注释中的英文描述需要翻译为中文。**

描述翻译约定：变量名含 `z-index` 时，统一用 "xxx的z-index" 格式（如 `--z-index` → "组件的z-index"），而非 "堆叠顺序"。

#### 6b. 查找默认值

对每个 CSS 变量，在 assets 的 LESS 文件中搜索 `--var-name: <value>` 的赋值语句，提取默认值。

查找位置（按优先级）：
1. 初始化混入中的赋值（如 `.button-native()` 内的 `--opacity: 1;`）— 这是组件初始状态的值
2. 参数化混入中的赋值（如 `.button-color()` 内的 `--text-color: @color;`）— 需追踪 Less 变量调用实参
3. 变体选择器中的覆盖（如 `&--rounded { --border-radius: var(--height); }`）
4. 样式规则内的直接赋值

**Less 变量追踪**：当默认值是一个 Less 变量（如 `@button-disabled-opacity`）时，去 `assets/variables.less` 中查找该变量的定义，一直追踪到具体值：
```
--disabled-opacity: @button-disabled-opacity;
→ variables.less: @button-disabled-opacity: var(--dora-button-disabled-opacity, 0.5);
→ 默认值: 0.5
```

如果变量有多个赋值，取初始化混入中的第一次赋值作为表格默认值。

#### 6c. 查找全局变量

在 `assets/variables.less` 中搜索 `var(--dora-` 模式，建立映射表：

```less
@button-border-radius: var(--dora-button-border-radius, @border-radius-base);
@button-clear-activated-opacity: var(--dora-button-clear-activated-opacity, 0.4);
```

提取规则：
- 从 `var(--dora-xxx, fallback)` 中提取 `--dora-xxx` 作为全局变量名
- 将 Less 变量名（`@button-border-radius`）与 CSS 变量名（`--border-radius`）关联

匹配步骤：
1. 读取 `variables.less`，提取所有 `var(--dora-*, ...)` 模式，记录 `{ lessVar: '@xxx', globalVar: '--dora-xxx' }`
2. 对每个 CSS 变量（如 `--border-radius`），在 LESS 源码中搜索设置它的 Less 变量（如 `--border-radius: @button-border-radius`）
3. 如果该 Less 变量在 variables.less 中使用了 `var(--dora-*, ...)`，则提取对应的 `--dora-*` 作为全局变量
4. 如果找不到关联的全局变量 → 填 `-`

对于直接使用颜色混入参数的变量（如 `--text-color: @color`），需要追踪混入调用处的实参：
```less
.button-color(#get-color(positive)[], #get-color(positive, active)[], #get-color(positive, contrast)[]);
```
→ `--text-color` 对应 `@color` 参数，实参为 `#get-color(positive, contrast)[]`，无法直接映射到 `--dora-*` 变量时，检查对应位置是否有全局变量关联。

---

**模式 B：无 @prop 注释（如 input 组件）**

当 `assets/` 下的 `.less` 文件中没有 `// @prop` 注释时，改用此模式：

1. 读取 `assets/variables.less`，提取所有 `var(--dora-*, fallback)` 模式
2. 每个 `var(--dora-xxx, fallback)` 生成 CSS Variables 表格的一行：
   - `属性`: `--dora-xxx`（提取 `var()` 内的第一个参数）
   - `描述`: 从变量名推导（如 `--dora-input-label-width` → "输入框标签宽度"）
   - `默认值`: fallback 值，用反引号包裹
   - `全局变量`: `-`（这些变量本身就是组件的全局覆盖点）
3. 如果 `assets/index.less` 中也使用了 `--` 开头的 CSS 变量（用于组件内部），同样纳入表格，并搜索其赋值来源

#### 6d. 生成 CSS Variables 表格

4 列表格：`| 属性 | 描述 | 默认值 | 全局变量 |`

**描述必须为中文**。即使 @prop 注释是英文，也要翻译为中文后填入表格。
变量名含 `z-index` 时，统一用 "xxx的z-index" 格式，如 `--z-index` → "组件的z-index"。

默认值格式化：
- CSS 变量引用（如 `var(--dora-border-radius, 8px)`）保持原样，用反引号包裹
- 普通值（如 `#fff`、`1`、`48px`）用反引号包裹
- Less 变量引用需要解析为实际值（如 `@button-disabled-opacity` → 在 variables.less 中找到对应的 `0.5`）

### Step 7: 组装输出

将生成的章节写入组件的 README.md，格式如下：

```markdown
## API

### {ComponentName} props

[可选的类型定义代码块]

| 参数 | 类型 | 描述 | 默认值 |
| ---- | ---- | ---- | ------ |
| ... | ... | ... | ...    |

### {ComponentName} slot

| 名称 | 描述 |
| ---- | ---- |
| ...  | ...  |

### {ComponentName} externalClasses

| 名称 | 描述 |
| ---- | ---- |
| ...  | ...  |

## CSS Variables

| 属性 | 描述 | 默认值 | 全局变量 |
| ---- | ---- | ------ | -------- |
| ...  | ...  | ...    | ...      |
```

## 重要约定

1. **只生成 API 和 CSS Variables 章节**。README 的其他部分（安装、使用指南等）保持不动。
2. **表格列左对齐**，分隔符行不加冒号（`| ---- |` 不是 `| :--- |`）。
3. **类型值用反引号包裹**（如 `` `string` ``、`` `boolean` ``）。
4. **联合类型保留原始 TypeScript 语法**（如 `` `'solid' \| 'outline' \| 'clear'` ``）。
5. **描述来自 JSDoc 的第一行文本**，如果没有注释则留空。
6. **props 表格中的默认值 `-`** 表示无默认值或默认值为空字符串。
7. **CSS Variables 描述必须为中文**。@prop 注释中的英文描述需要翻译为中文后再填入表格。
8. **模式 B 中从变量名推导的描述也必须为中文**（如 `--dora-gallery-icon-size` → "画廊的操作图标大小"）。
9. **z-index 特殊处理**：变量名含 `z-index` 时描述统一用 "xxx的z-index"（如 `--z-index` → "组件的z-index"），不用 "堆叠顺序"。
