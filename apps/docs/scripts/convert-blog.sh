#!/bin/bash

# Blog 文章批量轉換腳本
# 用途：將 Nuxt Content 格式的 .md 文件轉換為 Fumadocs 格式的 .mdx

BLOG_DIR="/Users/luoziming/github-project/milo-me-new/apps/docs/content/blog"

echo "開始批量轉換 blog 文章..."

# 遍歷所有 .md 文件
find "$BLOG_DIR" -type f -name "*.md" | while read -r file; do
  echo "處理: $file"

  # 新文件名（.md -> .mdx）
  new_file="${file%.md}.mdx"

  # 1. 移除 frontmatter 中的 icon 和 read 字段
  # 2. 轉換 Nuxt Content 特殊語法
  sed -E '
    # 移除 icon 行
    /^icon:/d
    # 移除 read 行
    /^read:/d
    # 轉換 ::alert 為 HTML blockquote 或註釋
    s/^::alert\{type="([^"]*)"\}/<!-- Alert: \1 -->/
    s/^::alert\{type="([^"]*)" icon="[^"]*"\}/<!-- Alert: \1 -->/
    # 轉換 ::div 為 HTML div
    s/^::div\{class="([^"]*)"\}/<div className="\1">/
    # 轉換 ::field-group 為註釋
    s/^::field-group/<!-- field-group -->/
    # 轉換結束標記 :: 為對應的 HTML 結束標記或註釋結束
    s/^::$/<\/div>/
  ' "$file" > "$new_file"

  # 刪除原 .md 文件
  rm "$file"

  echo "✓ 轉換完成: $new_file"
done

echo "所有文章轉換完成！"
