const transactionDatamapper = require('../models/transactionDatamapper');

const transactionController = {

   async create(req, res) {
      try {
         await transactionDatamapper
         .insert(
               req.body.name,
               req.body.description,
               req.body.transactionType,
               req.body.amount,
               req.params.accountId,
            );

         return res.status(200).json('New transaction created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByAccountId(req, res) {
      try {
         const transactionList = await transactionDatamapper
                                 .findAllByAccountId(req.params.accountId);

         return res.json({ transactionList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getOne(req, res) {
      try {
         console.log(req.params.transactionId);
         const transaction = await transactionDatamapper.findByPK(req.params.transactionId);

         if (!transaction) {
            return res.status(404).json({ errorMessage: 'transaction not found' });
         }

            return res.status(200).json(transaction);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const ledger = await transactionDatamapper.findByPK(req.params.transactionId);

         if (!ledger) {
            return res.status(404).json({ errorMessage: 'transaction not found' });
         }

         const updatedledger = await transactionDatamapper
                              .update(req.body, req.params.transactionId);

         return res.status(200).json(updatedledger);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         const ledger = await transactionDatamapper.findByPK(req.params.transactionId);

          if (!ledger) {
            return res.status(404).json({ errorMessage: 'transaction not found' });
          }

          await transactionDatamapper.delete(req.params.transactionId);
          return res.status(200).json({ message: 'transaction deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = transactionController;
