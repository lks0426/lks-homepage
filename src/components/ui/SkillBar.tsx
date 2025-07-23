'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import TechIcon from './TechIcon';
import { useAnimation } from '@/components/providers/AnimationProvider';

interface SkillBarProps {
  name: string;
  level: number;
  icon?: string;
  color?: string;
  delay?: number;
}

export default function SkillBar({ 
  name, 
  level, 
  icon, 
  color = 'bg-primary-blue',
  delay = 0 
}: SkillBarProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0);
  const [displayedLevel, setDisplayedLevel] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { shouldAnimate, getAnimationDuration } = useAnimation();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(level);
      }, delay * 100);
      
      return () => clearTimeout(timer);
    }
  }, [level, delay, isInView]);

  // Counter animation for percentage display - 始终启用数字动画
  useEffect(() => {
    if (!animatedLevel) {
      setDisplayedLevel(animatedLevel);
      return;
    }

    const duration = 1200; // Match the bar animation
    const startTime = Date.now();
    const startValue = displayedLevel;
    const endValue = animatedLevel;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOut)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (endValue - startValue) * easedProgress);
      
      setDisplayedLevel(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [animatedLevel, displayedLevel]);

  const createTransition = (config: any = {}) => ({
    duration: getAnimationDuration(config.duration || 0.3),
    delay: getAnimationDuration(config.delay || 0),
    ease: config.ease || 'easeOut',
    ...config
  });

  const isHighProficiency = level >= 85;

  return (
    <motion.div 
      ref={ref}
      className="mb-4 group cursor-pointer"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={shouldAnimate('decorative') ? {
        scale: 1.02,
        y: -2
      } : {}}
      transition={createTransition({ duration: 0.2 })}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          {icon && (
            <motion.div
              whileHover={shouldAnimate('decorative') ? {
                rotate: [0, -10, 10, 0],
                scale: 1.2
              } : {}}
              transition={createTransition({ duration: 0.4 })}
            >
              <TechIcon name={icon} size="sm" className="text-primary-blue group-hover:text-primary-cyan transition-colors" />
            </motion.div>
          )}
          <motion.span 
            className="text-text-primary font-medium"
            animate={isHovered && shouldAnimate('decorative') ? {
              x: [0, 2, 0],
              transition: { repeat: Infinity, duration: 0.8 }
            } : {}}
          >
            {name}
          </motion.span>
        </div>
        <motion.div className="flex items-center gap-2">
          <motion.span 
            className={`text-sm font-mono tabular-nums transition-colors duration-200 ${
              isHovered ? 'text-blue-600 font-semibold' : 'text-slate-500'
            }`}
            animate={shouldAnimate('decorative') ? {
              scale: isHovered ? 1.1 : 1
            } : {}}
            transition={createTransition({ duration: 0.2 })}
          >
            {displayedLevel}%
          </motion.span>
          {isHighProficiency && shouldAnimate('decorative') && (
            <motion.div
              className="w-2 h-2 bg-accent-success rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          )}
        </motion.div>
      </div>
      
      <div className="relative w-full bg-slate-200 rounded-sm h-3 overflow-hidden group-hover:h-4 transition-all duration-200 shadow-inner shadow-slate-300/40 border border-slate-300/50">
        {/* Background shimmer for high proficiency skills */}
        {isHighProficiency && shouldAnimate('decorative') && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 2
            }}
          />
        )}
        
        <motion.div
          className="h-full rounded-sm relative overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 shadow-sm"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${animatedLevel}%` : 0 }}
          transition={createTransition({ 
            duration: 1.2, 
            delay: delay * 0.1,
            ease: [0.23, 1, 0.32, 1] // Custom easing for smoother feel
          })}
          whileHover={shouldAnimate('decorative') ? {
            boxShadow: '0 0 15px rgba(59, 130, 246, 0.4), 0 0 25px rgba(37, 99, 235, 0.2)'
          } : {}}
        >
          {/* Primary glow sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: isInView ? '200%' : '-100%' }}
            transition={createTransition({
              duration: 2,
              delay: delay * 0.1 + 1.2,
              ease: 'easeInOut',
            })}
          />
          
          {/* Continuous pulse for high proficiency */}
          {isHighProficiency && shouldAnimate('decorative') && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
              animate={{
                x: ['-50%', '150%']
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
                repeatDelay: 1
              }}
            />
          )}
          
          {/* Hover effect */}
          <motion.div
            className="absolute inset-0 bg-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered && shouldAnimate('decorative') ? 1 : 0 }}
            transition={createTransition({ duration: 0.3 })}
          />
        </motion.div>
        
        {/* Progress indicator dots for visual enhancement */}
        {shouldAnimate('decorative') && (
          <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 pointer-events-none">
            {[25, 50, 75].map((threshold, i) => (
              <motion.div
                key={threshold}
                className="absolute w-0.5 h-2 bg-white/20 rounded-full top-1/2 -translate-y-1/2"
                style={{ left: `${threshold}%` }}
                animate={{
                  opacity: animatedLevel >= threshold ? 0.6 : 0.2,
                  scale: animatedLevel >= threshold ? 1.2 : 0.8
                }}
                transition={createTransition({ 
                  duration: 0.3, 
                  delay: (threshold / 100) * 1.2 
                })}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Hover tooltip */}
      <motion.div
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-bg-card rounded-lg shadow-lg text-sm pointer-events-none z-10"
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{
          opacity: isHovered && shouldAnimate('decorative') ? 1 : 0,
          y: isHovered ? 0 : 10,
          scale: isHovered ? 1 : 0.9
        }}
        transition={createTransition({ duration: 0.2 })}
      >
        <div className="text-text-primary font-medium">{name}</div>
        <div className="text-text-secondary text-xs">
          {level >= 90 ? 'Expert' : level >= 75 ? 'Advanced' : level >= 50 ? 'Intermediate' : 'Beginner'} • {level}%
        </div>
      </motion.div>
    </motion.div>
  );
}