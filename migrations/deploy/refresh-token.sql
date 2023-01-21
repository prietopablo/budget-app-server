-- Deploy budget-app:refresh-token to pg

BEGIN;

ALTER TABLE "user"
   ADD COLUMN "refresh_token" TEXT;

COMMIT;
