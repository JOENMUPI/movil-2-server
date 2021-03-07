const router = require('express').Router();
const archive = require('../controllers/archive_controller');


// Variables
const endPoint = '/archive';

// Get
router.get(`${ endPoint }/task/:taskId`, archive.getArchivesByTaskId);


// Post


// Put


// Delete


// Export
module.exports = router;