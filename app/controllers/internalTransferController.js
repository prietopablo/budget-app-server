const internalTransferDatamapper = require('../models/internalTransferDatamapper');

const internalTransferController = {

   async create(req, res) {
      try {
         await internalTransferDatamapper
         .insert(
               req.body.amount,
               req.body.accountFromId,
               req.body.accountToId,
            );

         return res.status(200).json('New internal transfer created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByUserId(req, res) {
      try {
         const internalTransferList = await internalTransferDatamapper
                                       .findAllByUserId(req.params.UserId);

         return res.status(200).json({ internalTransferList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getOne(req, res) {
      try {
         console.log(req.params.internalTransferId);
         const internalTransfer = await internalTransferDatamapper
                              .findByPK(req.params.internalTransferId);

         if (!internalTransfer) {
            return res.status(404).json({ errorMessage: 'internal transfer not found' });
         }

            return res.status(200).json(internalTransfer);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const internalTransfer = await internalTransferDatamapper
                                    .findByPK(req.params.internalTransferId);

         if (!internalTransfer) {
            return res.status(404).json({ errorMessage: 'internal transfer not found' });
         }

         const updatedInternalTransfer = await internalTransferDatamapper
                              .update(req.body, req.params.internalTransferId);

         return res.status(200).json(updatedInternalTransfer);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         const internalTransfer = await internalTransferDatamapper
                                    .findByPK(req.params.internalTransferId);

          if (!internalTransfer) {
            return res.status(404).json({ errorMessage: 'internal transfer not found' });
          }

          await internalTransferDatamapper.delete(req.params.transactionId);
          return res.status(200).json({ message: 'internal transfer deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = internalTransferController;
