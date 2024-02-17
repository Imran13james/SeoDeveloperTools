const express = require('express');
const router = express.Router();
const userController = require('../Contrller/ExploreBusiness');

// Read all users
router.get('/', userController.getAllUsers);

// Read a specific user by ID
router.get('id/:userId', userController.getUserById);
router.post('/post', userController.createUser);
router.delete('Id/:userId', userController.deleteUserById);

// Update a user by ID
router.put('id/:userId', userController.updateUserById);
// Read all users
router.get('/', userController.getAllUsers);

// Read a specific user by email
router.get('/:email', userController.getUserByEmail);

// Create a new user
router.post('/ppp', userController.createUser);

// Delete a user by email
router.delete('/:email', userController.deleteUserByEmail);

// Update a user by email

router.put('/:email', userController.updateUserByEmail);
router.get('/delete/user', (req, res) => {
    res.render('BusniessExploresDEl');
  });

  router.get('/delete/:email', userController.renderDeleteConfirmation);


module.exports = router;


