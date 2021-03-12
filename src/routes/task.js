const router = require('express').Router();
const task = require('../controllers/task_controller');


// Variables
const endPoint = '/task';

// Get
router.get(`${ endPoint }/list/:listId`, task.getTaskByListId);


// Post
router.post(endPoint, task.createTask);

// Put


// Delete
router.post(`${ endPoint }/taskId`, task.deleteTaskById);

// Export
module.exports = router;