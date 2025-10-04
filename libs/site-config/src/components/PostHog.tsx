'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

interface PostHogProps {
  apiKey: string;
  apiHost: string;
}

export function PostHog({ apiKey, apiHost }: PostHogProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init(apiKey, {
        api_host: apiHost,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') posthog.debug();
        },
      });
    }
  }, [apiKey, apiHost]);

  return null;
}
