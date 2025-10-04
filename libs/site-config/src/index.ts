/**
 * Site Configuration
 * Shared configuration for all apps in the monorepo
 */

export interface Author {
  name: string;
  email?: string;
  url?: string;
}

export interface SiteMetadata {
  name: string;
  title: string;
  description: string;
  url: string;
  locale: string;
  keywords: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  rss?: string;
}

export interface Analytics {
  googleAnalyticsId?: string;
  posthogApiKey?: string;
  posthogHost?: string;
}

export interface SiteConfig {
  author: Author;
  site: SiteMetadata;
  social: SocialLinks;
  analytics: Analytics;
  copyright: string;
}

export const siteConfig: SiteConfig = {
  author: {
    name: 'Michael Lo',
    url: 'https://www.michaello.me',
  },
  site: {
    name: "Michael's Blog",
    title: "Michael's Blog",
    description:
      'A Software Engineer. Get Web Development, Javascript, Typescript, React/VueJs, Next/Nuxt, Related Articles, Tips, Learning resources and more.',
    url: 'https://www.michaello.me',
    locale: 'zh-TW',
    keywords: [
      'taiwan',
      'software engineer',
      'frontend',
      'backend',
      'full stack',
      'leetcode',
      'coding',
      'self-learning',
      'javascript',
      'typescript',
      'react',
      'vue',
      'next.js',
      'nuxt',
    ],
  },
  social: {
    github: 'https://github.com/michael0520',
    rss: 'https://www.michaello.me/rss.xml',
    linkedin: '', // To be filled
  },
  analytics: {
    googleAnalyticsId: 'G-R6YQL587WJ',
    posthogApiKey: 'phc_PC08yTTTwd0c3QiR1llMQiBcwPNEykqMtUeQ4to8PBw',
    posthogHost: 'https://us.i.posthog.com',
  },
  copyright: `All right reserved © ${new Date().getFullYear()} Michael's Blog`,
};

// Helper functions
export const getMetaTags = () => {
  return {
    title: siteConfig.site.title,
    description: siteConfig.site.description,
    keywords: siteConfig.site.keywords.join(', '),
    author: siteConfig.author.name,
    'application-name': siteConfig.author.name,
    'apple-mobile-web-app-title': siteConfig.author.name,
    viewport: 'width=device-width, initial-scale=1',
    'theme-color': [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
  };
};

export const getOpenGraphTags = () => {
  return {
    'og:title': siteConfig.site.title,
    'og:description': siteConfig.site.description,
    'og:url': siteConfig.site.url,
    'og:type': 'website',
    'og:locale': siteConfig.site.locale,
  };
};

export { GoogleAnalytics } from './components/GoogleAnalytics';
export { PostHog } from './components/PostHog';
