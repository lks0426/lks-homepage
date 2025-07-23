'use client';

import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/modules/Hero';
import Portfolio from '@/components/modules/Portfolio';
import TechStack from '@/components/modules/TechStack';
import AITools from '@/components/modules/AITools';
import AIServices from '@/components/modules/AIServices';
import LearningJourney from '@/components/modules/LearningJourney';
import SimpleParticles from '@/components/ui/SimpleParticles';
import FloatingElement from '@/components/ui/FloatingElement';
import { usePerformanceGating } from '@/hooks/useAdaptiveAnimations';

export default function Home() {
  const { shouldRender: showDecorative } = usePerformanceGating('decorative');
  const { shouldRender: showComplex } = usePerformanceGating('complex');
  
  return (
    <MainLayout>
      <div className="relative">
        {/* Background Gradient */}
        <div className="fixed inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary -z-10" />
        
        {/* Enhanced Background Elements */}
        {showDecorative && (
          <div className="fixed inset-0 overflow-hidden -z-10">
            {/* Animated gradient orbs */}
            {showComplex && (
              <>
                <FloatingElement delay={0} amplitude={30} duration={4} direction="circular">
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial opacity-20 rounded-full blur-3xl" />
                </FloatingElement>
                
                <FloatingElement delay={2} amplitude={25} duration={5} direction="up">
                  <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-primary-purple/10 to-primary-pink/10 rounded-full blur-2xl" />
                </FloatingElement>
                
                <FloatingElement delay={4} amplitude={35} duration={6} direction="left">
                  <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-primary-cyan/8 to-primary-blue/8 rounded-full blur-xl" />
                </FloatingElement>
              </>
            )}
            
            {/* Static particle background */}
            <SimpleParticles />
            
            {/* Additional ambient elements */}
            {showDecorative && (
              <>
                <div className="absolute top-10 right-10 w-32 h-32 bg-primary-indigo/5 rounded-full blur-lg animate-bounce-gentle" />
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-primary-emerald/5 rounded-full blur-lg animate-float" />
              </>
            )}
          </div>
        )}

        {/* Page Sections */}
        <Hero />
        <Portfolio />
        <TechStack />
        <AITools />
        <AIServices />
        <LearningJourney />
        
        {/* Footer */}
        <footer className="py-8 px-8 border-t border-glass-border">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-text-muted text-sm">
              © 2024 LKS. Built with Next.js, React, TypeScript, and <span className="text-accent-error">love</span>
            </p>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
}