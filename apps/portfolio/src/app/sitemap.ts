import dayjs from 'dayjs';
import type { MetadataRoute } from 'next';

import { SITE_INFO } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Portfolio app only contains the main page and blog list page
  // Individual blog posts are in the blog app and will be in its sitemap
  const routes = ['', '/blog'].map((route) => ({
    url: `${SITE_INFO.url}${route}`,
    lastModified: dayjs().toISOString(),
  }));

  return routes;
}
