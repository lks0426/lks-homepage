'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout;

    const handleScroll = () => {
      // 如果正在导航中，跳过滚动监听
      if (isNavigating) return;

      // 防抖：等待滚动停止后再检测
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const sections = ['home', 'portfolio', 'tech-stack', 'ai-tools', 'ai-services', 'learning'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetBottom = offsetTop + element.offsetHeight;

            if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
              setActiveSection(section);
              break;
            }
          }
        }
      }, 100); // 100ms 防抖
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isNavigating]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsNavigating(true);
    
    // 1秒后重新启用滚动监听（smooth scroll 通常在 500-800ms 内完成）
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
      
      {/* 主内容区域 - 在大屏幕上考虑侧边栏宽度 */}
      <main className="min-h-screen transition-all duration-300 lg:ml-64">
        {/* 内容容器 - 最大宽度并居中 */}
        <div className="mx-auto max-w-7xl">
          {children}
        </div>
      </main>
    </div>
  );
}