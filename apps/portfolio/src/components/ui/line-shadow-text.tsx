'use client';

import { motion } from 'motion/react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

interface LineShadowTextProps {
  children: React.ReactNode;
  className?: string;
  shadowColor?: string;
}

export function LineShadowText({
  children,
  className,
  shadowColor,
}: LineShadowTextProps) {
  const { resolvedTheme } = useTheme();

  // Use provided shadowColor or default based on theme
  const defaultShadowColor = resolvedTheme === 'dark' ? '#ffffff' : '#000000';
  const finalShadowColor = shadowColor || defaultShadowColor;

  // Generate shadow layers
  const generateTextShadow = (offset: number) => {
    const shadows = [];
    for (let i = 1; i <= 8; i++) {
      const opacity = Math.max(0, 50 - i * 5);
      shadows.push(
        `${i * offset}px ${i * offset}px 0 ${finalShadowColor}${opacity
          .toString(16)
          .padStart(2, '0')}`
      );
    }
    return shadows.join(', ');
  };

  return (
    <div className="relative inline-block">
      <motion.span
        className={cn('relative inline-block font-bold', className)}
        initial={{ textShadow: generateTextShadow(1) }}
        animate={{
          textShadow: [
            generateTextShadow(1),
            generateTextShadow(1.5),
            generateTextShadow(1),
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        suppressHydrationWarning
      >
        {children}
      </motion.span>
    </div>
  );
}
