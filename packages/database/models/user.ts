import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
  text,
  pgEnum,
  check
} from "drizzle-orm/pg-core";

import { sql } from "drizzle-orm"

export const roleEnum = pgEnum('role', ['ADMIN', 'USER']);


export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  fullname: varchar("full_name", { length: 80 }).notNull(),

  // phoneNumber: varchar("phone_number"),
  // phoneNumberVerified: boolean("phone_number_verified").default(false),

  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false),
  verificationToken: text("verification_token"),

  refreshToken: text("refresh_token"),

  salt: text("salt"),
  password: text("password"),

  role: roleEnum("role").default("USER"),

  profileImageUrl: text("profile_image_url"),

  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
})
  // will add in last
  // ,
  //   (table) => [{
  //     numberLengthConstraint: check('phone_number', sql`${table.phoneNumber}.length === 10`),
  //     numberContentConstraint: check('phone_number', sql`${table.phoneNumber}~'^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$`),
  //     emailConstraint: check('email', sql`${table.email}~'^[/^\S+@\S+\.\S+$/]`)
  //   }]
  ;

export type SelectUser = typeof usersTable.$inferSelect;
export type InsertUser = typeof usersTable.$inferInsert;
