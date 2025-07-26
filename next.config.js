/** @type {import('next').NextConfig} */
const nextConfig = {
  // 只在生产环境使用 static export
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // 只在生产环境设置 distDir
  distDir: process.env.NODE_ENV === 'production' ? 'out' : '.next',
  experimental: {
    optimizeCss: false
  }
}

module.exports = nextConfig