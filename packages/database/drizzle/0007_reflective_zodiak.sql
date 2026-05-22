ALTER TABLE "submissions" RENAME TO "form_submissions";--> statement-breakpoint
ALTER TABLE "form_submissions" DROP CONSTRAINT "submissions_form_id_forms_id_fk";
--> statement-breakpoint
ALTER TABLE "form_submissions" ADD COLUMN "submiited_by" uuid;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submissions" ADD CONSTRAINT "form_submissions_submiited_by_users_id_fk" FOREIGN KEY ("submiited_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_fields" DROP COLUMN "password";--> statement-breakpoint
ALTER TABLE "form_fields" DROP COLUMN "deadline";