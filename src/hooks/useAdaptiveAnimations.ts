'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useAnimationPreferences, useAnimationPerformance } from './useAnimationPreferences';

interface AdaptiveAnimationConfig {
  baseConfig: any;
  reducedConfig: any;
  minimalConfig?: any;
}

interface PerformanceMetrics {
  averageFPS: number;
  dropFrames: number;
  animationCount: number;
  lastUpdate: number;
}

export function useAdaptiveAnimations() {
  const { preferences, updatePreferences } = useAnimationPreferences();
  const { frameRate, isLowPerformance } = useAnimationPerformance();
  const metricsRef = useRef<PerformanceMetrics>({
    averageFPS: 60,
    dropFrames: 0,
    animationCount: 0,
    lastUpdate: Date.now()
  });
  const [adaptiveMode, setAdaptiveMode] = useState<'optimal' | 'reduced' | 'minimal'>('optimal');

  // Performance monitoring and auto-adaptation
  useEffect(() => {
    const updateMetrics = () => {
      const metrics = metricsRef.current;
      const now = Date.now();
      const timeDelta = now - metrics.lastUpdate;
      
      // Update moving average FPS
      metrics.averageFPS = (metrics.averageFPS * 0.9) + (frameRate * 0.1);
      
      // Count frame drops
      if (frameRate < 50) {
        metrics.dropFrames++;
      }
      
      // Determine adaptive mode
      let newMode: typeof adaptiveMode = 'optimal';
      
      if (metrics.averageFPS < 30 || metrics.dropFrames > 5) {
        newMode = 'minimal';
      } else if (metrics.averageFPS < 45 || metrics.dropFrames > 2) {
        newMode = 'reduced';
      }
      
      // Auto-adjust performance mode if significant degradation
      if (newMode !== adaptiveMode) {
        setAdaptiveMode(newMode);
        
        // Auto-update user preferences for persistent poor performance
        if (newMode === 'minimal' && preferences.performanceMode !== 'minimal') {
          updatePreferences({ performanceMode: 'minimal' });
        } else if (newMode === 'reduced' && preferences.performanceMode === 'high') {
          updatePreferences({ performanceMode: 'balanced' });
        }
      }
      
      // Reset drop frame counter periodically
      if (timeDelta > 5000) { // Every 5 seconds
        metrics.dropFrames = Math.max(0, metrics.dropFrames - 1);
        metrics.lastUpdate = now;
      }
    };

    const interval = setInterval(updateMetrics, 1000);
    return () => clearInterval(interval);
  }, [frameRate, adaptiveMode, preferences.performanceMode, updatePreferences]);

  // Get adaptive animation config
  const getAdaptiveConfig = useCallback((config: AdaptiveAnimationConfig) => {
    // Check user preference first
    if (preferences.reducedMotion) {
      return config.minimalConfig || { duration: 0.01 };
    }

    // Apply performance-based adaptation
    switch (preferences.performanceMode) {
      case 'minimal':
        return config.minimalConfig || config.reducedConfig;
      case 'balanced':
        return adaptiveMode === 'minimal' 
          ? (config.minimalConfig || config.reducedConfig)
          : adaptiveMode === 'reduced' 
            ? config.reducedConfig 
            : config.baseConfig;
      case 'high':
        return adaptiveMode === 'minimal' 
          ? (config.minimalConfig || config.reducedConfig)
          : config.baseConfig;
      default:
        return config.baseConfig;
    }
  }, [preferences.reducedMotion, preferences.performanceMode, adaptiveMode]);

  // Adaptive transition generator
  const createAdaptiveTransition = useCallback((baseTransition: any) => {
    const config = getAdaptiveConfig({
      baseConfig: baseTransition,
      reducedConfig: {
        ...baseTransition,
        duration: (baseTransition.duration || 0.3) * 0.6,
        ease: 'easeOut'
      },
      minimalConfig: {
        duration: 0.01,
        ease: 'linear'
      }
    });

    return {
      ...config,
      duration: config.duration * (preferences.animationDuration || 1)
    };
  }, [getAdaptiveConfig, preferences.animationDuration]);

  // Adaptive spring config
  const createAdaptiveSpring = useCallback(() => {
    if (preferences.reducedMotion) {
      return { duration: 0.01 };
    }

    switch (preferences.performanceMode) {
      case 'minimal':
        return { duration: 0.2, ease: 'easeOut' };
      case 'balanced':
        return adaptiveMode === 'minimal' 
          ? { duration: 0.2, ease: 'easeOut' }
          : { type: 'spring', stiffness: 300, damping: 30 };
      case 'high':
        return adaptiveMode === 'minimal'
          ? { duration: 0.2, ease: 'easeOut' }
          : { type: 'spring', stiffness: 400, damping: 25, mass: 0.8 };
      default:
        return { type: 'spring', stiffness: 300, damping: 30 };
    }
  }, [preferences.reducedMotion, preferences.performanceMode, adaptiveMode]);

  // Conditional animation helper
  const shouldUseAnimation = useCallback((
    animationType: 'essential' | 'decorative' | 'complex' = 'essential'
  ) => {
    if (preferences.reducedMotion && animationType !== 'essential') {
      return false;
    }

    switch (preferences.performanceMode) {
      case 'minimal':
        return animationType === 'essential';
      case 'balanced':
        if (adaptiveMode === 'minimal') return animationType === 'essential';
        if (adaptiveMode === 'reduced') return animationType !== 'complex';
        return true;
      case 'high':
        return adaptiveMode !== 'minimal';
      default:
        return true;
    }
  }, [preferences.reducedMotion, preferences.performanceMode, adaptiveMode]);

  // Animation variants generator
  const createAdaptiveVariants = useCallback((variants: any) => {
    if (!shouldUseAnimation('decorative')) {
      // Return simplified variants for reduced motion
      return Object.keys(variants).reduce((acc, key) => {
        acc[key] = { opacity: variants[key].opacity || 1 };
        return acc;
      }, {} as any);
    }

    return variants;
  }, [shouldUseAnimation]);

  // Performance-aware stagger
  const getAdaptiveStagger = useCallback((baseStagger: number) => {
    const multiplier = adaptiveMode === 'minimal' ? 0.3 : adaptiveMode === 'reduced' ? 0.6 : 1;
    return baseStagger * multiplier * (preferences.animationDuration || 1);
  }, [adaptiveMode, preferences.animationDuration]);

  return {
    // Configuration
    adaptiveMode,
    currentMetrics: metricsRef.current,
    
    // Generators
    getAdaptiveConfig,
    createAdaptiveTransition,
    createAdaptiveSpring,
    createAdaptiveVariants,
    
    // Utilities
    shouldUseAnimation,
    getAdaptiveStagger,
    
    // Performance info
    performanceLevel: adaptiveMode,
    isPerformanceOptimized: adaptiveMode !== 'optimal'
  };
}

// Hook for performance-aware component rendering
export function usePerformanceGating(componentType: 'decorative' | 'complex' | 'essential' = 'decorative') {
  const { shouldUseAnimation } = useAdaptiveAnimations();
  const { preferences } = useAnimationPreferences();
  const { isLowPerformance } = useAnimationPerformance();

  const shouldRender = useCallback(() => {
    // Always render essential components
    if (componentType === 'essential') return true;
    
    // Skip decorative components in reduced motion
    if (preferences.reducedMotion && componentType === 'decorative') {
      return false;
    }
    
    // Skip complex components in low performance or minimal mode
    if (componentType === 'complex' && 
        (isLowPerformance || preferences.performanceMode === 'minimal')) {
      return false;
    }
    
    return shouldUseAnimation(componentType);
  }, [componentType, preferences.reducedMotion, preferences.performanceMode, isLowPerformance, shouldUseAnimation]);

  return {
    shouldRender: shouldRender(),
    canAnimate: shouldUseAnimation(componentType)
  };
}