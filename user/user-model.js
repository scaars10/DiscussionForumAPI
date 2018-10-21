var mongoose = require('mongoose');

module.exports = mongoose.model('user', {
  username: {type: "String", unique: true, required: true},
  password: {type: "String", required:true},
  email: {type: "String", required: true, unique: true},
  createdAt: {type: "Date", default:Date.now}
});
