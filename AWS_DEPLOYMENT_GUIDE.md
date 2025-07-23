# LKS个人主页 - AWS CI/CD部署指南

## 架构概览
```
GitHub → CodePipeline → CodeBuild → ECR → ECS → ALB → lks0426.com
```

## 第一阶段：GitHub仓库设置

### 1. 创建GitHub仓库
```bash
# 在GitHub上创建新仓库：lks-homepage
# 然后在本地关联：
git remote add origin https://github.com/lks0426/lks-homepage.git
git branch -M main
git add .
git commit -m "Initial commit: LKS个人主页"
git push -u origin main
```

### 2. 项目文件结构确认
```
lks-homepage/
├── src/                    # Next.js源代码
├── public/                # 静态资源
├── package.json           # 依赖配置
├── next.config.js         # Next.js配置
├── Dockerfile             # Docker构建文件
├── nginx.conf             # Nginx配置
├── buildspec.yml          # CodeBuild构建规范
├── .dockerignore         # Docker忽略文件
└── AWS_DEPLOYMENT_GUIDE.md # 部署指南
```

## 第二阶段：AWS基础设施创建

### 1. 创建ECR仓库
```bash
aws ecr create-repository --repository-name lks-homepage --region us-east-1

# 记录输出的repositoryUri，例如：
# 123456789012.dkr.ecr.us-east-1.amazonaws.com/lks-homepage
```

### 2. 创建ECS任务定义
创建文件 `task-definition.json`：
```json
{
  "family": "lks-homepage-task",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "lks-homepage-container",
      "image": "ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/lks-homepage:latest",
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
          "awslogs-group": "/ecs/lks-homepage",
          "awslogs-region": "us-east-1",
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
```

### 3. 创建CloudWatch日志组
```bash
aws logs create-log-group --log-group-name /ecs/lks-homepage --region us-east-1
```

### 4. 创建ECS集群
```bash
aws ecs create-cluster --cluster-name lks-homepage-cluster --region us-east-1
```

### 5. 创建ECS服务
```bash
# 首先注册任务定义
aws ecs register-task-definition --cli-input-json file://task-definition.json

# 创建服务（需要替换子网ID和安全组ID）
aws ecs create-service \
  --cluster lks-homepage-cluster \
  --service-name lks-homepage-service \
  --task-definition lks-homepage-task \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx,subnet-yyyyy],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}" \
  --load-balancers targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:ACCOUNT_ID:targetgroup/lks-homepage-tg/xxxxx,containerName=lks-homepage-container,containerPort=80
```

## 第三阶段：ALB配置

### 1. 创建目标组
```bash
aws elbv2 create-target-group \
  --name lks-homepage-tg \
  --protocol HTTP \
  --port 80 \
  --vpc-id vpc-xxxxx \
  --target-type ip \
  --health-check-path /health \
  --health-check-interval-seconds 30 \
  --health-check-timeout-seconds 5 \
  --healthy-threshold-count 2 \
  --unhealthy-threshold-count 3
```

### 2. 更新ALB监听器规则
```bash
# 添加新的规则，优先级设为最高（1）
aws elbv2 create-rule \
  --listener-arn arn:aws:elasticloadbalancing:us-east-1:ACCOUNT_ID:listener/app/your-alb/xxxxx/xxxxx \
  --priority 1 \
  --conditions Field=host-header,Values=lks0426.com \
  --actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:ACCOUNT_ID:targetgroup/lks-homepage-tg/xxxxx
```

## 第四阶段：CI/CD流水线

### 1. 创建CodeBuild服务角色
创建角色策略文档 `codebuild-service-role.json`：
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

创建角色权限策略 `codebuild-service-policy.json`：
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetDownloadUrlForLayer",
        "ecr:GetRepositoryPolicy",
        "ecr:DescribeRepositories",
        "ecr:ListImages",
        "ecr:DescribeImages",
        "ecr:BatchGetImage",
        "ecr:GetAuthorizationToken",
        "ecr:InitiateLayerUpload",
        "ecr:UploadLayerPart",
        "ecr:CompleteLayerUpload",
        "ecr:PutImage"
      ],
      "Resource": "*"
    }
  ]
}
```

### 2. 创建CodeBuild项目
```bash
# 创建服务角色
aws iam create-role --role-name CodeBuildServiceRole --assume-role-policy-document file://codebuild-service-role.json
aws iam put-role-policy --role-name CodeBuildServiceRole --policy-name CodeBuildServicePolicy --policy-document file://codebuild-service-policy.json

