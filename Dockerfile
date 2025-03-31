# 构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 启用 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml（如果存在）
COPY package.json pnpm-lock.yaml* ./
COPY drizzle.config.ts ./
COPY drizzle ./drizzle

# 安装依赖
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 使用 package.json 中的 build 命令构建应用
RUN pnpm run build

# 生产阶段
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# 添加非 root 用户
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 启用 pnpm
RUN npm install -g pnpm

# 复制 package.json 和 pnpm-lock.yaml
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml* ./
# 只安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 从构建阶段复制必要文件
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/drizzle ./drizzle

# 设置正确的权限
RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 使用 package.json 中的 start 命令启动应用
CMD ["pnpm", "start"]
