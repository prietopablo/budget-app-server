-- Revert budget-app:db_v1 from pg

BEGIN;

DROP TABLE IF EXISTS "user", "account", "transaction", "internal_transfer", "saving_target", "budget_type", "subcription_tracker", "transaction_category";

COMMIT;
