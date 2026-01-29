-- First, update all existing formations with NULL entity to have a default value
UPDATE "formations" 
SET "entity" = 'CABINET FORMATION ET GESTION EN SECURITE' 
WHERE "entity" IS NULL;

-- Now, make the column required (NOT NULL)
ALTER TABLE "formations" 
ALTER COLUMN "entity" SET NOT NULL;

