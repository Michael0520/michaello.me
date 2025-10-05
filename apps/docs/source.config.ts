import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
  dir: 'content/docs',
});

const blogSchema = frontmatterSchema.extend({
  date: z.coerce.string().optional(),
  read: z.string().optional(),
});

export const { docs: blog, meta: blogMeta } = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: blogSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
