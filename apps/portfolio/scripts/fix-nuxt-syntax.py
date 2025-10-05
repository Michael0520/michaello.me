#!/usr/bin/env python3
"""
Blog 文章 Nuxt Content 語法修復腳本
轉換為標準 Markdown/MDX 格式
"""

import re
import sys
from pathlib import Path

BLOG_DIR = Path("/Users/luoziming/github-project/milo-me-new/apps/docs/content/blog")

def fix_card_block(lines, i):
    """處理 ::card 區塊"""
    result = []
    title = ""
    description = ""
    content = []
    in_frontmatter = False
    in_content = False

    i += 1  # 跳過 ::card 行
    while i < len(lines):
        line = lines[i]

        # 遇到 </div> 結束
        if line.strip() == "</div>":
            # 輸出轉換後的內容
            if title:
                result.append("## 題目\n")
                result.append(f"{title}\n\n")
            if description:
                result.append(f"**{description}**\n\n")
            if content:
                result.extend(content)
                result.append("\n")
            return result, i + 1

        # 跳過 frontmatter
        if line.strip() == "---":
            in_frontmatter = not in_frontmatter
            i += 1
            continue

        if in_frontmatter or line.strip().startswith("icon"):
            i += 1
            continue

        # 處理各種標記
        if line.strip() == "#title":
            i += 1
            if i < len(lines):
                title = lines[i].strip()
            i += 1
            continue

        if line.strip() == "#description":
            i += 1
            if i < len(lines):
                description = lines[i].strip()
            i += 1
            continue

        if line.strip() == "#content":
            in_content = True
            i += 1
            continue

        # 處理 ::br
        if line.strip() == "::br":
            if in_content:
                content.append("\n")
            i += 1
            continue

        # 收集內容
        if in_content:
            content.append(line)

        i += 1

    return result, i

def fix_field_group(lines, i):
    """處理 ::field-group 和 ::field"""
    result = ["### API 參考\n\n"]
    i += 1  # 跳過 ::field-group 行

    while i < len(lines):
        line = lines[i]

        # 遇到 </div> 結束
        if line.strip() == "</div>":
            result.append("\n")
            return result, i + 1

        # 處理 ::field
        if line.strip().startswith("::field{"):
            name_match = re.search(r'name="([^"]*)"', line)
            type_match = re.search(r'type="([^"]*)"', line)
            if name_match:
                result.append(f"- `{name_match.group(1)}`\n")
                if type_match:
                    result.append(f"  - 類型: `{type_match.group(1)}`\n")
            i += 1
            continue

        i += 1

    return result, i

def fix_alert_block(lines, i):
    """處理 ::alert 區塊（支援縮排和 :: 結束標記）"""
    line = lines[i]
    indent = len(line) - len(line.lstrip())
    indent_str = line[:indent]

    title_match = re.search(r'title="([^"]*)"', line)
    type_match = re.search(r'type="([^"]*)"', line)

    alert_title = title_match.group(1) if title_match else ""

    result = []
    if alert_title:
        result.append(f"{indent_str}> **{alert_title}**\n")

    i += 1  # 跳過 ::alert 行
    content_lines = []

    while i < len(lines):
        line = lines[i]
        stripped = line.strip()

        # 檢查結束標記
        if stripped == "::" or stripped == "</div>":
            # 輸出收集的內容
            for content_line in content_lines:
                if content_line.strip():
                    result.append(f"{indent_str}> {content_line.lstrip()}")
                else:
                    result.append(f"{indent_str}>\n")
            result.append("\n")
            return result, i + 1

        # 收集內容行
        content_lines.append(line)
        i += 1

    return result, i

def process_file(file_path):
    """處理單個文件"""
    print(f"處理: {file_path}")

    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    result = []
    i = 0

    while i < len(lines):
        line = lines[i]

        # 處理 ::card
        if line.strip().startswith("::card"):
            card_result, i = fix_card_block(lines, i)
            result.extend(card_result)
            continue

        # 處理 ::field-group
        if line.strip().startswith("::field-group"):
            field_result, i = fix_field_group(lines, i)
            result.extend(field_result)
            continue

        # 處理 ::alert
        if line.strip().startswith("::alert{"):
            alert_result, i = fix_alert_block(lines, i)
            result.extend(alert_result)
            continue

        # 處理 ::br
        if line.strip() == "::br":
            result.append("\n\n")
            i += 1
            continue

        # 移除孤立的 <div className="mt-6">
        if line.strip() == '<div className="mt-6">':
            i += 1
            continue

        # 移除多餘的 </div>
        if line.strip() == "</div>":
            i += 1
            continue

        # 移除 <!-- Alert: --> 註釋
        if line.strip().startswith("<!-- Alert:"):
            i += 1
            continue

        # 移除 <!-- field-group --> 註釋
        if line.strip() == "<!-- field-group -->":
            i += 1
            continue

        # 其他行原樣保留
        result.append(line)
        i += 1

    # 寫回文件
    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(result)

    print(f"✓ 修復完成: {file_path}")

def main():
    print("開始修復 Nuxt Content 語法...")

    mdx_files = list(BLOG_DIR.rglob("*.mdx"))

    for file_path in mdx_files:
        try:
            process_file(file_path)
        except Exception as e:
            print(f"✗ 錯誤 {file_path}: {e}", file=sys.stderr)

    print("所有文章修復完成！")

if __name__ == "__main__":
    main()
