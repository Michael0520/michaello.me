import './global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import type { ReactNode } from 'react';
import {
  siteConfig,
  getMetaTags,
  GoogleAnalytics,
  PostHog,
} from '@milo-me/site-config';

const metaTags = getMetaTags();

export const metadata = {
  title: siteConfig.site.title,
  description: siteConfig.site.description,
  keywords: metaTags.keywords,
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  metadataBase: new URL(siteConfig.site.url),
  openGraph: {
    type: 'website',
    locale: siteConfig.site.locale,
    url: siteConfig.site.url,
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    siteName: siteConfig.site.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.site.title,
    description: siteConfig.site.description,
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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.site.locale} suppressHydrationWarning>
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
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
