import { useSyncExternalStore } from 'react';

function subscribe(query: string, callback: () => void) {
  const mediaQueryList = matchMedia(query);
  mediaQueryList.addEventListener('change', callback);
  return () => {
    mediaQueryList.removeEventListener('change', callback);
  };
}

function getSnapshot(query: string) {
  return matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => getSnapshot(query),
    getServerSnapshot
  );
}
