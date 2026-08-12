CREATE TABLE "articles" (
	"id" serial PRIMARY KEY,
	"locale" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"body" text NOT NULL,
	"author_name" text NOT NULL,
	"author_country" text NOT NULL,
	"related_site_id" integer,
	"related_ebook_id" integer,
	"published_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_related_site_id_sites_id_fkey" FOREIGN KEY ("related_site_id") REFERENCES "sites"("id");--> statement-breakpoint
ALTER TABLE "articles" ADD CONSTRAINT "articles_related_ebook_id_ebooks_id_fkey" FOREIGN KEY ("related_ebook_id") REFERENCES "ebooks"("id");