ALTER TABLE "forms" RENAME COLUMN "admin_Id" TO "admin_id";--> statement-breakpoint
ALTER TABLE "forms" DROP CONSTRAINT "forms_admin_Id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;