import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  check,
  integer,
  numeric,
  json,
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";
import { formFieldsTable } from "./form-Field";

export interface FormSubmissionValue {
  formFieldId: string;
  value: string;
}

export type FormSubmissionValueRow = FormSubmissionValue[];

export const submissionsTable = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  
  formID: uuid("form_id")
    .references(() => formsTable.id)
    .notNull(),
  
    values: json("values").$type<FormSubmissionValueRow>(),



  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
