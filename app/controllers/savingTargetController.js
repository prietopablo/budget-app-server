const savingTargetDatamapper = require('../models/savingTargetDatamapper');

const savingTargetController = {

   async create(req, res) {
      try {
         await savingTargetDatamapper
         .insert(
               req.body.name,
               req.body.description,
               req.body.amountSaved,
               req.body.target,
            );

         return res.status(200).json('New saving target created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByUserId(req, res) {
      try {
         const internalTransferList = await savingTargetDatamapper
                                       .findAllByUserId(req.params.UserId);

         return res.status(200).json({ internalTransferList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getOne(req, res) {
      try {
         const savingTarget = await savingTargetDatamapper
                              .findByPK(req.params.savingTargetId);

         if (!savingTarget) {
            return res.status(404).json({ errorMessage: 'saving target not found' });
         }

            return res.status(200).json(savingTarget);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const savingTarget = await savingTargetDatamapper
                                    .findByPK(req.params.savingTargetId);

         if (!savingTarget) {
            return res.status(404).json({ errorMessage: 'internal transfer not found' });
         }

         const updatedsavingTarget = await savingTargetDatamapper
                              .update(req.body, req.params.savingTargetId);

         return res.status(200).json(updatedsavingTarget);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         const savingTarget = await savingTargetDatamapper
                                    .findByPK(req.params.savingTargetId);

          if (!savingTarget) {
            return res.status(404).json({ errorMessage: 'internal transfer not found' });
          }

          await savingTargetDatamapper.delete(req.params.savingTargetId);
          return res.status(200).json({ message: 'internal transfer deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = savingTargetController;
