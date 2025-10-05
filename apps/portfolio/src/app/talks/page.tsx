import Link from 'next/link';
import { siteConfig } from '@milo-me/site-config';

export default function TalksPage() {
  const talks = [
    {
      title: 'Upcoming Talks',
      date: '2025',
      event: 'Stay tuned',
      description: 'Conference talks and presentations coming soon',
    },
  ];

  return (
    <div className="container max-w-6xl py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Talks</h1>
        <p className="text-muted-foreground text-lg">
          Conference talks and presentations
        </p>
      </div>

      <div className="grid gap-6">
        {talks.map((talk, index) => (
          <div
            key={index}
            className="p-6 border rounded-lg hover:border-primary transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="text-2xl font-semibold">{talk.title}</h2>
              <span className="text-sm text-muted-foreground">{talk.date}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{talk.event}</p>
            <p className="text-sm">{talk.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-muted-foreground">
        <p>View slides at</p>
        <Link href="/slides" className="text-primary hover:underline">
          michaello.me/slides
        </Link>
      </div>
    </div>
  );
}

export function generateMetadata() {
  return {
    title: `Talks - ${siteConfig.site.name}`,
    description: 'Conference talks and presentations',
    openGraph: {
      title: `Talks - ${siteConfig.site.name}`,
      description: 'Conference talks and presentations',
      url: `${siteConfig.site.url}/talks`,
    },
  };
}
