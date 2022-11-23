const client = require('./client');

const transactionDatamapper = {

   async insert(name, description, transactionType, amount, accountId) {
      console.log(name, description, transactionType, amount, accountId);
      const result = await client.query('INSERT INTO "transaction" ("name", "description", "transaction_type", "amount", "account_id") VALUES ($1, $2, $3, $4, $5)', [name, description, transactionType, amount, accountId]);

      return result.rows[0];
   },

   async findAllByAccountId(accountId) {
      const result = await client.query('SELECT * FROM "transaction" WHERE account_id = $1', [accountId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findByPK(transactionId) {
      const result = await client.query('SELECT * FROM "transaction" WHERE id = $1', [transactionId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async update(inputData, ledgerId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "transaction" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1} 
         RETURNING *`,
         [...values, ledgerId],
         );

      return savedUser.rows[0];
   },

   async delete(ledgerId) {
      const result = await client.query('DELETE FROM "transaction" WHERE "id" = $1', [ledgerId]);

      return !!result.rowCount;
   },
};

module.exports = transactionDatamapper;
