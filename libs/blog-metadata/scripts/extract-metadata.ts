import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface PostMetadata {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image?: string;
  featured?: boolean;
  icon?: string;
}

function extractMetadata(): PostMetadata[] {
  const contentPath = path.join(__dirname, '../content/posts');
  const metadata: PostMetadata[] = [];

  if (!fs.existsSync(contentPath)) {
    console.error(`Content path not found: ${contentPath}`);
    return [];
  }

  // 遍歷所有類別
  const categories = fs
    .readdirSync(contentPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const category of categories) {
    const categoryPath = path.join(contentPath, category);
    const files = fs
      .readdirSync(categoryPath)
      .filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
      const filePath = path.join(categoryPath, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);

      metadata.push({
        slug: path.basename(file, '.mdx'),
        title: data.title || 'Untitled',
        description: data.description || '',
        date: data.date || data.createdAt || new Date().toISOString(),
        category: data.category || category,
        image: data.image,
        featured: data.featured || false,
        icon: data.icon,
      });
    }
  }

  return metadata.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// 輸出到 JSON 文件
const metadata = extractMetadata();
const outputPath = path.join(__dirname, '../src/lib/posts-metadata.json');

// 確保目錄存在
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(metadata, null, 2));

console.info(`✅ Extracted metadata for ${metadata.length} posts`);
console.info(`📁 Output: ${outputPath}`);
