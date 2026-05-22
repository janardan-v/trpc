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
  unique,
} from "drizzle-orm/pg-core";
import { formsTable } from "./form";

export const fieldTypesEnum = pgEnum("field_types", [
  "TEXT",
  "EMAIL",
  "NUMBER",
  "DATE",
  "SELECT",
  "CHECKBOX",
  "RATING",
]);

export const formFieldsTable = pgTable(
  "form_fields",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    formId: uuid("form_id")
      .references(() => formsTable.id)
      .notNull(),

    label: varchar("label", { length: 100 }).notNull(),
    labelKey: varchar("label_key", { length: 100 }).notNull(),

    type: fieldTypesEnum("type").default("TEXT"),

    description: text("description"),
    placeholder: text("placeholder"),

    index: numeric("index", { scale: 2 }).notNull(),

    isRequired: boolean("is_required").default(false),

    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
  },
  (table) => [unique().on(table.formId, table.index)],
);
