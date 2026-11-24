-- CreateEnum
CREATE TYPE "info_section_style" AS ENUM ('hero', 'category', 'image-left', 'image-right', 'image-center', 'text', 'footer');

-- CreateTable
CREATE TABLE "info_pages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" VARCHAR(255) NOT NULL,
    "aliases" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "title_sv" VARCHAR(255) NOT NULL,
    "title_en" VARCHAR(255),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" UUID,
    "version" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "info_pages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "info_sections" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "page_id" UUID NOT NULL,
    "position" INTEGER NOT NULL,
    "style" "info_section_style" NOT NULL,
    "heading_sv" TEXT,
    "heading_en" TEXT,
    "body_sv" TEXT,
    "body_en" TEXT,
    "image" TEXT,
    "image_alt_sv" TEXT,
    "image_alt_en" TEXT,

    CONSTRAINT "info_sections_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "info_pages_slug_key" ON "info_pages"("slug");

-- CreateIndex
CREATE INDEX "info_sections_page_id_position_idx" ON "info_sections"("page_id", "position");

-- AddForeignKey
ALTER TABLE "info_sections" ADD CONSTRAINT "info_sections_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "info_pages"("id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Copy the live markdown info pages into the new tables. Each becomes one
-- heading-less "text" section. The rows in "markdowns" are left untouched.
-- The two slugs are copied as separate pages and are merged by hand later.
INSERT INTO "info_pages" ("slug", "title_sv", "title_en")
SELECT "name", "name", "name"
FROM "markdowns"
WHERE "name" IN ('for-foretag', 'for-companies');

INSERT INTO "info_sections" ("page_id", "position", "style", "body_sv", "body_en")
SELECT p."id", 0, 'text', m."markdown_sv", m."markdown_en"
FROM "markdowns" m
JOIN "info_pages" p ON p."slug" = m."name";
