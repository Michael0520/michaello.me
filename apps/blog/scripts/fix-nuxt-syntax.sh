#!/bin/bash

# Blog 文章 Nuxt Content 語法修復腳本
# 轉換為標準 Markdown/MDX 格式

BLOG_DIR="/Users/luoziming/github-project/milo-me-new/apps/docs/content/blog"

echo "開始修復 Nuxt Content 語法..."

# 遍歷所有 .mdx 文件
find "$BLOG_DIR" -type f -name "*.mdx" | while read -r file; do
  echo "處理: $file"

  # 創建臨時文件
  tmp_file=$(mktemp)

  # 使用 awk 處理文件
  awk '
    BEGIN {
      in_card = 0
      in_field_group = 0
      card_content = ""
      title = ""
      description = ""
      content_started = 0
    }

    # 處理 ::card 開始
    /^[[:space:]]*::card/ {
      in_card = 1
      card_content = ""
      title = ""
      description = ""
      content_started = 0
      next
    }

    # 在 card 內部
    in_card == 1 {
      # 跳過 frontmatter 分隔符
      if ($0 ~ /^---$/) {
        next
      }
      # 跳過 icon 相關行
      if ($0 ~ /^[[:space:]]*icon:/) {
        next
      }
      if ($0 ~ /^[[:space:]]*icon-size:/) {
        next
      }
      # 處理 #title
      if ($0 ~ /^[[:space:]]*#title/) {
        getline
        title = $0
        next
      }
      # 處理 #description
      if ($0 ~ /^[[:space:]]*#description/) {
        getline
        description = $0
        next
      }
      # 處理 #content
      if ($0 ~ /^[[:space:]]*#content/) {
        content_started = 1
        next
      }
      # 處理 ::br
      if ($0 ~ /^[[:space:]]*::br/) {
        card_content = card_content "\n"
        next
      }
      # 遇到 </div> 結束 card
      if ($0 ~ /<\/div>/) {
        in_card = 0
        # 輸出轉換後的內容
        if (title != "") {
          print "## 題目"
          print ""
          print title
          print ""
        }
        if (description != "") {
          print "**" description "**"
          print ""
        }
        if (card_content != "") {
          print card_content
        }
        print ""
        next
      }
      # 收集內容
      if (content_started == 1) {
        card_content = card_content $0 "\n"
      }
      next
    }

    # 處理 ::field-group
    /^[[:space:]]*::field-group/ {
      in_field_group = 1
      print "### API 參考"
      print ""
      next
    }

    # 處理 ::field
    /^[[:space:]]*::field\{/ {
      # 提取 name 和 type
      match($0, /name="([^"]*)"/, name_arr)
      match($0, /type="([^"]*)"/, type_arr)
      if (name_arr[1] != "") {
        print "- `" name_arr[1] "`"
        if (type_arr[1] != "") {
          print "  - 類型: `" type_arr[1] "`"
        }
      }
      next
    }

    # 結束 field-group
    /^[[:space:]]*<\/div>/ && in_field_group == 1 {
      in_field_group = 0
      print ""
      next
    }

    # 處理 ::br
    /^[[:space:]]*::br[[:space:]]*$/ {
      print ""
      print ""
      next
    }

    # 處理 ::alert (如果還有遺留的)
    /^[[:space:]]*::alert\{/ {
      match($0, /title="([^"]*)"/, title_arr)
      match($0, /type="([^"]*)"/, type_arr)
      alert_type = (type_arr[1] != "") ? type_arr[1] : "info"
      alert_title = (title_arr[1] != "") ? title_arr[1] : ""

      # 開始收集 alert 內容
      getline
      alert_content = ""
      while ($0 !~ /<\/div>/ && getline > 0) {
        alert_content = alert_content $0 "\n"
      }

      # 輸出為 blockquote
      if (alert_title != "") {
        print "> **" alert_title "**"
        print ">"
      }
      # 輸出內容並加上 > 前綴
      n = split(alert_content, lines, "\n")
      for (i = 1; i <= n; i++) {
        if (lines[i] != "") {
          print "> " lines[i]
        } else {
          print ">"
        }
      }
      print ""
      next
    }

    # 移除孤立的 <div className="mt-6">
    /^<div className="mt-6">$/ {
      next
    }

    # 移除多餘的 </div> (配對檢查由 card 處理處理)
    /^<\/div>$/ && in_card == 0 && in_field_group == 0 {
      next
    }

    # 移除 <!-- Alert: --> 註釋
    /^<!-- Alert:/ {
      next
    }

    # 移除 <!-- field-group --> 註釋
    /^<!-- field-group -->/ {
      next
    }

    # 其他行原樣輸出
    {
      print $0
    }
  ' "$file" > "$tmp_file"

  # 替換原文件
  mv "$tmp_file" "$file"

  echo "✓ 修復完成: $file"
done

echo "所有文章修復完成！"
