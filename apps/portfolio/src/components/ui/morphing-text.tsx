'use client';

import { AnimatePresence, motion, type Variants } from 'motion/react';
import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

interface MorphingTextProps {
  texts: string[];
  className?: string;
}

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: 'blur(8px)',
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

export function MorphingText({ texts, className }: MorphingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className={cn('relative inline-block', className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="inline-block"
        >
          {texts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
