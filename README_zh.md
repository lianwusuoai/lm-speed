中文 | [English](README.md)

# LM Speed - 简单的大模型测速分析工具

传送门：<https://lmspeed.net>

为 AI 应用开发者提供精准可靠的 OpenAI API 性能测试解决方案，通过多维度的实时数据分析，帮助用户快速定位性能瓶颈，优化模型调用策略。同时提供直观的排行榜功能，让用户能够轻松比较和选择最适合的模型和服务商。

![picture-2025-02-12-20-21-28](https://vscode-markdown.s3.bitiful.net/eba9b5e1e200dd0c5504914243d1d6247eb4a16c2c20f87adfe11244ff9668c7.png)  

## 功能特点 | Features

- 🚀 实时性能监控：支持多维度数据实时展示
- 📊 全面性能评估：覆盖首字延迟、响应时间等核心指标
- 📈 数据可视化：丰富的图表展示，直观把握性能趋势
- 🔄 自动化测试：五轮连续压力测试，确保数据可靠性
- 📝 一键报告：自动生成专业测试报告，支持导出分享

## 快速开始 | Quick Start

### 使用 Docker Compose 部署

```yaml
version: '3.8'

services:
  app:
    image: nexmoe/lmspeed:latest
    ports:
      - "8650:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/nexmoe
      - NODE_ENV=production
    depends_on:
      - db
    restart: always

  db:
    image: postgres:16
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: nexmoe
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### 手动部署

1. 克隆仓库

```bash
git clone https://github.com/yourusername/lm-speed.git
cd lm-speed
```

2. 安装依赖

```bash
npm install
```

3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，填入必要的配置信息
```

4. 启动服务

```bash
npm run dev
```

## URL 参数使用说明

LM Speed 支持通过 URL 参数快速启动测试，无需手动填写表单。您可以通过以下方式使用：

```
https://lmspeed.net/?baseUrl=YOUR_BASE_URL&apiKey=YOUR_API_KEY&modelId=YOUR_MODEL_ID
```

参数说明：

- `baseUrl`: API 服务的基础 URL，例如 `https://api.deepseek.com/v1`
- `apiKey`: 您的 API 密钥
- `modelId`: 要测试的模型 ID

示例：

```
http://lmspeed.net/zh-CN?baseUrl=https://api.suanli.cn/v1&apiKey=sk-W0rpStc95T7JVYVwDYc29IyirjtpPPby6SozFMQr17m8KWeo&modelId=free:QwQ-32B
```

注意事项：

1. 所有参数都是必需的，缺少任何一个参数都会导致测试无法自动开始
2. 为了安全起见，建议不要在 URL 中直接传递 API 密钥，而是使用表单手动输入
3. 如果 URL 中包含特殊字符，请确保进行 URL 编码

## 解决的三大核心痛点 | Three Core Pain Points Solved

### 1. 响应质量不透明 | Response Quality Opacity

DeepSeek 官方的 API 不能用？硅基流动的 API 太慢？在选择 LLM API 服务时，开发者经常面临服务质量难以评估的问题。不同服务商的 API 性能差异巨大，且缺乏客观的评估标准。LM Speed 提供标准化的性能测试方案，让您在投入开发前就能准确评估各个 API 的实际表现。

![picture-2025-02-12-20-22-30](https://vscode-markdown.s3.bitiful.net/0ff2ab60e7bf2fb64134565d4d9d82535d0d87db1f568dcdc5465c73b6eadbfa.png)  

### 2. 性能波动难以监控 | Performance Fluctuation Monitoring

不知道大模型 API 速度如何？不知道供应商靠不靠谱？传统的性能测试工具往往只能提供简单的响应时间数据，无法全面反映 API 的实际性能表现。LM Speed 采用五轮连续压力测试 + 动态流式监控机制通过 tiktoken 进行精确的令牌计算，结合响应时间分析，自动生成最大/最小/平均性能的三维评估图谱，帮助您全面了解 API 的性能特征。

![picture-2025-02-12-20-21-55](https://vscode-markdown.s3.bitiful.net/e92fd7f59ac705341f7bc4e880f7e11d798a40e3a038b9373f9d885f70d997ac.png)  

### 3. 测试结果难以沉淀 | Test Results Accumulation

性能测试数据往往散落各处，难以进行系统性的积累和分析。LM Speed 提供一键式测试报告生成功能，自动整合性能指标、测试环境等关键信息，支持报告导出和团队分享。同时提供历史数据存储和趋势分析，帮助团队建立完整的性能评估体系。

![picture-2025-02-12-20-24-15](https://vscode-markdown.s3.bitiful.net/2dcd9f8c44bc5801624e7b356a3c09ec41ae83c7e6ab51fd2414f5eb4092e983.png)  

## 为用户创造的关键价值 | Key Value Created for Users

数据驱动的决策支持。通过全方位的性能数据分析，帮助您做出更明智的 API 选型决策：

- **实时性能洞察 | Real-time Performance Insights**：TPoS（：每秒令牌数）的实时监控，让您对 API 性能了如指掌。支持多维度数据实时展示，直观把握性能趋势。
- **全维度评估体系 | Comprehensive Evaluation System**：覆盖首字延迟、响应时间、等核心指标，提供最全面的性能画像。
- **可视化决策支持 | Visual Decision Support**：一键生成专业测试报告，支持多人实时协作，平均节省 80% 决策时间。提供丰富的数据可视化图表，辅助团队决策。

## 技术栈 | Tech Stack

- **前端 | Frontend**:
  - Next.js 15
  - React 19
  - TypeScript
  - TailwindCSS
  - Radix UI 组件库
  - SWR 数据获取
  - next-intl 国际化
  - next-themes 暗黑模式

- **后端 | Backend**:
  - Next.js API 路由
  - Drizzle ORM
  - PostgreSQL
  - OpenAI SDK
  - tiktoken 令牌计数

- **开发工具 | Development**:
  - ESLint
  - TypeScript
  - Drizzle Kit 数据库管理
  - TailwindCSS 样式

- **部署 | Deployment**:
  - Docker
  - Docker Compose
  - PostgreSQL

## 贡献指南 | Contributing

欢迎提交 Issue 和 Pull Request！在提交 PR 之前，请确保：

1. 代码符合项目的代码规范
2. 添加了必要的测试
3. 更新了相关文档

## 许可证 | License

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件
