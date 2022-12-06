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
               req.params.accountId,
               req.params.userId,
            );

         return res.status(200).json('New saving target created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByUserId(req, res) {
      try {
         const savingTargetList = await savingTargetDatamapper
                                      .findAllByUserId(req.params.userId);

         return res.status(200).json({ savingTargetList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getAllByAccountId(req, res) {
      try {
         const savingTargetList = await savingTargetDatamapper
                                      .findAllByAccountId(req.params.accountId);

         return res.status(200).json({ savingTargetList });
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
            return res.status(404).json({ errorMessage: 'saving target not found' });
         }

         const updatedSavingTarget = await savingTargetDatamapper
                                     .update(req.body, req.params.savingTargetId);

         return res.status(200).json(updatedSavingTarget);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         console.log('req.params.savingTargetId', req.params.savingTargetId);
         const savingTarget = await savingTargetDatamapper
                              .findByPK(req.params.savingTargetId);

          if (!savingTarget) {
            return res.status(404).json({ errorMessage: 'saving target not found' });
          }

          await savingTargetDatamapper.delete(req.params.savingTargetId);
          return res.status(200).json({ message: 'saving target deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = savingTargetController;
