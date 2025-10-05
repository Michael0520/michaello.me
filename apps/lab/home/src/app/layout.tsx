import './global.css';
import type { ReactNode } from 'react';
import { siteConfig } from '@milo-me/site-config';

export const metadata = {
  title: `Lab - ${siteConfig.site.name}`,
  description: 'Experimental projects and side applications',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
