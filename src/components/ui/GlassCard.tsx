'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: 'primary' | 'secondary' | 'nav' | 'ultra';
  effect?: 'lift' | 'glow' | 'rotate' | 'shimmer' | 'gradient';
  onClick?: () => void;
  delay?: number;
}

export default function GlassCard({ 
  children, 
  className = '', 
  hover = true, 
  variant = 'primary',
  effect = 'lift',
  onClick,
  delay = 0
}: GlassCardProps) {
  const baseClasses = 'rounded-xl transition-all-normal';
  
  const variantClasses = {
    primary: 'glass-card',
    secondary: 'glass-primary',
    nav: 'glass-nav',
    ultra: 'glass-ultra'
  };
  
  const effectClasses = {
    lift: 'hover-lift',
    glow: 'hover-glow',
    rotate: 'hover-rotate',
    shimmer: 'animate-shimmer',
    gradient: 'hover-gradient bg-gradient-secondary animate-gradient-shift'
  };
  
  const hoverClasses = hover ? `glass-hover ${effectClasses[effect]} cursor-pointer` : '';
  
  const motionVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay * 0.1,
        ease: [0.25, 0.25, 0, 1]
      }
    }
  };
  
  const getHoverAnimation = () => {
    if (!hover) return {};
    
    const animations = {
      lift: {
        y: -8,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 20px 40px -8px rgba(0, 0, 0, 0.1)",
        transition: { 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      glow: {
        scale: 1.02,
        boxShadow: "0 10px 40px rgba(59, 130, 246, 0.15), 0 4px 16px rgba(59, 130, 246, 0.1)",
        borderColor: "rgba(59, 130, 246, 0.3)",
        transition: { 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      rotate: {
        scale: 1.03,
        rotate: 2,
        y: -4,
        transition: { 
          duration: 0.3,
          ease: [0.34, 1.56, 0.64, 1]
        }
      },
      shimmer: {
        scale: 1.01,
        transition: { duration: 0.3 }
      },
      gradient: {
        scale: 1.02,
        y: -4,
        transition: { 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    };
    
    return animations[effect] || animations.lift;
  };
  
  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
      variants={motionVariants}
      initial="hidden"
      animate="visible"
      whileHover={getHoverAnimation()}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
    >
      {children}
    </motion.div>
  );
}