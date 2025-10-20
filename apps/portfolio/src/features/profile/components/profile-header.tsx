import { SimpleTooltip } from '@/components/ui/tooltip';
import { USER } from '@/features/profile/data/user';
import { cn } from '@/lib/utils';
import { FlipSentences } from '@/registry/flip-sentences';

import { PronounceMyName } from './pronounce-my-name';
import { VerifiedIcon } from './verified-icon';

export function ProfileHeader() {
  return (
    <div className="screen-line-after flex border-x border-edge">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-[2px] my-[3px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="size-32 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            fetchPriority="high"
          />
        </div>

        <SimpleTooltip content="I'm from Taiwan">
          {/* Flag of Taiwan */}
          <svg
            className="absolute top-0 -left-px h-8 sm:h-9"
            viewBox="0 0 30 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Red background */}
            <rect width="30" height="20" fill="#FE0000" />
            {/* Blue canton */}
            <rect width="15" height="10" fill="#000095" />
            {/* White sun */}
            <circle cx="7.5" cy="5" r="2.5" fill="#FFF" />
            {/* 12 sun rays */}
            <g fill="#FFF">
              <polygon points="7.5,0.5 7.2,2.2 7.8,2.2" />
              <polygon points="9.67,1.17 8.5,2.5 9,3" />
              <polygon points="10.83,3.33 9.2,3.8 9.5,4.5" />
              <polygon points="11,5.5 9.5,5.2 9.5,5.8" />
              <polygon points="10.83,6.67 9.5,6.5 9.2,7.2" />
              <polygon points="9.67,8.83 8.5,7.5 9,7" />
              <polygon points="7.5,9.5 7.2,7.8 7.8,7.8" />
              <polygon points="5.33,8.83 6.5,7.5 6,7" />
              <polygon points="4.17,6.67 5.8,7.2 5.5,6.5" />
              <polygon points="4,5.5 5.5,5.8 5.5,5.2" />
              <polygon points="4.17,3.33 5.5,3.5 5.8,2.8" />
              <polygon points="5.33,1.17 6.5,2.5 6,3" />
            </g>
          </svg>
        </SimpleTooltip>
      </div>

      <div className="flex flex-1 flex-col">
        <div
          className={cn(
            'flex grow items-end pb-1 pl-4',
            'bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56'
          )}
        >
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {'text-3xl '}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {' font-medium'}
          </div>
        </div>

        <div className="border-t border-edge">
          <h1 className="flex items-center pl-4 text-3xl font-semibold">
            {USER.displayName}
            &nbsp;
            <SimpleTooltip content="Verified">
              <VerifiedIcon className="size-[0.6em] translate-y-px text-info select-none" />
            </SimpleTooltip>
            {USER.namePronunciationUrl && (
              <>
                &nbsp;
                <PronounceMyName
                  className="translate-y-px"
                  namePronunciationUrl={USER.namePronunciationUrl}
                />
              </>
            )}
          </h1>

          <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
            <FlipSentences sentences={USER.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}
