const router = require('express').Router();
const step = require('../controllers/step_controller');


// Variables
const endPoint = '/step';

// Get
router.get(`${ endPoint }/task/:taskId`, step.getStepsByTaskId);


// Post


// Put


// Delete


// Export
module.exports = router;