const router = require('express').Router();
const list = require('../controllers/list_controller');


// Variables
const endPoint = '/list';

// Get
router.get(`${ endPoint }/user/:userId`, list.getMegaListByUserId);


// Post
router.post(endPoint, list.createList);

// Put
router.put(endPoint, list.updateListById);

// Delete
router.delete(`${ endPoint }/:listId`, list.deleteListById);

// Export
module.exports = router;