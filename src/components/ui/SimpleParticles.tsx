'use client';

import { motion } from 'framer-motion';
import { useAnimation } from '@/components/providers/AnimationProvider';

interface SimpleParticlesProps {
  className?: string;
}

export default function SimpleParticles({ className = '' }: SimpleParticlesProps) {
  const { preferences, shouldAnimate } = useAnimation();
  
  // 如果用户关闭粒子效果或设备性能较低，则不渲染
  if (!preferences.enableParticles || !shouldAnimate('decorative')) {
    return null;
  }
  
  // 根据性能模式调整粒子数量
  const particleCount = preferences.performanceMode === 'high' ? 10 : 
                       preferences.performanceMode === 'balanced' ? 6 : 4;
  
  // Static particle data optimized for light theme
  const allParticles = [
    { id: 0, x: 10, y: 20, size: 3, color: 'rgba(37, 99, 235, 0.15)', duration: 15, delay: 0 },
    { id: 1, x: 25, y: 80, size: 4, color: 'rgba(124, 58, 237, 0.15)', duration: 18, delay: 1 },
    { id: 2, x: 70, y: 15, size: 2, color: 'rgba(8, 145, 178, 0.15)', duration: 12, delay: 2 },
    { id: 3, x: 85, y: 60, size: 5, color: 'rgba(5, 150, 105, 0.15)', duration: 20, delay: 3 },
    { id: 4, x: 40, y: 45, size: 3, color: 'rgba(219, 39, 119, 0.15)', duration: 16, delay: 1.5 },
    { id: 5, x: 60, y: 85, size: 4, color: 'rgba(37, 99, 235, 0.15)', duration: 14, delay: 2.5 },
    { id: 6, x: 15, y: 50, size: 2, color: 'rgba(124, 58, 237, 0.15)', duration: 17, delay: 0.5 },
    { id: 7, x: 90, y: 25, size: 3, color: 'rgba(8, 145, 178, 0.15)', duration: 13, delay: 3.5 },
    { id: 8, x: 30, y: 10, size: 4, color: 'rgba(5, 150, 105, 0.15)', duration: 19, delay: 1 },
    { id: 9, x: 75, y: 70, size: 2, color: 'rgba(219, 39, 119, 0.15)', duration: 11, delay: 2 },
  ];
  
  // 根据性能设置选择粒子数量
  const staticParticles = allParticles.slice(0, particleCount);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {staticParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={shouldAnimate('decorative') ? {
            y: [0, -25, 0],
            x: [0, (particle.id % 2 === 0 ? 15 : -15), 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          } : {}}
          transition={{
            duration: particle.duration * (preferences.animationDuration || 1),
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Gradient overlay for depth - optimized for light theme */}
      <div className="absolute inset-0 bg-gradient-radial opacity-25" />
    </div>
  );
}