'use client';

import { motion } from 'framer-motion';
import { Star, ExternalLink, Wrench, Zap, Target, TrendingUp } from 'lucide-react';
import { aiTools } from '@/data';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import AIIcon from '@/components/ui/AIIcon';

export default function AITools() {
  return (
    <section id="ai-tools" className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">
            AI开发<span className="text-primary-cyan">工具</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            日常使用的AI工具集合，提升开发效率和代码质量
          </p>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aiTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>

        {/* Tools Stats */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlassCard className="p-6 text-center">
            <motion.div 
              className="text-primary-blue mb-2 flex justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Wrench className="w-8 h-8" />
            </motion.div>
            <div className="text-2xl font-bold text-primary-blue mb-1">
              {aiTools.length}+
            </div>
            <div className="text-text-secondary text-sm">
              AI工具
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <motion.div 
              className="text-primary-purple mb-2 flex justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>
            <div className="text-2xl font-bold text-primary-purple mb-1">
              75%
            </div>
            <div className="text-text-secondary text-sm">
              效率提升
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <motion.div 
              className="text-primary-cyan mb-2 flex justify-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Target className="w-8 h-8" />
            </motion.div>
            <div className="text-2xl font-bold text-primary-cyan mb-1">
              {Math.round(aiTools.reduce((sum, tool) => sum + tool.rating, 0) / aiTools.length)}%
            </div>
            <div className="text-text-secondary text-sm">
              平均评分
            </div>
          </GlassCard>

          <GlassCard className="p-6 text-center">
            <motion.div 
              className="text-accent-success mb-2 flex justify-center"
              whileHover={{ scale: 1.1, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <TrendingUp className="w-8 h-8" />
            </motion.div>
            <div className="text-2xl font-bold text-accent-success mb-1">
              100%
            </div>
            <div className="text-text-secondary text-sm">
              日常使用
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: typeof aiTools[0] }) {
  return (
    <GlassCard className="p-6 h-full flex flex-col">
      {/* Tool Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <AIIcon name={tool.icon} size="lg" className="text-primary-blue" />
          <div>
            <h3 className="text-xl font-semibold text-text-primary">
              {tool.name}
            </h3>
            <p className="text-sm text-text-muted">
              {tool.category}
            </p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-accent-warning fill-current" />
          <span className="text-sm font-medium">{tool.rating}%</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-6 flex-1 leading-relaxed">
        {tool.description}
      </p>

      {/* Features */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-text-primary mb-3">核心特性</h4>
        <div className="grid grid-cols-2 gap-2">
          {tool.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-primary-blue" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <div className="text-xs text-text-muted">
            推荐指数: {tool.rating}%
          </div>
          <Button
            variant={tool.liveUrl ? "primary" : "ghost"}
            size="sm"
            onClick={tool.liveUrl ? () => {
              window.open(tool.liveUrl, '_blank');
            } : undefined}
            disabled={!tool.liveUrl}
            href={tool.liveUrl}
            icon={<ExternalLink size={14} />}
          >
            了解更多
          </Button>
        </div>
      </div>
    </GlassCard>
  );
}