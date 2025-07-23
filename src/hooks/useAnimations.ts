'use client';

import { useCallback, useRef, useMemo } from 'react';
import { useAnimationControls, TargetAndTransition, AnimationControls } from 'framer-motion';
import { MICRO_INTERACTIONS, ANIMATION_TIMING } from '@/lib/animations';

// Enhanced animation controls hook
export function useEnhancedAnimations() {
  const controls = useAnimationControls();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const animateWithFeedback = useCallback(async (
    animation: TargetAndTransition,
    feedback?: {
      onStart?: () => void;
      onComplete?: () => void;
      onError?: (error: any) => void;
    }
  ) => {
    try {
      feedback?.onStart?.();
      await controls.start(animation);
      feedback?.onComplete?.();
    } catch (error) {
      feedback?.onError?.(error);
    }
  }, [controls]);

  const pulseSuccess = useCallback(() => {
    return animateWithFeedback(MICRO_INTERACTIONS.successPulse);
  }, [animateWithFeedback]);

  const bounceIcon = useCallback(() => {
    return animateWithFeedback(MICRO_INTERACTIONS.iconBounce);
  }, [animateWithFeedback]);

  const highlightText = useCallback(() => {
    return animateWithFeedback(MICRO_INTERACTIONS.textHighlight);
  }, [animateWithFeedback]);

  const delayedAnimation = useCallback((
    animation: TargetAndTransition,
    delay: number
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      controls.start(animation);
    }, delay * 1000);
  }, [controls]);

  return {
    controls,
    animateWithFeedback,
    pulseSuccess,
    bounceIcon,
    highlightText,
    delayedAnimation
  };
}

// Hook for managing loading states with animations
export function useLoadingAnimation() {
  const controls = useAnimationControls();

  const startLoading = useCallback(() => {
    return controls.start({
      opacity: 0.6,
      scale: 0.98,
      transition: { duration: ANIMATION_TIMING.fast }
    });
  }, [controls]);

  const stopLoading = useCallback(() => {
    return controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: ANIMATION_TIMING.normal }
    });
  }, [controls]);

  const pulseLoading = useCallback(() => {
    return controls.start({
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  return {
    controls,
    startLoading,
    stopLoading,
    pulseLoading
  };
}

// Hook for hover effects with customization
export function useHoverAnimation(type: 'lift' | 'scale' | 'glow' | 'rotate' = 'lift') {
  const controls = useAnimationControls();

  const animations = useMemo(() => ({
    lift: {
      hover: { y: -4, scale: 1.02 },
      tap: { y: -2, scale: 1.01 }
    },
    scale: {
      hover: { scale: 1.05 },
      tap: { scale: 0.95 }
    },
    glow: {
      hover: { 
        boxShadow: "0 10px 40px rgba(0,0,0,0.15)", 
        scale: 1.02 
      },
      tap: { scale: 0.98 }
    },
    rotate: {
      hover: { rotate: 2, scale: 1.03 },
      tap: { rotate: 0, scale: 0.97 }
    }
  }), []);

  const onHoverStart = useCallback(() => {
    controls.start({
      ...animations[type].hover,
      transition: { duration: ANIMATION_TIMING.normal }
    });
  }, [controls, type, animations]);

  const onHoverEnd = useCallback(() => {
    controls.start({
      y: 0,
      scale: 1,
      rotate: 0,
      boxShadow: "none",
      transition: { duration: ANIMATION_TIMING.normal }
    });
  }, [controls]);

  const onTap = useCallback(() => {
    controls.start({
      ...animations[type].tap,
      transition: { duration: ANIMATION_TIMING.fast }
    });
  }, [controls, type, animations]);

  return {
    controls,
    onHoverStart,
    onHoverEnd,
    onTap
  };
}

// Hook for staggered animations
export function useStaggerAnimation() {
  const containerControls = useAnimationControls();
  const itemControls = useAnimationControls();

  const startStagger = useCallback(async (itemCount: number, delay = ANIMATION_TIMING.stagger) => {
    // Start container animation
    await containerControls.start({
      transition: {
        staggerChildren: delay,
        delayChildren: 0.1
      }
    });

    // Animate individual items
    for (let i = 0; i < itemCount; i++) {
      setTimeout(() => {
        itemControls.start({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: ANIMATION_TIMING.slow }
        });
      }, i * delay * 1000);
    }
  }, [containerControls, itemControls]);

  return {
    containerControls,
    itemControls,
    startStagger
  };
}

// Hook for page transitions
export function usePageTransition() {
  const controls = useAnimationControls();

  const slideIn = useCallback((direction: 'left' | 'right' | 'up' | 'down' = 'right') => {
    const initialPositions = {
      left: { x: -100 },
      right: { x: 100 },
      up: { y: -50 },
      down: { y: 50 }
    };

    return controls.start({
      ...initialPositions[direction],
      opacity: 0,
      transition: { duration: 0 }
    }).then(() => 
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: { 
          duration: ANIMATION_TIMING.slow,
          ease: "easeOut"
        }
      })
    );
  }, [controls]);

  const slideOut = useCallback((direction: 'left' | 'right' | 'up' | 'down' = 'left') => {
    const exitPositions = {
      left: { x: -100 },
      right: { x: 100 },
      up: { y: -50 },
      down: { y: 50 }
    };

    return controls.start({
      ...exitPositions[direction],
      opacity: 0,
      transition: { 
        duration: ANIMATION_TIMING.normal,
        ease: "easeIn"
      }
    });
  }, [controls]);

  const fadeTransition = useCallback((fadeOut = false) => {
    return controls.start({
      opacity: fadeOut ? 0 : 1,
      transition: { duration: ANIMATION_TIMING.normal }
    });
  }, [controls]);

  return {
    controls,
    slideIn,
    slideOut,
    fadeTransition
  };
}

// Hook for scroll-triggered animations
export function useScrollAnimation() {
  const controls = useAnimationControls();

  const animateOnScroll = useCallback((
    element: HTMLElement,
    animation: TargetAndTransition,
    threshold = 0.1
  ) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start(animation);
          observer.unobserve(element);
        }
      },
      { threshold }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls]);

  const parallaxScroll = useCallback((
    element: HTMLElement,
    speed = 0.5
  ) => {
    const handleScroll = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * speed;
      
      controls.start({
        y: rate,
        transition: { duration: 0 }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);

  return {
    controls,
    animateOnScroll,
    parallaxScroll
  };
}

// Hook for form animations and feedback
export function useFormAnimation() {
  const controls = useAnimationControls();

  const shakeError = useCallback(() => {
    return controls.start({
      x: [-5, 5, -5, 5, 0],
      transition: { 
        duration: ANIMATION_TIMING.slow,
        ease: "easeInOut"
      }
    });
  }, [controls]);

  const successHighlight = useCallback(() => {
    return controls.start({
      borderColor: "#22c55e",
      boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.2)",
      transition: { duration: ANIMATION_TIMING.normal }
    });
  }, [controls]);

  const errorHighlight = useCallback(() => {
    return controls.start({
      borderColor: "#ef4444",
      boxShadow: "0 0 0 2px rgba(239, 68, 68, 0.2)",
      transition: { duration: ANIMATION_TIMING.normal }
    });
  }, [controls]);

  const resetHighlight = useCallback(() => {
    return controls.start({
      borderColor: "rgba(0,0,0,0.12)",
      boxShadow: "none",
      transition: { duration: ANIMATION_TIMING.normal }
    });
  }, [controls]);

  return {
    controls,
    shakeError,
    successHighlight,
    errorHighlight,
    resetHighlight
  };
}