// table schema generated by introspection
import {
  sqliteTable,
  uniqueIndex,
  integer,
  text,
} from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable(
  "users_table",
  {
    id: integer().primaryKey({ autoIncrement: true }).notNull(),
    email: text().notNull(),
    refreshToken: text(),
    password: text(),
  },
  (table) => {
    return {
      emailUnique: uniqueIndex("users_table_email_unique").on(table.email),
    };
  },
);