'use client';

import { useMotionValueEvent, useScroll } from 'motion/react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const calcDistance = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect();
  const scrollTop = document.documentElement.scrollTop;
  const headerHeight = 56;
  return scrollTop + rect.top + rect.height - headerHeight;
};

function LogoMotion() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);
  const distanceRef = useRef(160);

  useMotionValueEvent(scrollY, 'change', (latestValue) => {
    setVisible(latestValue >= distanceRef.current);
  });

  useEffect(() => {
    const coverMark = document.getElementById('js-cover-mark');
    if (!coverMark) return;

    distanceRef.current = calcDistance(coverMark);

    const resizeObserver = new ResizeObserver(() => {
      distanceRef.current = calcDistance(coverMark);
    });
    resizeObserver.observe(coverMark);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <Image
      src="/favicon-32x32.png"
      alt="Michael Lo"
      width={32}
      height={32}
      className="h-8 w-auto translate-y-2 opacity-0 transition-[opacity,translate] duration-300 data-[visible=true]:translate-y-0 data-[visible=true]:opacity-100"
      data-visible={visible}
    />
  );
}

export function SiteHeaderMark() {
  const pathname = usePathname();
  const isHome = ['/', '/index'].includes(pathname);

  return isHome ? (
    <LogoMotion />
  ) : (
    <Image
      src="/favicon-32x32.png"
      alt="Michael Lo"
      width={32}
      height={32}
      className="h-8 w-auto"
    />
  );
}
