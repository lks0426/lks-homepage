'use client';

export interface DevicePerformance {
  level: 'high' | 'medium' | 'low';
  score: number;
  capabilities: {
    gpu: boolean;
    memory: number;
    cores: number;
    connection: string;
    battery: boolean;
  };
  recommendations: {
    enableParticles: boolean;
    enableParallax: boolean;
    enableComplexAnimations: boolean;
    animationDuration: number;
    performanceMode: 'high' | 'balanced' | 'minimal';
  };
}

/**
 * 检测设备性能 - 完全在客户端进行，不收集任何个人信息
 */
export async function detectDevicePerformance(): Promise<DevicePerformance> {
  if (typeof window === 'undefined') {
    return getDefaultPerformance();
  }

  const capabilities = await getDeviceCapabilities();
  const score = calculatePerformanceScore(capabilities);
  const level = getPerformanceLevel(score);
  const recommendations = getRecommendations(level, capabilities);

  return {
    level,
    score,
    capabilities,
    recommendations
  };
}

/**
 * 获取设备能力信息 - 仅使用浏览器公开API
 */
async function getDeviceCapabilities() {
  // GPU 加速检测
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const hasGPU = gl !== null;
  
  // 清理资源
  canvas.remove();

  // 内存检测（如果支持）
  const memory = (navigator as any).deviceMemory || estimateMemory();

  // CPU 核心数
  const cores = navigator.hardwareConcurrency || 4;

  // 网络连接类型
  const connection = getConnectionType();

  // 电池状态（移动设备优化）
  const battery = await getBatteryInfo();

  return {
    gpu: hasGPU,
    memory,
    cores,
    connection,
    battery
  };
}

/**
 * 估算内存大小（基于屏幕分辨率和设备类型）
 */
function estimateMemory(): number {
  const screen = window.screen;
  const pixelCount = screen.width * screen.height;
  const isMobile = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent);
  
  if (isMobile) {
    return pixelCount > 2000000 ? 6 : 4; // 高分屏移动设备通常有更多内存
  } else {
    if (pixelCount > 8000000) return 16; // 4K+ 显示器
    if (pixelCount > 4000000) return 8;  // 2K+ 显示器
    return 4; // 标准显示器
  }
}

/**
 * 获取网络连接类型
 */
function getConnectionType(): string {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (connection) {
    if (connection.effectiveType) return connection.effectiveType; // '4g', '3g', etc.
    if (connection.type) return connection.type;
  }
  
  return 'unknown';
}

/**
 * 获取电池信息（用于移动设备优化）
 */
async function getBatteryInfo(): Promise<boolean> {
  try {
    if ('getBattery' in navigator) {
      const battery = await (navigator as any).getBattery();
      return battery.charging || battery.level > 0.3; // 电量充足或正在充电
    }
  } catch {
    // 忽略错误
  }
  return true; // 默认假设电量充足
}

/**
 * 计算性能评分 (0-100)
 */
function calculatePerformanceScore(capabilities: any): number {
  let score = 0;

  // GPU 加速 (30%)
  score += capabilities.gpu ? 30 : 0;

  // 内存评分 (25%)
  if (capabilities.memory >= 8) score += 25;
  else if (capabilities.memory >= 6) score += 20;
  else if (capabilities.memory >= 4) score += 15;
  else score += 10;

  // CPU 核心数 (20%)
  if (capabilities.cores >= 8) score += 20;
  else if (capabilities.cores >= 4) score += 15;
  else if (capabilities.cores >= 2) score += 10;
  else score += 5;

  // 网络连接 (15%)
  switch (capabilities.connection) {
    case '4g':
    case 'wifi':
      score += 15;
      break;
    case '3g':
      score += 10;
      break;
    case '2g':
      score += 5;
      break;
    default:
      score += 12; // 未知连接假设为良好
  }

  // 电池状态 (10%)
  score += capabilities.battery ? 10 : 5;

  return Math.min(score, 100);
}

/**
 * 根据评分确定性能等级
 */
function getPerformanceLevel(score: number): 'high' | 'medium' | 'low' {
  if (score >= 75) return 'high';
  if (score >= 45) return 'medium';
  return 'low';
}

/**
 * 根据性能等级生成推荐设置
 */
function getRecommendations(
  level: 'high' | 'medium' | 'low', 
  capabilities: any
): DevicePerformance['recommendations'] {
  switch (level) {
    case 'high':
      return {
        enableParticles: true,
        enableParallax: true,
        enableComplexAnimations: true,
        animationDuration: 1.0,
        performanceMode: 'high'
      };
    
    case 'medium':
      return {
        enableParticles: capabilities.gpu, // 仅在有GPU加速时启用
        enableParallax: true,
        enableComplexAnimations: true,
        animationDuration: 0.8, // 稍微快一点
        performanceMode: 'balanced'
      };
    
    case 'low':
      return {
        enableParticles: false,
        enableParallax: false,
        enableComplexAnimations: false,
        animationDuration: 0.6, // 更快的动画
        performanceMode: 'minimal'
      };
  }
}

/**
 * 默认性能配置（服务端渲染时使用）
 */
function getDefaultPerformance(): DevicePerformance {
  return {
    level: 'medium',
    score: 60,
    capabilities: {
      gpu: true,
      memory: 4,
      cores: 4,
      connection: 'unknown',
      battery: true
    },
    recommendations: {
      enableParticles: true, // 默认开启
      enableParallax: true,
      enableComplexAnimations: true,
      animationDuration: 1.0,
      performanceMode: 'balanced' // 默认平衡模式，动画开启
    }
  };
}

/**
 * 性能测试（可选，用于更精确的检测）
 */
export async function performanceTest(): Promise<number> {
  return new Promise((resolve) => {
    let frames = 0;
    let startTime = performance.now();
    
    function countFrames() {
      frames++;
      const elapsed = performance.now() - startTime;
      
      if (elapsed < 1000) {
        requestAnimationFrame(countFrames);
      } else {
        const fps = Math.round((frames * 1000) / elapsed);
        resolve(fps);
      }
    }
    
    requestAnimationFrame(countFrames);
  });
}

/**
 * 获取设备信息摘要（用于调试，不包含隐私信息）
 */
export function getDeviceInfo() {
  if (typeof window === 'undefined') return null;
  
  return {
    userAgent: navigator.userAgent.split(' ')[0], // 只取第一部分
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    pixelRatio: window.devicePixelRatio,
    platform: navigator.platform,
    language: navigator.language
  };
}