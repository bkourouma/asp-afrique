-- Add the entity column to consulting_services table
ALTER TABLE "consulting_services" 
ADD COLUMN IF NOT EXISTS "entity" TEXT;

-- Update all existing consulting services with NULL entity to have a default value
UPDATE "consulting_services" 
SET "entity" = 'CABINET FORMATION ET GESTION EN SECURITE' 
WHERE "entity" IS NULL;

-- Now, make the column required (NOT NULL)
ALTER TABLE "consulting_services" 
ALTER COLUMN "entity" SET NOT NULL;

