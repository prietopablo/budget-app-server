-- Deploy budget-app:db_v1 to pg

BEGIN;

CREATE TABLE IF NOT EXISTS "user" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "username" TEXT NOT NULL,
   "email" TEXT NOT NULL UNIQUE,
   "password" TEXT NOT NULL,
   "role" TEXT NOT NULL DEFAULT 'user',
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "account" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL UNIQUE,
   "type" TEXT NOT NULL,
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "transaction" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "description" TEXT,
   "transaction_type" BOOLEAN NOT NULL,
   "amount" NUMERIC(20,4) NOT NULL,
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "internal_transfer" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "amount" NUMERIC(20,4) NOT NULL,
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "saving_target" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "description" TEXT,
   "amount_saved" NUMERIC(20,4) NOT NULL,
   "target" NUMERIC(20,4) NOT NULL,
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "budget_type" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "description" TEXT,
   "budget_allowed" NUMERIC(20,4) NOT NULL,
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "subcription_tracker" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "description" TEXT,
   "amount" NUMERIC(20,4) NOT NULL,
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "transaction_category" (
   "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
   "name" TEXT NOT NULL,
   "description" TEXT,
   "amount" NUMERIC(20,4) NOT NULL,
   "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
   "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE "account"
   ADD COLUMN "user_id" INT NOT NULL REFERENCES "user" (id);

ALTER TABLE "transaction"
   ADD COLUMN "account_id" INT NOT NULL REFERENCES "account" (id);

ALTER TABLE "transaction"
   ADD COLUMN "transaction_category_id" INT REFERENCES "transaction_category" (id);

ALTER TABLE "internal_transfer"
   ADD COLUMN "account_from_id" INT NOT NULL REFERENCES "account" (id);
ALTER TABLE "internal_transfer"
   ADD COLUMN "account_to_id" INT NOT NULL REFERENCES "account" (id);

ALTER TABLE "saving_target"
   ADD COLUMN "recipient_account_id" INT NOT NULL REFERENCES "account" (id);

ALTER TABLE "budget_type"
   ADD COLUMN "user_id" INT NOT NULL REFERENCES "user" (id);

ALTER TABLE "subcription_tracker"
   ADD COLUMN "subscription_account_id" INT NOT NULL REFERENCES "account" (id);

COMMIT;
