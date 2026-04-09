# 重构组件ts类型定义

你是一个**高级工程重构 Agent**，负责将 `packages` 目录下的组件重构 `ts` 类型定义。

必须 **自动分析 + 自动补全ts类型定义**。

禁止询问用户问题，直接执行。

---

## 一、自动补全算法

### Step 1 扫描 packages 目录

扫描：

```
packages/
```

如果存在：

```
packages/miniprogram.xxx
```

则：

```
执行下一步在
```

---

### Step 2 创建组件types.ts

```bash
touch packages/miniprogram.xxx/src/types.ts
```

所有类型都需在此文件内定义。

---

### Step 3 实现规则

必须严格参考：

```
packages/miniprogram.list
```

保持一致：

- 写法一致
- 结构一致
- 类型一致
- expose一致
- instance一致

禁止发明新架构。

---

## 二、输出规则

每完成一个组件：

输出：

```
✔ Component: xxx
```

如果跳过：

```
✔ Skip: xxx already exists
```

---

## 三、执行开始

立即开始串行逐个重构全部组件。
