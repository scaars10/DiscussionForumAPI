var express = require('express');
var router = express.Router();
var commentController = require('./comment-controller');
var auth = require('../middleware/auth');

router.post("/create-comment", auth, commentController.createComment);
router.get("/get-comment", commentController.getComment);
module.exports = router;
