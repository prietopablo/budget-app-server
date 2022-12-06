-- Revert budget-app:db_v1 from pg

BEGIN;

DROP TABLE IF EXISTS "user", "account", "transaction", "internal_transfer", "saving_target", "budget_type", "subscription", "transaction_category";

COMMIT;
