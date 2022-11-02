const bcrypt = require('bcrypt');

const userDatamapper = require('../models/userDatamapper');

const userController = {

   async create(req, res) {
      try {
         const user = await userDatamapper.findByEmail(req.body.email);

         if (user) {
            return res.status(400).json({ errorMessage: 'User already exists with this email' });
         }

         const hashedPassword = await bcrypt.hash(req.body.password, 10);

         await userDatamapper.insert(req.body.username, req.body.email, hashedPassword);

         return res.status(200).json('New user created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getOne(req, res) {
      try {
         const user = await userDatamapper.findByPk(req.params.userId);

         if (!user) {
            return res.status(404).json({ errorMessage: 'user not found' });
         }

            return res.status(200).json(user);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const user = await userDatamapper.findByPk(req.params.userId);

         if (!user) {
            return res.status(404).json({ errorMessage: 'user not found' });
         }

            if (req.body.email) {
               const existingUser = await userDatamapper.findByEmail(req.body.email);
               if (existingUser) {
                  return res.status(400).json({ errorMessage: 'Another user account use this email' });
               }
            }
            const updatedUser = await userDatamapper.update(req.body, req.params.userId);
            return res.status(200).json(updatedUser);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
          const user = await userDatamapper.findByPk(req.params.userId);

          if (!user) {
            return res.status(404).json({ errorMessage: 'user not found' });
          }

          await userDatamapper.delete(req.params.userId);
          return res.json({ message: 'User deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = userController;
