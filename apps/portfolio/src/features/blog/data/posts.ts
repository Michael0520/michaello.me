import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import type { Post, PostMetadata } from '@/features/blog/types/post';

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent);

  return {
    metadata: file.data as PostMetadata,
    content: file.content,
  };
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  return parseFrontmatter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map<Post>((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));

    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getAllPosts() {
  // Read from blog app content directory
  const blogContentPath = path.join(process.cwd(), '../blog/content/posts');

  // Get all subdirectories (categories) in posts folder
  const categories = fs
    .readdirSync(blogContentPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Get all posts from all categories
  const allPosts: Post[] = [];
  for (const category of categories) {
    const categoryPath = path.join(blogContentPath, category);
    const posts = getMDXData(categoryPath);
    allPosts.push(...posts);
  }

  return allPosts.sort(
    (a, b) =>
      new Date(b.metadata.createdAt ?? b.metadata.date ?? '').getTime() -
      new Date(a.metadata.createdAt ?? a.metadata.date ?? '').getTime()
  );
}

export function getPostBySlug(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((post) => post.metadata?.category === category);
}

export function findNeighbour(posts: Post[], slug: string) {
  const len = posts.length;

  for (let i = 0; i < len; ++i) {
    if (posts[i].slug === slug) {
      return {
        previous: i > 0 ? posts[i - 1] : null,
        next: i < len - 1 ? posts[i + 1] : null,
      };
    }
  }

  return { previous: null, next: null };
}
