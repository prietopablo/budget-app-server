const budgetTypeDatamapper = require('../models/budgetTypeDatamapper');

const savingTargetController = {

   async create(req, res) {
      try {
         await budgetTypeDatamapper
         .insert(
               req.body.name,
               req.body.description,
               req.body.budgetAllowed,
               req.params.userId,
            );

         return res.status(200).json('New budget type created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByUserId(req, res) {
      try {
         const budgetTypeList = await budgetTypeDatamapper.findAllByUserId(req.params.UserId);

         return res.status(200).json({ budgetTypeList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getOne(req, res) {
      try {
         const budgetType = await budgetTypeDatamapper.findByPK(req.params.budgetTypeId);

         if (!budgetType) {
            return res.status(404).json({ errorMessage: 'saving target not found' });
         }

            return res.status(200).json(budgetType);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const budgetType = await budgetTypeDatamapper.findByPK(req.params.budgetTypeId);

         if (!budgetType) {
            return res.status(404).json({ errorMessage: 'internal transfer not found' });
         }

         const updatedbudgetType = await budgetTypeDatamapper
                                   .update(req.body, req.params.savingTargetId);

         return res.status(200).json(updatedbudgetType);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         const budgetType = await budgetTypeDatamapper.findByPK(req.params.budgetTypeId);

          if (!budgetType) {
            return res.status(404).json({ errorMessage: 'internal transfer not found' });
          }

          await budgetTypeDatamapper.delete(req.params.budgetTypeId);
          return res.status(200).json({ message: 'internal transfer deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = savingTargetController;
