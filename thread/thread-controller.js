var Thread = require('./thread-model');
var commController = require('../community/community-controller');
module.exports.createThread = (req, res)=>{
  if(!req.body.title || !req.body.communityName || !req.body.username){
    return res.status(400).send("Missing Info");
  }
  commController.findCommunity(req.body.communityName, (err, community)=>{
    if(err || community==undefined){
      return res.status(400).send("No such community exists or database experiencing difficulties");
    }
    console.log(community);
    var threadData = {
      title: req.body.title,
      communityName: req.body.communityName,
      username: req.body.username,
      body: req.body.body,
      createdAt: req.body.createdAt,
      tags: req.body.tags,
      favorites: req.body.favorites
    }
    var newThread = new Thread(threadData);
    newThread.save().then((doc)=>{
      return res.json({result: doc});
    },(err)=>{
      return res.status(500).send("Database experiencing some difficulties.");
    });
  });
}

module.exports.getThread = (req, res)=>{

    Thread.find({}, function(err, categories){
      if(err){
        return res.status(500).send("Unable to acquire categories");
      }
      res.json({
        categories: categories
      })
    })
  }
