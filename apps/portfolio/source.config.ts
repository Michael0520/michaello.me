import {
  defineDocs,
  defineConfig,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { remarkImage } from 'fumadocs-core/mdx-plugins';
import { z } from 'zod';

// Blog posts schema
const blogSchema = frontmatterSchema.extend({
  date: z.coerce.string().optional(),
  read: z.string().optional(),
});

// Define blog posts source from shared content library
export const { docs: blog, meta: blogMeta } = defineDocs({
  dir: '../../libs/blog-content/content/posts',
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
