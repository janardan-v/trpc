CREATE TYPE "public"."visibility" AS ENUM('PUBLIC', 'PRIVATE', 'UNLISTED');--> statement-breakpoint
CREATE TYPE "public"."field_types" AS ENUM('TEXT', 'EMAIL', 'NUMBER', 'DATE', 'SELECT', 'CHECKBOX', 'RATING');--> statement-breakpoint
CREATE TABLE "forms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(55) NOT NULL,
	"description" varchar(300),
	"visibility" "visibility" DEFAULT 'PUBLIC',
	"is_published" boolean DEFAULT false,
	"is_password_protected" boolean DEFAULT false,
	"password" text,
	"deadline" timestamp,
	"created_by" uuid NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "form_fields" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" uuid NOT NULL,
	"label" varchar(100) NOT NULL,
	"label_key" varchar(100) NOT NULL,
	"type" "field_types" DEFAULT 'TEXT',
	"description" text,
	"placeholder" text,
	"index" numeric NOT NULL,
	"is_required" boolean DEFAULT false,
	"password" text,
	"deadline" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp,
	CONSTRAINT "form_fields_form_id_index_unique" UNIQUE("form_id","index")
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"form_id" uuid NOT NULL,
	"values" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "forms" ADD CONSTRAINT "forms_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_fields" ADD CONSTRAINT "form_fields_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE no action ON UPDATE no action;