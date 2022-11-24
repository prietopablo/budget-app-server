const client = require('./client');

const internalTransferDatamapper = {

   async insert(amount, accountFromId, accountToId) {
      const result = await client.query('INSERT INTO internal_transfer (amount, account_from_id, account_to_id) VALUES ($1, $2, $3)', [amount, accountFromId, accountToId]);

      return result.rows[0];
   },

   async findAllByUserId(userId) {
      const result = await client.query('SELECT * FROM internal_transfer WHERE user_id = $1', [userId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async findByPK(internalTransfertId) {
      const result = await client.query('SELECT * FROM "internal_transfer" WHERE id = $1', [internalTransfertId]);

      if (result.rowCount === 0) {
         return null;
      }

      return result.rows;
   },

   async update(inputData, internalTransfertId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "internal_transfer" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1} 
         RETURNING *`,
         [...values, internalTransfertId],
         );

      return savedUser.rows[0];
   },

   async delete(internalTransfertId) {
      const result = await client.query('DELETE FROM "internal_transfer" WHERE "id" = $1', [internalTransfertId]);

      return !!result.rowCount;
   },
};

module.exports = internalTransferDatamapper;
