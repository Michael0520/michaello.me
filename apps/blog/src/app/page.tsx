import Link from 'next/link';
import { siteConfig } from '@milo-me/site-config';
import { blogSource } from '../../lib/blog-source';

export default function HomePage() {
  const pages = blogSource.getPages();

  // Group by category
  const categories = pages.reduce((acc, page) => {
    const category = page.url.split('/')[2] || 'other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(page);
    return acc;
  }, {} as Record<string, typeof pages>);

  // Sort each category by date
  Object.keys(categories).forEach((key) => {
    categories[key].sort((a, b) => {
      const dateA = a.data.date ? new Date(a.data.date).getTime() : 0;
      const dateB = b.data.date ? new Date(b.data.date).getTime() : 0;
      return dateB - dateA;
    });
  });

  const categoryNames: Record<string, string> = {
    frontend: 'Frontend',
    backend: 'Backend',
    leetcode: 'LeetCode',
    'tech-talk': 'Tech Talk',
  };

  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{siteConfig.site.name}</h1>
        <p className="text-muted-foreground text-lg mb-6">
          {siteConfig.site.description}
        </p>
        <div className="flex gap-4">
          <Link
            href="/projects"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            View Projects →
          </Link>
          <Link
            href="/talks"
            className="text-primary hover:underline inline-flex items-center gap-1"
          >
            View Talks →
          </Link>
        </div>
      </div>

      {Object.entries(categories).map(([category, posts]) => (
        <section key={category} className="mb-16">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">
            {categoryNames[category] || category}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.url}
                href={post.url}
                className="group block p-6 border rounded-lg hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.data.title}
                  </h3>
                </div>

                {post.data.description && (
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.data.description}
                  </p>
                )}

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {post.data.date && (
                    <time dateTime={post.data.date}>
                      {new Date(post.data.date).toLocaleDateString('zh-TW', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  )}
                  {post.data.read && (
                    <>
                      <span>•</span>
                      <span>{post.data.read} min read</span>
                    </>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function generateMetadata() {
  return {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    openGraph: {
      title: siteConfig.site.title,
      description: siteConfig.site.description,
      url: siteConfig.site.url,
    },
  };
}
