---
name: generate-readme
description: 自动生成 miniprogram 组件的 README.md，包括 ## API（Props、Semantic DOM、Slot、ExternalClasses）和 ## CSS Variables 章节
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
3. `{组件路径}/src/types.ts`（如果存在）— props 精确类型、Semantic DOM 名称
4. `{组件路径}/assets/` 下所有 `.less` 文件 — CSS variables

### Step 2.5: 多组件 README 排序规则

当一个包同时导出多个组件时，`## API` 章节必须按“组件分组”输出，且每个组件内的章节顺序固定：

1. `### Xxx props`
2. `### Xxx Semantic DOM`（如果支持，否则跳过）
3. `### Xxx slot`
4. `### Xxx externalClasses`

要求：
- 先完整输出第一个组件的以上章节，再输出第二个组件，依次类推
- 不要把多个组件的 `props`、`slot`、`externalClasses` 交叉摆放
- `## CSS Variables` 必须放在所有组件 API 小节之后，统一作为最后一节
- 如果组件没有 Semantic DOM，则直接跳到 `slot`，不要打乱剩余顺序

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

### Step 4: 提取 Semantic DOM（→ `### Xxx Semantic DOM`）

当组件支持语义化 classNames/styles 定制时，在 `## API` 中补充 `### Xxx Semantic DOM` 章节。

生成 3 列表格：`| 参数 | 描述 | 示例 |`

#### 4a. 判断组件是否支持 Semantic DOM

满足以下任一条件即可认为支持：
1. `src/index.ts` 的 `@Component.props` 中存在 `classNames` 或 `styles`
2. 组件类字段或 `src/types.ts` 中存在 `classNames?: Partial<Record<SemanticName, ...>>` / `styles?: Partial<Record<SemanticName, ...>>`
3. `src/index.ts` 中使用了 `useSemanticClassNames`、`useSemanticStyles`、`useSemanticStylesString`、`useMergeSemantic`

如果不支持，则跳过本节。

#### 4b. 提取语义节点名称

优先级如下：
1. `src/types.ts` 中的 `export type SemanticName = 'root' | 'hover' | ...`
2. `src/index.ts` 中 `classNames!: Partial<Record<SemanticName, string>>` / `styles!: ...` 关联到的 `SemanticName`
3. `src/index.ts` 中 `classNames: { ... }`、`styles: { ... }` 对象字面量的 key

提取后按源码定义顺序输出。

#### 4c. 推导描述

描述规则：
- **第一优先级：`src/types.ts` 中的注释**
  - 优先读取和 `SemanticName`、`classNames`、`styles` 相关的类型定义、接口字段或映射对象上的注释
  - 如果 `src/types.ts` 中为某个语义节点提供了注释说明，直接使用该注释的第一行作为描述
- **第二优先级：`src/index.ts` 中的注释**
  - 读取组件类字段、语义合并逻辑、局部映射对象附近的注释 / JSDoc 第一行
- **第三优先级：内置兜底规则**
  - `root` → `根元素，设置容器样式和布局`
  - `hover` → `按压元素，按钮按下去的样式类`
- 其他语义节点：
  - 优先读取 `src/types.ts`，其次读取 `src/index.ts` 中该节点附近的注释 / JSDoc 第一行
  - 若无注释，则根据名称生成占位中文描述，提醒用户后续确认

#### 4d. 生成示例

示例列统一使用 `info[wxml]>` 语法，供 docs 站点的 popover 插件渲染：

```md
info[wxml]>`<dora-button classNames="{{ { root: 'my-classname' } }}" styles="{{ { root: { color: 'red' } } }}" />`
```

生成规则：
1. 标签名取组件 README / WXML 实际使用的自定义组件名，默认按目录名推导为 kebab-case，例如：
   - `packages/miniprogram.button` → `dora-button`
   - `packages/miniprogram.selector-group` → `dora-selector-group`
2. `classNames` 示例始终包含当前语义节点：
   - `classNames="{{ { root: 'my-classname' } }}"`
3. `styles` 示例始终包含当前语义节点：
   - `styles="{{ { root: { color: 'red' } } }}"`
4. 示例保持单行写法，让 docs 插件负责在 popover 中格式化为多行代码块

#### 4e. 输出位置

`### Xxx Semantic DOM` 必须放在 `### Xxx props` 之后、`### Xxx slot` 之前。

### Step 5: 提取 Slots（→ `### Xxx slot`）

扫描 index.wxml 中的 `<slot>` 元素：
```html
<slot></slot>              → 默认 slot，名称 `-`
<slot name="header"></slot> → 命名 slot，名称 `header`
```

生成 2 列表格：`| 名称 | 描述 |`

描述规则：
- 默认 slot（名称 `-`）→ 描述为 "自定义内容"
- 命名 slot → 描述为占位文本，提示用户手动填写

