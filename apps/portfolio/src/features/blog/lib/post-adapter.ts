import type { PostMetadata as BlogPostMetadata } from '@milo-me/blog-metadata';
import type { Post, PostMetadata } from '../types/post';

/**
 * Adapter to convert blog-metadata PostMetadata to Portfolio Post type
 * This maintains backward compatibility with existing Portfolio components
 */
export function blogMetadataToPost(blogPost: BlogPostMetadata): Post {
  const metadata: PostMetadata = {
    title: blogPost.title,
    description: blogPost.description,
    image: blogPost.image,
    category: blogPost.category,
    icon: blogPost.icon,
    createdAt: blogPost.date,
    date: blogPost.date,
  };

  return {
    slug: blogPost.slug,
    metadata,
    content: '', // Empty since we don't have full content in metadata library
  };
}

/**
 * Convert array of blog metadata to Portfolio Post format
 */
export function blogMetadataArrayToPosts(
  blogPosts: BlogPostMetadata[]
): Post[] {
  return blogPosts.map(blogMetadataToPost);
}
