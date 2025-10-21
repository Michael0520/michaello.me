'use client';

import { Icon } from '@iconify/react';
import { ArrowUpRightIcon } from 'lucide-react';

import type { SocialLink } from '@/features/profile/types/social-links';
import { cn } from '@/lib/utils';

const iconMap = {
  github: 'carbon:logo-github',
  instagram: 'carbon:logo-instagram',
  threads: 'carbon:chat',
  bento: 'carbon:grid',
} as const;

export function SocialLinkItem({ icon, title, description, href }: SocialLink) {
  const iconName = iconMap[icon];

  return (
    <a
      className={cn(
        'group/link flex cursor-pointer items-center gap-4 rounded-2xl p-4 pr-2 transition-colors select-none',
        'max-sm:screen-line-before max-sm:screen-line-after',
        'sm:nth-[2n+1]:screen-line-before sm:nth-[2n+1]:screen-line-after'
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="relative size-14 shrink-0 flex items-center justify-center rounded-xl bg-muted/50">
        <Icon icon={iconName} className="size-8 text-foreground" />
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 ring-inset dark:ring-white/10" />
      </div>

      <div className="flex-1">
        <h3 className="flex items-center font-medium underline-offset-4 group-hover/link:underline">
          {title}
        </h3>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>

      <ArrowUpRightIcon className="size-4 text-muted-foreground" />
    </a>
  );
}
