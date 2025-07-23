'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ReactNode, useState, useRef } from 'react';
import { ANIMATION_TIMING, EASING } from '@/lib/animations';
import { useAnimation } from '@/components/providers/AnimationProvider';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
  icon?: ReactNode;
  loading?: boolean;
  ripple?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  href,
  icon,
  loading = false,
  ripple = true
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripplePosition, setRipplePosition] = useState({ x: 0, y: 0 });
  const [showRipple, setShowRipple] = useState(false);
  const { shouldAnimate, getAnimationDuration, getSpringConfig } = useAnimation();
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  
  // 简化：移除磁吸效果以提升性能
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const baseClasses = 'relative inline-flex items-center justify-center gap-2 font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25 border-0 hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-700/30',
    secondary: 'bg-white text-slate-600 border border-slate-300 shadow-sm hover:bg-slate-50 hover:text-slate-700 hover:border-slate-400 hover:shadow-md',
    ghost: 'bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-transparent hover:border-slate-200'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled || loading) return;

    if (ripple && shouldAnimate('decorative')) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRipplePosition({ x, y });
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), getAnimationDuration(600));
    }

    onClick?.();
  };

  const hoverAnimation = disabled || loading || !shouldAnimate('essential') ? {} : {
    scale: 1.02,
    y: -1,
    transition: getSpringConfig()
  };

  const tapAnimation = disabled || loading || !shouldAnimate('essential') ? {} : {
    scale: 0.98,
    y: 0,
    transition: {
      duration: getAnimationDuration(ANIMATION_TIMING.fast),
      ease: EASING.easeOut
    }
  };

  const content = (
    <>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <motion.div
              className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
              animate={shouldAnimate('essential') ? { rotate: 360 } : {}}
              transition={{
                duration: getAnimationDuration(1),
                repeat: Infinity,
                ease: EASING.linear
              }}
            />
            <span>Loading...</span>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            {icon && (
              <motion.span
                whileHover={shouldAnimate('decorative') ? { 
                  rotate: [0, -10, 10, 0],
                  scale: 1.1
                } : {}}
                animate={isHovered && shouldAnimate('decorative') ? {
                  x: [0, 1, 0],
                  transition: { repeat: Infinity, duration: 2 }
                } : {}}
                transition={{ duration: getAnimationDuration(ANIMATION_TIMING.slow) }}
              >
                {icon}
              </motion.span>
            )}
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ripple Effect */}
      <AnimatePresence>
        {showRipple && ripple && shouldAnimate('decorative') && (
          <motion.span
            key={`ripple-${Date.now()}`}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            initial={{
              scale: 0,
              opacity: 1,
              x: ripplePosition.x,
              y: ripplePosition.y
            }}
            animate={{
              scale: 80,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: getAnimationDuration(0.6),
              ease: EASING.easeOut
            }}
            style={{
              width: '2px',
              height: '2px',
              transform: 'translate(-50%, -50%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* 专业发光效果 */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-500/20 to-blue-600/20 blur-sm opacity-0 pointer-events-none"
          animate={{
            opacity: isHovered && shouldAnimate('decorative') ? 1 : 0,
            scale: isHovered && shouldAnimate('decorative') ? 1.01 : 1
          }}
          transition={{ duration: getAnimationDuration(ANIMATION_TIMING.normal) }}
        />
      )}
      
      {/* 精约闪光效果 */}
      {variant === 'primary' && shouldAnimate('decorative') && (
        <motion.div
          className="absolute inset-0 rounded-md pointer-events-none overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            animate={{
              x: isHovered ? '200%' : '-100%'
            }}
            transition={{
              duration: getAnimationDuration(0.5),
              ease: 'easeInOut'
            }}
          />
        </motion.div>
      )}
    </>
  );
  
  const MotionComponent = href ? motion.a : motion.button;
  const componentProps = href ? {
    href,
    target: href.startsWith('http') ? '_blank' : undefined,
    rel: href.startsWith('http') ? 'noopener noreferrer' : undefined
  } : {
    type: 'button' as const,
    disabled: disabled || loading
  };
  
  return (
    <MotionComponent
      ref={buttonRef as any}
      className={classes}
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={hoverAnimation}
      whileTap={tapAnimation}
      animate={isPressed ? { scale: 0.98 } : { scale: 1 }}
      {...componentProps}
    >
      {content}
    </MotionComponent>
  );
}