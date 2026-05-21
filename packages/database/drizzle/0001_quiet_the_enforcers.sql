CREATE TYPE "public"."role" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verification_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "verification_token_expires" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refresh_token" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "refresh_token_expires" timestamp;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "salt" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "role" DEFAULT 'USER';