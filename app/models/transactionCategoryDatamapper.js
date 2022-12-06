const client = require('./client');

const transactionCategoryDatamapper = {

   async insert(name, description, userId) {
      const result = await client.query('INSERT INTO "transaction_category" (name, description, user_id) VALUES ($1, $2, $3, $4)', [name, description, userId]);

      return result.rows[0];
   },

   async findAllByUserId(userId) {
      const result = await client.query('SELECT * FROM "transaction_category" WHERE user_id = $1', [userId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findByPK(transactionCategoryId) {
      const result = await client.query('SELECT * FROM "transaction_category" WHERE id = $1', [transactionCategoryId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async update(inputData, transactionCategoryId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "transaction_category" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1} 
         RETURNING *`,
         [...values, transactionCategoryId],
         );

      return savedUser.rows[0];
   },

   async delete(transactionCategoryId) {
      const result = await client.query('DELETE FROM "transaction_category" WHERE "id" = $1', [transactionCategoryId]);

      return !!result.rowCount;
   },

};

module.exports = transactionCategoryDatamapper;
