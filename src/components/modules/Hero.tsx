'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Download, Eye, Briefcase, Code2, Clock, ThumbsUp } from 'lucide-react';
import { heroStats } from '@/data';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import SectionTransition, { StaggerItem } from '@/components/ui/SectionTransition';
import { ANIMATION_TIMING, EASING } from '@/lib/animations';
import { useAnimation } from '@/components/providers/AnimationProvider';

const iconMap = {
  Briefcase: <Briefcase className="w-8 h-8" />,
  Code2: <Code2 className="w-8 h-8" />, 
  Clock: <Clock className="w-8 h-8" />,
  ThumbsUp: <ThumbsUp className="w-8 h-8" />
};

export default function Hero() {
  const { shouldAnimate, preferences } = useAnimation();
  
  // 专门的浮动效果控制：当performanceMode不是minimal时启用
  const shouldFloat = preferences.performanceMode !== 'minimal';
  
  const handleViewProjects = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactMe = () => {
    window.location.href = 'mailto:contact@lks0426.com';
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-8 py-12">
      <div className="max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              你好，我是{' '}
              <motion.span 
                className="bg-gradient-secondary bg-clip-text text-transparent animate-gradient-shift"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                LKS
              </motion.span>
            </h1>
            <div className="text-xl md:text-2xl text-text-secondary mb-8 leading-relaxed">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                AI技术专家 · 全栈开发者 · 创新实践者
              </motion.div>
              <motion.div
                className="mt-4 text-lg text-text-muted max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                专注于AI应用开发、现代Web技术和智能系统构建。
                致力于用技术创造价值，用创新驱动未来。
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={handleViewProjects}
              icon={<Eye size={20} />}
            >
              查看项目作品
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleContactMe}
              icon={<ArrowRight size={20} />}
            >
              联系我
            </Button>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 1.2 + index * 0.1, 
                duration: 0.6,
                ease: [0.25, 0.25, 0, 1]
              }}
            >
              <GlassCard 
                className="p-6 text-center" 
                variant="ultra"
                effect="glow"
                delay={index}
              >
                <motion.div 
                  className="text-primary-blue mb-2"
                  animate={shouldFloat ? {
                    y: [0, -8, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }
                  } : {}}
                >
                  {iconMap[stat.icon as keyof typeof iconMap]}
                </motion.div>
                <motion.div 
                  className={`text-2xl font-bold mb-1 ${stat.color}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 1.4 + index * 0.1,
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-text-secondary text-sm">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Preview */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <h3 className="text-xl text-text-secondary mb-6">
            核心技术栈
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'OpenAI', 'Claude', 'AWS'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 glass-card rounded-full text-sm text-text-primary"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}