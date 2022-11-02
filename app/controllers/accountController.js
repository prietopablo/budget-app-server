const ledgerDatamapper = require('../models/ledgerDatamapper');

const ledgerController = {

   async create(req, res) {
      try {
         await ledgerDatamapper
         .insert(
               req.body.name,
               req.body.description,
               req.body.transactionType,
               req.params.amount,
               req.params.accountId,
            );

         return res.status(200).json('New ledger created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByAccountId(req, res) {
      try {
         const ledgerList = await ledgerDatamapper.getAllByAccountId(req.params.accountId);

         return res.json({ ledgerList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getOne(req, res) {
      try {
         const ledger = await ledgerDatamapper.findByPK(req.params.ledgerId);

         if (!ledger) {
            return res.status(404).json({ errorMessage: 'ledger not found' });
         }

            return res.status(200).json(ledger);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const ledger = await ledgerDatamapper.findByPK(req.params.ledgerId);

         if (!ledger) {
            return res.status(404).json({ errorMessage: 'ledger not found' });
         }

         const updatedledger = await ledgerDatamapper.update(req.body, req.params.ledgerId);
         return res.status(200).json(updatedledger);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         const ledger = await ledgerDatamapper.findByPK(req.params.ledgerId);

          if (!ledger) {
            return res.status(404).json({ errorMessage: 'ledger not found' });
          }

          await ledgerDatamapper.delete(req.params.ledgerId);
          return res.status(200).json({ message: 'ledger deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = ledgerController;
