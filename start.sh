#!/bin/sh

# 等待数据库就绪
echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "Database is ready!"

# 检查是否已经迁移
echo "Checking if database is already migrated..."
if ! pnpm drizzle-kit generate; then
  echo "Database is already migrated, skipping migration..."
else
  echo "Running database migration..."
  pnpm drizzle-kit migrate
fi

# 启动应用
echo "Starting the application..."
exec pnpm start 