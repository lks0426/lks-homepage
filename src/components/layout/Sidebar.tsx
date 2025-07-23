'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useAnimation } from '@/components/providers/AnimationProvider';
import { 
  Home, 
  Briefcase, 
  Code2, 
  Bot, 
  Settings, 
  GraduationCap, 
  Menu, 
  X,
  Github,
  Mail,
  Linkedin,
  Zap,
  ZapOff
} from 'lucide-react';
import { navItems } from '@/data';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const iconMap = {
  Home,
  Briefcase,
  Code2,
  Bot,
  Settings,
  GraduationCap
};

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { shouldAnimate, getAnimationDuration, preferences, toggleAnimations, devicePerformance } = useAnimation();
  
  const createTransition = (config: any = {}) => ({
    duration: getAnimationDuration(config.duration || 0.3),
    delay: getAnimationDuration(config.delay || 0),
    ease: config.ease || 'easeOut',
    ...config
  });

  const handleNavClick = (href: string, id: string) => {
    onSectionChange(id);
    setIsOpen(false);
    
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-4 left-4 z-50 glass-card p-3 rounded-lg lg:hidden overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={shouldAnimate('essential') ? { scale: 0.95 } : {}}
        whileHover={shouldAnimate('decorative') ? { 
          boxShadow: "0 8px 25px rgba(59, 130, 246, 0.15)",
          scale: 1.05 
        } : {}}
        transition={createTransition({ duration: 0.2 })}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={shouldAnimate('decorative') ? { rotate: -90, opacity: 0 } : { opacity: 1 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={shouldAnimate('decorative') ? { rotate: 90, opacity: 0 } : { opacity: 0 }}
            transition={createTransition({ duration: 0.2 })}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={createTransition({ duration: 0.3 })}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed left-0 top-0 h-full w-280 glass-nav z-40 flex flex-col lg:translate-x-0`}
        initial={{ x: -280 }}
        animate={{ 
          x: isOpen || (typeof window !== 'undefined' && window.innerWidth >= 1024) ? 0 : -280 
        }}
        transition={createTransition({
          type: shouldAnimate('decorative') ? 'spring' : 'tween',
          stiffness: 300,
          damping: 30,
          duration: shouldAnimate('decorative') ? undefined : 0.3
        })}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              LKS
            </h1>
            <p className="text-text-secondary text-sm">
              AI技术专家 · 全栈开发者
            </p>
          </motion.div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap];
              const isActive = activeSection === item.id;
              
              return (
                <motion.li
                  key={item.id}
                  initial={shouldAnimate('decorative') ? { opacity: 0, x: -30 } : { opacity: 1 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={createTransition({ 
                    delay: getAnimationDuration(index * 0.05 + 0.1),
                    duration: 0.4
                  })}
                >
                  <motion.button
                    onClick={() => handleNavClick(item.href, item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left relative overflow-hidden transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-700 to-blue-800 text-white font-semibold shadow-md shadow-blue-700/25'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100 font-medium'
                    }`}
                    whileHover={shouldAnimate('decorative') ? {
                      x: 4,
                      scale: 1.02
                    } : {}}
                    whileTap={shouldAnimate('essential') ? { scale: 0.98 } : {}}
                    transition={createTransition({ duration: 0.2 })}
                  >
                    {/* 专业高亮效果 */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/15 to-blue-700/15 rounded-md blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={createTransition({ duration: 0.2 })}
                      />
                    )}
                    
                    {/* Hover shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: '-100%', opacity: 0 }}
                      whileHover={shouldAnimate('decorative') ? { 
                        x: '100%', 
                        opacity: 1 
                      } : {}}
                      transition={createTransition({ duration: 0.6 })}
                    />
                    
                    <motion.div
                      className="flex items-center gap-3 relative z-10"
                      animate={isActive && shouldAnimate('decorative') ? {
                        x: [0, 2, 0],
                        transition: { repeat: Infinity, duration: 2 }
                      } : {}}
                    >
                      <motion.div
                        whileHover={shouldAnimate('decorative') ? { 
                          rotate: [0, -10, 10, 0],
                          scale: 1.1
                        } : {}}
                        transition={createTransition({ duration: 0.4 })}
                      >
                        <IconComponent size={20} />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </motion.button>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        {/* Animation Control */}
        <div className="p-4 border-t border-white/10">
          <motion.button
            onClick={toggleAnimations}
            className="w-full flex items-center justify-between p-3 rounded-lg text-left transition-all-normal hover:glass-card group"
            whileHover={shouldAnimate('decorative') ? { scale: 1.02 } : {}}
            whileTap={shouldAnimate('essential') ? { scale: 0.98 } : {}}
            transition={createTransition({ duration: 0.2 })}
          >
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: preferences.performanceMode !== 'minimal' ? 0 : 180,
                  scale: preferences.performanceMode !== 'minimal' ? 1 : 0.9
                }}
                transition={createTransition({ duration: 0.3 })}
              >
                {preferences.performanceMode !== 'minimal' ? (
                  <Zap className="w-4 h-4 text-accent-success" />
                ) : (
                  <ZapOff className="w-4 h-4 text-text-muted" />
                )}
              </motion.div>
              <div>
                <div className="text-sm font-medium text-text-primary">
                  动画效果
                </div>
                <div className="text-xs text-text-secondary">
                  {preferences.performanceMode === 'minimal' ? '已关闭' : '已开启'}
                </div>
              </div>
            </div>
            
            {/* Performance indicator */}
            {devicePerformance && (
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  devicePerformance.level === 'high' ? 'bg-accent-success' :
                  devicePerformance.level === 'medium' ? 'bg-accent-warning' :
                  'bg-accent-error'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            )}
          </motion.button>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          {/* Social Links */}
          <motion.div 
            className="flex justify-center gap-4 mb-4"
            initial={shouldAnimate('decorative') ? { opacity: 0, y: 20 } : { opacity: 1 }}
            animate={{ opacity: 1, y: 0 }}
            transition={createTransition({ delay: 0.4, duration: 0.4 })}
          >
            {[
              { 
                href: "https://github.com/lks0426", 
                icon: Github, 
                color: "primary-blue",
                label: "GitHub"
              },
              { 
                href: "mailto:contact@lks0426.com", 
                icon: Mail, 
                color: "primary-purple",
                label: "Email"
              },
              { 
                href: "https://linkedin.com/in/lks0426", 
                icon: Linkedin, 
                color: "primary-cyan",
                label: "LinkedIn"
              }
            ].map(({ href, icon: Icon, color, label }, index) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`text-text-muted hover:text-${color} transition-colors p-2 rounded-lg relative group`}
                whileHover={shouldAnimate('decorative') ? { 
                  scale: 1.2,
                  rotate: [0, -5, 5, 0],
                  y: -2
                } : {}}
                whileTap={shouldAnimate('essential') ? { scale: 0.9 } : {}}
                transition={createTransition({ 
                  duration: 0.3,
                  delay: index * 0.1 
                })}
                initial={shouldAnimate('decorative') ? { 
                  opacity: 0, 
                  y: 10,
                  scale: 0.8 
                } : { opacity: 1 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1 
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 rounded-lg bg-${color}/20 blur-sm`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={shouldAnimate('decorative') ? { 
                    opacity: 1, 
                    scale: 1.2 
                  } : {}}
                  transition={createTransition({ duration: 0.2 })}
                />
                <motion.div
                  whileHover={shouldAnimate('decorative') ? {
                    rotate: 360
                  } : {}}
                  transition={createTransition({ duration: 0.6 })}
                >
                  <Icon size={20} />
                </motion.div>
              </motion.a>
            ))}
          </motion.div>
          
          {/* Copyright and Performance Info */}
          <div className="text-center">
            <p className="text-text-muted text-xs mb-1">
              © 2024 LKS. All rights reserved.
            </p>
            {devicePerformance && (
              <motion.p 
                className="text-text-muted text-xs opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                性能等级: {devicePerformance.level === 'high' ? '高' : devicePerformance.level === 'medium' ? '中' : '低'}
              </motion.p>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}