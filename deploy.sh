#!/bin/bash

# LKS个人主页 - AWS部署快速启动脚本
# 使用方法: ./deploy.sh

set -e

echo "🚀 LKS个人主页 - AWS CI/CD部署开始..."

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 检查必要的工具
echo -e "${BLUE}检查必要工具...${NC}"
command -v aws >/dev/null 2>&1 || { echo -e "${RED}错误: AWS CLI 未安装${NC}" >&2; exit 1; }
command -v git >/dev/null 2>&1 || { echo -e "${RED}错误: Git 未安装${NC}" >&2; exit 1; }

# 获取AWS账户ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}AWS账户ID: ${ACCOUNT_ID}${NC}"

# 设置变量
REGION="us-east-1"
REPO_NAME="lks-homepage"
CLUSTER_NAME="lks-homepage-cluster"
SERVICE_NAME="lks-homepage-service"
TASK_FAMILY="lks-homepage-task"

echo -e "${YELLOW}配置信息:${NC}"
echo -e "  区域: ${REGION}"
echo -e "  ECR仓库: ${REPO_NAME}"
echo -e "  ECS集群: ${CLUSTER_NAME}"
echo -e "  ECS服务: ${SERVICE_NAME}"

# 第一步：创建ECR仓库
echo -e "${BLUE}步骤 1/6: 创建ECR仓库...${NC}"
aws ecr describe-repositories --repository-names ${REPO_NAME} --region ${REGION} >/dev/null 2>&1 || {
  echo "创建ECR仓库: ${REPO_NAME}"
  aws ecr create-repository --repository-name ${REPO_NAME} --region ${REGION}
}
REPOSITORY_URI="${ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${REPO_NAME}"
echo -e "${GREEN}ECR仓库URI: ${REPOSITORY_URI}${NC}"

# 第二步：创建CloudWatch日志组
echo -e "${BLUE}步骤 2/6: 创建CloudWatch日志组...${NC}"
aws logs describe-log-groups --log-group-name-prefix "/ecs/${REPO_NAME}" --region ${REGION} | grep -q "${REPO_NAME}" || {
  echo "创建CloudWatch日志组"
  aws logs create-log-group --log-group-name "/ecs/${REPO_NAME}" --region ${REGION}
}

# 第三步：创建ECS集群
echo -e "${BLUE}步骤 3/6: 创建ECS集群...${NC}"
aws ecs describe-clusters --clusters ${CLUSTER_NAME} --region ${REGION} >/dev/null 2>&1 || {
  echo "创建ECS集群: ${CLUSTER_NAME}"
  aws ecs create-cluster --cluster-name ${CLUSTER_NAME} --region ${REGION}
}

# 第四步: 创建任务定义文件
echo -e "${BLUE}步骤 4/6: 创建ECS任务定义...${NC}"
cat > task-definition.json << EOF
{
  "family": "${TASK_FAMILY}",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::${ACCOUNT_ID}:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "lks-homepage-container",
      "image": "${REPOSITORY_URI}:latest",
      "portMappings": [
        {
          "containerPort": 80,
          "protocol": "tcp"
        }
      ],
      "essential": true,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/${REPO_NAME}",
          "awslogs-region": "${REGION}",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
EOF

# 注册任务定义
aws ecs register-task-definition --cli-input-json file://task-definition.json --region ${REGION}

# 第五步：构建并推送初始镜像
echo -e "${BLUE}步骤 5/6: 构建并推送初始Docker镜像...${NC}"
echo "登录到ECR..."
aws ecr get-login-password --region ${REGION} | docker login --username AWS --password-stdin ${REPOSITORY_URI}

echo "构建Docker镜像..."
docker build -t ${REPO_NAME}:latest .
docker tag ${REPO_NAME}:latest ${REPOSITORY_URI}:latest

echo "推送镜像到ECR..."
docker push ${REPOSITORY_URI}:latest

# 第六步：输出后续配置信息
echo -e "${BLUE}步骤 6/6: 部署完成，输出配置信息...${NC}"

echo -e "${GREEN}✅ 基础设施创建完成！${NC}"
echo ""
echo -e "${YELLOW}📋 接下来需要手动配置:${NC}"
echo ""
echo -e "${BLUE}1. 创建目标组:${NC}"
echo "   aws elbv2 create-target-group \\"
echo "     --name lks-homepage-tg \\"
echo "     --protocol HTTP \\"
echo "     --port 80 \\"
echo "     --vpc-id YOUR_VPC_ID \\"
echo "     --target-type ip \\"
echo "     --health-check-path /health"
echo ""
echo -e "${BLUE}2. 创建ECS服务:${NC}"
echo "   aws ecs create-service \\"
echo "     --cluster ${CLUSTER_NAME} \\"
echo "     --service-name ${SERVICE_NAME} \\"
echo "     --task-definition ${TASK_FAMILY} \\"
echo "     --desired-count 2 \\"
echo "     --launch-type FARGATE \\"
echo "     --network-configuration 'awsvpcConfiguration={subnets=[YOUR_SUBNET_1,YOUR_SUBNET_2],securityGroups=[YOUR_SECURITY_GROUP],assignPublicIp=ENABLED}' \\"
echo "     --load-balancers targetGroupArn=YOUR_TARGET_GROUP_ARN,containerName=lks-homepage-container,containerPort=80"
echo ""
echo -e "${BLUE}3. 配置ALB规则:${NC}"
echo "   aws elbv2 create-rule \\"
echo "     --listener-arn YOUR_LISTENER_ARN \\"
echo "     --priority 1 \\"
echo "     --conditions Field=host-header,Values=lks0426.com \\"
echo "     --actions Type=forward,TargetGroupArn=YOUR_TARGET_GROUP_ARN"
echo ""
echo -e "${BLUE}4. 设置CodePipeline:${NC}"
echo "   - 创建GitHub连接"
echo "   - 配置CodeBuild项目"
echo "   - 创建完整的CI/CD流水线"
echo ""
echo -e "${GREEN}📚 详细配置请参考: AWS_DEPLOYMENT_GUIDE.md${NC}"
echo ""
echo -e "${YELLOW}🚀 镜像已推送到: ${REPOSITORY_URI}:latest${NC}"

# 清理临时文件
rm -f task-definition.json

echo -e "${GREEN}🎉 部署脚本执行完成！${NC}"