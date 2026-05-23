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
  unique,
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";
import { formFieldsTable } from "./form-field";
import { usersTable } from "./user";

export interface FormSubmissionValue {
  formFieldId: string;
  value: string;
}

export type FormSubmissionValueRow = FormSubmissionValue[];

export const formSubmissionsTable = pgTable(
  "form_submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    formId: uuid("form_id")
      .references(() => formsTable.id)
      .notNull(),

    values: json("values").$type<FormSubmissionValueRow>(),

    submittedBy: uuid("submiited_by").references(() => usersTable.id), // optional depending upon the type Of form
    browserFingerprint: text("browser_fingerprint"),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => [
    unique("unique_user_submission").on(table.formId, table.submittedBy),

    unique("unique_anonymous_submission").on(table.formId, table.browserFingerprint),
  ],
);
