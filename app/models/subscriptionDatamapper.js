const client = require('./client');

const subcriptionDatamapper = {

   async insert(name, description, amount, userId, accountId) {
      const result = await client.query('INSERT INTO "subcription" (name, description, amount, user_id, account_id) VALUES ($1, $2, $3, $4, $5)', [name, description, amount, userId, accountId]);

      return result.rows[0];
   },

   async findAllByUserId(userId) {
      const result = await client.query('SELECT * FROM "subcription" WHERE user_id = $1', [userId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findAllByAccountId(accountId) {
      const result = await client.query('SELECT * FROM "subcription" WHERE user_id = $1', [accountId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findByPK(subscriptionId) {
      const result = await client.query('SELECT * FROM "subcription" WHERE id = $1', [subscriptionId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async update(inputData, subscriptionId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "subcription" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1} 
         RETURNING *`,
         [...values, subscriptionId],
         );

      return savedUser.rows[0];
   },

   async delete(subscriptionId) {
      const result = await client.query('DELETE FROM "subcription" WHERE "id" = $1', [subscriptionId]);

      return !!result.rowCount;
   },

};

module.exports = subcriptionDatamapper;
