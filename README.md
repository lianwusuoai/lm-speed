
# LM Speed - 简单的大模型测速分析工具

传送门：<https://lmspeed.net>

为 AI 应用开发者提供精准可靠的 OpenAI API 性能测试解决方案，通过多维度的实时数据分析，帮助用户快速定位性能瓶颈，优化模型调用策略。同时提供直观的排行榜功能，让用户能够轻松比较和选择最适合的模型和服务商。

![picture-2025-02-12-20-21-28](https://vscode-markdown.s3.bitiful.net/eba9b5e1e200dd0c5504914243d1d6247eb4a16c2c20f87adfe11244ff9668c7.png)  

## 快速开始

Docker Compose 部署示例

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

## 解决的三大核心痛点

### 1. 响应质量不透明

DeepSeek 官方的 API 不能用？硅基流动的 API 太慢？在选择 LLM API 服务时，开发者经常面临服务质量难以评估的问题。不同服务商的 API 性能差异巨大，且缺乏客观的评估标准。LM Speed 提供标准化的性能测试方案，让您在投入开发前就能准确评估各个 API 的实际表现。

![picture-2025-02-12-20-22-30](https://vscode-markdown.s3.bitiful.net/0ff2ab60e7bf2fb64134565d4d9d82535d0d87db1f568dcdc5465c73b6eadbfa.png)  

### 2. 性能波动难以监控

不知道大模型 API 速度如何？不知道供应商靠不靠谱？传统的性能测试工具往往只能提供简单的响应时间数据，无法全面反映 API 的实际性能表现。LM Speed 采用五轮连续压力测试 + 动态流式监控机制通过 tiktoken 进行精确的令牌计算，结合响应时间分析，自动生成最大/最小/平均性能的三维评估图谱，帮助您全面了解 API 的性能特征。

![picture-2025-02-12-20-21-55](https://vscode-markdown.s3.bitiful.net/e92fd7f59ac705341f7bc4e880f7e11d798a40e3a038b9373f9d885f70d997ac.png)  

### 3. 测试结果难以沉淀

性能测试数据往往散落各处，难以进行系统性的积累和分析。LM Speed 提供一键式测试报告生成功能，自动整合性能指标、测试环境等关键信息，支持报告导出和团队分享。同时提供历史数据存储和趋势分析，帮助团队建立完整的性能评估体系。

![picture-2025-02-12-20-24-15](https://vscode-markdown.s3.bitiful.net/2dcd9f8c44bc5801624e7b356a3c09ec41ae83c7e6ab51fd2414f5eb4092e983.png)  

## 为用户创造的关键价值

数据驱动的决策支持。通过全方位的性能数据分析，帮助您做出更明智的 API 选型决策：

- **实时性能洞察**：TPoS（：每秒令牌数）的实时监控，让您对 API 性能了如指掌。支持多维度数据实时展示，直观把握性能趋势。
- **全维度评估体系**：覆盖首字延迟、响应时间、等核心指标，提供最全面的性能画像。
- **可视化决策支持**：一键生成专业测试报告，支持多人实时协作，平均节省 80% 决策时间。提供丰富的数据可视化图表，辅助团队决策。
