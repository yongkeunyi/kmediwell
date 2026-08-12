CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"site_id" integer NOT NULL,
	"program_name" text NOT NULL,
	"scheduled_at" timestamp NOT NULL,
	"amount" integer NOT NULL,
	"status" text DEFAULT 'confirmed' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "ebooks" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"author" text NOT NULL,
	"price_usd" real NOT NULL,
	"description" text NOT NULL,
	"related_site_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "healing_records" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"alpha" integer NOT NULL,
	"theta" integer NOT NULL,
	"beta" integer NOT NULL,
	"stress_index" integer NOT NULL,
	"measured_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "healing_records" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE "sites" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"region" text NOT NULL,
	"ax_tier" text NOT NULL,
	"ax_note" text NOT NULL,
	"description" text NOT NULL,
	"program_name" text NOT NULL,
	"price" integer NOT NULL,
	"is_top20" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE INDEX "session_user_id_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_site_id_sites_id_fkey" FOREIGN KEY ("site_id") REFERENCES "sites"("id");--> statement-breakpoint
ALTER TABLE "ebooks" ADD CONSTRAINT "ebooks_related_site_id_sites_id_fkey" FOREIGN KEY ("related_site_id") REFERENCES "sites"("id");--> statement-breakpoint
ALTER TABLE "healing_records" ADD CONSTRAINT "healing_records_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
CREATE POLICY "rls_bookings_select_0" ON "bookings" AS PERMISSIVE FOR SELECT TO public USING ("bookings"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_bookings_insert_0" ON "bookings" AS PERMISSIVE FOR INSERT TO public WITH CHECK ("bookings"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_bookings_update_0" ON "bookings" AS PERMISSIVE FOR UPDATE TO public USING ("bookings"."user_id" = current_setting('app.user_id', true)) WITH CHECK ("bookings"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_bookings_delete_0" ON "bookings" AS PERMISSIVE FOR DELETE TO public USING ("bookings"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_healing_records_select_0" ON "healing_records" AS PERMISSIVE FOR SELECT TO public USING ("healing_records"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_healing_records_insert_0" ON "healing_records" AS PERMISSIVE FOR INSERT TO public WITH CHECK ("healing_records"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_healing_records_update_0" ON "healing_records" AS PERMISSIVE FOR UPDATE TO public USING ("healing_records"."user_id" = current_setting('app.user_id', true)) WITH CHECK ("healing_records"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_healing_records_delete_0" ON "healing_records" AS PERMISSIVE FOR DELETE TO public USING ("healing_records"."user_id" = current_setting('app.user_id', true));