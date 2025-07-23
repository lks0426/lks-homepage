'use client';

import { useState, useEffect, useCallback } from 'react';

// Animation performance and accessibility preferences
export interface AnimationPreferences {
  reducedMotion: boolean;
  performanceMode: 'high' | 'balanced' | 'minimal';
  enableParallax: boolean;
  enableParticles: boolean;
  animationDuration: number;
}

const DEFAULT_PREFERENCES: AnimationPreferences = {
  reducedMotion: false,
  performanceMode: 'balanced',
  enableParallax: true,
  enableParticles: true,
  animationDuration: 1
};

// Hook for managing animation preferences
export function useAnimationPreferences() {
  const [preferences, setPreferences] = useState<AnimationPreferences>(DEFAULT_PREFERENCES);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check for system reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const systemReducedMotion = mediaQuery.matches;

    // Load saved preferences
    const saved = localStorage.getItem('animationPreferences');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({
          ...DEFAULT_PREFERENCES,
          ...parsed,
          reducedMotion: systemReducedMotion || parsed.reducedMotion
        });
      } catch (error) {
        console.warn('Failed to parse animation preferences:', error);
      }
    } else {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: systemReducedMotion
      }));
    }

    // Listen for system preference changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPreferences(prev => ({
        ...prev,
        reducedMotion: e.matches
      }));
    };

    mediaQuery.addEventListener('change', handleMotionChange);
    return () => mediaQuery.removeEventListener('change', handleMotionChange);
  }, []);

  const updatePreferences = useCallback((updates: Partial<AnimationPreferences>) => {
    setPreferences(prev => {
      const newPreferences = { ...prev, ...updates };
      if (isClient) {
        localStorage.setItem('animationPreferences', JSON.stringify(newPreferences));
      }
      return newPreferences;
    });
  }, [isClient]);

  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES);
    if (isClient) {
      localStorage.removeItem('animationPreferences');
    }
  }, [isClient]);

  return {
    preferences,
    updatePreferences,
    resetPreferences,
    isClient
  };
}

// Hook for getting optimized animation values based on preferences
export function useOptimizedAnimations() {
  const { preferences } = useAnimationPreferences();

  const getAnimationDuration = useCallback((baseDuration: number) => {
    if (preferences.reducedMotion) return 0;
    
    const multiplier = preferences.performanceMode === 'minimal' ? 0.5 
                     : preferences.performanceMode === 'high' ? 1.2 
                     : 1;
    
    return baseDuration * preferences.animationDuration * multiplier;
  }, [preferences]);

  const shouldAnimate = useCallback((animationType: 'essential' | 'decorative' | 'complex' = 'essential') => {
    if (preferences.reducedMotion && animationType !== 'essential') return false;
    
    switch (preferences.performanceMode) {
      case 'minimal':
        return animationType === 'essential';
      case 'balanced':
        return animationType !== 'complex';
      case 'high':
        return true;
      default:
        return true;
    }
  }, [preferences]);

  const getReducedVariants = useCallback((variants: any) => {
    if (!preferences.reducedMotion) return variants;
    
    // Create reduced motion variants
    const reducedVariants = { ...variants };
    
    if (reducedVariants.visible) {
      reducedVariants.visible = {
        opacity: 1,
        transition: { duration: 0.01 }
      };
    }
    
    if (reducedVariants.hidden) {
      reducedVariants.hidden = {
        opacity: 0
      };
    }
    
    return reducedVariants;
  }, [preferences.reducedMotion]);

  const getSpringConfig = useCallback(() => {
    if (preferences.reducedMotion) {
      return { duration: 0.01 };
    }
    
    switch (preferences.performanceMode) {
      case 'minimal':
        return { duration: 0.2, ease: 'easeOut' };
      case 'balanced':
        return { type: 'spring', stiffness: 300, damping: 30 };
      case 'high':
        return { type: 'spring', stiffness: 400, damping: 25, mass: 0.8 };
      default:
        return { type: 'spring', stiffness: 300, damping: 30 };
    }
  }, [preferences]);

  return {
    preferences,
    getAnimationDuration,
    shouldAnimate,
    getReducedVariants,
    getSpringConfig
  };
}

// Hook for performance monitoring - 禁用实时监控以提升性能
export function useAnimationPerformance() {
  // 返回静态值，不进行实时监控
  return {
    frameRate: 60,
    isLowPerformance: false,
    shouldReduceAnimations: false
  };
}

