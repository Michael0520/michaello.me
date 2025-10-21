import { useSyncExternalStore } from 'react';

export function useIsClient() {
  return useSyncExternalStore(
    () => () => {}, // subscribe (no-op since this never changes)
    () => true, // getSnapshot (client-side)
    () => false // getServerSnapshot (server-side)
  );
}
