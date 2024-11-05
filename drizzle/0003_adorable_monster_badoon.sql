DROP INDEX IF EXISTS "users_table_email_unique";--> statement-breakpoint
ALTER TABLE `users_table` ALTER COLUMN "refreshToken" TO "refreshToken" text;--> statement-breakpoint
CREATE UNIQUE INDEX `users_table_email_unique` ON `users_table` (`email`);