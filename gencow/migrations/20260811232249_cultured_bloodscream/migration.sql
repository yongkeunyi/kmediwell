CREATE TABLE "ebook_subscriptions" (
	"id" serial PRIMARY KEY,
	"user_id" text NOT NULL,
	"ebook_id" integer NOT NULL,
	"subscribed_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ebook_subscriptions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE UNIQUE INDEX "ebook_subscriptions_user_ebook_idx" ON "ebook_subscriptions" ("user_id","ebook_id");--> statement-breakpoint
ALTER TABLE "ebook_subscriptions" ADD CONSTRAINT "ebook_subscriptions_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "ebook_subscriptions" ADD CONSTRAINT "ebook_subscriptions_ebook_id_ebooks_id_fkey" FOREIGN KEY ("ebook_id") REFERENCES "ebooks"("id") ON DELETE CASCADE;--> statement-breakpoint
CREATE POLICY "rls_ebook_subscriptions_select_0" ON "ebook_subscriptions" AS PERMISSIVE FOR SELECT TO public USING ("ebook_subscriptions"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_ebook_subscriptions_insert_0" ON "ebook_subscriptions" AS PERMISSIVE FOR INSERT TO public WITH CHECK ("ebook_subscriptions"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_ebook_subscriptions_update_0" ON "ebook_subscriptions" AS PERMISSIVE FOR UPDATE TO public USING ("ebook_subscriptions"."user_id" = current_setting('app.user_id', true)) WITH CHECK ("ebook_subscriptions"."user_id" = current_setting('app.user_id', true));--> statement-breakpoint
CREATE POLICY "rls_ebook_subscriptions_delete_0" ON "ebook_subscriptions" AS PERMISSIVE FOR DELETE TO public USING ("ebook_subscriptions"."user_id" = current_setting('app.user_id', true));