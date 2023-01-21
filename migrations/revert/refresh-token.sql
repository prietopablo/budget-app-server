-- Revert budget-app:refresh-token from pg

BEGIN;
-- we should store the existing data in a temporary table potentially. and offer it during the deploy of this migration with a IF EXIST statement
ALTER TABLE "user"
  DROP COLUMN "refresh_token";

COMMIT;
