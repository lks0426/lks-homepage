'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Palette, Settings, Brain, Cloud, Zap, Star } from 'lucide-react';
import { techSkills } from '@/data';
import { TechSkill } from '@/types';
import GlassCard from '@/components/ui/GlassCard';
import SkillBar from '@/components/ui/SkillBar';
import Button from '@/components/ui/Button';
import TechIcon from '@/components/ui/TechIcon';
import { useScrollAnimation, useProgressiveReveal } from '@/hooks/useScrollAnimation';
import { useAnimation } from '@/components/providers/AnimationProvider';

const categories = [
  { id: 'frontend', label: '前端技术', icon: <Palette className="w-5 h-5" />, color: 'text-primary-blue' },
  { id: 'backend', label: '后端技术', icon: <Settings className="w-5 h-5" />, color: 'text-primary-purple' },
  { id: 'ai', label: 'AI集成', icon: <Brain className="w-5 h-5" />, color: 'text-primary-cyan' },
  { id: 'cloud', label: '云服务', icon: <Cloud className="w-5 h-5" />, color: 'text-accent-success' }
];

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { shouldAnimate, getAnimationDuration } = useAnimation();
  const { ref: headerRef, variants: headerVariants, controls: headerControls } = useScrollAnimation({ delay: 0.1 });
  const { ref: tabsRef, containerVariants, itemVariants } = useProgressiveReveal(categories, 0.1);

  const filteredSkills = techSkills.filter(skill => skill.category === activeTab);

  return (
    <section id="tech-stack" className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="text-center mb-12"
          initial="hidden"
          animate={headerControls}
          variants={headerVariants()}
        >
          <h2 className="text-4xl font-bold mb-4">
            技术<span className="text-primary-purple">栈</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            掌握的现代技术栈和工具，持续学习和实践最新技术
          </p>
        </motion.div>

        {/* Category Tabs with enhanced animations */}
        <motion.div
          ref={tabsRef}
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={shouldAnimate('decorative') ? {
                y: -4,
                transition: { duration: 0.2 }
              } : {}}
            >
              <Button
                variant={activeTab === category.id ? 'primary' : 'ghost'}
                size="md"
                onClick={() => setActiveTab(category.id)}
                icon={category.icon}
              >
                {category.label}
                {activeTab === category.id && shouldAnimate('decorative') && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 w-8 h-0.5 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full"
                    layoutId="activeTab"
                    style={{ x: '-50%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills List */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassCard className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-2xl ${categories.find(c => c.id === activeTab)?.color}`}>
                  {categories.find(c => c.id === activeTab)?.icon}
                </span>
                <h3 className="text-2xl font-semibold">
                  {categories.find(c => c.id === activeTab)?.label}
                </h3>
              </div>
              
              <motion.div 
                className="space-y-4"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: shouldAnimate('decorative') ? getAnimationDuration(0.1) : 0
                    }
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            duration: getAnimationDuration(0.4),
                            delay: getAnimationDuration(index * 0.05)
                          }
                        }
                      }}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <SkillBar
                        name={skill.name}
                        level={skill.level}
                        icon={skill.icon}
                        color={getSkillColor(skill.category)}
                        delay={index}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </GlassCard>
          </motion.div>

          {/* Skills Details */}
          <motion.div
            key={`${activeTab}-details`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-6"
          >
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <SkillCard 
                  skill={skill} 
                  isHovered={hoveredSkill === skill.name}
                  onHover={setHoveredSkill}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Category Overview with enhanced micro-interactions */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: getAnimationDuration(0.5), duration: getAnimationDuration(0.6) }}
        >
          {categories.map((category, index) => {
            const categorySkills = techSkills.filter(skill => skill.category === category.id);
            const averageLevel = Math.round(
              categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length
            );
            const isActive = activeTab === category.id;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: getAnimationDuration(index * 0.1 + 0.7), 
                  duration: getAnimationDuration(0.4),
                  type: shouldAnimate('decorative') ? 'spring' : 'tween',
                  stiffness: 200
                }}
                whileHover={shouldAnimate('decorative') ? {
                  scale: 1.05,
                  y: -8,
                  rotateY: 5,
                  transition: { duration: 0.3 }
                } : {}}
                whileTap={shouldAnimate('decorative') ? { scale: 0.95 } : {}}
              >
                <motion.div
                  className={`relative p-4 text-center cursor-pointer rounded-xl transition-all duration-300 ${
                    isActive ? 'glass-card ring-2 ring-primary-blue/30' : 'glass-card hover:glass-card-hover'
                  }`}
                  onClick={() => setActiveTab(category.id)}
                  animate={isActive && shouldAnimate('decorative') ? {
                    boxShadow: [
                      '0 4px 20px rgba(59, 130, 246, 0.1)',
                      '0 8px 30px rgba(59, 130, 246, 0.2)',
                      '0 4px 20px rgba(59, 130, 246, 0.1)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {/* Floating particles for active category */}
                  {isActive && shouldAnimate('decorative') && [
                    { x: '10%', y: '20%', delay: 0 },
                    { x: '80%', y: '30%', delay: 0.5 },
                    { x: '20%', y: '80%', delay: 1 }
                  ].map((particle, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-primary-blue rounded-full"
                      style={{ left: particle.x, top: particle.y }}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'easeInOut'
                      }}
                    />
                  ))}
                  
                  {/* Icon with enhanced animations */}
                  <motion.div 
                    className={`text-2xl mb-2 ${category.color} relative`}
                    whileHover={shouldAnimate('decorative') ? {
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                      transition: { duration: 0.5 }
                    } : {}}
                    animate={isActive && shouldAnimate('decorative') ? {
                      scale: [1, 1.1, 1],
                      transition: { duration: 2, repeat: Infinity }
                    } : {}}
                  >
                    {category.icon}
                    
                    {/* Skill level indicator */}
                    {averageLevel >= 80 && shouldAnimate('decorative') && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-accent-success rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}
                      >
                        <Star className="w-2 h-2 text-white absolute top-0.5 left-0.5" />
                      </motion.div>
                    )}
                  </motion.div>
                  
                  <motion.div 
                    className="text-sm text-text-secondary mb-1"
                    animate={isActive ? { color: '#3b82f6' } : {}}
                  >
                    {category.label}
                  </motion.div>
                  
                  {/* Animated percentage */}
                  <motion.div 
                    className={`text-lg font-bold ${category.color} font-mono`}
                    whileHover={shouldAnimate('decorative') ? {
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    } : {}}
                  >
                    {averageLevel}%
                  </motion.div>
                  
                  <motion.div 
                    className="text-xs text-text-muted"
                    animate={hoveredSkill ? {
                      opacity: 0.9,
                      color: '#94a3b8'
                    } : {}}
                    transition={{ duration: 0.2 }}
                    style={{ 
                      WebkitFontSmoothing: 'antialiased',
                      textRendering: 'optimizeLegibility' 
                    }}
                  >
                    {categorySkills.length} 项技术
                  </motion.div>
                  
                  {/* Progress ring */}
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: `conic-gradient(${category.color.includes('blue') ? '#3b82f6' : 
                        category.color.includes('purple') ? '#8b5cf6' :
                        category.color.includes('cyan') ? '#06b6d4' : '#10b981'
                      } ${averageLevel * 3.6}deg, transparent 0deg)`
                    }}
                    initial={{ opacity: 0 }}
                    whileHover={shouldAnimate('decorative') ? { opacity: 0.1 } : {}}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function SkillCard({ 
  skill, 
  isHovered, 
  onHover 
}: { 
  skill: TechSkill; 
  isHovered: boolean;
  onHover: (name: string | null) => void;
}) {
  const { shouldAnimate } = useAnimation();
  const isExpert = skill.level >= 85;
  
  return (
    <motion.div
      className="group cursor-pointer"
      onHoverStart={() => onHover(skill.name)}
      onHoverEnd={() => onHover(null)}
      whileHover={shouldAnimate('decorative') ? {
        scale: 1.02,
        y: -4
      } : {}}
      transition={{ duration: 0.2 }}
    >
      <GlassCard className="p-4 relative overflow-hidden">
        {/* Background pattern */}
        {shouldAnimate('decorative') && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.02 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <div className="flex items-start gap-3 relative z-10">
          {/* Animated icon */}
          <motion.div
            whileHover={shouldAnimate('decorative') ? {
              rotate: [0, -10, 10, 0],
              scale: 1.1
            } : {}}
            animate={isHovered && shouldAnimate('decorative') ? {
              y: [0, -2, 0],
              transition: { repeat: Infinity, duration: 2 }
            } : {}}
            transition={{ duration: 0.4 }}
          >
            <TechIcon 
              name={skill.icon} 
              size="lg" 
              className={`mt-1 transition-colors duration-300 ${
                isHovered ? 'text-primary-cyan' : 'text-primary-blue'
              }`}
            />
            
            {/* Expert badge */}
            {isExpert && shouldAnimate('decorative') && (
              <motion.div
                className="absolute -top-1 -right-1 w-3 h-3 bg-accent-success rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Zap className="w-1.5 h-1.5 text-white" />
              </motion.div>
            )}
          </motion.div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <motion.h4 
                className="font-semibold text-text-primary"
                animate={isHovered && shouldAnimate('decorative') ? {
                  x: [0, 2, 0],
                  transition: { repeat: Infinity, duration: 2 }
                } : {}}
              >
                {skill.name}
              </motion.h4>
              
              {/* Animated percentage */}
              <motion.span 
                className="text-sm font-mono text-text-secondary tabular-nums"
                animate={isHovered ? {
                  scale: 1.1,
                  color: '#3b82f6'
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {skill.level}%
              </motion.span>
            </div>
            
            {skill.description && (
              <motion.p 
                className={`text-sm leading-relaxed transition-colors duration-300 ${
                  isHovered ? 'text-slate-700 font-medium' : 'text-slate-500'
                }`}
                style={{ 
                  WebkitFontSmoothing: 'antialiased',
                  textRendering: 'optimizeLegibility' 
                }}
              >
                {skill.description}
              </motion.p>
            )}
            
            {/* Skill level indicator dots */}
            {shouldAnimate('decorative') && (
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={`w-2 h-2 rounded-full ${
                      i < Math.ceil(skill.level / 20) ? 'bg-primary-blue' : 'bg-bg-secondary'
                    }`}
                    animate={{
                      scale: isHovered && i < Math.ceil(skill.level / 20) ? [1, 1.2, 1] : 1
                    }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      repeat: isHovered ? Infinity : 0
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Hover glow effect */}
        {shouldAnimate('decorative') && (
          <motion.div
            className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary-blue/10 to-primary-cyan/10"
            animate={{
              opacity: isHovered ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
          />
        )}
      </GlassCard>
    </motion.div>
  );
}

function getSkillColor(category: string): string {
  switch (category) {
    case 'frontend':
      return 'bg-primary-blue';
    case 'backend':
      return 'bg-primary-purple';
    case 'ai':
      return 'bg-primary-cyan';
    case 'cloud':
      return 'bg-accent-success';
    default:
      return 'bg-primary-blue';
  }
}