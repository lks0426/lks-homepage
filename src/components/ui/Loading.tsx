'use client';

import { motion } from 'framer-motion';
import { ANIMATION_TIMING, EASING } from '@/lib/animations';

interface LoadingProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'orbital';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
  text?: string;
}

export default function Loading({
  type = 'spinner',
  size = 'md',
  color = 'currentColor',
  className = '',
  text
}: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const renderSpinner = () => (
    <motion.div
      className={`border-2 border-current border-t-transparent rounded-full ${sizeClasses[size]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: EASING.linear
      }}
      style={{ borderColor: `${color} transparent ${color} ${color}` }}
    />
  );

  const renderDots = () => {
    const dotCount = 3;
    return (
      <div className="flex gap-1">
        {Array.from({ length: dotCount }, (_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              backgroundColor: color,
              width: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px',
              height: size === 'sm' ? '4px' : size === 'md' ? '6px' : '8px'
            }}
            animate={{
              y: [-4, 4, -4],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: EASING.easeInOut
            }}
          />
        ))}
      </div>
    );
  };

  const renderPulse = () => (
    <motion.div
      className={`rounded-full ${sizeClasses[size]}`}
      style={{ backgroundColor: color }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: EASING.easeInOut
      }}
    />
  );

  const renderBars = () => {
    const barCount = 4;
    return (
      <div className="flex items-end gap-1">
        {Array.from({ length: barCount }, (_, i) => (
          <motion.div
            key={i}
            className="rounded-sm"
            style={{
              backgroundColor: color,
              width: size === 'sm' ? '3px' : size === 'md' ? '4px' : '6px',
              height: size === 'sm' ? '8px' : size === 'md' ? '12px' : '16px'
            }}
            animate={{
              scaleY: [0.3, 1, 0.3]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: EASING.easeInOut
            }}
          />
        ))}
      </div>
    );
  };

  const renderOrbital = () => (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Center dot */}
      <div
        className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full transform -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: color }}
      />
      
      {/* Orbiting dots */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 2 + i * 0.5,
            repeat: Infinity,
            ease: EASING.linear
          }}
        >
          <div
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: color,
              top: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              opacity: 0.8 - i * 0.2
            }}
          />
        </motion.div>
      ))}
    </div>
  );

  const renderLoadingType = () => {
    switch (type) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'bars':
        return renderBars();
      case 'orbital':
        return renderOrbital();
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center justify-center">
        {renderLoadingType()}
      </div>
      
      {text && (
        <motion.p
          className={`mt-3 text-text-secondary ${textSizes[size]}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Full-screen loading overlay
export function LoadingOverlay({
  isVisible,
  type = 'spinner',
  text = 'Loading...',
  className = ''
}: {
  isVisible: boolean;
  type?: LoadingProps['type'];
  text?: string;
  className?: string;
}) {
  if (!isVisible) return null;

  return (
    <motion.div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-bg-primary/80 backdrop-blur-sm ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: ANIMATION_TIMING.normal }}
    >
      <motion.div
        className="flex flex-col items-center p-8 glass-card rounded-2xl"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ 
          duration: ANIMATION_TIMING.slow,
          ease: EASING.backOut
        }}
      >
        <Loading type={type} size="lg" text={text} />
      </motion.div>
    </motion.div>
  );
}