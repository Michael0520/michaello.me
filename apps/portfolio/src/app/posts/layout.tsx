import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { blogSource } from '../../../lib/blog-source';

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout tree={blogSource.pageTree}>{children}</DocsLayout>;
}
