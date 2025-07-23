'use client';

import { ReactNode } from 'react';

interface AIIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// 专业AI工具和服务图标映射
const aiIcons: Record<string, ReactNode> = {
  // AI开发工具图标
  'Claude Code': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="2" y="3" width="20" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 21V7a1 1 0 011-1h6a1 1 0 011 1v14" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="1" fill="currentColor"/>
      <circle cx="14" cy="10" r="1" fill="currentColor"/>
      <path d="M9 14c0 1.5 1.34 3 3 3s3-1.5 3-3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 17v4M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'Cursor': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8h10M7 12h8M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M3 8h18" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="6" cy="6" r="0.5" fill="currentColor"/>
      <circle cx="8" cy="6" r="0.5" fill="currentColor"/>
      <circle cx="10" cy="6" r="0.5" fill="currentColor"/>
      <path d="M15 14l2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  'SuperClaude': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 1v6M12 17v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.22 4.22l4.24 4.24M15.54 15.54l4.24 4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M1 12h6M17 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M4.22 19.78l4.24-4.24M15.54 8.46l4.24-4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="8" r="1" fill="currentColor"/>
      <circle cx="12" cy="16" r="1" fill="currentColor"/>
      <circle cx="8" cy="12" r="1" fill="currentColor"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  'Ollama': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M6 3a3 3 0 013-3h6a3 3 0 013 3v6a3 3 0 01-3 3v3a3 3 0 01-3 3H9a3 3 0 01-3-3v-3a3 3 0 01-3-3V3z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="7" r="1" fill="currentColor"/>
      <circle cx="14" cy="7" r="1" fill="currentColor"/>
      <path d="M9 11c0 1.5 1.34 3 3 3s3-1.5 3-3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 15v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'n8n': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="6" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 6h6M6 9l6 6M18 9l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="6" r="1" fill="currentColor"/>
      <circle cx="18" cy="6" r="1" fill="currentColor"/>
      <circle cx="12" cy="18" r="1" fill="currentColor"/>
    </svg>
  ),
  'AnythingLLM': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M4 19.5A2.5 2.5 0 016.5 22H20a2 2 0 002-2V4a2 2 0 00-2-2H6.5A2.5 2.5 0 004 4.5v15z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 7h8M8 11h6M8 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="7" r="1.5" fill="currentColor"/>
      <path d="M16 11c0 1 .5 2 2 2s2-1 2-2-1-2-2-2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),

  // AI服务图标
  'OCR文字识别': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8v1M12 15v1M8 12h1M15 12h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
      <path d="M7 7h2M15 7h2M7 17h2M15 17h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  '代码生成服务': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 9l3 3-3 3M13 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="20" cy="4" r="1.5" fill="currentColor"/>
      <path d="M3 9h18" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  '文档总结': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <polyline points="10,9 9,10 10,11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="6" r="2" fill="currentColor"/>
    </svg>
  ),
  'AI翻译服务': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M5 8l6 6M4 14l6-6M2 2l20 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 4c1 0 2.5 1 2.5 2.5S16 9 15 9c-1.5 0-2-1-2-2.5S13 4 14 4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M13.5 15.5c0-2 1.5-3.5 3.5-3.5s3.5 1.5 3.5 3.5-1.5 3.5-3.5 3.5-3.5-1.5-3.5-3.5z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M17 12v7M14 15.5h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  '智能客服开发': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="9" cy="11" r="1" fill="currentColor"/>
      <circle cx="15" cy="11" r="1" fill="currentColor"/>
      <path d="M9 15c1.5 1 3.5 1 5 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="6" r="2" fill="currentColor"/>
    </svg>
  ),
  '数据分析服务': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M3 3v18h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 8h2.7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="14" r="1" fill="currentColor"/>
      <circle cx="11" cy="11" r="1" fill="currentColor"/>
      <circle cx="13" cy="13" r="1" fill="currentColor"/>
      <circle cx="18" cy="8" r="1" fill="currentColor"/>
    </svg>
  ),

  // 默认AI图标
  'default-ai': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 2v4M12 18v4M22 12h-4M6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
};

// 根据名称获取合适的AI图标
const getAIIcon = (name: string): ReactNode => {
  // 首先尝试精确匹配
  if (aiIcons[name]) {
    return aiIcons[name];
  }
  
  // 然后根据关键词匹配
  const lowerName = name.toLowerCase();
  
  if (lowerName.includes('claude')) {
    if (lowerName.includes('code')) return aiIcons['Claude Code'];
    if (lowerName.includes('super')) return aiIcons['SuperClaude'];
  }
  
  if (lowerName.includes('cursor')) return aiIcons['Cursor'];
  if (lowerName.includes('ollama')) return aiIcons['Ollama'];
  if (lowerName.includes('n8n')) return aiIcons['n8n'];
  if (lowerName.includes('anything') || lowerName.includes('llm')) return aiIcons['AnythingLLM'];
  
  if (lowerName.includes('ocr') || lowerName.includes('识别')) return aiIcons['OCR文字识别'];
  if (lowerName.includes('代码') || lowerName.includes('code')) return aiIcons['代码生成服务'];
  if (lowerName.includes('文档') || lowerName.includes('总结')) return aiIcons['文档总结'];
  if (lowerName.includes('翻译') || lowerName.includes('translation')) return aiIcons['AI翻译服务'];
  if (lowerName.includes('客服') || lowerName.includes('chatbot')) return aiIcons['智能客服开发'];
  if (lowerName.includes('数据') || lowerName.includes('分析')) return aiIcons['数据分析服务'];
  
  // 默认AI图标
  return aiIcons['default-ai'];
};

// 获取尺寸类名
const getSizeClass = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return 'w-5 h-5';
    case 'md': return 'w-6 h-6';
    case 'lg': return 'w-8 h-8';
    default: return 'w-6 h-6';
  }
};

export default function AIIcon({ name, size = 'md', className = '' }: AIIconProps) {
  const icon = getAIIcon(name);
  
  return (
    <div className={`${getSizeClass(size)} ${className} text-current transition-all duration-200 hover:scale-110 hover:rotate-2`}>
      {icon}
    </div>
  );
}