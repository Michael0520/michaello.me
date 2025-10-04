import './global.css';
import {
  siteConfig,
  getMetaTags,
  GoogleAnalytics,
  PostHog,
} from '@milo-me/site-config';

const metaTags = getMetaTags();

export const metadata = {
  title: `Slides & Presentations - ${siteConfig.site.name}`,
  description: 'Technical presentations and slide decks',
  keywords: metaTags.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  metadataBase: new URL(siteConfig.site.url),
  openGraph: {
    type: 'website',
    locale: siteConfig.site.locale,
    url: siteConfig.site.url,
    title: `Slides & Presentations - ${siteConfig.site.name}`,
    description: 'Technical presentations and slide decks',
    siteName: siteConfig.site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Slides & Presentations - ${siteConfig.site.name}`,
    description: 'Technical presentations and slide decks',
    creator: '@michael0520',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteConfig.site.locale}>
      <body>
        {siteConfig.analytics.googleAnalyticsId && (
          <GoogleAnalytics gaId={siteConfig.analytics.googleAnalyticsId} />
        )}
        {siteConfig.analytics.posthogApiKey &&
          siteConfig.analytics.posthogHost && (
            <PostHog
              apiKey={siteConfig.analytics.posthogApiKey}
              apiHost={siteConfig.analytics.posthogHost}
            />
          )}
        {children}
      </body>
    </html>
  );
}
