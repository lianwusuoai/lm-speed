import {
  integer,
  pgTable,
  varchar,
  timestamp,
  real,
  text
} from "drizzle-orm/pg-core";
import { z } from "zod";

export const speedTestResultItemSchema = z.object({
  prompt: z.string(),
  model: z.string(),
  firstTokenLatency: z.number(),
  tokensPerSecond: z.number(),
  tokensPerSecondTotal: z.number(),
  outputToken: z.number(),
  totalTime: z.number(),
  outputTime: z.number(),
  content: z.string().optional(),
});

// Zod schemas for validation
export const speedTestResultSchema = z.object({
  baseUrl: z.string().url(),
  timestamp: z.string().datetime(),
  results: z.array(speedTestResultItemSchema),
});

export const providersTable = pgTable("providers", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  host: varchar({ length: 255 }).notNull(),
  models: varchar({ length: 255 }).array().notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
});

export const speedTestsTable = pgTable("speed_tests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  timestamp: timestamp().notNull(),
  baseUrl: varchar({ length: 255 }).notNull(), // Provider
  createdAt: timestamp().defaultNow().notNull(),
});

export const speedTestResultsTable = pgTable("speed_test_results", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  speedTestId: integer()
    .references(() => speedTestsTable.id)
    .notNull(),
  prompt: varchar({ length: 1000 }).notNull(),
  model: varchar({ length: 100 }).notNull(),
  firstTokenLatency: real().notNull(),
  tokensPerSecond: real().notNull(),
  tokensPerSecondTotal: real(),
  outputToken: integer().notNull(),
  totalTime: real().notNull(),
  outputTime: real().notNull(),
  content: text(),
  createdAt: timestamp().defaultNow().notNull(),
});

export type SpeedTestResult = z.infer<typeof speedTestResultItemSchema>;