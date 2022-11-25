const client = require('./client');

const budgetTypeDatamapper = {

   async insert(name, description, budgetAllowed, userId) {
      const result = await client.query('INSERT INTO "budget_type" (name, description, budget_allowed, user_id) VALUES ($1, $2, $3)', [name, description, budgetAllowed, userId]);

      return result.rows[0];
   },

   async findAllByUserId(userId) {
      const result = await client.query('SELECT * FROM "budget_type" WHERE user_id = $1', [userId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findByPK(budgetTypeId) {
      const result = await client.query('SELECT * FROM "budget_type" WHERE id = $1', [budgetTypeId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async update(inputData, budgetTypeId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "budget_type" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1} 
         RETURNING *`,
         [...values, budgetTypeId],
         );

      return savedUser.rows[0];
   },

   async delete(budgetTypeId) {
      const result = await client.query('DELETE FROM "budget_type" WHERE "id" = $1', [budgetTypeId]);

      return !!result.rowCount;
   },

};

module.exports = budgetTypeDatamapper;
