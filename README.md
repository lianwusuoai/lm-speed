[中文](README_zh.md) | English

# LM Speed - Simple LLM Speed Analysis Tool

Portal: <https://lmspeed.net>

Provides precise and reliable OpenAI API performance testing solutions for AI application developers. Through multi-dimensional real-time data analysis, it helps users quickly identify performance bottlenecks and optimize model calling strategies. It also offers an intuitive ranking feature, allowing users to easily compare and select the most suitable models and service providers.

![picture-2025-02-12-20-21-28](https://vscode-markdown.s3.bitiful.net/eba9b5e1e200dd0c5504914243d1d6247eb4a16c2c20f87adfe11244ff9668c7.png)  

## Features

- 🚀 Real-time Performance Monitoring: Multi-dimensional real-time data display
- 📊 Comprehensive Performance Evaluation: Core metrics including first token latency and response time
- 📈 Data Visualization: Rich chart displays for intuitive performance trend understanding
- 🔄 Automated Testing: Five-round continuous stress testing for reliable data
- 📝 One-click Reports: Automatic professional test report generation with export capabilities

## Quick Start

### Deploy with Docker Compose

```yaml
version: '4.0'

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

### Manual Deployment

1. Clone the repository
```bash
git clone https://github.com/yourusername/lm-speed.git
cd lm-speed
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env file with necessary configuration
```

4. Start the service
```bash
npm run dev
```

## URL Parameters Usage

LM Speed supports quick test initiation through URL parameters without manual form filling. You can use it in the following way:

```
https://lmspeed.net/?baseUrl=YOUR_BASE_URL&apiKey=YOUR_API_KEY&modelId=YOUR_MODEL_ID
```

Parameter Description:

- `baseUrl`: The base URL of the API service, e.g., `https://api.deepseek.com/v1`
- `apiKey`: Your API key
- `modelId`: The model ID to test

Example:

```
http://lmspeed.net/zh-CN?baseUrl=https://api.suanli.cn/v1&apiKey=sk-W0rpStc95T7JVYVwDYc29IyirjtpPPby6SozFMQr17m8KWeo&modelId=free:QwQ-32B
```

Notes:

1. All parameters are required; missing any parameter will prevent the test from starting automatically
2. For security reasons, it's recommended not to pass API keys directly in URLs, but rather use the form for manual input
3. If the URL contains special characters, make sure to URL encode them

## Three Core Pain Points Solved

### 1. Response Quality Opacity

Is DeepSeek's official API unusable? Is Silicon Flow's API too slow? When choosing LLM API services, developers often face challenges in evaluating service quality. Different service providers' APIs have significant performance variations, and there's a lack of objective evaluation standards. LM Speed provides standardized performance testing solutions, allowing you to accurately assess each API's actual performance before development.

![picture-2025-02-12-20-22-30](https://vscode-markdown.s3.bitiful.net/0ff2ab60e7bf2fb64134565d4d9d82535d0d87db1f568dcdc5465c73b6eadbfa.png)  

### 2. Performance Fluctuation Monitoring

Unsure about the LLM API speed? Uncertain about supplier reliability? Traditional performance testing tools often only provide simple response time data, failing to comprehensively reflect API's actual performance. LM Speed employs five-round continuous stress testing + dynamic streaming monitoring mechanism, using tiktoken for precise token calculation, combined with response time analysis, automatically generating three-dimensional evaluation maps of maximum/minimum/average performance to help you fully understand API's performance characteristics.

![picture-2025-02-12-20-21-55](https://vscode-markdown.s3.bitiful.net/e92fd7f59ac705341f7bc4e880f7e11d798a40e3a038b9373f9d885f70d997ac.png)  

### 3. Test Results Accumulation

Performance test data is often scattered and difficult to systematically accumulate and analyze. LM Speed provides one-click test report generation, automatically integrating performance metrics, test environment, and other key information, supporting report export and team sharing. It also offers historical data storage and trend analysis, helping teams establish a complete performance evaluation system.

![picture-2025-02-12-20-24-15](https://vscode-markdown.s3.bitiful.net/2dcd9f8c44bc5801624e7b356a3c09ec41ae83c7e6ab51fd2414f5eb4092e983.png)  

## Key Value Created for Users

Data-driven decision support. Through comprehensive performance data analysis, helping you make wiser API selection decisions:

- **Real-time Performance Insights**: Real-time monitoring of TPoS (Tokens per Second), giving you complete visibility into API performance. Supports multi-dimensional real-time data display for intuitive performance trend understanding.
- **Comprehensive Evaluation System**: Covers core metrics including first token latency, response time, etc., providing the most comprehensive performance profile.
- **Visual Decision Support**: One-click professional test report generation, supporting multi-user real-time collaboration, saving an average of 80% decision time. Provides rich data visualization charts to assist team decision-making.

## Tech Stack

- **Frontend**:
  - Next.js 15
  - React 19
  - TypeScript
  - TailwindCSS
  - Radix UI Components
  - SWR for data fetching
  - next-intl for internationalization
  - next-themes for dark mode

- **Backend**:
  - Next.js API Routes
  - Drizzle ORM
  - PostgreSQL
  - OpenAI SDK
  - tiktoken for token counting

- **Development**:
  - ESLint
  - TypeScript
  - Drizzle Kit for database management
  - TailwindCSS for styling

- **Deployment**:
  - Docker
  - Docker Compose
  - PostgreSQL

## Contributing

Issues and Pull Requests are welcome! Before submitting a PR, please ensure:

1. Code follows project coding standards
2. Necessary tests are added
3. Related documentation is updated

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details



