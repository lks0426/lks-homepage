'use client';

import { useInView, useAnimation as useFramerAnimation } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { useAnimation } from '@/components/providers/AnimationProvider';

interface ScrollAnimationOptions {
  threshold?: number;
  margin?: string;
  once?: boolean;
  delay?: number;
  stagger?: number;
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    margin = '0px',
    once = true,
    delay = 0,
    stagger = 0
  } = options;

  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once 
  });
  const controls = useFramerAnimation();
  const { shouldAnimate, getAnimationDuration } = useAnimation();

  useEffect(() => {
    if (isInView && shouldAnimate('decorative')) {
      const timer = setTimeout(() => {
        controls.start('visible');
      }, getAnimationDuration(delay));
      
      return () => clearTimeout(timer);
    } else if (isInView && !shouldAnimate('decorative')) {
      // Immediately show without animation
      controls.start('visible');
    }
  }, [isInView, controls, shouldAnimate, delay, getAnimationDuration]);

  const createVariants = (config: any = {}) => ({
    hidden: {
      opacity: 0,
      y: shouldAnimate('decorative') ? (config.y || 30) : 0,
      x: shouldAnimate('decorative') ? (config.x || 0) : 0,
      scale: shouldAnimate('decorative') ? (config.scale || 1) : 1,
      rotate: shouldAnimate('decorative') ? (config.rotate || 0) : 0,
      ...config.hidden
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: getAnimationDuration(config.duration || 0.6),
        delay: getAnimationDuration(config.delay || 0),
        ease: config.ease || 'easeOut',
        staggerChildren: shouldAnimate('decorative') ? getAnimationDuration(stagger) : 0,
        ...config.transition
      },
      ...config.visible
    }
  });

  const createStaggerVariants = (itemCount: number = 0) => ({
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldAnimate('decorative') ? getAnimationDuration(0.1) : 0,
        delayChildren: getAnimationDuration(delay)
      }
    },
    item: {
      hidden: {
        opacity: 0,
        y: shouldAnimate('decorative') ? 20 : 0,
        scale: shouldAnimate('decorative') ? 0.9 : 1
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: getAnimationDuration(0.5),
          ease: 'easeOut'
        }
      }
    }
  });

  return {
    ref,
    isInView,
    controls,
    variants: createVariants,
    staggerVariants: createStaggerVariants,
    shouldAnimate: shouldAnimate('decorative')
  };
}

// Enhanced scroll-triggered parallax hook
export function useParallaxScroll(strength: number = 0.5) {
  const ref = useRef(null);
  const { shouldAnimate } = useAnimation();
  
  useEffect(() => {
    if (!shouldAnimate('decorative') || !ref.current) return;

    const element = ref.current as HTMLElement;
    
    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * strength;
      
      if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
        element.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [strength, shouldAnimate]);

  return { ref };
}

// Progressive reveal animation
export function useProgressiveReveal(items: any[] = [], delay: number = 0.1) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: 0.1, 
    once: true 
  });
  const { shouldAnimate, getAnimationDuration } = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldAnimate('decorative') ? getAnimationDuration(delay) : 0,
        delayChildren: getAnimationDuration(0.2)
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldAnimate('decorative') ? 30 : 0,
      scale: shouldAnimate('decorative') ? 0.95 : 1
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: getAnimationDuration(0.5),
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants,
    shouldAnimate: shouldAnimate('decorative')
  };
}

// Intersection observer with enhanced options
export function useIntersectionAnimation(options: any = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.1,
    once: true,
    ...options
  });
  const { shouldAnimate } = useAnimation();

  return {
    ref,
    isInView,
    shouldAnimate: shouldAnimate('decorative')
  };
}