# 创建CodeBuild项目
aws codebuild create-project \
  --name lks-homepage-build \
  --service-role arn:aws:iam::ACCOUNT_ID:role/CodeBuildServiceRole \
  --artifacts type=CODEPIPELINE \
  --environment type=LINUX_CONTAINER,image=aws/codebuild/amazonlinux2-x86_64-standard:3.0,computeType=BUILD_GENERAL1_MEDIUM,privilegedMode=true \
  --source type=CODEPIPELINE,buildspec=buildspec.yml \
  --environment-variables '[
    {"name":"AWS_DEFAULT_REGION","value":"us-east-1"},
    {"name":"REPOSITORY_URI","value":"ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/lks-homepage"},
    {"name":"IMAGE_REPO_NAME","value":"lks-homepage"}
  ]'
```

### 3. 创建CodePipeline
创建CodePipeline服务角色和策略后，创建流水线：
```bash
aws codepipeline create-pipeline --cli-input-json file://pipeline.json
```

pipeline.json 内容：
```json
{
  "pipeline": {
    "name": "lks-homepage-pipeline",
    "roleArn": "arn:aws:iam::ACCOUNT_ID:role/CodePipelineServiceRole",
    "artifactStore": {
      "type": "S3",
      "location": "your-codepipeline-artifacts-bucket"
    },
    "stages": [
      {
        "name": "Source",
        "actions": [
          {
            "name": "SourceAction",
            "actionTypeId": {
              "category": "Source",
              "owner": "ThirdParty",
              "provider": "GitHub",
              "version": "1"
            },
            "configuration": {
              "Owner": "lks0426",
              "Repo": "lks-homepage",
              "Branch": "main",
              "OAuthToken": "your-github-token"
            },
            "outputArtifacts": [{"name": "SourceOutput"}]
          }
        ]
      },
      {
        "name": "Build",
        "actions": [
          {
            "name": "BuildAction",
            "actionTypeId": {
              "category": "Build",
              "owner": "AWS",
              "provider": "CodeBuild",
              "version": "1"
            },
            "configuration": {
              "ProjectName": "lks-homepage-build"
            },
            "inputArtifacts": [{"name": "SourceOutput"}],
            "outputArtifacts": [{"name": "BuildOutput"}]
          }
        ]
      },
      {
        "name": "Deploy",
        "actions": [
          {
            "name": "DeployAction",
            "actionTypeId": {
              "category": "Deploy",
              "owner": "AWS",
              "provider": "ECS",
              "version": "1"
            },
            "configuration": {
              "ClusterName": "lks-homepage-cluster",
              "ServiceName": "lks-homepage-service"
            },
            "inputArtifacts": [{"name": "BuildOutput"}]
          }
        ]
      }
    ]
  }
}
```

## 环境变量配置

### CodeBuild环境变量
- `AWS_DEFAULT_REGION`: us-east-1
- `REPOSITORY_URI`: ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/lks-homepage
- `IMAGE_REPO_NAME`: lks-homepage

## 部署流程

1. **推送代码到GitHub**
   ```bash
   git add .
   git commit -m "更新个人主页"
   git push origin main
   ```

2. **自动触发流水线**
   - CodePipeline 检测到 GitHub 变更
   - 自动拉取最新代码

3. **构建阶段**
   - CodeBuild 执行 buildspec.yml
   - 构建 Docker 镜像
   - 推送到 ECR

4. **部署阶段**
   - ECS 使用新镜像更新服务
   - 滚动更新，确保零停机

5. **访问网站**
   - https://lks0426.com

## 监控和故障排除

### CloudWatch 监控
- ECS 服务指标
- ALB 目标组健康状态
- CodeBuild 构建日志
- 应用程序日志

### 常见问题排查
1. **构建失败**: 检查 CodeBuild 日志
2. **部署失败**: 检查 ECS 服务事件
3. **健康检查失败**: 检查目标组和容器健康状态
4. **域名访问问题**: 检查 ALB 规则配置

## 成本估算

### 月度成本预估（us-east-1）
- **ECS Fargate**: ~$10-15（0.25 vCPU, 0.5 GB 内存，2个任务）
- **ALB**: ~$16（已存在，共享成本）
- **ECR**: ~$1（镜像存储）
- **CodeBuild**: ~$2-5（构建时间）
- **数据传输**: ~$1-3

**总计**: ~$30-40/月

## 安全考虑

1. **IAM 最小权限原则**
2. **ECR 镜像扫描**
3. **ECS 任务安全组配置**
4. **ALB 安全组限制**
5. **CloudWatch 日志加密**

## 扩展性

- **水平扩展**: 增加 ECS 任务数量
- **垂直扩展**: 增加任务 CPU/内存
- **多区域部署**: 复制架构到其他区域
- **CDN 集成**: 添加 CloudFront 分发

---

**准备就绪后，请按照第一阶段开始设置GitHub仓库！** 🚀