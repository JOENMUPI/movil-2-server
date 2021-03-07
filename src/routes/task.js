const router = require('express').Router();
const task = require('../controllers/task_controller');


// Variables
const endPoint = '/task';

// Get
router.get(`${ endPoint }/list/:listId`, task.getTaskByListId);


// Post


// Put


// Delete


// Export
module.exports = router;