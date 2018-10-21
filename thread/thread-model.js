var mongoose = require('mongoose');

module.exports = mongoose.model('thread', {
  title: {type: "String", required: true},
  communityName: {type: "String", required: true},
  username: {type: "String", required: true},
  body: {type: "String", default:""},
  createdAt: {type: "Date", default: Date.now},
  tags: {type:"Array", default: {}},
  favorites: {type: "number", default: 0}
});
