import { visit } from 'unist-util-visit';

import type { UnistTree } from '@/types/unist';

export function rehypeNpmCommand() {
  // Thanks @shadcn/ui
  return (tree: UnistTree) => {
    visit(tree, (node) => {
      if (
        node.type !== 'element' ||
        !('tagName' in node) ||
        node.tagName !== 'pre'
      ) {
        return;
      }

      // Type guard for properties
      if (!('properties' in node) || typeof node.properties !== 'object') {
        return;
      }

      const properties = node.properties as Record<string, unknown>;

      // npm install
      if (
        typeof properties['__rawString__'] === 'string' &&
        properties['__rawString__'].startsWith('npm install')
      ) {
        const npmCommand = properties['__rawString__'];
        properties['__pnpm__'] = npmCommand.replaceAll(
          'npm install',
          'pnpm add'
        );
        properties['__yarn__'] = npmCommand.replaceAll(
          'npm install',
          'yarn add'
        );
        properties['__npm__'] = npmCommand;
        properties['__bun__'] = npmCommand.replaceAll('npm install', 'bun add');
      }

      // npx create-
      if (
        typeof properties['__rawString__'] === 'string' &&
        properties['__rawString__'].startsWith('npx create-')
      ) {
        const npmCommand = properties['__rawString__'];
        properties['__pnpm__'] = npmCommand.replace(
          'npx create-',
          'pnpm create '
        );
        properties['__yarn__'] = npmCommand.replace(
          'npx create-',
          'yarn create '
        );
        properties['__npm__'] = npmCommand;
        properties['__bun__'] = npmCommand.replace('npx', 'bunx --bun');
      }

      // npm create
      if (
        typeof properties['__rawString__'] === 'string' &&
        properties['__rawString__'].startsWith('npm create')
      ) {
        const npmCommand = properties['__rawString__'];
        properties['__pnpm__'] = npmCommand.replace(
          'npm create',
          'pnpm create'
        );
        properties['__yarn__'] = npmCommand.replace(
          'npm create',
          'yarn create'
        );
        properties['__npm__'] = npmCommand;
        properties['__bun__'] = npmCommand.replace('npm create', 'bun create');
      }

      // npx
      if (
        typeof properties['__rawString__'] === 'string' &&
        properties['__rawString__'].startsWith('npx') &&
        !properties['__rawString__'].startsWith('npx create-')
      ) {
        const npmCommand = properties['__rawString__'];
        properties['__pnpm__'] = npmCommand.replace('npx', 'pnpm dlx');
        properties['__yarn__'] = npmCommand;
        properties['__npm__'] = npmCommand;
        properties['__bun__'] = npmCommand.replace('npx', 'bunx --bun');
      }

      // npm run
      if (
        typeof properties['__rawString__'] === 'string' &&
        properties['__rawString__'].startsWith('npm run')
      ) {
        const npmCommand = properties['__rawString__'];
        properties['__pnpm__'] = npmCommand.replace('npm run', 'pnpm');
        properties['__yarn__'] = npmCommand.replace('npm run', 'yarn');
        properties['__npm__'] = npmCommand;
        properties['__bun__'] = npmCommand.replace('npm run', 'bun');
      }
    });
  };
}
