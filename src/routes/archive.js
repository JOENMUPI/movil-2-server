const router = require('express').Router();
const archive = require('../controllers/archive_controller');


// Variables
const endPoint = '/archive';

// Get
router.get(`${ endPoint }/task/:taskId`, archive.getArchivesByTaskId);


// Post
router.post(endPoint, archive.createArchive);


// Put


// Delete
router.delete(`${ endPoint }/:archiveId`, archive.deleteArchiveById);

// Export
module.exports = router;