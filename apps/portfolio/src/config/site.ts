import { USER } from '@/features/profile/data/user';
import type { NavItem } from '@/types/nav';

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || 'https://www.michaello.me',
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: '#ffffff',
  dark: '#09090b',
};

export const MAIN_NAV: NavItem[] = [
  {
    title: 'Portfolio',
    href: '/',
  },
  {
    title: 'Blog',
    href: '/blog',
  },
  {
    title: 'Lab',
    href: '/lab',
  },
];

export const GITHUB_USERNAME = 'michael0520';
export const SOURCE_CODE_GITHUB_REPO = 'michael0520/milo-me-new';
export const SOURCE_CODE_GITHUB_URL =
  'https://github.com/michael0520/milo-me-new';

export const UTM_PARAMS = {
  utm_source: 'michaello.me',
  utm_medium: 'portfolio_website',
  utm_campaign: 'referral',
};
