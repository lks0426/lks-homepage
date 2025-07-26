'use client';

import { motion } from 'framer-motion';
import { MessageCircle, CheckCircle, Handshake, ClipboardList, Zap, Wrench } from 'lucide-react';
import { aiServices } from '@/data';
import GlassCard from '@/components/ui/GlassCard';
import Button from '@/components/ui/Button';
import AIIcon from '@/components/ui/AIIcon';

export default function AIServices() {
  const handleContact = () => {
    window.location.href = 'mailto:lks0426aa@gmail.com?subject=AI服务咨询';
  };

  return (
    <section id="ai-services" className="min-h-screen py-20 px-8">
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
            AI服务<span className="text-accent-success">中心</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            提供专业的AI服务解决方案，满足不同业务场景需求
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {aiServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <GlassCard className="p-12 text-center" variant="primary">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <Handshake className="w-12 h-12 text-accent-success" />
              </div>
              <h3 className="text-3xl font-bold mb-4">
                需要定制化AI解决方案？
              </h3>
              <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                我提供从需求分析到产品交付的全流程AI服务。
                无论是企业级AI应用还是个人项目，都能为您提供专业的技术支持。
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <ClipboardList className="w-8 h-8 text-primary-blue" />
                  </div>
                  <h4 className="font-semibold mb-1">需求分析</h4>
                  <p className="text-sm text-text-secondary">
                    深入了解业务需求，制定技术方案
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Zap className="w-8 h-8 text-primary-purple" />
                  </div>
                  <h4 className="font-semibold mb-1">快速开发</h4>
                  <p className="text-sm text-text-secondary">
                    采用敏捷开发模式，快速交付
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <Wrench className="w-8 h-8 text-primary-cyan" />
                  </div>
                  <h4 className="font-semibold mb-1">持续维护</h4>
                  <p className="text-sm text-text-secondary">
                    提供技术支持和系统维护服务
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleContact}
                icon={<MessageCircle size={20} />}
              >
                联系咨询
              </Button>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: typeof aiServices[0] }) {
  const handleContact = () => {
    window.location.href = `mailto:lks0426aa@gmail.com?subject=${service.name}咨询&body=您好，我对${service.name}服务很感兴趣，希望了解更多详情。`;
  };

  return (
    <GlassCard className="p-6 h-full flex flex-col" variant="primary">
      {/* Service Header */}
      <div className="flex items-start gap-4 mb-4">
        <AIIcon name={service.icon} size="lg" className="text-primary-cyan mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-text-primary mb-1">
            {service.name}
          </h3>
          {service.pricing && (
            <div className="text-sm text-primary-blue font-medium">
              {service.pricing}
            </div>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-text-secondary text-sm mb-6 leading-relaxed">
        {service.description}
      </p>

      {/* Features */}
      <div className="mb-6 flex-1">
        <h4 className="text-sm font-medium text-text-primary mb-3">服务特性</h4>
        <div className="space-y-2">
          {service.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-2 text-sm text-text-secondary"
            >
              <CheckCircle className="w-4 h-4 text-accent-success" />
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Action */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <Button
          variant="primary"
          size="md"
          onClick={handleContact}
          className="w-full"
          icon={<MessageCircle size={16} />}
        >
          咨询服务
        </Button>
      </div>
    </GlassCard>
  );
}