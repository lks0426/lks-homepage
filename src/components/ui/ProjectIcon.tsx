'use client';

import { ReactNode } from 'react';

interface ProjectIconProps {
  name: string;
  category?: 'ai' | 'web' | 'tool';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// 专业项目图标映射
const projectIcons: Record<string, ReactNode> = {
  // AI项目图标
  'Claude Code助手': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="8" r="1.5" fill="currentColor"/>
      <circle cx="16" cy="8" r="1.5" fill="currentColor"/>
      <path d="M7 16c0-3 2-5 5-5s5 2 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'AI图像生成工具': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="9" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M21 15l-3.086-3.086a2 2 0 00-2.828 0L6 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 10l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="6" r="2" fill="currentColor"/>
    </svg>
  ),
  
  // Web项目图标
  'AI知识库系统': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M4 19.5A2.5 2.5 0 016.5 22H20a2 2 0 002-2V4a2 2 0 00-2-2H6.5A2.5 2.5 0 004 4.5v15z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 7h8M8 11h6M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="7" r="1.5" fill="currentColor"/>
    </svg>
  ),
  '智能对话系统': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="9" cy="12" r="1" fill="currentColor"/>
      <circle cx="15" cy="12" r="1" fill="currentColor"/>
      <path d="M10 15c1 1 3 1 4 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  // 工具项目图标
  '开发工具集': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 9l3 3-3 3M13 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="4" r="1.5" fill="currentColor"/>
    </svg>
  ),
  'API管理平台': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 1v6M12 17v6M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24M1 12h6M17 12h6M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
  
  // 通用图标
  'default-ai': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.05a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'default-web': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
  'default-tool': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.77 3.77z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  ),
};

// 根据项目名称和类别获取合适的图标
const getProjectIcon = (name: string, category?: string): ReactNode => {
  // 首先尝试精确匹配项目名称
  if (projectIcons[name]) {
    return projectIcons[name];
  }
  
  // 然后根据关键词匹配
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('claude') || lowerName.includes('助手') || lowerName.includes('ai')) {
    if (lowerName.includes('图像') || lowerName.includes('image')) {
      return projectIcons['AI图像生成工具'];
    }
    if (lowerName.includes('对话') || lowerName.includes('chat')) {
      return projectIcons['智能对话系统'];
    }
    if (lowerName.includes('知识') || lowerName.includes('knowledge')) {
      return projectIcons['AI知识库系统'];
    }
    return projectIcons['Claude Code助手'];
  }
  
  if (lowerName.includes('工具') || lowerName.includes('tool')) {
    if (lowerName.includes('api')) {
      return projectIcons['API管理平台'];
    }
    return projectIcons['开发工具集'];
  }
  
  // 最后根据类别返回默认图标
  switch (category) {
    case 'ai': return projectIcons['default-ai'];
    case 'web': return projectIcons['default-web'];
    case 'tool': return projectIcons['default-tool'];
    default: return projectIcons['default-web'];
  }
};

// 获取尺寸类名 - 优化的一致性尺寸
const getSizeClass = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return 'w-8 h-8';
    case 'md': return 'w-12 h-12';
    case 'lg': return 'w-16 h-16';
    default: return 'w-12 h-12';
  }
};

export default function ProjectIcon({ name, category, size = 'md', className = '' }: ProjectIconProps) {
  const icon = getProjectIcon(name, category);
  
  return (
    <div className={`${getSizeClass(size)} ${className} text-current flex items-center justify-center transition-all duration-200 hover:scale-110 hover:rotate-2`}>
      {icon}
    </div>
  );
}