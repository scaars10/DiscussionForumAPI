var express = require('express');
var router = express.Router();
var communityController = require('./community-controller');
var auth = require('../middleware/auth');

router.post("/create-community", auth, communityController.createCommunity);
router.get("/get-community", communityController.getCommunity);
module.exports = router;
//console.log(router)
