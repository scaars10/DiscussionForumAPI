var express = require('express');
var router = express.Router();
var threadController = require('./thread-controller');
var auth = require('../middleware/auth');

router.post('/create-thread', auth, threadController.createThread);
router.get('/get-thread', threadController.getThread);

module.exports = router;
