import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

import { addQueryParams } from '@/utils/url';

export function rehypeAddQueryParams(params: Record<string, string>) {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (
        node.type !== 'element' ||
        !('tagName' in node) ||
        node.tagName !== 'a' ||
        !('properties' in node) ||
        !node.properties ||
        typeof node.properties !== 'object' ||
        !('href' in node.properties)
      ) {
        return;
      }

      const href = node.properties.href as string | undefined;

      if (
        !href ||
        href.startsWith('/') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('#')
      ) {
        return;
      }

      node.properties.href = addQueryParams(href, params);
    });
  };
}
