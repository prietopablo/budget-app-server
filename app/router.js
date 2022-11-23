const express = require('express');
const userController = require('./controllers/userController');
const accountController = require('./controllers/accountController');
const transactionController = require('./controllers/transactionController');

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

module.exports = router;
