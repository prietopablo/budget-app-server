-- Verify budget-app:refresh-token on pg

BEGIN;

SELECT "refresh_token" 
   FROM "user"
   WHERE false;

ROLLBACK;
