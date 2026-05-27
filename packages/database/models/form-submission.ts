import {
  pgTable,
  uuid,
  timestamp,
  text,
  json,
  unique,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";
import { usersTable } from "./user";

export type SubmissionValue =
  | string
  | number
  | boolean
  | string[];

export interface FormSubmissionValue {
  formFieldId: string;

  value: SubmissionValue;
}

export type FormSubmissionValueRow =
  FormSubmissionValue[];

export const formSubmissionsTable =
  pgTable(
    "form_submissions",

    {
      id: uuid("id")
        .primaryKey()
        .defaultRandom(),

      formId: uuid(
        "form_id"
      )
        .references(
          () =>
            formsTable.id,
          {
            onDelete:
              "cascade",
          }
        )
        .notNull(),

      values:
        json("values")
          .$type<FormSubmissionValueRow>()
          .notNull(),

      submittedBy:
        uuid(
          "submitted_by"
        ).references(
          () =>
            usersTable.id
        ),

      browserFingerprint:
        text(
          "browser_fingerprint"
        ),

      createdAt:
        timestamp(
          "created_at"
        ).defaultNow(),

      updatedAt:
        timestamp(
          "updated_at"
        ).$onUpdate(
          () =>
            new Date()
        ),
    },

    (table) => [
      unique(
        "unique_user_submission"
      ).on(
        table.formId,
        table.submittedBy
      ),

      unique(
        "unique_browser_submission"
      ).on(
        table.formId,
        table.browserFingerprint
      ),
    ]
  );