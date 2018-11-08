var express = require('express');
var router = express.Router();
var commentController = require('./comment-controller');
var auth = require('../middleware/auth');

router.post("/:community/:threadId/create-comment", auth, commentController.createComment);
router.get("/:community/:threadId/get-comment", commentController.getComment);
module.exports = router;
