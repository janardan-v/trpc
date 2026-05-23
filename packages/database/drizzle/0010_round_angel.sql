ALTER TABLE "forms" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "forms" ADD COLUMN "salt" text;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD COLUMN "browser_fingerprint" text;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "unique_user_submission" UNIQUE("form_id","submiited_by");--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "unique_anonymous_submission" UNIQUE("form_id","browser_fingerprint");