### Step 6: 提取 ExternalClasses（→ `### Xxx externalClasses`）

扫描 index.wxml 中所有 `dora-` 前缀的 CSS class 属性：

```html
class="dora-class {{ classes.wrap }}"
hover-class="dora-hover-class {{ ... }}"
```

提取每个 `dora-*-class` 标识符（在 `{{ }}` 之前的部分）。

生成 2 列表格：`| 名称 | 描述 |`

### Step 7: 提取 CSS Variables（→ `## CSS Variables`）

#### 7a. 扫描 @prop 注释

在 `assets/` 下所有 `.less` 文件中搜索 `// @prop` 注释：
```less
// @prop --text-color: Text color of the button
// @prop --background-color: Background color of the button
```

提取 `--var-name` 和后面的描述文本。**注意：@prop 注释中的英文描述需要翻译为中文。**

描述翻译约定：变量名含 `z-index` 时，统一用 "xxx的z-index" 格式（如 `--z-index` → "组件的z-index"），而非 "堆叠顺序"。

#### 7b. 查找默认值

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

**递归解析要求**：
- 如果 `assets/variables.less` 本身又 `@import` 了设计 token 文件（如 `@doraemon-ui/style/lib/index.less`、`theme.default.less`），必须继续解析这些导入文件中的 Less 变量定义
- 对 `var(--token, @less-var)` 这种 fallback 形式，默认值不能停在 `@less-var`，必须继续追到最终字面值
- 对链式引用同样继续展开，例如：
  - `@index-list-item-padding-horizontal: var(--dora-index-list-item-padding-horizontal, @spacing-xl);`
  - `@spacing-xl: 16px;`
  - 最终默认值应为 `16px`
- 对同类情况如 `@margin-component-base: 6px`、`@font-size-sm: 12px`、`@border-radius-base: var(--dora-border-radius, 8px)`，应分别解析为：
  - `6px`
  - `12px`
  - `var(--dora-border-radius, 8px)`（如果最终定义本身就是 CSS 变量表达式，则默认值列保留整个 `var(...)` 原文）
- 规则总结：
  - 最终解析结果若是普通字面值，表格写字面值，如 `16px`、`6px`、`12px`
  - 最终解析结果若是 `var(...)`，表格写完整 `var(...)`
  - 但 `var(...)` 的 fallback 部分如果仍包含 Less 变量、Less 颜色函数或可安全计算的表达式，必须继续解析为更具体的值
  - 例如 `var(--dora-color-step-15, mix(@black-value, @white-value, 15%))` 应进一步写成 `var(--dora-color-step-15, #d9d9d9)`
  - 最终解析结果若是 Less 表达式且无法安全继续化简，也保留表达式原文
- 不要把中间态 Less 变量名（如 `@spacing-xl`）或错误的猜测值直接写进 README

如果变量有多个赋值，取初始化混入中的第一次赋值作为表格默认值。

#### 7c. 查找全局变量

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

#### 7d. 生成 CSS Variables 表格

4 列表格：`| 属性 | 描述 | 默认值 | 全局变量 |`

**描述必须为中文**。即使 @prop 注释是英文，也要翻译为中文后填入表格。
变量名含 `z-index` 时，统一用 "xxx的z-index" 格式，如 `--z-index` → "组件的z-index"。

默认值格式化：
- CSS 变量引用（如 `var(--dora-border-radius, 8px)`）保持原样，用反引号包裹
- 普通值（如 `#fff`、`1`、`48px`）用反引号包裹
- Less 变量引用需要递归解析：
  - 若最终落到普通值，写普通值
  - 若最终落到 `var(...)`，写完整 `var(...)`

### Step 8: 组装输出

将生成的章节写入组件的 README.md，格式如下：

```markdown
## API

### {ComponentName} props

[可选的类型定义代码块]

| 参数 | 类型 | 描述 | 默认值 |
| ---- | ---- | ---- | ------ |
| ... | ... | ... | ...    |

### {ComponentName} Semantic DOM

| 参数 | 描述 | 示例 |
| ---- | ---- | ---- |
| ...  | ...  | ...  |

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
7. **Semantic DOM 示例统一使用 `info[wxml]>` 前缀**，不要直接写普通反引号代码片段。
8. **Semantic DOM 的示例标签名默认使用 `dora-{component-name}`**，除非源码或现有 README 明确使用了别名。
9. **章节顺序必须固定为**：`props → Semantic DOM → slot → externalClasses`。
10. **CSS Variables 描述必须为中文**。@prop 注释中的英文描述需要翻译为中文后再填入表格。
11. **模式 B 中从变量名推导的描述也必须为中文**（如 `--dora-gallery-icon-size` → "画廊的操作图标大小"）。
12. **z-index 特殊处理**：变量名含 `z-index` 时描述统一用 "xxx的z-index"（如 `--z-index` → "组件的z-index"），不用 "堆叠顺序"。
