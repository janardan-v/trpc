import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  check,
} from "drizzle-orm/pg-core";
import { usersTable } from "./user";

export const visibilityEnum = pgEnum("visibility", ["PUBLIC", "PRIVATE", "UNLISTED"]);

export const formsTable = pgTable("forms", {
  id: uuid("id").primaryKey().defaultRandom(),

  title: varchar("title", { length: 55 }).notNull(),
  description: varchar("description", { length: 300 }),

  visibility: visibilityEnum().default("PUBLIC"),

  isPublished: boolean("is_published").default(false),
  
  isPasswordProtected: boolean("is_password_protected").default(false),
  password: text("password"),

  deadline: timestamp("deadline").notNull(),

  adminId: uuid("admin_id")
    .references(() => usersTable.id)
    .notNull(),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});
