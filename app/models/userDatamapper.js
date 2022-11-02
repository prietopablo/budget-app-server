const client = require('./client');

const userDatamapper = {

   async findByPk(userId) {
      const result = await client.query('SELECT * FROM "user" WHERE "id" = $1', [userId]);

      if (result.rowCount === 0) {
          return null;
      }

      return result.rows[0];
  },

   async findByEmail(email) {
      const result = await client.query('SELECT * FROM "user" WHERE "email" = $1', [email]);

      return (result.rowCount === 0 ? null : result.rows[0]);
   },

   async insert(username, email, hashedpassword) {
      const result = await client.query('INSERT INTO "user" ("username", "email", "password") VALUES ($1, $2, $3)', [username, email, hashedpassword]);

      return result.rows[0];
   },

   async delete(userId) {
      const result = await client.query('DELETE FROM "user" WHERE "id" = $1', [userId]);

      return !!result.rowCount;
  },

  async update(inputData, userId) {
      const fields = Object.keys(inputData).map((prop, index) => `"${prop}" = $${index + 1}`);
      const values = Object.values(inputData);

      const savedUser = await client.query(
         `UPDATE "user" 
         SET ${fields}, "updated_at" = NOW()
         WHERE id = $${fields.length + 1}
         RETURNING *`,
         [...values, userId],
      );

      return savedUser.rows[0];
   },
};

module.exports = userDatamapper;
