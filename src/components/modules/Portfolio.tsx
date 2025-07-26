'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { ExternalLink, Github, Filter } from 'lucide-react';
import { projects } from '@/data';
import { Project } from '@/types';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import GradientText from '@/components/ui/GradientText';
import ProjectIcon from '@/components/ui/ProjectIcon';
import SectionTransition, { StaggerItem } from '@/components/ui/SectionTransition';
import { ANIMATION_TIMING, EASING } from '@/lib/animations';
import { useAnimation } from '@/components/providers/AnimationProvider';

const categories = [
  { id: 'all', label: '全部' },
  { id: 'ai', label: 'AI应用' },
  { id: 'web', label: 'Web应用' },
  { id: 'tool', label: '工具' }
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');
  const { shouldAnimate, getAnimationDuration } = useAnimation();

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="portfolio" className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: shouldAnimate('decorative') ? 30 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: getAnimationDuration(0.6) }}
        >
          <h2 className="text-4xl font-bold mb-4">
            项目作品<GradientText gradient="secondary" hover>集</GradientText>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            我在AI应用开发、Web技术和工具创建方面的实践成果
          </p>
        </motion.div>

        {/* Filter Buttons - 柔和现代主义设计 */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`relative px-5 py-3 rounded-md font-semibold transition-all duration-200 overflow-hidden ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25'
                  : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-700 border border-slate-200 hover:shadow-md hover:border-slate-300'
              }`}
              onClick={() => setActiveFilter(category.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* 专业激活效果 */}
              {activeFilter === category.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-md blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              {/* 柔和闪光效果 */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '200%' }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
              />
              
              <div className="relative z-10 flex items-center">
                <Filter size={16} className="mr-2" />
                {category.label}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout={shouldAnimate('decorative')}
          transition={{ duration: getAnimationDuration(ANIMATION_TIMING.slow), ease: EASING.easeOut }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${activeFilter}-${project.id}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: ANIMATION_TIMING.slow,
                delay: index * 0.1,
                ease: EASING.backOut
              }}
            >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { shouldAnimate, getAnimationDuration } = useAnimation();
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 始终创建motion values，但在禁用动画时不使用
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 简化的变换效果，减少性能消耗
  const rotateX = useTransform(mouseY, [-200, 200], [3, -3]);
  const rotateY = useTransform(mouseX, [-200, 200], [-3, 3]);
  
  // 减少层次深度效果
  const contentZ = useTransform(mouseY, [-200, 200], [0, 10]);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!shouldAnimate('decorative') || !cardRef.current) return;
    
    // 节流处理，减少计算频率
    requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mouseX.set(event.clientX - centerX);
      mouseY.set(event.clientY - centerY);
    });
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (shouldAnimate('decorative')) {
      mouseX.set(0);
      mouseY.set(0);
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      layout={shouldAnimate('decorative')}
      className={shouldAnimate('decorative') ? "perspective-1000 transform-gpu" : ""}
      initial={{ 
        opacity: 0, 
        y: shouldAnimate('decorative') ? 20 : 0, 
        scale: shouldAnimate('decorative') ? 0.95 : 1 
      }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ 
        opacity: 0, 
        y: shouldAnimate('decorative') ? -20 : 0, 
        scale: shouldAnimate('decorative') ? 0.95 : 1 
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        delay: getAnimationDuration(index * 0.05), 
        duration: getAnimationDuration(0.4), 
        ease: [0.25, 0.25, 0, 1] 
      }}
      style={shouldAnimate('decorative') ? {
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      } : {}}
      whileHover={shouldAnimate('decorative') ? {
        scale: 1.02,
        y: -5,
        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
      } : {
        scale: 1.01,
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
      }}
      onMouseMove={shouldAnimate('decorative') ? handleMouseMove : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full"
        style={shouldAnimate('decorative') ? {
          transformStyle: 'preserve-3d',
          z: contentZ
        } : {}}
      >
        {/* Card background - 简化版本 */}
        <div className="absolute inset-0 glass-card rounded-xl" />
        
        {/* Gradient glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-blue/10 via-transparent to-primary-purple/10 opacity-0"
          animate={{
            opacity: isHovered && shouldAnimate('decorative') ? 1 : 0,
            scale: isHovered ? 1.02 : 1
          }}
          transition={{
            duration: getAnimationDuration(0.3),
            ease: 'easeOut'
          }}
        />
        
        <div className="relative p-6 h-full flex flex-col z-10">
          {/* Project Image with parallax */}
          <motion.div 
            className="relative mb-6 rounded-lg overflow-hidden bg-bg-secondary h-48"
          >
            {/* Background pattern */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-primary-purple/5"
              animate={isHovered && shouldAnimate('decorative') ? {
                scale: 1.1,
                rotate: 2
              } : {}}
              transition={{
                duration: getAnimationDuration(0.6),
                ease: 'easeOut'
              }}
            />
            
            {/* 实际项目图片 */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
              animate={isHovered && shouldAnimate('decorative') ? {
                scale: 1.05
              } : {}}
              transition={{
                duration: getAnimationDuration(0.6),
                ease: 'easeOut'
              }}
            />
            
            {/* Floating particles */}
            {shouldAnimate('decorative') && [
              { x: '20%', y: '30%', delay: 0 },
              { x: '80%', y: '20%', delay: 0.5 },
              { x: '70%', y: '80%', delay: 1 },
              { x: '30%', y: '70%', delay: 1.5 }
            ].map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-primary-blue/40 rounded-full"
                style={{ left: particle.x, top: particle.y }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'easeInOut'
                }}
              />
            ))}
            
            {/* Hover Overlay with enhanced animations */}
            <motion.div
              className="absolute inset-0 bg-gradient-primary opacity-0 flex items-center justify-center backdrop-blur-sm"
              animate={{
                opacity: isHovered && shouldAnimate('decorative') ? 0.95 : 0
              }}
              transition={{ duration: getAnimationDuration(0.4) }}
            >
              <motion.div 
                className="flex gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: isHovered ? 0 : 20,
                  opacity: isHovered ? 1 : 0
                }}
                transition={{ 
                  duration: getAnimationDuration(0.3),
                  delay: getAnimationDuration(0.1)
                }}
              >
                {project.liveUrl && (
                  <motion.div
                    whileHover={shouldAnimate('decorative') ? { 
                      scale: 1.1,
                      rotate: -2
                    } : {}}
                    whileTap={shouldAnimate('decorative') ? { scale: 0.95 } : {}}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      href={project.liveUrl}
                      icon={<ExternalLink size={16} />}
                    >
                      预览
                    </Button>
                  </motion.div>
                )}
                {project.githubUrl && (
                  <motion.div
                    whileHover={shouldAnimate('decorative') ? { 
                      scale: 1.1,
                      rotate: 2
                    } : {}}
                    whileTap={shouldAnimate('decorative') ? { scale: 0.95 } : {}}
                  >
                    <Button
                      variant="secondary"
                      size="sm"
                      href={project.githubUrl}
                      icon={<Github size={16} />}
                    >
                      代码
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Project Info with depth */}
          <motion.div 
            className="flex-1 flex flex-col"
          >
            <motion.h3 
              className="text-xl font-semibold mb-2 text-text-primary"
              animate={isHovered && shouldAnimate('decorative') ? {
                x: [0, 2, 0],
                transition: { repeat: Infinity, duration: 2 }
              } : {}}
            >
              {project.title}
            </motion.h3>
          
            <motion.p 
              className="text-text-secondary text-sm mb-4 line-clamp-3 flex-1"
              animate={isHovered && shouldAnimate('decorative') ? {
                color: '#e2e8f0'
              } : {}}
              transition={{ duration: getAnimationDuration(0.3) }}
            >
              {project.description}
            </motion.p>

            {/* Tech Tags with stagger animation */}
            <motion.div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-md glass-primary text-text-primary cursor-pointer"
                  whileHover={shouldAnimate('decorative') ? {
                    scale: 1.1,
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    y: -2
                  } : {}}
                  animate={isHovered && shouldAnimate('decorative') ? {
                    y: [0, -2, 0],
                    transition: { 
                      delay: tagIndex * 0.1,
                      duration: 1.5,
                      repeat: Infinity 
                    }
                  } : {}}
                  transition={{
                    duration: getAnimationDuration(0.2),
                    ease: 'easeOut'
                  }}
                >
                  {tag}
                </motion.span>
              ))}
              {project.tags.length > 3 && (
                <motion.span 
                  className="px-2 py-1 text-xs rounded-md text-text-muted"
                  whileHover={shouldAnimate('decorative') ? {
                    scale: 1.05,
                    color: '#3b82f6'
                  } : {}}
                >
                  +{project.tags.length - 3}
                </motion.span>
              )}
            </motion.div>

            {/* Action Buttons with magnetic effect */}
            <motion.div 
              className="flex gap-2 mt-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: getAnimationDuration(index * 0.1 + 0.4) 
                }
              }}
            >
              {project.liveUrl && (
                <motion.div
                  className="flex-1"
                  whileHover={shouldAnimate('decorative') ? {
                    y: -2,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  <Button
                    variant="primary"
                    size="sm"
                    href={project.liveUrl}
                    icon={<ExternalLink size={16} />}
                    className="w-full"
                  >
                    查看项目
                  </Button>
                </motion.div>
              )}
              {project.githubUrl && (
                <motion.div
                  className={project.liveUrl ? '' : 'flex-1'}
                  whileHover={shouldAnimate('decorative') ? {
                    y: -2,
                    transition: { duration: 0.2 }
                  } : {}}
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    href={project.githubUrl}
                    icon={<Github size={16} />}
                    className={project.liveUrl ? '' : 'w-full'}
                  >
                    源码
                  </Button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}