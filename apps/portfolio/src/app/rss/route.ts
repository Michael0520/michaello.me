import dayjs from 'dayjs';
import { getAllPosts } from '@milo-me/blog-metadata';

import { SITE_INFO } from '@/config/site';

export const dynamic = 'force-static';

export function GET() {
  const allPosts = getAllPosts();

  const itemsXml = allPosts
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${SITE_INFO.url}/posts/${post.slug}</link>
          <description>${post.description || ''}</description>
          <pubDate>${dayjs(post.date).toISOString()}</pubDate>
        </item>`
    )
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Blog | ${SITE_INFO.name}</title>
      <link>${SITE_INFO.url}</link>
      <description>${SITE_INFO.description}</description>
      ${itemsXml}
    </channel>
  </rss>`;

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}
