'use client';

import { motion } from 'framer-motion';
import { useMemo, useState, useEffect } from 'react';

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

// Seeded random function for consistent SSR/client rendering
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function ParticleBackground({ 
  particleCount = 20, 
  className = '' 
}: ParticleBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const particles = useMemo<Particle[]>(() => {
    const colors = [
      'rgba(59, 130, 246, 0.1)',   // blue
      'rgba(139, 92, 246, 0.1)',   // purple
      'rgba(6, 182, 212, 0.1)',    // cyan
      'rgba(16, 185, 129, 0.1)',   // emerald
      'rgba(236, 72, 153, 0.1)',   // pink
    ];

    return Array.from({ length: particleCount }, (_, i) => {
      // Use deterministic values based on index to avoid hydration mismatch
      const seed = i * 1000;
      return {
        id: i,
        size: seededRandom(seed + 1) * 4 + 2,
        x: seededRandom(seed + 2) * 100,
        y: seededRandom(seed + 3) * 100,
        duration: seededRandom(seed + 4) * 10 + 10,
        delay: seededRandom(seed + 5) * 5,
        color: colors[Math.floor(seededRandom(seed + 6) * colors.length)],
      };
    });
  }, [particleCount]);

  // Don't render particles until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute inset-0 bg-gradient-radial opacity-30" />
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
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
          animate={{
            y: [0, -30, 0],
            x: [0, seededRandom(particle.id + 100) * 40 - 20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />
    </div>
  );
}