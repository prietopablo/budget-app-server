const express = require('express');
const userController = require('./controllers/userController');
const accountController = require('./controllers/accountController');

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

// At the moment user can just monitor their accounts but will be changed to some sort of dashboard
router
   .route('/user/:userId/accounts')
   .get(accountController.getAllByUserId)
   .post(accountController.create);

router
   .route('/user/:userId/account/:accountId')
   .get(accountController.getOne)
   .patch(accountController.update)
   .delete(accountController.delete);

module.exports = router;
