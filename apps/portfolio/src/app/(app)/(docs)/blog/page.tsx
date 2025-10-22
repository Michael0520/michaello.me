import dayjs from 'dayjs';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRightIcon } from 'lucide-react';
import {
  getFeaturedPosts,
  getLatestPosts,
  type PostMetadata,
} from '@milo-me/blog-metadata';

import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Featured articles and latest posts from my blog.',
};

export default function Page() {
  const featuredPosts = getFeaturedPosts(3);
  const latestPosts = getLatestPosts(5);

  return (
    <>
      <div className="screen-line-after px-4">
        <h1 className="text-3xl font-semibold">Blog</h1>
      </div>

      <div className="screen-line-after p-4">
        <p className="font-mono text-sm text-balance text-muted-foreground">
          {metadata.description}
        </p>
      </div>

      {featuredPosts.length > 0 && (
        <>
          <div className="screen-line-after px-4 pt-4">
            <h2 className="text-xl font-medium">Featured Posts</h2>
          </div>

          <div className="relative pt-4">
            <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
              <div className="border-r border-edge"></div>
              <div className="border-l border-edge"></div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featuredPosts.map((post) => (
                <PostListItem key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </>
      )}

      <div className="screen-line-after px-4 pt-4">
        <h2 className="text-xl font-medium">Latest Posts</h2>
      </div>

      <div className="relative pt-4">
        <div className="absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {latestPosts.map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </div>
      </div>

      <div className="screen-line-after flex justify-center p-4">
        <Button variant="secondary" asChild>
          <Link href="/posts">
            View All Posts
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="h-4" />
    </>
  );
}

function PostListItem({ post }: { post: PostMetadata }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group/post flex flex-col gap-2 p-2 max-sm:screen-line-before max-sm:screen-line-after sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after"
    >
      <div className="flex flex-col gap-1 p-2">
        <h3 className="text-lg leading-snug font-medium text-balance underline-offset-4 group-hover/post:underline">
          {post.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>

        <dl className="mt-2">
          <dt className="sr-only">Published on</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={dayjs(post.date).toISOString()}>
              {dayjs(post.date).format('DD.MM.YYYY')}
            </time>
          </dd>
        </dl>
      </div>
    </Link>
  );
}
