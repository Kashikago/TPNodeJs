const express = require('express');
const userController = require('./usersController');
const router = express.Router();


router.route('/user')
.get([
    userController.userList
])
.post([
    userController.createUser
])

router.route('/user/:id')
.get([
    userController.getUser
])
.patch([
    userController.updateUser
])
.delete([
    userController.deleteUser
])

module.exports = router;





