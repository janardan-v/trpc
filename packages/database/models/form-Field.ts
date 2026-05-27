import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  numeric,
  json,
  integer,
  unique,
} from "drizzle-orm/pg-core";

import { formsTable } from "./form";

export const fieldTypesEnum = pgEnum(
  "field_types",
  [
    "TEXT",
    "EMAIL",
    "NUMBER",
    "DATE",

    "SELECT",

    "CHECKBOX",

    "RATING",
  ]
);

export interface SelectFieldOption {
  id: string;
  label: string;
  value: string;
}

export const formFieldsTable =
  pgTable(
    "form_fields",
    {
      id: uuid("id")
        .primaryKey()
        .defaultRandom(),

      formId: uuid("form_id")
        .references(
          () => formsTable.id,
          {
            onDelete:
              "cascade",
          }
        )
        .notNull(),

      label: varchar(
        "label",
        {
          length: 100,
        }
      ).notNull(),

      labelKey: varchar(
        "label_key",
        {
          length: 100,
        }
      ).notNull(),

      type:
        fieldTypesEnum(
          "type"
        )
          .default(
            "TEXT"
          )
          .notNull(),

      description:
        text(
          "description"
        ),

      placeholder:
        text(
          "placeholder"
        ),

      index: numeric(
        "index",
        {
          scale: 2,
        }
      ).notNull(),

      isRequired:
        boolean(
          "is_required"
        )
          .default(
            false
          )
          .notNull(),

      // SELECT

      options:
        json("options")
          .$type<
            SelectFieldOption[]
          >(),

      // RATING

      ratingMax:
        integer(
          "rating_max"
        ).default(5),

      // CHECKBOX

      checkboxLabel:
        varchar(
          "checkbox_label",
          {
            length: 150,
          }
        ),

      // NUMBER

      minValue:
        integer(
          "min_value"
        ),

      maxValue:
        integer(
          "max_value"
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
      unique().on(
        table.formId,
        table.index
      ),
    ]
  );