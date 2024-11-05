CREATE TABLE `otp_table` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`otp` text NOT NULL,
	`updatedAt` integer,
	`createdAt` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `otp_table_email_unique` ON `otp_table` (`email`);