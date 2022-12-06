const transactionCategoryDatamapper = require('../models/transactionCategoryDatamapper');

const transactionCategoryController = {

      async create(req, res) {
         try {
            await transactionCategoryDatamapper
            .insert(
                  req.body.name,
                  req.body.description,
                  req.params.userId,
               );

            return res.status(200).json('New subscription created');
         } catch (err) {
            return res.json({ errorMessage: err.message });
         }
      },

      async getAllByUserId(req, res) {
         try {
            const transactionCategoryList = await transactionCategoryDatamapper
                                         .findAllByUserId(req.params.userId);

            return res.status(200).json({ transactionCategoryList });
         } catch (err) {
            return res.json({ errorType: err.message });
         }
      },

      async getOne(req, res) {
         try {
            const transactionCategory = await transactionCategoryDatamapper
                                 .findByPK(req.params.transactionCategoryId);

            if (!transactionCategory) {
               return res.status(404).json({ errorMessage: 'subscription not found' });
            }

               return res.status(200).json(transactionCategory);
         } catch (err) {
            return res.json({ errorType: err.message });
         }
      },

      async update(req, res) {
         try {
            const transactionCategory = await transactionCategoryDatamapper
                                 .findByPK(req.params.transactionCategoryId);

            if (!transactionCategory) {
               return res.status(404).json({ errorMessage: 'subscription not found' });
            }

            const updatedSubscription = await transactionCategoryDatamapper
                                        .update(req.body, req.params.transactionCategoryId);

            return res.status(200).json(updatedSubscription);
         } catch (err) {
            return res.json({ errorType: err.message });
         }
      },

      async delete(req, res) {
         try {
            const transactionCategory = await transactionCategoryDatamapper
                                 .findByPK(req.params.transactionCategoryId);

             if (!transactionCategory) {
               return res.status(404).json({ errorMessage: 'subscription not found' });
             }

             await transactionCategoryDatamapper.delete(req.params.transactionCategoryId);
             return res.status(200).json({ message: 'subscription deleted' });
         } catch (err) {
             return res.json({ errorType: err.message });
         }
     },

};

module.exports = transactionCategoryController;
