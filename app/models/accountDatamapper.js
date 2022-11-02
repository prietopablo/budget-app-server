const client = require('./client');

const accountDatamapper = {

   async insert(name, balance, type, userId) {
      const result = await client.query('INSERT INTO "account" ("name", "balance", "type", "user_id") VALUES ($1, $2, $3, $4)', [name, balance, type, userId]);

      return result.rows[0];
   },

   async findAllByUserId(userId) {
      const result = await client.query('SELECT * FROM "account" WHERE user_id = $1', [userId]);

      if (result.rowCount === 0) {
         return null;
     }

     return result.rows;
   },

   async findByPK(accountId) {
      const result = await client.query('SELECT * FROM "account" WHERE id = $2', [accountId]);

      if (result.rowCount === 0) {
         return null;
     }

     return result.rows;
   },

   async update(inputData, accountId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "user" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1} 
         RETURNING *`,
         [...values, accountId],
         );

         return savedUser.rows[0];
   },

   async delete(accountId) {
      const result = await client.query('DELETE FROM "account" WHERE "id" = $1', [accountId]);

      return !!result.rowCount;
   },
};

module.exports = accountDatamapper;
