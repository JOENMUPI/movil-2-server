const router = require('express').Router();
const list = require('../controllers/list_controller');


// Variables
const endPoint = '/list';

// Get
router.get(`${ endPoint }/user/:userId`, list.getListByUserId);


// Post


// Put


// Delete


// Export
module.exports = router;