'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { useAnimation } from '@/components/providers/AnimationProvider';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'circular';
}

export default function FloatingElement({
  children,
  className = '',
  delay = 0,
  amplitude = 20,
  duration = 3,
  direction = 'up'
}: FloatingElementProps) {
  const { shouldAnimate, preferences } = useAnimation();
  
  // 如果关闭装饰性动画，则不执行浮动效果
  if (!shouldAnimate('decorative')) {
    return <div className={className}>{children}</div>;
  }
  const getFloatingAnimation = () => {
    switch (direction) {
      case 'up':
        return {
          y: [-amplitude/2, amplitude/2, -amplitude/2],
        };
      case 'down':
        return {
          y: [amplitude/2, -amplitude/2, amplitude/2],
        };
      case 'left':
        return {
          x: [-amplitude/2, amplitude/2, -amplitude/2],
        };
      case 'right':
        return {
          x: [amplitude/2, -amplitude/2, amplitude/2],
        };
      case 'circular':
        return {
          x: [0, amplitude, 0, -amplitude, 0],
          y: [0, -amplitude, 0, amplitude, 0],
        };
      default:
        return {
          y: [-amplitude/2, amplitude/2, -amplitude/2],
        };
    }
  };

  return (
    <motion.div
      className={className}
      animate={getFloatingAnimation()}
      transition={{
        duration: duration * (preferences.animationDuration || 1),
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay * (preferences.animationDuration || 1),
      }}
    >
      {children}
    </motion.div>
  );
}