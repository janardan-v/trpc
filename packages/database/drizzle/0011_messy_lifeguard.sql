ALTER TABLE "form_submissions" RENAME COLUMN "submiited_by" TO "submitted_by";--> statement-breakpoint
ALTER TABLE "form_submissions" DROP CONSTRAINT "unique_anonymous_submission";--> statement-breakpoint
ALTER TABLE "form_submissions" DROP CONSTRAINT "unique_user_submission";--> statement-breakpoint
ALTER TABLE "form_fields" DROP CONSTRAINT "form_fields_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_submiited_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "form_submissions" DROP CONSTRAINT "form_submissions_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "form_submissions" ALTER COLUMN "values" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "form_fields" ADD COLUMN "options" json;--> statement-breakpoint
ALTER TABLE "form_fields" ADD COLUMN "rating_max" integer DEFAULT 5;--> statement-breakpoint
ALTER TABLE "form_fields" ADD COLUMN "checkbox_label" varchar(150);--> statement-breakpoint
ALTER TABLE "form_fields" ADD COLUMN "min_value" integer;--> statement-breakpoint
ALTER TABLE "form_fields" ADD COLUMN "max_value" integer;--> statement-breakpoint
ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_submitted_by_users_id_fk" FOREIGN KEY ("submitted_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "unique_browser_submission" UNIQUE("form_id","browser_fingerprint");--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "unique_user_submission" UNIQUE("form_id","submitted_by");