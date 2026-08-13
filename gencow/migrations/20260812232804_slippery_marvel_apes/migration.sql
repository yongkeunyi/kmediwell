CREATE TABLE "seller_applications" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"country" text NOT NULL,
	"preferred_locale" text NOT NULL,
	"message" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "seller_applications" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE UNIQUE INDEX "seller_applications_user_idx" ON "seller_applications" ("user_id");--> statement-breakpoint
ALTER TABLE "seller_applications" ADD CONSTRAINT "seller_applications_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
CREATE POLICY "rls_seller_applications_select_0" ON "seller_applications" AS PERMISSIVE FOR SELECT TO public USING ("seller_applications"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_seller_applications_insert_0" ON "seller_applications" AS PERMISSIVE FOR INSERT TO public WITH CHECK ("seller_applications"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_seller_applications_update_0" ON "seller_applications" AS PERMISSIVE FOR UPDATE TO public USING ("seller_applications"."user_id" = current_setting('app.user_id', true)) WITH CHECK ("seller_applications"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_seller_applications_delete_0" ON "seller_applications" AS PERMISSIVE FOR DELETE TO public USING ("seller_applications"."user_id" = current_setting('app.user_id', true));