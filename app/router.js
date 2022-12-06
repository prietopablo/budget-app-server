const express = require('express');
const userController = require('./controllers/userController');
const accountController = require('./controllers/accountController');
const transactionController = require('./controllers/transactionController');
const internalTransferController = require('./controllers/internalTransferController');
const savingTargetController = require('./controllers/savingTargetController');
const budgetTypeController = require('./controllers/budgetTypeController');
const subscriptionController = require('./controllers/subscriptionController');

const router = express.Router();

// Unconnected/unregistered Visitor
// Homepage
router.get('/', (_, res) => {
   res.send('homepage');
});

// Sign up
router.post('/signup', userController.create);

//
router.post('/login', () => {

});

// registered Visitor
// User CRUD
router
   .route('/user/:userId')
   .get(userController.getOne)
   .patch(userController.update)
   .delete(userController.delete);

// At the moment user can just monitor their accounts
//  but will be changed to some sort of a dashboard
// Account CRUD
router
   .route('/user/:userId/accounts')
   .get(accountController.getAllByUserId)
   .post(accountController.create);

router
   .route('/user/:userId/account/:accountId')
   .get(accountController.getOne)
   .patch(accountController.update)
   .delete(accountController.delete);

// Transaction CRUD
router
   .route('/user/:userId/account/:accountId/transactions')
   .get(transactionController.getAllByAccountId)
   .post(transactionController.create);

router
   .route('/user/:userId/account/:accountId/transaction/:transactionId')
   .get(transactionController.getOne)
   .patch(transactionController.update)
   .delete(transactionController.delete);

// Internal transfert CRUD
router
   .route('/user/:userId/internalTransfers')
   .get(internalTransferController.getAllByUserId)
   .post(internalTransferController.create);

router
   .route('/user/:userId/internalTransfer/:internalTransferId')
   .get(internalTransferController.getOne)
   .patch(internalTransferController.update)
   .delete(internalTransferController.delete);

// Saving target CRUD
router
   .route('/user/:userId/savingTargets')
   .get(savingTargetController.getAllByUserId);

router
   .route('/user/:userId/account/:accountId/savingTargets')
   .get(savingTargetController.getAllByAccountId)
   .post(savingTargetController.create);

router
   .route('/user/:userId/account/:accountId/savingTarget/:savingTargetId')
   .get(savingTargetController.getOne)
   .patch(savingTargetController.update)
   .delete(savingTargetController.delete);

// Budget type CRUD
router
   .route('/user/:userId/budgetTypes')
   .get(budgetTypeController.getAllByUserId)
   .post(budgetTypeController.create);

router
   .route('/user/:userId/budgetType/:budgetTypeId')
   .get(budgetTypeController.getOne)
   .patch(budgetTypeController.update)
   .delete(budgetTypeController.delete);

// Subscription CRUD
router
   .route('/user/:userId/subscriptions')
   .get(subscriptionController.getAllByUserId);

router
   .route('/user/:userId/account/:accountId/subscriptions')
   .get(subscriptionController.getAllByAccountId)
   .post(subscriptionController.create);

router
   .route('/user/:userId/subscription/:subscriptionId')
   .get(subscriptionController.getOne)
   .patch(subscriptionController.update)
   .delete(subscriptionController.delete);

module.exports = router;
