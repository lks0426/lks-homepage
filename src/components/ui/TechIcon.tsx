'use client';

import { ReactNode } from 'react';

interface TechIconProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// 现代专业技术图标映射
const techIcons: Record<string, ReactNode> = {
  // Frontend
  'React': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="2.5" fill="currentColor"/>
      <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1"/>
      <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="8" ry="3" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)"/>
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12 2c5.523 0 10 4.477 10 10 0 4.13-2.504 7.676-6.077 9.201l-2.518-4.357c.37-.149.717-.346 1.024-.587 1.206-.946 1.93-2.404 1.93-4.007V9.5h-1.5V12c0 1.008-.46 1.957-1.25 2.575-.79.618-1.84.925-2.92.925s-2.13-.307-2.92-.925C6.96 13.957 6.5 13.008 6.5 12V9.5H5v2.5c0 1.603.724 3.061 1.93 4.007.307.24.653.438 1.024.587L5.436 21.201C2.504 19.676 0 16.13 0 12 0 6.477 4.477 2 12 2z" fill="currentColor"/>
    </svg>
  ),
  'TypeScript': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor"/>
      <path d="M8.5 8.5h7v1.5h-2.75v8h-1.5v-8H8.5V8.5zm6 3.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v4c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5v-4z" fill="white"/>
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.75 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.75-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.75 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.75-1.91-1.35C10.61 13.15 9.47 12 7 12z" fill="currentColor"/>
    </svg>
  ),
  'Vue.js': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M19.114 5.636h-4.228L12 10.302 9.114 5.636H4.886L12 18.364l7.114-12.728zM2 5.636h2.886l7.114 12.728L19.114 5.636H22L12 22 2 5.636z" fill="currentColor"/>
    </svg>
  ),
  
  // Backend
  'Node.js': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M11.998 24c-.321 0-.641-.084-.922-.247l-2.936-1.737c-.438-.245-.224-.331-.08-.381.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.197.045.272 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.192-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L2.46 6.681c-.085.05-.139.145-.139.24v10.148c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-0.89V7.787c0-.142.114-.253.253-.253h1.103c.139 0 .252.112.252.253v10.021c0 1.745-.95 2.745-2.604 2.745-.508 0-.898 0-2.004-.547L2.204 18.665c-.57-.329-.922-.944-.922-1.604V6.921c0-.659.353-1.275.922-1.603L11.076.242C11.657-.08 12.342-.08 12.922.242l8.795 5.076c.57.328.923.944.923 1.603v10.14c0 .659-.353 1.273-.923 1.604l-8.795 5.076c-.28.163-.601.247-.922.247z" fill="currentColor"/>
    </svg>
  ),
  'Python': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M14.31.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13L16.38 3l-.05.33-.13.33-.21.29-.3.26-.38.21-.48.15-.57.09-.63.03-.58-.06-.5-.15-.42-.26-.34-.37-.25-.45-.17-.51-.1-.56-.04-.59.05-.63.13-.63.25-.57.38-.47.48-.32.57-.17.63-.04.63.05.57.15.5.26.38.38.25.47.15.56.04.61-.05.65zm-8.39.49l.07.75c.05.31.15.62.3.91l.2.36.32.36.42.31.55.24.64.15.73.04.77-.04.71-.12.62-.19.52-.27.4-.34.28-.4.17-.46.07-.51v-.18l-.02-.2-.06-.21-.12-.2-.2-.17-.28-.12-.38-.07-.46-.02-.56.02-.64.07-.7.14-.75.23-.77.34-.74.46-.66.6-.51.73-.29.85-.02.89.15.85.37.74.66.56.97.28 1.25-.15.62-.34.28-.48-.05-.57-.32-.53-.66-.33-1.05.02-.94.32-.66.7-.22 1.13.28.92.85.42 1.57-.43.92-1.39.27-2.17-.9-1.31-2.35.44-1.78 2.36-.12 1.04-.79.4-.98-.23-.86-.84-.4-1.53.4-1.63 1.39-.32 2.16.86 1.34 2.32-.39 1.82" fill="currentColor"/>
    </svg>
  ),
  'FastAPI': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 10h8M8 14h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="10" r="1" fill="currentColor"/>
    </svg>
  ),
  
  // AI
  'OpenAI': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z" fill="currentColor"/>
      <path d="M12 2v4M12 18v4M22 12h-4M6 12H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'Claude': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 8h8M8 12h6M8 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  
  // Cloud
  'AWS': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M6.5 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-5.5-4c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z" fill="currentColor"/>
      <path d="M3 6h18v2H3zM3 16h18v2H3z" fill="currentColor"/>
    </svg>
  ),
  'Docker': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="2" y="8" width="3" height="3" fill="currentColor"/>
      <rect x="6" y="8" width="3" height="3" fill="currentColor"/>
      <rect x="10" y="8" width="3" height="3" fill="currentColor"/>
      <rect x="14" y="8" width="3" height="3" fill="currentColor"/>
      <rect x="6" y="5" width="3" height="2" fill="currentColor"/>
      <rect x="10" y="5" width="3" height="2" fill="currentColor"/>
      <path d="M18 11c-1 0-1.8-.4-2.4-1.1-.3.7-.9 1.1-1.6 1.1H2c0 3.3 2.7 6 6 6h8c3.3 0 6-2.7 6-6h-4z" fill="currentColor"/>
    </svg>
  ),
  
  // Additional Tech Icons
  'Express.js': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M2 12h20M2 8h20M2 16h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="6" cy="12" r="1" fill="currentColor"/>
      <circle cx="18" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  'MongoDB': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12 2C8.2 2 5.2 5.6 5.2 10c0 4.4 3 8 6.8 8s6.8-3.6 6.8-8c0-4.4-3-8-6.8-8z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 6v12M8 8c0 4 2 6 4 6s4-2 4-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'PostgreSQL': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 10h8M8 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="8" cy="12" r="1" fill="currentColor"/>
      <circle cx="16" cy="12" r="1" fill="currentColor"/>
    </svg>
  ),
  'Framer Motion': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M6 2l6 6-6 6 6 6h6l-6-6 6-6H6z" fill="currentColor"/>
    </svg>
  ),
  'LangChain': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="6" r="1.5" fill="currentColor"/>
      <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
      <circle cx="6" cy="18" r="1.5" fill="currentColor"/>
    </svg>
  ),
  'Ollama': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="8" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 14v6M8 18h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 11c0 1.5 1.34 3 3 3s3-1.5 3-3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  'RAG': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="3" y="4" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M7 8h10M7 12h8M7 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  'VectorDB': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="6" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 6l6 12M15 6L9 18" stroke="currentColor" strokeWidth="1"/>
    </svg>
  ),
  'GitHub': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="currentColor"/>
    </svg>
  ),
  'Vercel': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path d="M12 2L2 22h20L12 2z" fill="currentColor"/>
    </svg>
  ),
  'Nginx': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="2" y="6" width="20" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 10h12M6 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="18" cy="10" r="1" fill="currentColor"/>
    </svg>
  ),
  'PM2': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
  ),
};

// 获取尺寸类名 - 优化的一致性尺寸
const getSizeClass = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm': return 'w-5 h-5';
    case 'md': return 'w-6 h-6';
    case 'lg': return 'w-8 h-8';
    default: return 'w-6 h-6';
  }
};

export default function TechIcon({ name, size = 'md', className = '' }: TechIconProps) {
  const icon = techIcons[name];
  
  if (!icon) {
    // 如果没有找到图标，使用首字母作为后备
    return (
      <div className={`${getSizeClass(size)} ${className} flex items-center justify-center bg-gray-200 rounded text-gray-600 text-xs font-bold transition-all duration-200 hover:scale-110 hover:bg-gray-300`}>
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <div className={`${getSizeClass(size)} ${className} text-current transition-all duration-200 hover:scale-110 hover:rotate-3`}>
      {icon}
    </div>
  );
}