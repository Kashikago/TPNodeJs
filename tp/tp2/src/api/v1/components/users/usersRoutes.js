const express = require('express');
const userController = require('./usersController');
const router = express.Router();


router.route('/userlist').get([
    userController.userList
])
router.route('/getUser').get([
    userController.getUser
])
router.route('/createUser').post([
    userController.createUser
])
router.route('/updateUser').put([
    userController.updateUser
])
router.route('/deleteUser').delete([
    userController.deleteUser
])

module.exports = router;





