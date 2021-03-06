const router = require('express').Router();
const user = require('../controllers/user_controller');


// Variables
const endPoint = '/user';

// Get
router.get(endPoint, user.getUser);
router.get(`${ endPoint }/:userId`, user.getUserById);

// Post
router.post(`${ endPoint }/singup`, user.createUsers);
router.post(`${ endPoint }/singin`, user.login);


// Put
router.put(`${ endPoint }/:userId`, user.updateUserById);
router.put(`${ endPoint }/pass/:userId`, user.updatePassById);


// Delete
router.delete(`${ endPoint }/:userId`, user.deleteUserById);


// Export
module.exports = router;