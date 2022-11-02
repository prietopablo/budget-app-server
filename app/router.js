const express = require('express');
const { userController } = require('./controllers/userController');

const router = express.Router();



// Unconnected/unregistered Visitor
// Homepage
router.get('/', (_,res) => {
   res.send('homepage');
});

// Sign up
router.post('/signup', userController.create);

//
router.post('/login', () => {
   
});

// registered Visitor
// Profile CRUD
router
   .route('/profile/:id')
   .get(userController.getOne)
   .patch(userController.update)
   .delete(userController.delete);


module.exports = router;
