'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { ANIMATION_TIMING, EASING } from '@/lib/animations';

interface TooltipProps {
  children: ReactNode;
  content: string | ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  delay = 0.5,
  className = ''
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
    setTimeoutId(timeout);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const getPositionStyles = () => {
    const positions = {
      top: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '8px'
      },
      bottom: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '8px'
      },
      left: {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginRight: '8px'
      },
      right: {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        marginLeft: '8px'
      }
    };
    return positions[position];
  };

  const getArrowStyles = () => {
    const arrows = {
      top: {
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderTop: '4px solid rgba(0, 0, 0, 0.8)',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent'
      },
      bottom: {
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        borderBottom: '4px solid rgba(0, 0, 0, 0.8)',
        borderLeft: '4px solid transparent',
        borderRight: '4px solid transparent'
      },
      left: {
        left: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderLeft: '4px solid rgba(0, 0, 0, 0.8)',
        borderTop: '4px solid transparent',
        borderBottom: '4px solid transparent'
      },
      right: {
        right: '100%',
        top: '50%',
        transform: 'translateY(-50%)',
        borderRight: '4px solid rgba(0, 0, 0, 0.8)',
        borderTop: '4px solid transparent',
        borderBottom: '4px solid transparent'
      }
    };
    return arrows[position];
  };

  const getAnimationVariants = () => {
    const variants = {
      top: {
        initial: { opacity: 0, y: 10, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.8 }
      },
      bottom: {
        initial: { opacity: 0, y: -10, scale: 0.8 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -10, scale: 0.8 }
      },
      left: {
        initial: { opacity: 0, x: 10, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: 10, scale: 0.8 }
      },
      right: {
        initial: { opacity: 0, x: -10, scale: 0.8 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: -10, scale: 0.8 }
      }
    };
    return variants[position];
  };

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="absolute z-50 pointer-events-none"
            style={getPositionStyles()}
            variants={getAnimationVariants()}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
              duration: ANIMATION_TIMING.normal,
              ease: EASING.backOut
            }}
          >
            <div className="relative">
              <div className="px-3 py-2 text-sm text-white bg-black/80 backdrop-blur-sm rounded-lg shadow-lg whitespace-nowrap max-w-xs">
                {content}
              </div>
              <div
                className="absolute"
                style={getArrowStyles()}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}