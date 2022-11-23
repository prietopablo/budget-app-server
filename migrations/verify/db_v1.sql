-- Verify budget-app:db_v1 on pg

BEGIN;

SELECT * FROM "user", "account", "transaction", "internal_transfer", "saving_target", "budget_type", "subcription_tracker", "transaction_category" WHERE false;

ROLLBACK;
