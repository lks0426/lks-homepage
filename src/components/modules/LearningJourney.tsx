'use client';

import { motion } from 'framer-motion';
import { Calendar, BookOpen, Award, Rocket, Brain, Code2, Users } from 'lucide-react';
import { learningMilestones } from '@/data';
import { LearningMilestone } from '@/types';
import GlassCard from '@/components/ui/GlassCard';
import { useAnimation } from '@/components/providers/AnimationProvider';

const typeIcons = {
  project: <Rocket className="w-5 h-5" />,
  learning: <BookOpen className="w-5 h-5" />,
  achievement: <Award className="w-5 h-5" />
};

const typeColors = {
  project: 'text-primary-blue',
  learning: 'text-primary-purple', 
  achievement: 'text-accent-success'
};

export default function LearningJourney() {
  const { shouldAnimate, getAnimationDuration } = useAnimation();
  
  return (
    <section id="learning" className="min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: shouldAnimate('decorative') ? 30 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: getAnimationDuration(0.6) }}
        >
          <h2 className="text-4xl font-bold mb-4">
            学习<span className="text-accent-success">历程</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            我的AI学习路径和技术成长轨迹，持续追求技术创新
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-blue via-primary-purple to-accent-success opacity-30" />
          
          {/* Milestones */}
          <div className="space-y-8">
            {learningMilestones.map((milestone, index) => (
              <motion.div
                key={milestone.id}
                initial={{ 
                  opacity: 0, 
                  x: shouldAnimate('decorative') ? -30 : 0 
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: getAnimationDuration(index * 0.1), 
                  duration: getAnimationDuration(0.6) 
                }}
              >
                <MilestoneCard milestone={milestone} index={index} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Plans */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: shouldAnimate('decorative') ? 30 : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: getAnimationDuration(0.8), 
            duration: getAnimationDuration(0.6) 
          }}
        >
          <GlassCard className="p-8 text-center" variant="primary">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-cyan rounded-full flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-accent-success to-primary-emerald rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✦</span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-6">未来规划</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group cursor-pointer">
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-blue/20 to-primary-cyan/20 rounded-xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-blue/30 group-hover:to-primary-cyan/30">
                    <Brain className="w-6 h-6 text-primary-blue transition-colors duration-300 group-hover:text-primary-cyan" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2 text-primary-blue">深化AI应用</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  探索更多AI技术在实际项目中的应用
                </p>
              </div>
              <div className="group cursor-pointer">
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-purple/20 to-primary-pink/20 rounded-xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-primary-purple/30 group-hover:to-primary-pink/30">
                    <Code2 className="w-6 h-6 text-primary-purple transition-colors duration-300 group-hover:text-primary-pink" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2 text-primary-purple">系统架构</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  学习大规模系统设计和微服务架构
                </p>
              </div>
              <div className="group cursor-pointer">
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent-success/20 to-primary-emerald/20 rounded-xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-accent-success/30 group-hover:to-primary-emerald/30">
                    <Users className="w-6 h-6 text-accent-success transition-colors duration-300 group-hover:text-primary-emerald" />
                  </div>
                </div>
                <h4 className="font-semibold mb-2 text-accent-success">技术分享</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  通过博客和开源项目分享技术心得
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function MilestoneCard({ milestone, index }: { milestone: LearningMilestone; index: number }) {
  const { shouldAnimate, getAnimationDuration } = useAnimation();
  
  return (
    <div className="relative flex items-start gap-6">
      {/* Timeline Dot */}
      <div className="relative z-10">
        <motion.div
          className={`w-16 h-16 rounded-full glass-card flex items-center justify-center ${typeColors[milestone.type]}`}
          initial={{ scale: shouldAnimate('decorative') ? 0 : 1 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ 
            delay: getAnimationDuration(index * 0.1 + 0.3), 
            duration: getAnimationDuration(0.4) 
          }}
        >
          {typeIcons[milestone.type]}
        </motion.div>
      </div>

      {/* Content Card */}
      <div className="flex-1">
        <GlassCard className="p-6" variant="primary">
          {/* Date */}
          <div className="flex items-center gap-2 text-text-muted text-sm mb-3">
            <Calendar className="w-4 h-4" />
            {milestone.date}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-text-primary mb-3">
            {milestone.title}
          </h3>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {milestone.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {milestone.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full glass-primary text-text-primary"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Type Badge */}
          <div className="flex justify-end mt-4">
            <span className={`px-2 py-1 text-xs rounded-md ${typeColors[milestone.type]} opacity-80`}>
              {milestone.type === 'project' && '项目'}
              {milestone.type === 'learning' && '学习'}
              {milestone.type === 'achievement' && '成就'}
            </span>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}