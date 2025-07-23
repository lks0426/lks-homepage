# 多阶段构建 - Node.js 静态网站部署
FROM node:18-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制package文件
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建静态网站
RUN npm run build

# 生产阶段 - Nginx服务器
FROM nginx:alpine AS production

# 复制nginx配置
COPY nginx.conf /etc/nginx/nginx.conf

# 复制构建的静态文件
COPY --from=builder /app/out /usr/share/nginx/html

# 暴露80端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]