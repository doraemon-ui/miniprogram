---
自动生成playground/miniprogram演示demo的构建脚本scripts/build-playground-miniprogram.js
---

# 自动生成playground/miniprogram演示demo

## Context

- 路径: `playground/miniprogram`

## Instructions

### 1. 环境探测

- 扫描 `playground/miniprogram/pages/index/components.js` 配置文件，依次读取并解析到组件 `$COMPONENT`
- 读取 `packages/miniprogram.$COMPONENT` 组件是否存在，

示例：

```md
url: '/accordion/index' >>> accordion >>> packages/miniprogram.accordion
```

### 2. 复制组件页面

复制 `packages/miniprogram.$COMPONENT$/playground/pages/index` 整个文件，并重命名为 `$COMPONENT` 到 `playground/miniprogram/pages` 目录下。

示例：

```md
packages/miniprogram.accordion/playground/pages/index >>> playground/miniprogram/pages/accordion
```

### 3. 注册组件页面

`playground/miniprogram/pages/app.json` 的 `pages` 属性中注册 `$COMPONENT/index` 组件页面

示例：

```json
{
  "pages": ["index/index", "about/index", "accordion/index"]
}
```

### 4. 安装依赖

`playground/miniprogram/pages/package.json` 中引入组件对应的依赖，注意不要重复引入

### 5. 构建脚本

`playground/miniprogram/pages/miniprogram_npm` 由微信开发者工具-工具-“构建npm”，无需实现

### 6. 禁止规则

- 注意不是 `playground/miniprogram/pages/pages`。
- 不要删除当前 `pages/` 目录下的文件夹。
- 不需要构建 `playground/miniprogram/pages/index/components.js` 文件。

# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
