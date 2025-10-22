import postsMetadataJson from './lib/posts-metadata.json';
import type { PostMetadata } from './lib/types';

export type { PostMetadata };

export const postsMetadata: PostMetadata[] = postsMetadataJson;

/**
 * Get all posts sorted by date (newest first)
 */
export function getAllPosts(): PostMetadata[] {
  return postsMetadata;
}

/**
 * Get featured posts
 * @param limit - Maximum number of posts to return (default: 3)
 */
export function getFeaturedPosts(limit = 3): PostMetadata[] {
  return postsMetadata.filter((p) => p.featured).slice(0, limit);
}

/**
 * Get latest posts
 * @param limit - Maximum number of posts to return (default: 5)
 */
export function getLatestPosts(limit = 5): PostMetadata[] {
  return postsMetadata.slice(0, limit);
}

/**
 * Get posts by category
 * @param category - Category name
 */
export function getPostsByCategory(category: string): PostMetadata[] {
  return postsMetadata.filter((p) => p.category === category);
}

/**
 * Get post by slug
 * @param slug - Post slug
 */
export function getPostBySlug(slug: string): PostMetadata | undefined {
  return postsMetadata.find((p) => p.slug === slug);
}
