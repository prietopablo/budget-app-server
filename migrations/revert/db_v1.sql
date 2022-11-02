-- Revert budget-app:db_v1 from pg

BEGIN;

DROP TABLE IF EXISTS "user", "account", "ledger", "transfer", "saving_target", "subcription_tracker";

COMMIT;
