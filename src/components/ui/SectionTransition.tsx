'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';
import { ANIMATION_TIMING, EASING, SLIDE_UP_VARIANTS, STAGGER_CONTAINER } from '@/lib/animations';

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';
  threshold?: number;
}

export default function SectionTransition({
  children,
  className = '',
  delay = 0,
  stagger = false,
  direction = 'up',
  threshold = 0.1
}: SectionTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);

  const getDirectionVariants = () => {
    const variants = {
      up: {
        hidden: { opacity: 0, y: 50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: ANIMATION_TIMING.slow,
            delay,
            ease: EASING.easeOut
          }
        }
      },
      down: {
        hidden: { opacity: 0, y: -50 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: ANIMATION_TIMING.slow,
            delay,
            ease: EASING.easeOut
          }
        }
      },
      left: {
        hidden: { opacity: 0, x: -50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration: ANIMATION_TIMING.slow,
            delay,
            ease: EASING.easeOut
          }
        }
      },
      right: {
        hidden: { opacity: 0, x: 50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration: ANIMATION_TIMING.slow,
            delay,
            ease: EASING.easeOut
          }
        }
      },
      fade: {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            duration: ANIMATION_TIMING.slow,
            delay,
            ease: EASING.easeOut
          }
        }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: {
            duration: ANIMATION_TIMING.slow,
            delay,
            ease: EASING.backOut
          }
        }
      }
    };

    return variants[direction];
  };

  const containerVariants = stagger ? {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: ANIMATION_TIMING.stagger,
        delayChildren: delay
      }
    }
  } : getDirectionVariants();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ 
        once: true, 
        amount: threshold,
        margin: "-10% 0px -10% 0px"
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual item wrapper for staggered animations
export function StaggerItem({
  children,
  className = '',
  index = 0
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: ANIMATION_TIMING.slow,
        ease: EASING.easeOut
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={itemVariants}
    >
      {children}
    </motion.div>
  );
}

// Advanced parallax section wrapper
export function ParallaxSection({
  children,
  className = '',
  offset = 50,
  speed = 0.5
}: {
  children: ReactNode;
  className?: string;
  offset?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // Only apply parallax when element is in viewport
      if (rect.top < windowHeight && rect.bottom > 0) {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: ANIMATION_TIMING.slower,
        ease: EASING.easeOut
      }}
    >
      {children}
    </motion.div>
  );
}

// Reveal animation for text/content
export function RevealText({
  children,
  className = '',
  delay = 0,
  direction = 'up'
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}) {
  const variants = {
    up: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    down: {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
    },
    left: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    right: {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      className={className}
      variants={variants[direction]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: ANIMATION_TIMING.slow,
        delay,
        ease: EASING.easeOut
      }}
    >
      {children}
    </motion.div>
  );
}