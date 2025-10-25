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

// Recursively find all MDX files in a directory
function findMdxFiles(dir: string): string[] {
  const mdxFiles: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      // Skip directories starting with _ (like _dir.yml directories)
      if (!item.name.startsWith('_')) {
        mdxFiles.push(...findMdxFiles(fullPath));
      }
    } else if (item.isFile() && item.name.endsWith('.mdx')) {
      mdxFiles.push(fullPath);
    }
  }

  return mdxFiles;
}

function extractMetadata(): PostMetadata[] {
  // Use shared content library
  const contentPath = path.join(
    __dirname,
    '../../../libs/blog-content/content/posts'
  );
  const metadata: PostMetadata[] = [];

  if (!fs.existsSync(contentPath)) {
    console.error(`Content path not found: ${contentPath}`);
    return [];
  }

  // Find all MDX files recursively
  const allMdxFiles = findMdxFiles(contentPath);

  for (const filePath of allMdxFiles) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);

    // Extract category from path (first directory after posts/)
    const relativePath = path.relative(contentPath, filePath);
    const pathParts = relativePath.split(path.sep);
    const category = pathParts[0];

    metadata.push({
      slug: path.basename(filePath, '.mdx'),
      title: data.title || 'Untitled',
      description: data.description || '',
      date: data.date || data.createdAt || new Date().toISOString(),
      category: data.category || category,
      image: data.image,
      featured: data.featured || false,
      icon: data.icon,
    });
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
