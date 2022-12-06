const subscriptionDatamapper = require('../models/subscriptionDatamapper');

const subscriptionController = {

   async create(req, res) {
      try {
         await subscriptionDatamapper
         .insert(
               req.body.name,
               req.body.description,
               req.body.amount,
               req.params.userId,
               req.params.accountId,
            );

         return res.status(200).json('New subscription created');
      } catch (err) {
         return res.json({ errorMessage: err.message });
      }
   },

   async getAllByUserId(req, res) {
      try {
         const subscriptionList = await subscriptionDatamapper
                                      .findAllByUserId(req.params.userId);

         return res.status(200).json({ subscriptionList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getAllByAccountId(req, res) {
      try {
         const subscriptionList = await subscriptionDatamapper
                                      .findAllByAccountId(req.params.accountId);

         return res.status(200).json({ subscriptionList });
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async getOne(req, res) {
      try {
         console.log(req.params.subscriptionId);
         const subscription = await subscriptionDatamapper
                              .findByPK(req.params.subscriptionId);

         if (!subscription) {
            return res.status(404).json({ errorMessage: 'subscription not found' });
         }

            return res.status(200).json(subscription);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async update(req, res) {
      try {
         const subscription = await subscriptionDatamapper
                              .findByPK(req.params.subscriptionId);

         if (!subscription) {
            return res.status(404).json({ errorMessage: 'subscription not found' });
         }

         const updatedSubscription = await subscriptionDatamapper
                                     .update(req.body, req.params.subscriptionId);

         return res.status(200).json(updatedSubscription);
      } catch (err) {
         return res.json({ errorType: err.message });
      }
   },

   async delete(req, res) {
      try {
         const subscription = await subscriptionDatamapper
                              .findByPK(req.params.subscriptionId);

          if (!subscription) {
            return res.status(404).json({ errorMessage: 'subscription not found' });
          }

          await subscriptionDatamapper.delete(req.params.subscriptionId);
          return res.status(200).json({ message: 'subscription deleted' });
      } catch (err) {
          return res.json({ errorType: err.message });
      }
  },
};

module.exports = subscriptionController;
