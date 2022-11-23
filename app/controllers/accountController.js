const accountDatamapper = require('../models/accountDatamapper');

const accountController = {

   async create(req, res) {
      try {
         await accountDatamapper
         .insert(req.body.name, req.body.type, req.params.userId);

         return res.status(200).json('New account created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByUserId(req, res) {
      try {
         const accountList = await accountDatamapper.findAllByUserId(req.params.userId);

         return res.json({ accountList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getOne(req, res) {
      try {
         const account = await accountDatamapper.findByPK(req.params.accountId);

         if (!account) {
            return res.status(404).json({ errorMessage: 'account not found' });
         }

            return res.status(200).json(account);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const account = await accountDatamapper.findByPK(req.params.accountId);

         if (!account) {
            return res.status(404).json({ errorMessage: 'account not found' });
         }

         const updatedAccount = await accountDatamapper.update(req.body, req.params.accountId);
         return res.status(200).json(updatedAccount);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         const account = await accountDatamapper.findByPK(req.params.accountId);

          if (!account) {
            return res.status(404).json({ errorMessage: 'account not found' });
          }

          await accountDatamapper.delete(req.params.accountId);
          return res.status(200).json({ message: 'account deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = accountController;
