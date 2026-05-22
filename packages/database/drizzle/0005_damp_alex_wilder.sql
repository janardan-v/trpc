ALTER TABLE "forms" RENAME COLUMN "created_by" TO "admin_Id";--> statement-breakpoint
ALTER TABLE "forms" DROP CONSTRAINT "forms_created_by_users_id_fk";
--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_admin_Id_users_id_fk" FOREIGN KEY ("admin_Id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;