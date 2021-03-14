const router = require('express').Router();
const step = require('../controllers/step_controller');


// Variables
const endPoint = '/step';

// Get
router.get(`${ endPoint }/task/:taskId`, step.getStepsByTaskId);


// Post
router.post(endPoint, step.createStep);


// Put
router.put(endPoint, step.updateStepById);


// Delete
router.delete(`${ endPoint }/:stepId`, step.deleteStepById);

// Export
module.exports = router;