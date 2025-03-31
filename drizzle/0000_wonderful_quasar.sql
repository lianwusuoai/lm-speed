CREATE TABLE "providers" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "providers_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255),
	"host" varchar(255) NOT NULL,
	"models" varchar(255)[] NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "speed_test_results" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "speed_test_results_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"speedTestId" integer NOT NULL,
	"prompt" varchar(1000) NOT NULL,
	"model" varchar(100) NOT NULL,
	"firstTokenLatency" real NOT NULL,
	"tokensPerSecond" real NOT NULL,
	"tokensPerSecondTotal" real,
	"outputToken" integer NOT NULL,
	"totalTime" real NOT NULL,
	"outputTime" real NOT NULL,
	"content" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "speed_tests" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "speed_tests_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"timestamp" timestamp NOT NULL,
	"baseUrl" varchar(255) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "speed_test_results" ADD CONSTRAINT "speed_test_results_speedTestId_speed_tests_id_fk" FOREIGN KEY ("speedTestId") REFERENCES "public"."speed_tests"("id") ON DELETE no action ON UPDATE no action;