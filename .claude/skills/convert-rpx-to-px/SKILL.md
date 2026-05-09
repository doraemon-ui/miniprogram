---
name: convert-rpx-to-px
description: 扫描 packages 下的所有 LESS 文件，将 rpx 单位转换为 px，值除以 2。
allowed-tools: Bash(npm *), Read, Grep, Write
---

# Convert RPX to PX

## Context

- 作用于 monorepo 的 packages 目录
- 默认扫描路径：`packages/**/*.less`
- 可传入自定义路径参数

## Instructions

1. 接收可选参数 `$ARG` 作为扫描路径，如果未提供则默认使用 `packages/**/*.less`
2. 对匹配的 LESS 文件，使用 `sed` 或 `perl` 将所有 `rpx` 单位改成 `px`，同时数值除以 2
3. 保留原文件路径和内容结构
4. 输出处理完成的文件列表

## Implementation

```bash
#!/usr/bin/env bash

# 设置扫描路径，默认 packages/**/*.less
SCAN_PATH="${1:-packages/**/*.less}"

# 查找所有 LESS 文件
FILES=$(find . -path "$SCAN_PATH" -type f)

echo "Processing files..."
for FILE in $FILES; do
  # 使用 perl 进行替换：匹配数字+rpx，除以2并改为px
  perl -pi -e 's/(\d+(\.\d+)?)rpx/sprintf("%.2fpx", $1/2)/ge' "$FILE"
  echo "Converted: $FILE"
done

echo "All files processed."
```
