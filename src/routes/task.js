const router = require('express').Router();
const task = require('../controllers/task_controller');


// Variables
const endPoint = '/task';

// Get
router.get(`${ endPoint }/list/:listId`, task.getTaskByListId);


// Post
router.post(endPoint, task.createTask);

// Put
router.put(`${ endPoint }/tittle`, task.updateTasTittlekById);

// Delete
router.delete(`${ endPoint }/:taskId`, task.deleteTaskById);

// Export
module.exports = router;