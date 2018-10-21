var mongoose = require('mongoose');

module.exports = mongoose.model('comment', {
  parentId: {type: "String", required: true},
  username: {type: "String", required: true},
  body: {type: "String", required: true},
  createdAt: {type: "Date", default: Date.now},
  favorites: {type: "number", default: 0}
});
