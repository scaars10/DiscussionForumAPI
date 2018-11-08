var Community = require('./community-model');
module.exports.createCommunity = (req, res)=>{
  if(!req.body.name || !req.body.description){
    return res.status(400).send("Name and description required");
  }
  var communityData = {
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags,
    users: req.body.users
  };
  var newCommunity = new Community(communityData);
  console.log(newCommunity);
  newCommunity.save().then((doc)=>{

    return res.status(200).send("New Community Created");
  },(err)=>{
    if(err){
    return res.status(500).send("Unique Community name required or difficulties in Database");
  }})
}

module.exports.getCommunity = (req, res)=>{
  Community.find({}, function(err, categories){
    if(err){
      return res.status(500).send("Unable to acquire categories");
    }
    res.json({
      categories: categories
    })
  })
}
module.exports.findCommunity = (commName, callback)=>{
  //console.log(commName);
  var community = Community.findOne({name: commName}, callback);
};
// Community.findOne({name: "Artificial Intelligence"}, function(err, res){
//   if(err){
//     console.log(err);
//   }
//   console.log(res);
//console.log(demp);
// console.log(2);
