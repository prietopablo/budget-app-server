-- Verify budget-app:db_v1 on pg

BEGIN;

SELECT * FROM "user", "account", "ledger", "transfer", "saving_target", "subcription_tracker" WHERE false;

ROLLBACK;
