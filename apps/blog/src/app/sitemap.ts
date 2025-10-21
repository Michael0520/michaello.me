import { MetadataRoute } from 'next';
import { blogSource } from '../../lib/blog-source';
import { siteConfig } from '@milo-me/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.site.url;

  // Get all blog posts
  const blogPosts = blogSource.getPages().map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogPosts,
  ];
}
