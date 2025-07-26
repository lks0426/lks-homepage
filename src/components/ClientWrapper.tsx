'use client';

import { useEffect } from 'react';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 调用你的 webhook
    fetch('https://n8n.lks0426.com/webhook/track-visit')
      .then(() => console.log('📡 访问已记录'))
      .catch(err => console.error('❌ 记录访问失败', err));
  }, []);

  return <>{children}</>;
}
