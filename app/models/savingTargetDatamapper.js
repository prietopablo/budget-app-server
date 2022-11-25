const client = require('./client');

const savingTargetDatamapper = {

   async insert(name, description, amountSaved, target, recipientTargetId) {
      const result = await client.query('INSERT INTO saving_target (name, description, amountSaved, target, recipient_account_id) VALUES ($1, $2, $3, $4, $5)', [name, description, amountSaved, target, recipientTargetId]);

      return result.rows[0];
   },

   async findAllByUserId(userId) {
      const result = await client.query('SELECT * FROM saving_target WHERE user_id = $1', [userId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findAllByAccountId(AccountId) {
      const result = await client.query('SELECT * FROM saving_target WHERE user_id = $1', [AccountId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findByPK(savingTargetId) {
      const result = await client.query('SELECT * FROM "saving_target" WHERE id = $1', [savingTargetId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async update(inputData, savingTargetId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "saving_target" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1} 
         RETURNING *`,
         [...values, savingTargetId],
         );

      return savedUser.rows[0];
   },

   async delete(savingTargetId) {
      const result = await client.query('DELETE FROM "saving_target" WHERE "id" = $1', [savingTargetId]);

      return !!result.rowCount;
   },

};

module.exports = savingTargetDatamapper;
