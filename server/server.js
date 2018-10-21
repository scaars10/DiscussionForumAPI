var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('../config');
mongoose.connect('mongodb://localhost:27017/discussionTest', { useNewUrlParser: true});//home/scaars13/codes/Programming/NODE/discussion');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, ()=>{
  console.log('Server running on port 3000');
});
var userRoute = require('../user/user-route');
var communityRoute = require('../community/community-route');
var commentRoute = require('../comment/comment-route');
var threadRoute = require('../thread/thread-route');

app.set('superSecret', config.secret);
app.use('/user', userRoute);
app.use('/community', communityRoute);
app.use('/comment',commentRoute);
app.use('/thread',threadRoute);
// console.log(app.settings.superSecret);
app.get('/', (req, res)=>{
  return res.status(200).send('Request sent');
})

module.exports = {
  app
};
