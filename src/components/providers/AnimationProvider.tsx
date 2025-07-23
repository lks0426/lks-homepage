'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { useAnimationPreferences, useOptimizedAnimations } from '@/hooks/useAnimationPreferences';
import { detectDevicePerformance, DevicePerformance } from '@/utils/devicePerformance';

interface AnimationContextType {
  preferences: ReturnType<typeof useAnimationPreferences>['preferences'];
  devicePerformance: DevicePerformance | null;
  shouldAnimate: (type?: 'essential' | 'decorative' | 'complex') => boolean;
  getAnimationDuration: (baseDuration: number) => number;
  getSpringConfig: () => any;
  toggleAnimations: () => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return context;
}

interface AnimationProviderProps {
  children: ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const { preferences, updatePreferences } = useAnimationPreferences();
  const { shouldAnimate, getAnimationDuration, getSpringConfig } = useOptimizedAnimations();
  const [devicePerformance, setDevicePerformance] = useState<DevicePerformance | null>(null);
  const [hasAutoConfigured, setHasAutoConfigured] = useState(false);

  // 设备性能检测和自动配置
  useEffect(() => {
    const initializePerformance = async () => {
      try {
        const performance = await detectDevicePerformance();
        setDevicePerformance(performance);
        
        // 只在首次访问时自动配置（避免覆盖用户设置）
        const hasUserPreference = localStorage.getItem('animation-user-configured');
        if (!hasUserPreference && !hasAutoConfigured) {
          updatePreferences({
            performanceMode: performance.recommendations.performanceMode,
            enableParallax: performance.recommendations.enableParallax,
            enableParticles: performance.recommendations.enableParticles,
            animationDuration: performance.recommendations.animationDuration
          });
          setHasAutoConfigured(true);
          
          // 标记为已自动配置，避免后续覆盖用户设置
          localStorage.setItem('animation-auto-configured', 'true');
        }
      } catch (error) {
        console.warn('性能检测失败，使用默认设置:', error);
      }
    };

    initializePerformance();
  }, [updatePreferences, hasAutoConfigured]);

  // 动画开关切换
  const toggleAnimations = () => {
    const newMode = preferences.performanceMode === 'minimal' ? 'balanced' : 'minimal';
    updatePreferences({ performanceMode: newMode });
    // 标记为用户手动配置
    localStorage.setItem('animation-user-configured', 'true');
  };

  // Global animation configuration based on preferences
  const transition = preferences.reducedMotion 
    ? { duration: 0.01 }
    : getSpringConfig();

  const contextValue = {
    preferences,
    devicePerformance,
    shouldAnimate,
    getAnimationDuration,
    getSpringConfig,
    toggleAnimations
  };

  return (
    <AnimationContext.Provider value={contextValue}>
      <MotionConfig
        transition={transition}
        reducedMotion={preferences.reducedMotion ? 'always' : 'never'}
      >
        {children}
      </MotionConfig>
    </AnimationContext.Provider>
  );
}