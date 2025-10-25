import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { postsSource } from '../../lib/posts-source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <RootProvider>
      <DocsLayout tree={postsSource.pageTree}>{children}</DocsLayout>
    </RootProvider>
  );
}
