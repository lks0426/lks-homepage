'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  gradient?: 'primary' | 'secondary' | 'tertiary' | 'warm' | 'cool';
  className?: string;
  animate?: boolean;
  hover?: boolean;
}

export default function GradientText({
  children,
  gradient = 'primary',
  className = '',
  animate = false,
  hover = false
}: GradientTextProps) {
  const gradientClasses = {
    primary: 'bg-gradient-primary',
    secondary: 'bg-gradient-secondary',
    tertiary: 'bg-gradient-tertiary',
    warm: 'bg-gradient-warm',
    cool: 'bg-gradient-cool'
  };

  const baseClasses = 'bg-clip-text text-transparent font-bold';
  const animationClasses = animate ? 'animate-gradient-shift' : '';
  const hoverClasses = hover ? 'hover-gradient' : '';

  if (hover || animate) {
    return (
      <motion.span
        className={`${baseClasses} ${gradientClasses[gradient]} ${animationClasses} ${hoverClasses} ${className}`}
        whileHover={hover ? { scale: 1.05 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.span>
    );
  }

  return (
    <span className={`${baseClasses} ${gradientClasses[gradient]} ${className}`}>
      {children}
    </span>
  );
}