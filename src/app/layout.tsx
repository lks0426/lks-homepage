import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AnimationProvider from '@/components/providers/AnimationProvider'
import ClientWrapper from '@/components/ClientWrapper';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'LKS - AI技术专家 | 个人作品集',
  description: 'AI技术专家LKS的个人作品集网站，展示AI开发、全栈技术和创新项目。专注于AI应用开发、智能系统构建和现代Web技术。',
  keywords: 'AI开发,全栈开发,Next.js,React,TypeScript,OpenAI,Claude,机器学习,Web开发',
  authors: [{ name: 'LKS' }],
  creator: 'LKS',
  publisher: 'LKS',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://lks0426.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LKS - AI技术专家 | 个人作品集',
    description: 'AI技术专家LKS的个人作品集，展示AI开发能力和技术项目',
    url: 'https://lks0426.com',
    siteName: 'LKS Portfolio',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'LKS - AI技术专家',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LKS - AI技术专家 | 个人作品集',
    description: 'AI技术专家LKS的个人作品集，展示AI开发能力和技术项目',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={`${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        <AnimationProvider>
          <ClientWrapper>
            <div id="root">{children}</div>
          </ClientWrapper>
        </AnimationProvider>
      </body>
    </html>
  )
}