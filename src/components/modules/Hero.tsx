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
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              探索{' '}
              <motion.span 
                className="bg-gradient-secondary bg-clip-text text-transparent animate-gradient-shift"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                AI 创业
              </motion.span>
              {' '}之路 – LKS
            </h1>
            <div className="text-base md:text-lg text-text-secondary mb-8 leading-relaxed">
              <motion.div
                className="font-medium mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                AI 技术创业者 & 全栈开发者
              </motion.div>
              <motion.div
                className="text-sm md:text-base text-text-muted max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                分享从 0→1 的实战经验，技术选型与创业踩坑
                <span className="text-primary-blue font-medium ml-2">一起交流讨论 💬</span>
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
              探索实战案例
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={handleContactMe}
              icon={<ArrowRight size={20} />}
            >
              一起聊聊创业
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
          <h3 className="text-xl text-text-secondary mb-3">
            创业路上的得力工具 🛠️
          </h3>
          <p className="text-sm text-text-muted mb-6 max-w-md mx-auto">
            每个工具背后都有选型的故事和踩坑的经历
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'OpenAI', 'Claude', 'AWS'].map((tech, index) => (
              <motion.span
                key={tech}
                className="px-4 py-2 glass-card rounded-full text-sm text-text-primary hover:bg-blue-50/50 cursor-pointer transition-colors"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.1 }}
                title={`点击了解 ${tech} 的实战经验`}
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