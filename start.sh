#!/bin/sh

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