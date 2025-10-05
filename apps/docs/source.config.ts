import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { remarkImage } from 'fumadocs-core/mdx-plugins';
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
    remarkPlugins: [
      [remarkImage, { external: false }], // Disable fetching external image sizes
    ],
    rehypePlugins: [],
  },
});
