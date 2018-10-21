var mongoose = require('mongoose');

module.exports = mongoose.model('Community', {
  name: {type:"String", required: true, unique: true},
  description: {type:"String", required: true},
  tags: {type: Array},
  users: {type:Array}
});
var temp = mongoose.model('Community');
//console.log(temp);
temp.findOne({name: "Artificial Intelligence"}, function(err, res){
    console.log("Inside");
  console.log(res);
  console.log("Inside");
})
